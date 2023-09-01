import { IBoilerPartsData } from '@/shared/type/user.interface'
import Link from 'next/link'
import { FC } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import styles from './Slider.module.scss'

interface ISlider {
	items: IBoilerPartsData[]
	title?: string
}

const Slider: FC<ISlider> = ({ items, title }) => {
	return (
		<div className={styles.slider}>
			<h3 className={styles.slider__title}>{title}</h3>
			<Swiper
				// install Swiper modules
				spaceBetween={16}
				slidesPerView={4}
				navigation
			>
				{items.map((item, idx) => (
					<SwiperSlide key={item.id}>
						<div className={styles.slider__item}>
							<Link
								href={`/product/${item.id}`}
								className={styles.slider__image}
							>
								<img src={item.images} alt={item.name} />
							</Link>
							<div className={styles.slider__name}>{item.name}</div>
							<div className={styles.slider__article}>{item.vendorCode}</div>
							<div className={styles.slider__price}>{item.price}Р</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	)
}
export default Slider
