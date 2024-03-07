import dynamic from 'next/dynamic'
import { FC } from 'react'
import styles from './OrderPage.module.scss'

const OrderPageQuantity: FC<{ length: number }> = ({ length }) => {
	return <div className={styles.order__value}>Товары {length}</div>
}

export default OrderPageQuantity
export const OrderPageQuantityDynamic = dynamic(
	() => import('./OrderPageQuantity'),
	{ ssr: false }
)
