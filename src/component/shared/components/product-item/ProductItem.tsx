'use client'

import CartIconSvg from '@/component/ui/IconsSvg/catalog-icons/CartIconSvg'
import Skeleton from '@/component/ui/spinner/Spinner'
import { useAuth } from '@/hook/useAuth'
import { useMode } from '@/hook/useMode'
import { useOnloadImage } from '@/hook/useOnloadImage'
import { api } from '@/service/api/api'
import { IBoilerPartsData } from '@/shared/type/user.interface'
import cn from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import styles from './ProductItem.module.scss'

interface IProductItem {
	product: IBoilerPartsData
	lazy?: boolean
}

const ProductItem: FC<IProductItem> = ({ lazy = true, product }) => {
	const { user } = useAuth()

	const [addToShop] = api.useCreateShopCartMutation()
	const { data = [], isFetching } = api.useGetCartProductsQuery(user?.id, {
		skip: !user
	})
	const { isOnload, handleOnLoad } = useOnloadImage()

	const { theme } = useMode()
	const isInCart = data.some(cart => +cart.partId === +product.id)

	return (
		<section
			className={`${styles.catalogItem} ${
				theme === 'dark' ? styles.catalogItem_dark : ''
			}`}
		>
			<Link
				className={styles.catalogItem__image}
				href={`/product/${product.name}`}
			>
				{isOnload && (
					<Skeleton
						width='100%'
						height='100%'
						style={{ position: 'absolute' }}
					/>
				)}
				<Image
					src={product.images}
					alt={product.name}
					width={250}
					height={250}
					loading={lazy ? 'lazy' : 'eager'}
					onLoadingComplete={handleOnLoad}
					style={{ opacity: isOnload ? '0' : '1' }}
				/>
			</Link>
			<h4 className={styles.catalogItem__title}>
				<Link href={`/product/${product.name}`}>{product.name}</Link>
			</h4>
			<div className={styles.catalogItem__description}>
				{product.description}
			</div>

			<div className={styles.catalogItem__article}>{product.vendorCode}</div>
			<div className={styles.catalogItem__footer}>
				<div className={styles.catalogItem__price}>{product.price} ₽</div>
				{user && (
					<div
						className={cn(styles.catalogItem__action, {
							[styles.catalogItem__action_add]: isInCart
						})}
						data-testid='action-product'
					>
						{isFetching ? (
							<Skeleton height='40px' width='40px' />
						) : (
							<button
								onClick={() =>
									addToShop({ username: user?.username, partId: +product.id })
								}
								disabled={isInCart}
							>
								<CartIconSvg />
							</button>
						)}
					</div>
				)}
			</div>
		</section>
	)
}
export default ProductItem
