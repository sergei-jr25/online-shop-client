import { useActions } from '@/hook/useDispatch'
import { useFilters } from '@/hook/useFilters'
import { useMode } from '@/hook/useMode'
import { MAXPRICE, MINPRICE } from '@/shared/consts/prive-value'
import { useSearchParams } from 'next/navigation'
import { FC, useEffect, useState } from 'react'
import { Range, getTrackBackground } from 'react-range'
import styles from './RangeFilters.module.scss'

interface IRangeFilters {}

const RangeFilters: FC<IRangeFilters> = () => {
	const STEP = 0.1
	const [rangePrice, setRangePrice] = useState<number[]>([MINPRICE, MAXPRICE])
	const { theme } = useMode()

	const { setChangePrice, setTouchFilter, setIsRessitng } = useActions()
	const { isResettingFilter } = useFilters()
	const searchParams = useSearchParams()!
	const handelChangePrice = (values: number[]) => {
		setRangePrice(values)
		setTouchFilter({ flag: true })
		setChangePrice({ flag: true })
		localStorage.setItem('range-price', JSON.stringify(values))
	}

	useEffect(() => {
		const queryPriceFrom = searchParams.get('priceFrom')
		const queryPriceTo = searchParams.get('priceTo')

		if (queryPriceFrom && queryPriceTo) {
			setRangePrice([+queryPriceFrom, +queryPriceTo])
		} else if (queryPriceFrom) {
			setRangePrice([+queryPriceFrom, MAXPRICE])
		} else if (queryPriceTo) {
			setRangePrice([MINPRICE, +queryPriceTo])
		} else {
		}
	}, [])

	useEffect(() => {
		if (isResettingFilter) {
			setRangePrice([MINPRICE, MAXPRICE])
			setIsRessitng({ flag: false })
		}
	}, [isResettingFilter])

	return (
		<>
			<div
				className={`${styles.range} ${
					theme === 'dark' ? styles.range_dark : ''
				}`}
			>
				<label className={styles.range__label}>
					<input
						// type='numnber'
						placeholder={`from ${rangePrice[0]}`}
						className={styles.range__input}
						value={rangePrice[0]}
						onChange={e => {
							const newValue = +e.target.value
							const updatedValue = newValue > MAXPRICE ? MAXPRICE : newValue
							setRangePrice([updatedValue, rangePrice[1]])
							setChangePrice({ flag: true })
						}}
						min={MINPRICE}
						maxLength={5}
						max={MAXPRICE}
					/>
					<span>/</span>
					<input
						value={rangePrice[1]}
						onChange={e => {
							const newValue = +e.target.value
							const updatedValue = newValue > MAXPRICE ? MAXPRICE : newValue
							setRangePrice([rangePrice[0], updatedValue])
							setChangePrice({ flag: true })
						}}
						className={styles.range__input}
						max={MAXPRICE}
						maxLength={5}
					/>
				</label>
			</div>
			<div className={styles.range__wrapper}>
				<Range
					step={STEP}
					min={MINPRICE}
					max={MAXPRICE}
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
									min: MINPRICE,
									max: MAXPRICE
								})
							}}
						>
							{children}
						</div>
					)}
					renderThumb={({ props, index }) => {
						const { key, ...restProps } = props // Удаляем свойство key из props
						const thumbStyle = {
							...props.style,
							height: '20px',
							width: '20px',
							backgroundColor: '#fff',
							border: '3px solid #1C629E',
							borderRadius: '100%'
						}
						// if (index === 0) {
						// 	// Левый ползунок
						// 	thumbStyle.left = '24px'
						// } else {
						// 	// Правый ползунок
						// 	thumbStyle.left = '2px'
						// }
						return (
							<div
								key={key}
								{...restProps} // Используем оставшиеся props
								style={thumbStyle}
							/>
						)
					}}
				/>
			</div>
		</>
	)
}
export default RangeFilters
