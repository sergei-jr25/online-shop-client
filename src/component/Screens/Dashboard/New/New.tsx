import ProductItem from '@/component/shared/components/product-item/ProductItem'
import Skeleton from '@/component/ui/spinner/Spinner'
import { IBoilerPartsData } from '@/shared/type/user.interface'
import { breakpoints } from '@/utils/break-points'
import { FC } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import styles from '../Dashboard.module.scss'

const New: FC<{ news: IBoilerPartsData[] }> = ({ news }) => {
	return (
		<div className={styles.dashboard__block}>
			<div>
				<h2 className={`subtitle ${styles.dashboard__subtitle}`}>Новинки</h2>

				<Swiper
					spaceBetween={16}
					breakpoints={breakpoints}
					navigation
					pagination={{ clickable: false }}
					scrollbar={{ draggable: true }}
					autoHeight={true}
					className='dashboard__slider'
				>
					{!!news.length ? (
						news.map((item, idx) => (
							<SwiperSlide key={item.id}>
								<ProductItem product={item} />
							</SwiperSlide>
						))
					) : (
						<Skeleton height='250px' width='100%' />
					)}
				</Swiper>
			</div>
		</div>
	)
}
export default New
