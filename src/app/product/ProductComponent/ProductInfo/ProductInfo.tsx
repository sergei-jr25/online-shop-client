import { useAuth } from '@/hook/useAuth'
import { IBoilerPartsData } from '@/shared/type/user.interface'
import cn from 'clsx'
import { FC } from 'react'
import styles from './ProductInfo.module.scss'
import { DynamicProductionAction } from './ProductInfoAction'

const ProductInfo: FC<{
	item: IBoilerPartsData
	mobile: boolean
	isInStock: number
	isInCart: boolean
	handleAddToCart: () => void
	handleRemoveToCart: () => void
}> = ({
	isInCart,
	isInStock,
	item,
	mobile,
	handleAddToCart,
	handleRemoveToCart
}) => {
	const { user } = useAuth()

	return (
		<div
			className={cn(styles.content, {
				[styles.content__content_mobile]: mobile
			})}
		>
			<div>{item.price} '₽'</div>

			{!!isInStock ? (
				<div className={styles.content__stock}>Есть на складе</div>
			) : (
				<div className={styles.content__stock}>Нет на складе</div>
			)}
			<div>{item.vendorCode}</div>
			{user && (
				<DynamicProductionAction
					handleAddToCart={handleAddToCart}
					handleRemoveToCart={handleRemoveToCart}
					isInCart={isInCart}
				/>
			)}
		</div>
	)
}
export default ProductInfo
