'use client'
import Slider from '@/component/ui/Slider/Slider'
import { useCart } from '@/hook/useCart'
import { useActions } from '@/hook/useDispatch'
import { useFilters } from '@/hook/useFilters'
import useMediaQuery from '@/hook/useMediaQuery'
import { apiBoilerParts } from '@/service/api/boiderl-parts'
import { IBoilerPartsData } from '@/shared/type/user.interface'
import cn from 'clsx'
import { FC, useState } from 'react'
import ProductInfo from './ProductComponent/ProductInfo/ProductInfo'
import styles from './ProductPage.module.scss'

const ProductPage: FC<{ item: IBoilerPartsData }> = ({ item }) => {
	const [isTabOne, setIsTabOne] = useState(true)
	const [isTabTwo, setIsTaTwo] = useState(false)
	const [slidesTo, setSlidesTo] = useState(item.images)
	const mobile = useMediaQuery('(max-width: 776px)')

	const { queryParams } = useFilters()
	const { items } = useCart()
	const { addToCart, removeToCart } = useActions()

	const { data = [] } = apiBoilerParts.usePaginateAndFilterQuery(queryParams)

	const handleAddToCart = () => {
		addToCart({
			id: item.id,
			count: 1,
			name: item.name,
			price: item.price,
			image: item.images,
			totalPrice: item.price
		})
	}
	const handleRemoveToCart = () => {
		removeToCart({ productId: item.id })
	}

	const handleChangeTabOne = () => {
		setIsTabOne(true)
		setIsTaTwo(false)
	}
	const handleChangeTabTwo = () => {
		setIsTaTwo(true)
		setIsTabOne(false)
	}
	const handleChangeTabOneMobile = () => {
		setIsTabOne(!isTabOne)
	}
	const handleChangeTabTwoMobile = () => {
		setIsTaTwo(!isTabTwo)
	}

	const isInCart = items?.some(cart => +cart.id === +item.id)

	return (
		<div className={styles.product}>
			<div className={'container'}>
				<h2 className={styles.product__title}> {item.name}</h2>

				<div
					className={cn(styles.product__body, {
						[styles.product__body_mobile]: mobile
					})}
				>
					<div className={styles.product__slider}>
						<div className={styles.slides}>
							<div className={styles.slides__image}>
								<img src={item.images} alt={item.name} />
							</div>
						</div>
					</div>
					<div
						className={cn(styles.product__content, {
							[styles.product__content_mobile]: mobile
						})}
					>
						{!mobile && (
							<>
								<ProductInfo
									isInCart={isInCart}
									isInStock={item.inStock}
									item={item}
									mobile={mobile}
									handleRemoveToCart={handleRemoveToCart}
									handleAddToCart={handleAddToCart}
								/>
								<div
									className={cn(styles.tab, { [styles.tab_mobile]: mobile })}
								>
									<div className={styles.tab__heading}>
										<button
											className={cn(styles.tab__title, {
												[styles.tab__title_active]: isTabOne
											})}
											onClick={handleChangeTabOne}
										>
											Описание
										</button>

										<button
											className={cn(styles.tab__title, {
												[styles.tab__title_active]: isTabTwo
											})}
											onClick={handleChangeTabTwo}
										>
											Совместимость
										</button>
									</div>
									{isTabOne && (
										<div className={styles.tab__item}>
											<div className={styles.tab__name}>{item.name}</div>
											<div className={styles.tab__description}>
												{item.description}
											</div>
										</div>
									)}
									{isTabTwo && (
										<div className={styles.tab__item}>
											<div className={styles.tab__description}>
												{item.compatibility}
											</div>
										</div>
									)}
								</div>
							</>
						)}
					</div>
				</div>
				<Slider title='Вам понравится' items={data[0] || []} />
			</div>
		</div>
	)
}
export default ProductPage
