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
					<ItemCartDynamic
						handleCrateComment={handleCrateComment}
						productId={product.id}
					/>
				)}
			</div>
		</div>
	)
}
export default ProductItem
