import dynamic from 'next/dynamic'
import { FC } from 'react'
import styles from './CartAction.module.scss'

const CartActionsItems: FC<{ length: number }> = ({ length }) => {
	return <div className={styles.cart__value}>В корзине {length} товаров</div>
}
export default CartActionsItems
export const CartActionsItemsDynamic = dynamic(
	() => import('./CartActionsQuantity'),
	{ ssr: false }
)
