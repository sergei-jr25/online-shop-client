'use client'
import { useBoilerManufact } from '@/hook/useBoilerMunfuctParts'
import { useActions } from '@/hook/useDispatch'
import { useFilters } from '@/hook/useFilters'
import useMediaQuery from '@/hook/useMediaQuery'
import { useMode } from '@/hook/useMode'
import { useOutside } from '@/hook/useOutside'
import { apiBoilerParts } from '@/service/api/boiderl-parts'

import Button from '@/component/ui/button/Button'
import Loader from '@/component/ui/spinner/Loader'
import { MAXPRICE, MINPRICE } from '@/shared/consts/prive-value'
import { IBoilerPartsData } from '@/shared/type/user.interface'
import { FC, useEffect } from 'react'
import SortSelect from '../../shared/components/SortSelect/SortSelect'
import CatalogFilterSvg from '../../ui/IconsSvg/catalog-icons/CatalogFilterSvg'
import styles from './Catalog.module.scss'
import CatalogFilters from './CatalogFilters/CatalogFilters'
import CatalogHeader from './CatalogHeader/CatalogHeader'
import CatalogPage from './CatalogPage/CatalogPage'
import { useCatalogPage } from './CatalogPage/useCatalogPage'

const Catalog: FC<{ initialData: IBoilerPartsData[] }> = ({ initialData }) => {
	const {
		isFilterUpdate,
		queryParams,
		rangePrice,
		isChangePrice,
		isTouchFilter
	} = useFilters()
	const {
		data = [],
		isFetching,
		refetch
	} = apiBoilerParts.usePaginateAndFilterQuery(queryParams)
	const {
		resetFiltersBoilerParts,
		setChangePrice,
		setTouchFilter,
		setRangePrice,
		setIsRessitng
	} = useActions()

	const boilerData = (data[0] as IBoilerPartsData[]) || initialData
	const boilerCount = (data[1] as number) || 0

	const { boilerManufacturer, partsManufacturer } = useBoilerManufact()
	const allProducts = [...boilerManufacturer, ...partsManufacturer]
	const isCheckedItem = allProducts.some(item => item.checked)

	const isDisabled = !isTouchFilter && !isCheckedItem && !isChangePrice

	const mobile = useMediaQuery('(max-width: 767px')
	const { uploadNewParams, resetQueryParams } = useCatalogPage()
	const { isShow, ref, ref: refFilter, setIsShow } = useOutside(false)
	const { theme } = useMode()

	useEffect(() => {
		if (isShow) {
			document.body.classList.add('open-filter')
		} else {
			document.body.classList.remove('open-filter')
		}
	}, [isShow])

	const resetFilters = () => {
		resetFiltersBoilerParts()
		setChangePrice({ flag: false })
		setTouchFilter({ flag: false })
		setIsRessitng({ flag: true })
		resetQueryParams()
	}

	const applyQueryParams = () => {
		const rangePriceJson = localStorage.getItem('range-price')
		const rangePriceArray = rangePriceJson ? JSON.parse(rangePriceJson) : null

		const queryPriceFrom = Math.ceil(
			(rangePriceArray && rangePriceArray[0]) ?? MINPRICE
		)
		const queryPriceTo = Math.ceil(
			(rangePriceArray && rangePriceArray[1]) ?? MAXPRICE
		)

		// const encoded = encodeURIComponent()

		const boiler = boilerManufacturer
			.filter(item => item.checked)
			.map(item => item.title)

		const manufacturer = partsManufacturer
			.filter(item => item.checked)
			.map(item => item.title)

		const queryBoiler = JSON.stringify(boiler)
		const queryManufacturer = JSON.stringify(manufacturer)

		if (boiler.length && manufacturer.length && isChangePrice) {
			uploadNewParams('priceFrom', queryPriceFrom)
			uploadNewParams('priceTo', queryPriceTo)
			uploadNewParams('boilerManufacturer', queryBoiler)
			uploadNewParams('partsManufacturer', queryManufacturer)
			uploadNewParams('partsManufacturer', queryManufacturer)
		}

		if (boiler.length && isChangePrice) {
			uploadNewParams('priceFrom', queryPriceFrom)
			uploadNewParams('priceTo', queryPriceTo)
			uploadNewParams('boilerManufacturer', queryBoiler)

			return
		}
		if (manufacturer.length && isChangePrice) {
			uploadNewParams('partsManufacturer', queryManufacturer)
			uploadNewParams('partsManufacturer', queryManufacturer)
			uploadNewParams('priceFrom', Number(queryPriceFrom))
			uploadNewParams('priceTo', Number(queryPriceTo))
			return
		}

		if (boiler.length) {
			uploadNewParams('boilerManufacturer', queryBoiler)
		}
		if (manufacturer.length) {
			uploadNewParams('partsManufacturer', queryManufacturer)

			console.log('partsManufacturer', queryManufacturer)

			uploadNewParams('partsManufacturer', queryManufacturer)
		}
		if (queryPriceFrom && queryPriceTo && isChangePrice) {
			uploadNewParams('priceFrom', Number(queryPriceFrom))
			uploadNewParams('priceTo', Number(queryPriceTo))
		}

		if (queryPriceTo && isChangePrice) {
			console.log('queryPriceFrom && queryPriceTo')
			uploadNewParams('priceFrom', Number(queryPriceFrom))
			uploadNewParams('priceTo', Number(queryPriceTo))
		}
	}

	return (
		<div
			className={`${styles.catalog} ${
				theme === 'dark' ? styles.catalog_dark : ''
			}`}
		>
			<div className={`container ${styles.catalog__container}`}>
				<h1 className={styles.catalog__title}>Каталог товаров</h1>

				<div className={styles.catalog__header}>
					{!mobile && (
						<>
							<CatalogHeader
								title='Производитель котлов:'
								items={boilerManufacturer}
							/>
							<CatalogHeader
								title='Производитель запчастей:'
								items={partsManufacturer}
							/>
						</>
					)}

					<div className={`${styles.catalog__actions} ${styles.actions}`}>
						{!mobile ? (
							<Button
								onClick={resetFilters}
								className={styles.catalog__button}
								disabled={isDisabled}
							>
								Сбросить фильтры
							</Button>
						) : (
							<button
								className={styles.catalog__filter}
								onClick={() => setIsShow(!isShow)}
								ref={ref}
							>
								<CatalogFilterSvg />
								Фильтры
							</button>
						)}

						<div className={styles.catalog__select}>
							<SortSelect
								products={boilerData}
								uploadNewParams={uploadNewParams}
							/>
						</div>
					</div>
				</div>
				{isFetching ? (
					<Loader style={{ width: '100%', height: '300px' }} theme={theme} />
				) : (
					<div className={styles.catalog__wrapper}>
						<CatalogFilters
							applyQueryParams={applyQueryParams}
							isShow={isShow}
							refFilter={refFilter}
							setIsShow={setIsShow}
							resetFilters={resetFilters}
							isDisabled={isDisabled}
							isCheckedItem={isCheckedItem}
						/>
						<CatalogPage
							boilerCount={boilerCount}
							boilerData={boilerData}
							queryParams={queryParams}
							isFetching={isFetching}
						/>
					</div>
				)}
			</div>
		</div>
	)
}
export default Catalog
