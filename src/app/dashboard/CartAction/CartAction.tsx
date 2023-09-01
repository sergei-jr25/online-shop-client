import CloseSvg from '@/app/header/header-icon/CloseSvg'
import { useMode } from '@/hook/useMode'
import { FC } from 'react'
import styles from './CartAction.module.scss'

interface ICartAction {
	count: number
	handleClick: () => void
	price?: number
}

const CartAction: FC<ICartAction> = ({ count, handleClick, price }) => {
	const { theme } = useMode()
	return (
		<div className={`${styles.cart} ${theme === 'dark' ? styles.dark : ''}`}>
			<div className={styles.cart__content}>
				<div className={styles.cart__value}>В корзине {count} товаров</div>
				<div className={styles.cart__value}>на сумму {price}</div>
			</div>
			<div className={styles.cart__actions}>
				<div className={styles.cart__buttons}>
					<button className={styles.cart__button}>Перейти в корзину</button>
					<button
						className={`${styles.cart__button} ${styles.cart__button_bg}`}
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
