import CartItemPopupProps from '@/component/ui/cart/CartItem'
import { useCart } from '@/hook/useCart'
import { useActions } from '@/hook/useDispatch'
import { useMode } from '@/hook/useMode'
import { useOutside } from '@/hook/useOutside'
import cn from 'clsx'
import { usePathname, useRouter } from 'next/navigation'
import { FC, useEffect } from 'react'
import CartSvg from '../../../../ui/IconsSvg/header-icons/CartSvg'
import styles from './Cart.module.scss'

const Cart: FC = () => {
	const { items, isCartOpen, totalPrice } = useCart()
	const { isShow, ref, setIsShow } = useOutside(false)

	const { theme } = useMode()
	const { removeToCart, setTotalPrice } = useActions()

	const pathName = usePathname()
	const { push } = useRouter()

	const pathNameOrder = pathName === '/order'

	const handlerRemoveToCart = (id: string) => {
		removeToCart({ productId: id })
	}
	const changePageOrder = () => {
		push('/order')
		setIsShow(false)
	}
	const handleToggleCart = () => {
		setIsShow(!isShow)
	}

	useEffect(() => {
		setTotalPrice()
	}, [items])

	return (
		<div className={cn(styles.cart, { [styles.dark]: theme === 'dark' })}>
			<button
				className={styles.cart__visible}
				onClick={handleToggleCart}
				disabled={pathNameOrder}
			>
				<CartSvg />
				<span>Корзина</span>
			</button>
			<div>
				<div
					className={cn(styles.cart__body, {
						[styles.cart__body_show]: isShow
					})}
				>
					{items.length ? (
						<ul className={styles.cart__list}>
							{items.map(item => (
								<CartItemPopupProps key={item.id} item={item} />
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
							<button className={styles.cart__button} onClick={changePageOrder}>
								Перейти в корзину
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
export default Cart
