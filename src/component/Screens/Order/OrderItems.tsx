import CartItemPopup from '@/component/ui/cart/CartItem'
import { IItemCart } from '@/store/cart/cart.interface'
import { FC } from 'react'
import styles from './OrderPage.module.scss'

const OrderItems: FC<{
	data: IItemCart[]
}> = ({ data }) => {
	return (
		<ul className={styles.order__list}>
			{data.length ? (
				data.map(item => (
					<li className={styles.order__item} key={item.id}>
						<CartItemPopup item={item} />
					</li>
				))
			) : (
				<li>Товаров нет</li>
			)}
		</ul>
	)
}
export default OrderItems
