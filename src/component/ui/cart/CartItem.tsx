'use client'

import { useActions } from '@/hook/useDispatch'
import { useMode } from '@/hook/useMode'
import { IItemCart } from '@/store/cart/cart.interface'
import Image from 'next/image'
import { FC } from 'react'
import DeleteSvg from '../IconsSvg/DeleteSvg'
import Counter from '../counter/Counter'
import styles from './CartItem.module.scss'
export interface ICartItem {
	item: IItemCart
}

const CartItem: FC<ICartItem> = ({ item }) => {
	const { changePrice, removeToCart } = useActions()
	const { theme } = useMode()

	const increaseCount = () => {
		changePrice({ id: item.id, type: 'plus' })
	}

	const decreaseCount = () => {
		changePrice({ id: item.id, type: 'minus' })
	}

	return (
		<div
			key={item.id}
			className={`${styles.cart} ${theme === 'dark' ? styles.cart_dark : ''}`}
		>
			<div className={styles.cart__info}>
				<Image
					src={item.image}
					width={80}
					height={80}
					alt={item.name}
					className={styles.cart__image}
				/>
				<div className={styles.cart__name}>{item.name}</div>
				<button
					className={styles.cart__delete}
					onClick={() => removeToCart({ productId: item.id })}
				>
					<DeleteSvg />
				</button>
			</div>
			<div className={styles.cart__footer}>
				<div>
					<Counter
						decrement={decreaseCount}
						increment={increaseCount}
						theme={theme}
					></Counter>
				</div>

				<div className={styles.cart__count}>{item.count} </div>
				<div className={styles.cart__price}>{item.totalPrice} ₽</div>
			</div>
		</div>
	)
}
export default CartItem
