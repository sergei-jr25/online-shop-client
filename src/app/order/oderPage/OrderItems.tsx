import CartItemPopup from '@/component/ui/cart/CartItemProps'
import { ICart } from '@/shared/type/cart.interface'
import { FC } from 'react'
import styles from './OrderPage.module.scss'

const OrderItems: FC<{ data: ICart[]; removeToCart: (id: number) => void }> = ({
	data,
	removeToCart
}) => {
	const handlerRemoveToCart = (id: number) => {
		removeToCart(id)
	}
	return (
		<div>
			<ul className={styles.order__list}>
				{data.length ? (
					data.map(item => (
						<li className={styles.order__item} key={item.id}>
							{' '}
							<CartItemPopup
								carts={data}
								item={item}
								handlerRemoveToCart={handlerRemoveToCart}
							/>
						</li>
					))
				) : (
					<li>Товаров нет</li>
				)}
			</ul>
		</div>
	)
}
export default OrderItems
