import { errorCath } from '@/api/api.helper'
import { useActions } from '@/hook/useDispatch'
import { useLocation } from '@/hook/useLocation'
import { useMode } from '@/hook/useMode'
import { FC } from 'react'
import LocationSvg from '../../IconsSvg/header-icons/LocationSvg'
import Skeleton from '../../spinner/Spinner'
import styles from './CityButton.module.scss'

const CityButton: FC = () => {
	const { isLoading, pos } = useLocation()
	const { getLocation } = useActions()

	const { theme } = useMode()

	const getCity = () => {
		const options = {
			enableHeightAccuracy: true,
			timeout: 5000,
			maximumAge: 0
		}
		const success = async (pos: GeolocationPosition) => {
			try {
				const { latitude, longitude } = await pos.coords
				getLocation({ latitude, longitude })
			} catch (error) {
				console.log(error)
				errorCath(error)
			}
		}
		const error = (error: GeolocationPositionError) =>
			errorCath(`${error.code}, ${error.message}`)

		navigator.geolocation.getCurrentPosition(success, error, options)
	}

	return (
		<div
			onClick={getCity}
			// className={cn(styles.city, { [styles.city_dark]: theme === 'dark' })}
			className={styles.city}
		>
			<LocationSvg />

			{isLoading ? (
				<Skeleton width='60px' />
			) : (
				<div className={styles.city__text}> {pos.length ? pos : 'Город'}</div>
			)}
		</div>
	)
}

export default CityButton
