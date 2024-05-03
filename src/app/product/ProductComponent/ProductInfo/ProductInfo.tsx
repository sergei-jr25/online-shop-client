import { useAuth } from '@/hook/useAuth'
import { api } from '@/service/api/api'
import { IBoilerPartsData } from '@/shared/type/user.interface'
import cn from 'clsx'
import { FC } from 'react'
import styles from './ProductInfo.module.scss'
import { DynamicProductionAction } from './ProductInfoAction'

const ProductInfo: FC<{
	item: IBoilerPartsData
	mobile: boolean
	isInStock: number
}> = ({ isInStock, item, mobile }) => {
	const { user } = useAuth()

	const { data = [], isFetching } = api.useGetCartProductsQuery(user?.id, {
		skip: !user
	})

	const isInCart = data.some(cart => +cart.partId === +item.id)

	const [addToShop] = api.useCreateShopCartMutation()
	const [removeToCart] = api.useRemoveMutation()

	const handleAddToCart = () => {
		addToShop({ username: user?.username, partId: +item.id })
	}

	const handleRemoveToCart = () => {
		removeToCart(+item.id)
	}

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
