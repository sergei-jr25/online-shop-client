'use client'

import Counter from '@/component/ui/counter/Counter'
import { api } from '@/service/api/api'
import { ICart } from '@/shared/type/cart.interface'
import Image from 'next/image'
import { FC, useEffect, useState } from 'react'
import DeleteSvg from '../IconsSvg/DeleteSvg'
import styles from './CartItemProps.module.scss'
export interface ICartItemPopupProps {
	item: ICart
	carts: ICart[]
	handlerRemoveToCart: (id: number) => void
	refetch?: () => void
}

const CartItemPopup: FC<ICartItemPopupProps> = ({
	item,
	handlerRemoveToCart,
	refetch,
	carts
}) => {
	const [price, setPrice] = useState(item.price * item.count)
	const [count, setCount] = useState(item.count)
	const [totalPrice, setTotalPrice] = useState(price)
	const [removeCount] = api.useRemoveMutation()
	const [updateCount] = api.useUpdateCountMutation()
	const [updateTotalPrice] = api.useUpdateTotalPriceMutation()

	useEffect(() => {
		updateTotalPrice({ id: item.partId, totalPrice: price })
	}, [price])

	const increaseCount = () => {
		setPrice(price + item.price)
		setCount(count + 1)
		updateCount({ partId: item.partId, count })
	}

	const decreaseCount = () => {
		setPrice(price - item.price)
		updateCount({ partId: item.partId, count })
		setCount(count - 1)
	}

	return (
		<div key={item.id} className={styles.cart__item}>
			<div className={styles.cart__info}>
				<Image
					src={JSON.parse(item.image)}
					width={80}
					height={80}
					alt={item.name}
					className={styles.cart__image}
				/>
				<div className={styles.cart__name}>{item.name}</div>
				<button
					className={styles.cart__delete}
					onClick={() => handlerRemoveToCart(+item.partId)}
				>
					<DeleteSvg />
				</button>
			</div>
			<div className={styles.cart__footer}>
				<Counter
					count={count}
					decrementToCart={decreaseCount}
					incrementToCart={increaseCount}
					totalCount={item.inStock}
				/>

				<div className={styles.cart__price}>{price}</div>
			</div>
		</div>
	)
}
export default CartItemPopup
