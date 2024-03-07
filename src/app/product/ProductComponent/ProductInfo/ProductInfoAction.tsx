import CartIconSvg from '@/component/ui/IconsSvg/catalog-icons/CartIconSvg'
import dynamic from 'next/dynamic'
import { FC } from 'react'
import styles from './ProductInfo.module.scss'

const ProductInfoAction: FC<{
	isInCart: boolean
	handleAddToCart: () => void
	handleRemoveToCart: () => void
}> = ({ isInCart, handleAddToCart, handleRemoveToCart }) => {
	return (
		<div>
			{!isInCart ? (
				<button className={styles.content__button} onClick={handleAddToCart}>
					<CartIconSvg /> Положить в корзину
				</button>
			) : (
				<button className={styles.content__button} onClick={handleRemoveToCart}>
					<CartIconSvg /> Удалить с корзины
				</button>
			)}
		</div>
	)
}
export default ProductInfoAction

export const DynamicProductionAction = dynamic(
	() => import('./ProductInfoAction'),
	{ ssr: false }
)
