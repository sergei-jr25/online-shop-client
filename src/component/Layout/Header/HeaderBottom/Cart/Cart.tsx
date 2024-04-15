import { useAuth } from '@/hook/useAuth'
import { useMode } from '@/hook/useMode'
import { useOutside } from '@/hook/useOutside'
import { api } from '@/service/api/api'
import { ICart } from '@/shared/type/cart.interface'
import { calculateTotalPrice } from '@/utils/calculateTotalPrice'
import cn from 'clsx'
import { usePathname, useRouter } from 'next/navigation'
import { FC } from 'react'
import CartSvg from '../../../../ui/IconsSvg/header-icons/CartSvg'
import styles from './Cart.module.scss'

const Cart: FC = () => {
	const { isShow, ref, setIsShow } = useOutside(false)
	const { theme } = useMode()
	const pathName = usePathname()
	const { push } = useRouter()
	const { user } = useAuth()

	const {
		data = [] as ICart[],
		isFetching,
		isError
	} = api.useGetCartProductsQuery(user?.id, {
		skip: !user
	})

	const pathNameOrder = pathName === '/order'

	const changePageOrder = () => {
		push('/order')
		setIsShow(false)
	}
	const handleToggleCart = () => {
		setIsShow(!isShow)
	}

	const totalPrice = calculateTotalPrice(data)

	return (
		<div className={cn(styles.cart, { [styles.dark]: theme === 'dark' })}>
			<button
				className={styles.cart__visible}
				onClick={handleToggleCart}
				disabled={pathNameOrder}
			>
				<CartSvg />
				<span>Корзина</span>
				{!!data.length && (
					<div className={styles.cart__quantity}>{data.length}</div>
				)}
			</button>
			<div>
				{/* <div
					className={cn(styles.cart__body, {
						[styles.cart__body_show]: isShow
					})}
				>
					{data.length ? (
						<ul className={styles.cart__list}>
							{data.map(item => (
								<CartItemPopupProps
									key={item.id}
									item={item}
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
								Общая сумма: {totalPrice} ₽
							</div>
						</div>
					)}
					{!!data.length && (
						<Button className={styles.cart__button} onClick={changePageOrder}>
							Перейти в корзину
						</Button>
					)}
				</div> */}
			</div>
		</div>
	)
}
export default Cart
