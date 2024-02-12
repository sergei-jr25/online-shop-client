import { FC } from 'react'
import { useSwiper } from 'swiper/react'
import styles from './Arrow.module.scss'
import ArrowsIcon from './ArrowsIcon'

const ArrowPrev: FC = () => {
	const swiper = useSwiper()
	return (
		<div className={styles.arrow}>
			<button
				className={`${styles.arrow__button} ${styles.arrow__prev}`}
				onClick={() => swiper.slidePrev()}
			>
				<ArrowsIcon />
			</button>
		</div>
	)
}
export default ArrowPrev
