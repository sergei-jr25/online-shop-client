import ExitSvg from '@/component/ui/IconsSvg/ExitSvg'
import { useAuth } from '@/hook/useAuth'
import { useActions } from '@/hook/useDispatch'
import { FC } from 'react'
import styles from './Profile.module.scss'

const Profile: FC = () => {
	const { user } = useAuth()
	const { logout } = useActions()
	return (
		<div className={styles.profile}>
			<ul className={styles.profile__list}>
				{user ? (
					<li className={styles.profile__item}>
						<div className={styles.profile__name}>{user.username}</div>
						<div className={styles.profile__email}>{user.email}</div>
					</li>
				) : (
					<li className={styles.profile__item}>
						<div className={styles.profile__name}>Ivan</div>
						<div className={styles.profile__email}> www@gmail.ru </div>
					</li>
				)}

				<li className={styles.profile__item}>
					<button className={styles.profile__button} onClick={() => logout()}>
						Выйти <ExitSvg />
					</button>
				</li>
			</ul>
		</div>
	)
}
export default Profile
