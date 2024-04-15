import ProductItem from '@/component/shared/components/product-item/ProductItem'
import { useSlide } from '@/component/ui/Slider/useSlide'
import { IBoilerPartsData } from '@/shared/type/user.interface'
import { breakpoints } from '@/utils/break-points'
import { FC } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import styles from '../Dashboard.module.scss'

const Bestsellers: FC<{ bestsellers: IBoilerPartsData[] }> = ({
	bestsellers
}) => {
	const slide = useSlide(bestsellers)

	return (
		<div className={styles.dashboard__block}>
			<div>
				<h2 className={`subtitle ${styles.dashboard__subtitle}`}>
					Хиты продаж
				</h2>

				<Swiper
					// install Swiper modules
					spaceBetween={16}
					breakpoints={breakpoints}
					navigation={false}
					pagination={{ clickable: false }}
					scrollbar={{ draggable: true }}
					className='dashboard__slider'
				>
					{!!bestsellers.length &&
						bestsellers.map((item, idx) => (
							<SwiperSlide key={item.id}>
								<ProductItem product={item} lazy={false} />
							</SwiperSlide>
						))}
				</Swiper>
			</div>
		</div>
	)
}
export default Bestsellers
