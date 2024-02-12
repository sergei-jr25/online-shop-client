import { FC } from 'react'
import LocationSvg from '../../Layout/header-icon/LocationSvg'
import styles from './HeaderTop.module.scss'

const Location: FC = () => {
	return (
		<li className={styles.location}>
			<a>
				<LocationSvg />
				<span>Москва</span>
			</a>
		</li>
	)
}
export default Location
