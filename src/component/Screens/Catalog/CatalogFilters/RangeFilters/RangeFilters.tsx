import { useBoilerManufact } from '@/hook/useBoilerMunfuctParts'
import { IRangeFilters } from '@/shared/type/catalog.interface'
import { FC } from 'react'
import { getTrackBackground, Range } from 'react-range'
import styles from './RangeFilters.module.scss'

const RangeFilters: FC<IRangeFilters> = ({
	rangePrice,
	setRangePrice,
	setTouchedChange,
	setIsTouch,

	setChangePrice
}) => {
	const MIN = 100
	const MAX = 10000
	const STEP = 0.1
	const { manufacturerParts } = useBoilerManufact()
	const handelChangePrice = (values: number[]) => {
		setIsTouch(false)
		setChangePrice(true)
		setRangePrice(values)
	}

	return (
		<>
			<div className={styles.range}>
				<label className={styles.range__label}>
					<input
						readOnly
						type='text'
						placeholder='from 1000'
						value={rangePrice[0]}
						className={styles.range__input}
					/>
					<span>/</span>
					<input
						readOnly
						type='text'
						placeholder='to 10000'
						value={rangePrice[1]}
						className={styles.range__input}
					/>
				</label>
			</div>
			<Range
				step={STEP}
				min={MIN}
				max={MAX}
				values={rangePrice}
				onChange={handelChangePrice}
				renderTrack={({ props, children }) => (
					<div
						key='track'
						{...props}
						style={{
							...props.style,
							height: '5px',
							width: '100%',
							padding: '0 15px',
							background: getTrackBackground({
								values: rangePrice,
								colors: ['#B1CEFA', '#247CC8', '#B1CEFA'],
								min: MIN,
								max: MAX
							})
						}}
					>
						{children}
					</div>
				)}
				renderThumb={({ props, index }) => {
					const { key, ...restProps } = props // Удаляем свойство key из props
					return (
						<div
							key={key}
							{...restProps} // Используем оставшиеся props
							style={{
								...props.style,
								height: '20px',
								width: '20px',
								backgroundColor: '#fff',
								border: '3px solid #1C629E',
								borderRadius: '100%'
							}}
						/>
					)
				}}
			/>
		</>
	)
}
export default RangeFilters
