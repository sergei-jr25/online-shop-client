import { useAuth } from '@/hook/useAuth'
import { useActions } from '@/hook/useDispatch'
import { useMode } from '@/hook/useMode'
import { IBoilerPartsData } from '@/shared/type/user.interface'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { ItemCartDynamic } from './ItemCart'
import styles from './ProductItem.module.scss'
const ProductItem: FC<{ product: IBoilerPartsData }> = ({ product }) => {
	const { user } = useAuth()
	const { addToCart } = useActions()

	const { theme } = useMode()
	const handleCrateComment = () => {
		addToCart({
			id: product.id,
			count: 1,
			name: product.name,
			price: product.price,
			image: product.images,
			totalPrice: product.price
		})
	}

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
				<Image src={product.images} fill alt={product.name} loading='lazy' />
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
					<ItemCartDynamic
						handleCrateComment={handleCrateComment}
						productId={product.id}
					/>
				)}
			</div>
		</section>
	)
}
export default ProductItem
