import { IBoilerPartsData } from '@/shared/type/user.interface'
import Image from 'next/image'
import { FC } from 'react'
import 'swiper/css'
import { Swiper, SwiperSlide } from 'swiper/react'

interface IProductMobileSlide {
	items: string[]
	src: string
	isTabOne: boolean
	isTabTwo: boolean
	handleChangeTabOne: () => void
	handleChangeTabTwo: () => void
	item: IBoilerPartsData
}
const ProductMobileSlide: FC<IProductMobileSlide> = ({
	items,
	src,
	handleChangeTabOne,
	handleChangeTabTwo,
	isTabOne,
	isTabTwo,
	item
}) => {
	return (
		<>
			<Swiper
				spaceBetween={12}
				slidesPerView={1.1}
				style={{ maxWidth: '100%' }}
			>
				{items.map(item => (
					<SwiperSlide>
						<div key={item}>
							{' '}
							<Image src={src} width={600} height={400} alt='' />
						</div>
					</SwiperSlide>
				))}
			</Swiper>

			{/* <div>
				<div className={styles.mobile}>
					<div
						className={cn(styles.mobile__title, {
							[styles.mobile__title_active]: isTabOne
						})}
						onClick={handleChangeTabOne}
					>
						Описание
					</div>
					{isTabOne && (
						<div className={styles.mobile__item}>
							<div className={styles.mobile__description}>
								{' '}
								{item.description}
							</div>
						</div>
					)}
					<div
						className={cn(styles.mobile__title, {
							[styles.mobile__title_active]: isTabTwo
						})}
						onClick={handleChangeTabTwo}
					>
						Совместимость
					</div>

					{isTabTwo && (
						<div className={styles.mobile__item}>
							<div className={styles.mobile__description}>
								{' '}
								{item.partsManufacturer}
								{item.boilerManufacturer}
							</div>
						</div>
					)}
				</div>
			</div> */}
		</>
	)
}
export default ProductMobileSlide
