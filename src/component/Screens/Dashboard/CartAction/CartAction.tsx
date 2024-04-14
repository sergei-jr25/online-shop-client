import CloseSvg from '@/component/ui/IconsSvg/header-icons/CloseSvg'
import { useCart } from '@/hook/useCart'
import { useMode } from '@/hook/useMode'
import { useRouter } from 'next/navigation'
import { FC } from 'react'
import styles from './CartAction.module.scss'
import { CartActionsItemsDynamic } from './CartActionsQuantity'

interface ICartAction {
	handleClick: () => void
}

const CartAction: FC<ICartAction> = ({ handleClick }) => {
	const { theme } = useMode()
	const { push } = useRouter()
	const { items, totalPrice } = useCart()

	return (
		<div
			className={`${styles.cart} ${theme === 'dark' ? styles.cart_dark : ''}`}
		>
			<div className={styles.cart__content}>
				<CartActionsItemsDynamic length={items.length} />
				<div className={styles.cart__value}>
					на сумму <strong>{totalPrice} ₽</strong>{' '}
				</div>
			</div>
			<div className={styles.cart__actions}>
				<div className={styles.cart__buttons}>
					<button
						className={styles.cart__button}
						onClick={() => push('/order')}
					>
						Перейти в корзину
					</button>
					<button
						className={`${styles.cart__button} ${styles.cart__button_bg}`}
						onClick={() => push('/order')}
					>
						Оформить заказ
					</button>
					<button onClick={handleClick}>
						<CloseSvg />
					</button>
				</div>
			</div>
		</div>
	)
}
export default CartAction
