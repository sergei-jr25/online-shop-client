'use client'
import ProductItem from '@/component/shared/components/product-item/ProductItem'
import Skeleton from '@/component/ui/spinner/Spinner'
import { IBoilerPartsData } from '@/shared/type/user.interface'
import { breakpoints } from '@/utils/break-points'
import { FC } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import styles from '../Dashboard.module.scss'

const Bestsellers: FC<{ bestsellers: IBoilerPartsData[] }> = ({
	bestsellers
}) => {
	return (
		<div className={styles.dashboard__block}>
			<div>
				<h2 className={`subtitle ${styles.dashboard__subtitle}`}>
					Хиты продаж
				</h2>

				<Swiper
					spaceBetween={16}
					breakpoints={breakpoints}
					navigation={false}
					pagination={{ clickable: false }}
					scrollbar={{ draggable: true }}
					className='dashboard__slider'
					autoHeight={true}
				>
					{!!bestsellers.length ? (
						bestsellers.map(item => (
							<SwiperSlide key={item.id}>
								<ProductItem product={item} />
							</SwiperSlide>
						))
					) : (
						<Skeleton height='250px' width='10' />
					)}
				</Swiper>
			</div>
		</div>
	)
}
export default Bestsellers
