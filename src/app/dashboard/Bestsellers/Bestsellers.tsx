import CatalogItem from '@/app/catalog/CatalogPage/CatalogItem'
import Skeleton from '@/component/ui/spinner/Spinner'
import { apiBoilerParts } from '@/service/api/boiderl-parts'
import { breakpoints } from '@/utils/break-points'
import { FC } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import styles from '../Dashboard.module.scss'

const Bestsellers: FC = () => {
	const { data: bestsellers = [], isFetching } =
		apiBoilerParts.useGetBestsellersQuery()

	return (
		<div className={styles.dashboard__block}>
			<div>
				<h2 className={`subtitle ${styles.dashboard__subtitle}`}>
					Хиты продаж
				</h2>
				{isFetching ? (
					<div className={styles.dashboard__items}>
						{[...Array(4)].map((item, idx) => (
							<Skeleton height='388px' width='346px' key={idx} />
						))}
					</div>
				) : (
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
				)}
			</div>
		</div>
	)
}
export default Bestsellers
