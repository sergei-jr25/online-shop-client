'use client'

import { useBoilerManufact } from '@/hook/useBoilerMunfuctParts'
import { useActions } from '@/hook/useDispatch'
import { useFilters } from '@/hook/useFilters'
import useMediaQuery from '@/hook/useMediaQuery'
import { useMode } from '@/hook/useMode'
import { FC } from 'react'
import styles from './CatalogFilters.module.scss'
import CatalogFiltersDesktop from './CatalogFiltersDesktop/CatalogFiltersDesktop'
import CatalogFiltersMobile from './CatalogFltersMobile/CatalogFiltersMobile'
import { ICatalogFilter } from './catalog-filter.interface'

const CatalogFilters: FC<ICatalogFilter> = ({
	resetFilters,
	applyQueryParams,
	isDisabled,
	isShow,
	setIsShow,
	refFilter,
	setValue,
	value,
	isCheckedItem
}) => {
	const mobile = useMediaQuery('(max-width: 776px)')
	const { partsManufacturer, boilerManufacturer, isAnyCheckboxChecked } =
		useBoilerManufact()
	const { isChangePrice, isTouchFilter } = useFilters()

	const { theme } = useMode()

	const { setAllChecked } = useActions()

	const handleAllChecked = (type: 'boiler' | 'parts') => {
		setAllChecked({ type })
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
								mobile={mobile}
								boilersChecked={boilerManufacturer}
								partsChecked={partsManufacturer}
								setAllChecked={handleAllChecked}
								applyQueryParams={applyQueryParams}
								resetFilters={resetFilters}
								isChangePrice={isChangePrice}
								isAnyCheckboxChecked={isAnyCheckboxChecked}
								isDisabled={isDisabled}
								setValue={setValue}
								value={value}
								isCheckedItem={isCheckedItem}
							/>
						</div>
					)}
				</div>
			) : (
				<CatalogFiltersDesktop
					boilersChecked={boilerManufacturer}
					partsChecked={partsManufacturer}
					setAllChecked={handleAllChecked}
					applyQueryParams={applyQueryParams}
					resetFilters={resetFilters}
					isChangePrice={isChangePrice}
					isDisabled={isDisabled}
					setValue={setValue}
					value={value}
					isCheckedItem={isCheckedItem}
				/>
			)}
		</div>
	)
}
export default CatalogFilters
