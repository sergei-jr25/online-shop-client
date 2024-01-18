import Skeleton from '@/component/ui/spinner/Spinner'
import { useAuth } from '@/hook/useAuth'
import { useCart } from '@/hook/useCart'
import { useActions } from '@/hook/useDispatch'
import { useMode } from '@/hook/useMode'
import { api } from '@/service/api/api'
import { IBoilerPartsData } from '@/shared/type/user.interface'
import cn from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import CartIconSvg from '../Catalog-icons/CartIconSvg'
import styles from './CatalogItem.module.scss'

const CatalogItem: FC<{ product: IBoilerPartsData }> = ({ product }) => {
	const { items } = useCart()
	const { user } = useAuth()
	const { addToCart } = useActions()

	const {
		data: cartsProducts = [],
		isFetching,
		isLoading
	} = api.useGetCartProductsQuery(user?.id, { skip: !user })
	const [createShop] = api.useCreateShopCartMutation()
	const isInCart = cartsProducts.some(cart => +cart.partId === +product.id)
	const { theme } = useMode()
	const handleCrateComment = () => {
		if (user) {
			createShop({ username: user.username, partId: +product.id })
		}
	}

	// const image = JSON.parse(product.images)

	return (
		<div
			className={`${styles.catalogItem} ${theme === 'dark' ? styles.dark : ''}`}
		>
			<Link
				className={styles.catalogItem__image}
				href={`/product/${product.id}`}
			>
				<Image src={product.images} alt='' width={300} height={300} />
			</Link>
			<Link
				className={styles.catalogItem__title}
				href={`/product/${product.id}`}
			>
				{product.name}
			</Link>
			<div className={styles.catalogItem__description}>
				{product.description}
			</div>

			<div className={styles.catalogItem__article}>{product.vendorCode}</div>
			<div className={styles.catalogItem__footer}>
				<div className={styles.catalogItem__price}>{product.price} Р</div>
				{user && (
					<div
						className={cn(styles.catalogItem__action, {
							[styles.catalogItem__action_add]: isInCart
						})}
					>
						{isFetching ? (
							<Skeleton height='100%' />
						) : (
							<button onClick={handleCrateComment}>
								<CartIconSvg />
							</button>
						)}
					</div>
				)}
			</div>
		</div>
	)
}
export default CatalogItem
