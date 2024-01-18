import { useActions } from '@/hook/useDispatch'
import { ICatalogFiltersMobile } from '@/shared/type/catalog.interface'
import { FC, useState } from 'react'
import Accordion from '../Acordion/Accordion'
import CatalogFilterItem from '../CatalogFilterItem'
import accordionStyles from '../CatalogFilters.module.scss'
import RangeFilters from '../RangeFilters/RangeFilters'
import styles from './CatalogFiltersMobile.module.scss'
import CatalogFiltersMobileTop from './CatalogFiltersMobileTop'

const CatalogFiltersMobile: FC<ICatalogFiltersMobile> = ({
	addTouchedAll,
	isShow,
	mobile,
	rangePrice,
	resetFilters,
	setChangePrice,
	setIsShow,
	setIsTouch,
	setRangePrice,
	setTouchedChange,
	boiler,
	manufacturer,
	changePrice,
	isAnyCheckboxChecked,
	applyQueryParams
}) => {
	const [isBoiler, setIsBoiler] = useState(false)
	const [isManufacture, setIsManufacture] = useState(false)
	const {
		updateQueryParams,
		resetFiltersBoiler,
		anyCheckboxChecked,
		resetCheckbox
	} = useActions()

	const resetFiltersAndCheckbox = () => {
		console.log('isAnyCheckboxChecked', isAnyCheckboxChecked)

		resetCheckbox()
		resetFilters()
	}

	const handleResetFiltersBoiler = () => {
		resetCheckbox()

		resetFiltersBoiler()
	}
	const handleResetFiltersManufacture = () => {}

	const handleBoiler = () => {
		setIsBoiler(!isBoiler)
	}
	const handleBManufacture = () => {
		setIsManufacture(!isManufacture)
	}

	const closeFilter = () => {
		setIsShow(!isShow)
	}

	return (
		<div className={styles.mobile}>
			<CatalogFiltersMobileTop
				closeFilter={isBoiler ? handleBoiler : closeFilter}
				title={
					isBoiler
						? 'Производитель котлов'
						: isManufacture
						? 'Производитель запчастей'
						: 'Фильтры'
				}
				titleBtnReset={isBoiler ? 'Сбросить ' : 'Сбросить все'}
				resetFilters={
					isBoiler
						? handleResetFiltersBoiler
						: isManufacture
						? handleResetFiltersManufacture
						: resetFiltersAndCheckbox
				}
				resetBoiler={() => resetFiltersBoiler}
				disabled={
					isBoiler
						? isAnyCheckboxChecked
						: isManufacture
						? true
						: isAnyCheckboxChecked && !changePrice
				}
			/>
			<div className={styles.mobile__body}>
				<Accordion
					title='Производитель котлов'
					isMobileForFilters={mobile}
					isShowContent={handleBoiler}
					arrowOpenClass={styles.arrowOpenClass}
				>
					{isBoiler && (
						<>
							<button className={styles.mobile__all} onClick={addTouchedAll}>
								Выбрать все
							</button>
							<ul className={styles.mobile__list}>
								{boiler.map(item => (
									<li className={styles.mobile__item} key={item.id}>
										<CatalogFilterItem
											key={item.id}
											item={item}
											setIsTouch={setIsTouch}
											changePrice={changePrice}
										/>
									</li>
								))}
							</ul>
						</>
					)}
				</Accordion>
				<Accordion title='Цена'>
					<RangeFilters
						rangePrice={rangePrice}
						setRangePrice={setRangePrice}
						setTouchedChange={setTouchedChange}
						setIsTouch={setIsTouch}
						setChangePrice={setChangePrice}
					/>
				</Accordion>
				<div
					className={`${accordionStyles.accordion__buttons} ${styles.mobile__footer}`}
				>
					<button
						className={`${accordionStyles.accordion__button} ${accordionStyles.accordion__button_show}`}
						// disabled={isTouch}
						onClick={applyQueryParams}
					>
						Показать
					</button>
					{isBoiler && (
						<button
							onClick={handleBoiler}
							className={`${accordionStyles.accordion__button} ${accordionStyles.accordion__button_back}`}
							// disabled={isTouch}
						>
							Назад
						</button>
					)}
				</div>
			</div>
		</div>
	)
}
export default CatalogFiltersMobile
