'use client'

import Counter from '@/component/ui/counter/Counter'
import Skeleton from '@/component/ui/spinner/Spinner'
import { api } from '@/service/api/api'
import { ICart } from '@/shared/type/cart.interface'
import Image from 'next/image'
import { FC, useEffect, useState } from 'react'
import CloseSvg from '../../header-icon/CloseSvg'
import styles from './Cart.module.scss'

export interface ICartItemPopupProps {
	item: ICart
	carts: ICart[]
	handlerRemoveToCart: (id: number) => void
	refetch?: () => void
	isFetching: boolean
}

const CartItemPopup: FC<ICartItemPopupProps> = ({
	item,
	handlerRemoveToCart,
	refetch,
	carts,
	isFetching
}) => {
	const [price, setPrice] = useState(item.price * item.count)
	const [count, setCount] = useState(item.count)
	const [totalPrice, setTotalPrice] = useState(price)
	const [removeCount] = api.useRemoveMutation()
	const [updateCount] = api.useUpdateCountMutation()
	const [updateTotalPrice] = api.useUpdateTotalPriceMutation()

	useEffect(() => {
		console.log('updateTotalPrice')

		updateTotalPrice({ id: item.partId, totalPrice: price })
	}, [price])

	const increaseCount = () => {
		setPrice(price + item.price)
		setCount(count + 1)
		console.log(count)

		updateCount({ partId: item.partId, count })

		// setTimeout(() => {
		// 	refetch()
		// }, 300)
	}

	const decreaseCount = () => {
		setPrice(price - item.price)
		updateCount({ partId: item.partId, count })
		setCount(count - 1)
		// setTimeout(() => {
		// 	refetch()
		// }, 300)
	}

	return (
		<li key={item.id} className={styles.cart__item}>
			<div className={styles.cart__header}>
				<Image
					width={100}
					height={100}
					src={JSON.parse(item.image)}
					alt={item.name}
				/>
				<div className={styles.cart__content}>
					<div className={styles.cart__value}>{item.name}</div>
					<div className={styles.cart__value}>{price}</div>
				</div>
			</div>
			<div className={styles.cart__actions}>
				{isFetching ? (
					<Skeleton width='20px' />
				) : (
					<button
						className={styles.cart__delete}
						onClick={() => handlerRemoveToCart(+item.partId)}
					>
						<CloseSvg />
					</button>
				)}
				<Counter
					count={count}
					decrementToCart={decreaseCount}
					incrementToCart={increaseCount}
					totalCount={item.inStock}
				/>
			</div>
		</li>
	)
}
export default CartItemPopup
