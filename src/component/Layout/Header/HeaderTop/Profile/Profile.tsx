import ExitSvg from '@/component/ui/IconsSvg/ExitSvg'
import { useAuth } from '@/hook/useAuth'
import { useActions } from '@/hook/useDispatch'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { FC, LegacyRef, useEffect } from 'react'
import styles from './Profile.module.scss'

const Profile: FC<{
	refP: LegacyRef<HTMLDivElement>
	setIsShow: (flag: boolean) => void
}> = ({ refP, setIsShow }) => {
	const { user } = useAuth()
	const { logout } = useActions()
	const pathName = usePathname()

	console.log('pathName', pathName)

	const hadnleLogout = () => {
		setIsShow(false)
		logout()
	}
	const hadnleLogin = () => {
		setIsShow(false)
		push('/auth')
	}
	useEffect(() => {
		setIsShow(false)
	}, [pathName])

	const { push } = useRouter()
	return (
		<div ref={refP} className={styles.profile}>
			<ul className={styles.profile__list}>
				{user && (
					<li className={styles.profile__item}>
						<div className={styles.profile__name}>{user.username}</div>
						<div className={styles.profile__email}>{user.email}</div>
					</li>
				)}
				{user ? (
					<li className={styles.profile__item}>
						<button className={styles.profile__button} onClick={hadnleLogout}>
							Выйти <ExitSvg />
						</button>
					</li>
				) : (
					<li className={styles.profile__item}>
						<Link className={styles.profile__button} href='/auth'>
							Войти <ExitSvg />
						</Link>
					</li>
				)}
			</ul>
		</div>
	)
}
export default Profile
