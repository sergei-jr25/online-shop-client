import CartItemPopup from '@/component/ui/cart/CartItem'
import { ICart } from '@/shared/type/cart.interface'
import { FC } from 'react'
import styles from './OrderPage.module.scss'

const OrderItems: FC<{
	data: ICart[]
	isFetching?: boolean
}> = ({ data, isFetching = false }) => {
	return (
		<ul className={styles.order__list}>
			{data.length ? (
				data.map(item => (
					<li className={styles.order__item} key={item.id}>
						<CartItemPopup item={item} isFetching={isFetching} />
					</li>
				))
			) : (
				<li>Товаров нет</li>
			)}
		</ul>
	)
}
export default OrderItems
