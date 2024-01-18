import CatalogItem from '@/app/catalog/CatalogPage/CatalogItem'
import { IBoilerPartsData } from '@/shared/type/user.interface'
import { breakpoints } from '@/utils/break-points'
import { FC } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import styles from '../Dashboard.module.scss'

const Bestsellers: FC<{ bestsellers: IBoilerPartsData[] }> = ({
	bestsellers
}) => {
	// const { data: bestsellers = [], isFetching } =
	// 	apiBoilerParts.useGetBestsellersQuery()

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
					{bestsellers.map((item, idx) => (
						<SwiperSlide key={item.id}>
							<CatalogItem product={item} />
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</div>
	)
}
export default Bestsellers
