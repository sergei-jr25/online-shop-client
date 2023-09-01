'use client'

import { useBoilerManufact } from '@/hook/useBoilerMunfuctParts'
import { useActions } from '@/hook/useDispatch'
import useMediaQuery from '@/hook/useMediaQuery'
import { useMode } from '@/hook/useMode'
import { ICatalogFilters } from '@/shared/type/catalog.interface'
import { FC } from 'react'
import styles from './CatalogFilters.module.scss'
import CatalogFiltersDesktop from './CatalogFiltersDesktop'
import CatalogFiltersMobile from './CatalogFltersMobile/CatalogFiltersMobile'

const CatalogFilters: FC<ICatalogFilters> = ({
	isTouch,
	rangePrice,
	setIsTouch,
	setRangePrice,
	changePrice,
	setChangePrice,
	setExistQuery,
	resetFilters,
	applyQueryParams,
	isFetching,
	isShow,
	setIsShow,
	refFilter
}) => {
	const mobile = useMediaQuery('(max-width: 776px)')
	const { manufacturerParts, boilerParts, isAnyCheckboxChecked } =
		useBoilerManufact()

	const newBoilerBarts = boilerParts.map(item => item.checked)
	const { theme } = useMode()

	const setTouchedChange = () => {
		setIsTouch(false)
	}

	const { toggleChecked, chooseAllToggle } = useActions()

	const addTouchedAll = () => {
		chooseAllToggle()
		setTouchedChange()
	}

	return (
		<div className={`${styles.filters} ${theme === 'dark' ? styles.dark : ''}`}>
			{mobile ? (
				<div className={styles.mobile}>
					{isShow && (
						<div className={styles.mobile__menu} ref={refFilter}>
							<CatalogFiltersMobile
								isShow={isShow}
								setIsShow={setIsShow}
								boiler={boilerParts}
								manufacturer={manufacturerParts}
								setIsTouch={setIsTouch}
								mobile={mobile}
								resetFilters={resetFilters}
								addTouchedAll={addTouchedAll}
								isTouch={isTouch}
								rangePrice={rangePrice}
								setChangePrice={setChangePrice}
								setRangePrice={setRangePrice}
								setTouchedChange={setTouchedChange}
								changePrice={changePrice}
								isAnyCheckboxChecked={isAnyCheckboxChecked}
							/>
						</div>
					)}
				</div>
			) : (
				<>
					<CatalogFiltersDesktop
						rangePrice={rangePrice}
						setRangePrice={setRangePrice}
						isTouch={isTouch}
						setTouchedChange={setTouchedChange}
						setIsTouch={setIsTouch}
						changePrice={changePrice}
						setChangePrice={setChangePrice}
						boiler={boilerParts}
						manufacture={manufacturerParts}
						addTouchedAll={addTouchedAll}
						applyQueryParams={applyQueryParams}
						resetFilters={resetFilters}
					/>
				</>
			)}
		</div>
	)
}
export default CatalogFilters
