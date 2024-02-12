'use client'
import Slider from '@/component/ui/Slider/Slider'
import { useAuth } from '@/hook/useAuth'
import { useFilters } from '@/hook/useFilters'
import useMediaQuery from '@/hook/useMediaQuery'
import { api } from '@/service/api/api'
import { apiBoilerParts } from '@/service/api/boiderl-parts'
import { IBoilerPartsData } from '@/shared/type/user.interface'
import cn from 'clsx'
import Image from 'next/image'
import { FC, useState } from 'react'
import Accordion from '../../component/Screens/Catalog/CatalogFilters/Acordion/Accordion'
import ProductInfo from './ProductComponent/ProductInfo/ProductInfo'
import ProductMobileSlide from './ProductMobileSlide'
import styles from './ProductPage.module.scss'

const ProductPage: FC<{ item: IBoilerPartsData }> = ({ item }) => {
	// const image = JSON.parse(item.images)

	const [isTabOne, setIsTabOne] = useState(true)
	const [isTabTwo, setIsTaTwo] = useState(false)
	const [slidesTo, setSlidesTo] = useState(item.images)
	const mobile = useMediaQuery('(max-width: 776px)')
	const { user } = useAuth()
	const { queryParams } = useFilters()
	const { data: carts = [] } = api.useGetCartProductsQuery(user?.id, {
		skip: !user
	})
	const { data: items = [] } =
		apiBoilerParts.usePaginateAndFilterQuery(queryParams)
	const [removeToCart] = api.useRemoveMutation()
	const [addToCart] = api.useCreateShopCartMutation()

	const handleAddToCart = () => {
		addToCart({ username: user?.username, partId: +item.id }) // ?
	}
	const handleRemoveToCart = () => {
		removeToCart(+item.id)
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

	const isInCart = carts.some(cart => +cart.partId === +item.id)
	const isInStock = item.inStock

	return (
		<div className={`container ${styles.product}`}>
			<h2 className={styles.product__title}> {item.name}</h2>

			<div
				className={cn(styles.product__body, {
					[styles.product__body_mobile]: mobile
				})}
			>
				<div className={styles.product__slider}>
					{!mobile ? (
						<div className={styles.slides}>
							<div className={styles.slides__image}>
								<img src={slidesTo || item.images} alt={item.name} />
							</div>
							<div className={styles.slides__items}>
								{[...Array(8)].map((_, idx) => (
									<div
										onClick={() =>
											setSlidesTo(
												'https://maximumwallhd.com/wp-content/uploads/2015/07/fonds-ecran-ile-paradisique-15.jpg'
											)
										}
									>
										<Image src={item.images} width={150} height={150} alt='' />
									</div>
								))}
							</div>
						</div>
					) : (
						<div className={styles.product__mobile}>
							<ProductMobileSlide
								items={[...Array(8)]}
								src={item.images}
								handleChangeTabOne={handleChangeTabOneMobile}
								handleChangeTabTwo={handleChangeTabTwoMobile}
								isTabOne={isTabOne}
								isTabTwo={isTabTwo}
								item={item}
							/>
							<ProductInfo
								isInCart={isInCart}
								isInStock={isInStock}
								item={item}
								mobile={mobile}
								handleRemoveToCart={handleRemoveToCart}
								handleAddToCart={handleAddToCart}
							/>
							<Accordion
								title='Описание'
								isMobileForFilters={mobile}
								titleClass={styles.tab__title_mobile}
								isShowContent={handleChangeTabOneMobile}
								arrowOpenClass={
									isTabOne
										? `${styles.tab__arrow} ${styles.tab__arrow_active} `
										: styles.tab__arrow
								}
							>
								{isTabOne && (
									<div className={styles.tab__item_mobile}>
										<div
											className={`${styles.tab__name_mobile} ${styles.tab__name}`}
										>
											{item.name}
										</div>
										<div className={styles.tab__description_mobile}>
											{item.description}
										</div>
									</div>
								)}
							</Accordion>
							<Accordion
								title='Совместимость'
								isMobileForFilters={mobile}
								titleClass={styles.tab__title_mobile}
								isShowContent={handleChangeTabTwoMobile}
								arrowOpenClass={
									isTabTwo
										? `${styles.tab__arrow} ${styles.tab__arrow_active} `
										: styles.tab__arrow
								}
							>
								{isTabTwo && (
									<div className={styles.tab__item_mobile}>
										<div className={styles.tab__compatibility_mobile}>
											{item.compatibility}
										</div>
									</div>
								)}
							</Accordion>
						</div>
					)}
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
								isInStock={isInStock}
								item={item}
								mobile={mobile}
								handleRemoveToCart={handleRemoveToCart}
								handleAddToCart={handleAddToCart}
							/>
							<div className={cn(styles.tab, { [styles.tab_mobile]: mobile })}>
								<div className={styles.tab__heading}>
									<div
										className={cn(styles.tab__title, {
											[styles.tab__title_active]: isTabOne
										})}
										onClick={handleChangeTabOne}
									>
										Описание
									</div>

									<div
										className={cn(styles.tab__title, {
											[styles.tab__title_active]: isTabTwo
										})}
										onClick={handleChangeTabTwo}
									>
										Совместимость
									</div>
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
			<Slider title='Вам понравится' items={items[0] || []} />
		</div>
	)
}
export default ProductPage
