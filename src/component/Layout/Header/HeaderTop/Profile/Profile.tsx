import ExitSvg from '@/component/ui/IconsSvg/ExitSvg'
import { useAuth } from '@/hook/useAuth'
import { useActions } from '@/hook/useDispatch'
import { useRouter } from 'next/navigation'
import { FC, LegacyRef } from 'react'
import styles from './Profile.module.scss'

const Profile: FC<{
	refP: LegacyRef<HTMLDivElement>
	setIsShow: (flag: boolean) => void
}> = ({ refP, setIsShow }) => {
	const { user } = useAuth()
	const { logout } = useActions()

	const hadnleLogout = () => {
		setIsShow(false)
		logout()
	}
	const hadnleLogin = () => {
		setIsShow(false)
		push('/auth')
	}

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
						<button className={styles.profile__button} onClick={hadnleLogin}>
							Войти <ExitSvg />
						</button>
					</li>
				)}
			</ul>
		</div>
	)
}
export default Profile
