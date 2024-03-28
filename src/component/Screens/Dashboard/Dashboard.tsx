'use client'
import 'swiper/css'

import { useAuth } from '@/hook/useAuth'
import { useMode } from '@/hook/useMode'
import { IBoilerPartsData } from '@/shared/type/user.interface'
import { FC, useState } from 'react'
import { toastr } from 'react-redux-toastr'
import About from './About/About'
import Bestsellers from './Bestsellers/Bestsellers'
import Brands from './Brands/Brands'
import CartAction from './CartAction/CartAction'
import styles from './Dashboard.module.scss'
import New from './New/New'

interface IDashboard {
	bestsellers: IBoilerPartsData[]
	news: IBoilerPartsData[]
}

const Dashboard: FC<IDashboard> = ({ bestsellers, news }) => {
	const { user } = useAuth()

	const { theme } = useMode()

	const [shouldCartAction, setShouldCartAction] = useState(true)

	const actionCartClose = () => {
		setShouldCartAction(false)
	}

	return (
		<div
			className={`${styles.dashboard} ${theme === 'dark' ? styles.dark : ''}`}
		>
			<div className={`container ${styles.dashboard__container}`}>
				{shouldCartAction && (
					<div className={styles.dashboard__info}>
						<CartAction handleClick={actionCartClose} />
					</div>
				)}
				<button onClick={() => toastr.success('Click', 'to toastr succses')}>
					Click to toastr
				</button>
				<h1 className={`title ${styles.dashboard__title}`}>
					Детали для газовых котлов
				</h1>

				<div className={styles.dashboard__blocks}>
					<Brands />
					<Bestsellers bestsellers={bestsellers} />
					<New news={news} />
					<About />
				</div>
			</div>
		</div>
	)
}
export default Dashboard
