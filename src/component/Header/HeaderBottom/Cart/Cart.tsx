import { useAuth } from '@/hook/useAuth'
import { useMode } from '@/hook/useMode'
import { useOutside } from '@/hook/useOutside'
import { api } from '@/service/api/api'
import { ICart } from '@/shared/type/cart.interface'
import cn from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FC, useEffect, useState } from 'react'
import CartSvg from '../../header-icon/CartSvg'
import styles from './Cart.module.scss'
import CartItemPopup from './CartItemPopup'

const Cart: FC = () => {
	const { isShow, ref, setIsShow } = useOutside(false)
	const showToggleHandler = () => setIsShow(!isShow)

	const { theme } = useMode()
	const [totalPrice, setTotalPrice] = useState(0)

	const pathName = usePathname()
	const pathNameOrder = pathName === '/order'

	const { user } = useAuth()

	const { data: carts = [] as ICart[], isFetching } =
		api.useGetCartProductsQuery(Number(user?.id), { skip: !user })

	console.log('carts', carts)

	const [removeToCart] = api.useRemoveMutation()

	const handlerRemoveToCart = (item: number) => {
		removeToCart(item)
	}

	useEffect(() => {
		setTotalPrice(carts.reduce((acc, item) => (acc += item.totalPrice), 0))
	}, [carts])

	return (
		<div className={cn(styles.cart, { [styles.dark]: theme === 'dark' })}>
			<button
				className={styles.cart__visible}
				onClick={showToggleHandler}
				disabled={pathNameOrder}
			>
				<CartSvg />
				<span>Корзина</span>
			</button>
			<div
				className={cn(styles.cart__body, {
					[styles.cart__body_show]: isShow
				})}
				ref={ref}
			>
				{carts.length ? (
					<ul className={styles.cart__list}>
						{carts.map(item => (
							<CartItemPopup
								key={item.id}
								item={item}
								handlerRemoveToCart={handlerRemoveToCart}
								carts={carts}
								isFetching={isFetching}
							/>
						))}
					</ul>
				) : (
					<div className={styles.cart__item}>Список пуст</div>
				)}
				{!!totalPrice && (
					<div className={styles.cart__footer}>
						<div className={styles.cart__totalPrice}>
							Общая сумма: {totalPrice}
						</div>
						<Link className={styles.cart__button} href='/order'>
							Перейти в корзину
						</Link>
					</div>
				)}
			</div>
		</div>
	)
}
export default Cart
