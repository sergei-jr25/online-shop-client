import { FC } from 'react'
import { useSwiper } from 'swiper/react'
import styles from './Arrow.module.scss'
import ArrowsIcon from './ArrowsIcon'

const ArrowNext: FC = l => {
	const swiper = useSwiper()

	return (
		<div className={styles.arrow}>
			<button
				className={`${styles.arrow__button} ${styles.arrow__next}`}
				onClick={() => swiper.slideNext()}
			>
				<ArrowsIcon />
			</button>
		</div>
	)
}
export default ArrowNext
