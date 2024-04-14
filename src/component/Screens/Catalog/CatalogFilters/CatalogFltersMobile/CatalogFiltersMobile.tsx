import { useBoilerManufact } from '@/hook/useBoilerMunfuctParts'
import { useActions } from '@/hook/useDispatch'
import { useFilters } from '@/hook/useFilters'
import { FC, useState } from 'react'
import Accordion from '../../../../shared/components/Acordion/Accordion'
import CatalogFilterItem from '../CatalogFilterItem/CatalogFilterItem'
import accordionStyles from '../CatalogFilters.module.scss'
import RangeFilters from '../RangeFilters/RangeFilters'
import { ICatalogFilterMobile } from '../catalog-filter.interface'
import styles from './CatalogFiltersMobile.module.scss'
import CatalogFiltersMobileTop from './CatalogFiltersMobileTop'

const CatalogFiltersMobile: FC<ICatalogFilterMobile> = ({
	applyQueryParams,
	boilersChecked,
	isShow,
	mobile,
	resetFilters,
	isAnyCheckboxChecked,
	setIsShow,
	setAllChecked,
	isDisabled,
	isCheckedItem,
	partsChecked
}) => {
	const [isOpenBoiler, setIsOpenBoiler] = useState(false)
	const [isOpenParts, setIiOpenParts] = useState(false)
	const {
		anyCheckboxChecked,
		resetCheckbox,
		removeBoiler,
		removeParts,
		resetFiltersBoilerParts
	} = useActions()
	const { isChangePrice, isTouchFilter } = useFilters()
	const { boilerManufacturer, manufacturerParts } = useBoilerManufact()

	const isDisabledBoiler = boilerManufacturer.some(item => item.checked)
	const isDisabledParts = manufacturerParts.some(item => item.checked)
	const isDidabledButtonBoiler = isOpenBoiler && isDisabledBoiler
	const isDidabledButtonParts = isOpenParts && isDisabledParts

	const resetFiltersAndCheckbox = () => {
		resetCheckbox()
		resetFilters()
	}

	const handleResetBoiler = () => {
		// resetCheckbox()
		removeBoiler()
	}
	const handleResetParts = () => {
		removeParts()
	}

	const handleToggleBoiler = () => {
		setIsOpenBoiler(!isOpenBoiler)
	}
	const handleToggleParts = () => {
		setIiOpenParts(!isOpenParts)
	}
	const handleAllResetChecked = () => {
		resetFiltersBoilerParts()
	}

	const closeFilter = () => {
		setIsShow(!isShow)
	}

	return (
		<div className={styles.mobile}>
			<CatalogFiltersMobileTop
				closeFilter={
					isOpenBoiler
						? handleToggleBoiler
						: isOpenParts
						? handleToggleParts
						: closeFilter
				}
				title={
					isOpenBoiler
						? 'Производитель котлов'
						: isOpenParts
						? 'Производитель запчастей'
						: 'Фильтры'
				}
				titleBtnReset={
					isOpenBoiler || isOpenParts ? 'Сбросить ' : 'Сбросить все'
				}
				resetFilters={
					isOpenBoiler
						? handleResetBoiler
						: isOpenParts
						? handleResetParts
						: resetFiltersAndCheckbox
				}
				disabled={
					isOpenBoiler
						? !isDisabledBoiler
						: isOpenParts
						? !isDisabledParts
						: isDisabled
				}
			/>
			<div className={styles.mobile__body}>
				<Accordion
					title='Производитель котлов'
					isMobileForFilters={mobile}
					isShowContent={handleToggleBoiler}
					arrowOpenClass={styles.arrowOpenClass}
				>
					{isOpenBoiler && (
						<>
							<button
								className={styles.mobile__all}
								onClick={() => setAllChecked('boiler')}
							>
								Выбрать все
							</button>
							<ul className={styles.mobile__list}>
								{boilersChecked.map(item => (
									<li className={styles.mobile__item} key={item.id}>
										<CatalogFilterItem
											key={item.id}
											item={item}
											isChangePrice={isChangePrice}
										/>
									</li>
								))}
							</ul>
						</>
					)}
				</Accordion>
				<Accordion
					title='Производитель запчатсей'
					isMobileForFilters={mobile}
					isShowContent={handleToggleParts}
					arrowOpenClass={styles.arrowOpenClass}
				>
					{isOpenParts && (
						<>
							<button
								className={styles.mobile__all}
								onClick={() => setAllChecked('parts')}
							>
								Выбрать все
							</button>
							<ul className={styles.mobile__list}>
								{partsChecked.map(item => (
									<li className={styles.mobile__item} key={item.id}>
										<CatalogFilterItem
											key={item.id}
											item={item}
											isChangePrice={isChangePrice}
										/>
									</li>
								))}
							</ul>
						</>
					)}
				</Accordion>
				<Accordion title='Цена'>
					<RangeFilters />
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
					{isOpenBoiler && (
						<button
							onClick={handleToggleBoiler}
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
