import { breakpoints } from '@/utils/break-points'
import { brands } from '@/utils/imagesPaths/bransImage'
import Image from 'next/image'
import { FC, useEffect, useState } from 'react'
import { Navigation } from 'swiper'
import 'swiper/css'
import { Swiper, SwiperSlide } from 'swiper/react'
import ArrowNext from '../../../ui/Slider/Arrows/ArrowNext'
import ArrowPrev from '../../../ui/Slider/Arrows/ArrowPrev'
import styles from './Brands.module.scss'
const Brands: FC = () => {
	const [isNavigation, setIsNavigation] = useState(true)

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth <= 767) {
				setIsNavigation(false)
			} else {
				setIsNavigation(true)
			}
		}

		window.addEventListener('load', handleResize)
		window.addEventListener('resize', handleResize)

		return () => {
			window.removeEventListener('load', handleResize)
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	return (
		<div className={`${styles.brands}`}>
			<Swiper
				modules={[Navigation]}
				spaceBetween={16}
				scrollbar={{ draggable: true }}
				breakpoints={breakpoints}
			>
				{brands.map((item, idx) => (
					<SwiperSlide className={styles.brands__slide} key={idx}>
						<div className={styles.brands__image}>
							<Image src={item} fill alt='' loading='lazy' />
						</div>
					</SwiperSlide>
				))}
				{isNavigation && (
					<div className={styles.arrows}>
						<ArrowPrev />
						<ArrowNext />
					</div>
				)}
			</Swiper>
		</div>
	)
}
export default Brands
