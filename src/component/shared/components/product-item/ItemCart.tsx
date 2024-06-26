import CartIconSvg from '@/component/ui/IconsSvg/catalog-icons/CartIconSvg'
import { useAuth } from '@/hook/useAuth'
import { useCart } from '@/hook/useCart'
import cn from 'clsx'
import dynamic from 'next/dynamic'
import { FC } from 'react'
import styles from './ProductItem.module.scss'

interface IItemCart {
	handleCrateComment: () => void
	productId: string
}

const ItemCart: FC<IItemCart> = ({ handleCrateComment, productId }) => {
	const { items } = useCart()
	const { user } = useAuth()

	const isInCart = items.some(cart => +cart.id === +productId)

	if (!user) {
		return null
	}

	return (
		<div
			className={cn(styles.catalogItem__action, {
				[styles.catalogItem__action_add]: isInCart
			})}
		>
			<button onClick={handleCrateComment}>
				<CartIconSvg />
			</button>
		</div>
	)
}
export default ItemCart
export const ItemCartDynamic = dynamic(() => import('./ItemCart'), {
	ssr: false
})
