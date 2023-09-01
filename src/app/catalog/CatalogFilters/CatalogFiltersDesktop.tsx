'use client'

import useMediaQuery from '@/hook/useMediaQuery'
import { ICatalogDesktop } from '@/shared/type/catalog.interface'
import { FC } from 'react'
import Accordion from './Acordion/Accordion'
import CatalogFilterItem from './CatalogFilterItem'
import styles from './CatalogFilters.module.scss'
import RangeFilters from './RangeFilters/RangeFilters'

const CatalogFiltersDesktop: FC<ICatalogDesktop> = ({
	isTouch,
	rangePrice,
	boiler,
	manufacture,
	setRangePrice,
	setTouchedChange,
	setIsTouch,
	changePrice,
	setChangePrice,
	addTouchedAll,
	applyQueryParams,
	resetFilters
}) => {
	const isMobile = useMediaQuery('max-width: 767px')

	return (
		<div className={styles.desktop}>
			<h2 className={styles.desktop__title}>Фильтры</h2>
			<div className={styles.desktop__accordions}>
				<Accordion
					title='Производитель котлов'
					accordionClass={styles.desktop__accordion}
				>
					<button
						className={styles.desktop__all}
						title={styles.desktop__subtitle}
						onClick={addTouchedAll}
					>
						Выбрать все
					</button>
					<ul className={styles.accordion__list}>
						{boiler.map(item => (
							<li className={styles.accordion__item} key={item.id}>
								<CatalogFilterItem
									item={item}
									setIsTouch={setIsTouch}
									items={boiler}
									changePrice={changePrice}
								/>
							</li>
						))}
					</ul>
				</Accordion>

				<Accordion title='Цена' accordionClass={styles.desktop__accordion}>
					<RangeFilters
						rangePrice={rangePrice}
						setRangePrice={setRangePrice}
						setTouchedChange={setTouchedChange}
						setIsTouch={setIsTouch}
						setChangePrice={setChangePrice}
					/>
				</Accordion>
			</div>
			<div className={styles.accordion__buttons}>
				<button
					className={`${styles.accordion__button} ${styles.accordion__button_show}`}
					disabled={isTouch}
					onClick={applyQueryParams}
				>
					Показать
				</button>
				<button
					className={`${styles.accordion__button} ${styles.accordion__button_reset}`}
					disabled={isTouch}
					onClick={resetFilters}
				>
					Сбросить
				</button>
			</div>
		</div>
	)
}
export default CatalogFiltersDesktop
