import { IBoilerPartsData } from '@/shared/type/user.interface'
import Image from 'next/image'
import { FC } from 'react'
import 'swiper/css'
import { Swiper, SwiperSlide } from 'swiper/react'

interface IProductMobileSlide {
	items: string[]
	src: string

	item: IBoilerPartsData
}
const ProductMobileSlide: FC<IProductMobileSlide> = ({ items, src, item }) => {
	return (
		<Swiper spaceBetween={12} slidesPerView={1.1} style={{ maxWidth: '100%' }}>
			{items.map(item => (
				<SwiperSlide>
					<div key={item}>
						<Image src={src} width={600} height={400} alt='' loading='lazy' />
					</div>
				</SwiperSlide>
			))}
		</Swiper>
	)
}
export default ProductMobileSlide
