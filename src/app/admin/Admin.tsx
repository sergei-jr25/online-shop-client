'use client'

import { useAuth } from '@/hook/useAuth'
import { usePathname, useRouter } from 'next/navigation'
import { FC, useLayoutEffect } from 'react'
import styles from './Admin.module.scss'

const Admin: FC = () => {
	const pathName = usePathname()
	const { push, replace } = useRouter()
	const { user } = useAuth()

	useLayoutEffect(() => {
		if (!user) {
			replace('/')
			return
		}
	}, [user, replace])

	return (
		<div className={styles.admin}>
			<div className={`container ${styles.admin__container}`}>
				<h2 className={`title ${styles.admin__title}`}>Админ панель</h2>
				<ul className={styles.admin__list}>
					<li className={styles.admin__item}>
						<button onClick={() => push(pathName + '/create')}>
							Создать товар
						</button>
					</li>
					<li className={styles.admin__item}>
						<button onClick={() => push(pathName + '/edit')}>
							Редактировать товар
						</button>
					</li>
				</ul>
			</div>
		</div>
	)
}
export default Admin
