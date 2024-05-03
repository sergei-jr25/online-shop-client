'use client'

import { useMode } from '@/hook/useMode'
import { api } from '@/service/api/api'
import { ICart } from '@/shared/type/cart.interface'
import Image from 'next/image'
import { FC } from 'react'
import DeleteSvg from '../IconsSvg/DeleteSvg'
import Counter from '../counter/Counter'
import Skeleton from '../spinner/Spinner'
import styles from './CartItem.module.scss'

export interface ICartItem {
	item: ICart

	isFetching: boolean
}

const CartItem: FC<ICartItem> = ({ item, isFetching }) => {
	const { theme } = useMode()

	const [updateToCount] = api.useUpdateCountMutation()
	const [removeToCount] = api.useRemoveMutation()

	const handlePlusCount = (id: number) => {
		updateToCount({ partId: id, type: 'plus' })
	}
	const handleMinusCount = (id: number) => {
		updateToCount({ partId: id, type: 'minus' })
	}
	const handleRemoveToCart = (partId: number) => {
		removeToCount(partId)
	}

	return (
		<div
			key={item.id}
			className={`${styles.cart} ${theme === 'dark' ? styles.cart_dark : ''}`}
		>
			<div className={styles.cart__info}>
				{isFetching ? (
					<Skeleton width='80px' height='80px' />
				) : (
					<Image
						src={item.image}
						width={80}
						height={80}
						alt={item.name}
						className={styles.cart__image}
					/>
				)}
				<div className={styles.cart__name}>{item.name}</div>
				<button
					className={styles.cart__delete}
					onClick={() => handleRemoveToCart(+item.partId)}
				>
					<DeleteSvg />
				</button>
			</div>
			<div className={styles.cart__footer}>
				<div>
					<Counter
						decrement={() => handleMinusCount(+item.partId)}
						increment={() => handlePlusCount(+item.partId)}
						theme={theme}
						isFetching={isFetching}
					></Counter>
				</div>

				<div className={styles.cart__count}>{item.count} </div>
				{/* <div className={styles.cart__price}>{item.totalPrice} ₽</div> */}
			</div>
		</div>
	)
}
export default CartItem
