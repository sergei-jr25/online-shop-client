'use client'
import { tabText1, tabText2, tabText3, tabText4 } from '@/utils/delivery'
import { FC, useState } from 'react'
import styles from './Delivery.module.scss'
const Delivery: FC = () => {
	const [tab1, setTab1] = useState(true)
	const [tab2, setTab2] = useState(false)
	const [tab3, setTab3] = useState(false)
	const [tab4, setTab4] = useState(false)

	const handleTab1 = () => {
		setTab1(true)
		setTab2(false)
		setTab3(false)
		setTab4(false)
	}
	const handleTab2 = () => {
		setTab1(false)
		setTab2(true)
		setTab3(false)
		setTab4(false)
	}
	const handleTab3 = () => {
		setTab1(false)
		setTab2(false)
		setTab3(true)
		setTab4(false)
	}
	const handleTab4 = () => {
		setTab1(false)
		setTab2(false)
		setTab3(false)
		setTab4(true)
	}

	return (
		<div className={styles.tab}>
			<div className={`container ${styles.tab__container}`}>
				<h1 className={styles.title}>Доставка и оплата</h1>
				<div className={styles.tab__wrapper}>
					<div className={styles.tab__control}>
						<button
							className={`${styles.tab__item} ${
								tab1 && styles.tab__item_active
							}`}
							onClick={handleTab1}
						>
							Как работает курьерская доставка?
						</button>
						<button
							className={`${styles.tab__item} ${
								tab2 && styles.tab__item_active
							}`}
							onClick={handleTab2}
						>
							Как получить товар из пункта самовывоза?
						</button>
						<button
							className={`${styles.tab__item} ${
								tab3 && styles.tab__item_active
							}`}
							onClick={handleTab3}
						>
							Какие способы оплаты?
						</button>
						<button
							className={`${styles.tab__item} ${
								tab4 && styles.tab__item_active
							}`}
							onClick={handleTab4}
						>
							Как узнать статус заказанного товара?
						</button>
					</div>
					<div className={styles.tab__content}>
						{tab1 && <div className={styles.tab__text}>{tabText1}</div>}
						{tab2 && <div className={styles.tab__text}>{tabText2}</div>}
						{tab3 && <div className={styles.tab__text}>{tabText3}</div>}
						{tab4 && <div className={styles.tab__text}>{tabText4}</div>}
					</div>
				</div>
			</div>
		</div>
	)
}
export default Delivery
