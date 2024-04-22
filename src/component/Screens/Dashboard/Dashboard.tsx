'use client'
import { IBoilerPartsData } from '@/shared/type/user.interface'
import { FC } from 'react'
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
	return (
		<div className={styles.dashboard}>
			<div className={`container ${styles.dashboard__container}`}>
				<div className={styles.dashboard__info}>
					<CartAction />
				</div>

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
