import { IBoilerPartsData } from '@/shared/type/user.interface'
import { breakpoints } from '@/utils/break-points'
import { FC } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import ProductItem from '../../shared/components/product-item/ProductItem'
import styles from './Slider.module.scss'

interface ISlider {
	items: IBoilerPartsData[]
	title?: string
}

const Slider: FC<ISlider> = ({ items, title }) => {
	return (
		<div className={styles.slider}>
			<h3 className={styles.slider__title}>{title}</h3>
			<Swiper spaceBetween={16} navigation breakpoints={breakpoints}>
				{items.map((item, idx) => (
					<SwiperSlide key={item.id}>
						<ProductItem product={item} />
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	)
}
export default Slider
