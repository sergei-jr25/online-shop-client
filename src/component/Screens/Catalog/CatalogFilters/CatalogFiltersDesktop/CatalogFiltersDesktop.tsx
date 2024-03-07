'use client'

import Accordion from '@/component/shared/components/Acordion/Accordion'
import { useFilters } from '@/hook/useFilters'
import { FC } from 'react'
import CatalogFilterItem from '../CatalogFilterItem/CatalogFilterItem'
import styles from '../CatalogFilters.module.scss'
import RangeFilters from '../RangeFilters/RangeFilters'
import { ICatalogFilterDesktop } from '../catalog-filter.interface'

const CatalogFiltersDesktop: FC<ICatalogFilterDesktop> = ({
	applyQueryParams,
	boilersChecked,
	partsChecked,
	resetFilters,
	setAllChecked,
	isDisabled,
	setValue,
	value
}) => {
	const { isChangePrice, isTouchFilter } = useFilters()

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
						onClick={() => setAllChecked('boiler')}
					>
						Выбрать все
					</button>
					<ul className={styles.accordion__list}>
						{boilersChecked.map(item => (
							<li className={styles.accordion__item} key={item.id}>
								<CatalogFilterItem item={item} isChangePrice={isChangePrice} />
							</li>
						))}
					</ul>
				</Accordion>
				<Accordion
					title='Производитель запчастей'
					accordionClass={styles.desktop__accordion}
				>
					<button
						className={styles.desktop__all}
						title={styles.desktop__subtitle}
						onClick={() => setAllChecked('parts')}
					>
						Выбрать все
					</button>
					<ul className={styles.accordion__list}>
						{partsChecked.map(item => (
							<li className={styles.accordion__item} key={item.id}>
								<CatalogFilterItem item={item} isChangePrice={isChangePrice} />
							</li>
						))}
					</ul>
				</Accordion>

				<Accordion title='Цена' accordionClass={styles.desktop__accordion}>
					<RangeFilters />
				</Accordion>
			</div>
			<div className={styles.accordion__buttons}>
				<button
					className={`${styles.accordion__button} ${styles.accordion__button_show}`}
					disabled={isDisabled}
					onClick={applyQueryParams}
				>
					Показать
				</button>
				<button
					className={`${styles.accordion__button} ${styles.accordion__button_reset}`}
					disabled={isDisabled}
					onClick={resetFilters}
				>
					Сбросить
				</button>
			</div>
		</div>
	)
}
export default CatalogFiltersDesktop
