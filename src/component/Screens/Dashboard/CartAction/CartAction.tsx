'use client'

import CloseSvg from '@/component/ui/IconsSvg/header-icons/CloseSvg'
import { useAuth } from '@/hook/useAuth'
import { useMode } from '@/hook/useMode'
import { api } from '@/service/api/api'
import { calculateTotalPrice } from '@/utils/calculateTotalPrice'
import { useRouter } from 'next/navigation'
import { FC, useState } from 'react'
import styles from './CartAction.module.scss'

const CartAction: FC = () => {
	const { theme } = useMode()
	const { push } = useRouter()
	const { user } = useAuth()
	const { data = [] } = api.useGetCartProductsQuery(user?.id, { skip: !user })

	const [shouldCartAction, setShouldCartAction] = useState(true)

	const actionCartClose = () => {
		setShouldCartAction(false)
	}

	const totalPrice = calculateTotalPrice(data)

	if (!shouldCartAction) return null

	return (
		<div
			className={`${styles.cart} ${theme === 'dark' ? styles.cart_dark : ''}`}
		>
			<div className={styles.cart__content}>
				<div className={styles.cart__value}>
					В корзине {data.length} товаров
				</div>

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
					<button onClick={actionCartClose}>
						<CloseSvg />
					</button>
				</div>
			</div>
		</div>
	)
}
export default CartAction
