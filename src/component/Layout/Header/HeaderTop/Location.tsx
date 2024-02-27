import LocationSvg from '@/component/ui/IconsSvg/header-icons/LocationSvg'
import { FC } from 'react'
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
