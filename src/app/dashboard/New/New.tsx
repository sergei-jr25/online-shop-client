import CatalogItem from '@/app/catalog/CatalogPage/CatalogItem'
import Skeleton from '@/component/ui/spinner/Spinner'
import { apiBoilerParts } from '@/service/api/boiderl-parts'
import { breakpoints } from '@/utils/break-points'
import { FC, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import styles from '../Dashboard.module.scss'

const New: FC = () => {
	const { data: newData = [], isFetching } = apiBoilerParts.useGetNewQuery()

	useEffect(() => {
		const dashboardSliders = document.querySelectorAll('.dashboard__slider')
		dashboardSliders.forEach(dashboardSlider => {
			const slides = dashboardSlider.querySelectorAll('.swiper-slide')

			let maxHeight = 0
			console.log('maxHeight', maxHeight)

			slides.forEach(slide => {
				const height = (slide as HTMLElement).offsetHeight
				maxHeight = Math.max(maxHeight, height)
			})

			slides.forEach(slide => {
				;(slide as HTMLElement).style.height = `${maxHeight}px`
			})
		})
	}, [newData])

	return (
		<div className={styles.dashboard__block}>
			<div>
				<h2 className={`subtitle ${styles.dashboard__subtitle}`}>Новинки</h2>
				{isFetching ? (
					<div className={styles.dashboard__items}>
						{[...Array(4)].map((item, idx) => (
							<Skeleton height='388px' width='346px' key={idx} />
						))}
					</div>
				) : (
					<Swiper
						spaceBetween={16}
						breakpoints={breakpoints}
						navigation
						pagination={{ clickable: false }}
						scrollbar={{ draggable: true }}
						className='dashboard__slider'
					>
						{newData.map((item, idx) => (
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
export default New
