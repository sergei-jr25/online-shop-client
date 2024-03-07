import { useActions } from '@/hook/useDispatch'
import { useFilters } from '@/hook/useFilters'
import { MAXPRICE, MINPRICE } from '@/shared/consts/prive-value'
import { FC, useEffect, useState } from 'react'
import ReactSlider from 'react-slider'
import './react-slide.scss'

interface IRangeFilters {}

const ReactSliderComponent: FC<IRangeFilters> = () => {
	const STEP = 0.1
	const [rangePrice, setRangePrice] = useState<number[]>([MINPRICE, MAXPRICE])

	const { setChangePrice, setTouchFilter, setIsRessitng } = useActions()
	const { isResettingFilter } = useFilters()

	const handelChangePrice = (values: number[]) => {
		setRangePrice(values)
		setTouchFilter({ flag: true })
		setChangePrice({ flag: true })
		localStorage.setItem('range-price', JSON.stringify(values))
	}

	useEffect(() => {
		if (isResettingFilter) {
			setRangePrice([MINPRICE, MAXPRICE])
			setIsRessitng({ flag: false })
		}
	}, [isResettingFilter])

	return (
		<div>
			<ReactSlider
				className='horizontal-slider'
				thumbClassName='example-thumb'
				trackClassName='example-track'
				defaultValue={[0, 100]}
				ariaLabel={['Lower thumb', 'Upper thumb']}
				ariaValuetext={state => `Thumb value ${state.valueNow}`}
				renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
				pearling
				minDistance={10}
			/>
		</div>
	)
}
export default ReactSliderComponent
