'use client'
import BreadcrumbsNew from '@/component/ui/breadbrambs/NewBreadcrumbs'
import { useBoilerManufact } from '@/hook/useBoilerMunfuctParts'
import { useActions } from '@/hook/useDispatch'
import { useFilters } from '@/hook/useFilters'
import useMediaQuery from '@/hook/useMediaQuery'
import { useMode } from '@/hook/useMode'
import { useOutside } from '@/hook/useOutside'
import { apiBoilerParts } from '@/service/api/boiderl-parts'
import { IBoilerPartsData } from '@/shared/type/user.interface'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { FC, useEffect, useState } from 'react'
import CatalogFilterSvg from './Catalog-icons/CatalogFilterSvg'
import styles from './Catalog.module.scss'
import CatalogFilters from './CatalogFilters/CatalogFilters'
import CatalogPage from './CatalogPage/CatalogPage'
import ManufacturesBlock from './CatalogPage/ManufacturesBlock'
import { useCatalogPage } from './CatalogPage/useCatalogPage'
import SortSelect from './SortSelect/SortSelect'

const Catalog: FC = () => {
	const [rangePrice, setRangePrice] = useState<number[]>([100, 10000])
	const [isTouch, setIsTouch] = useState(true)
	const [changePrice, setChangePrice] = useState(false)
	const [existQuery, setExistQuery] = useState(false)
	const { isFilterUpdate, queryParams } = useFilters()
	const {
		data: products = [],
		isLoading,
		isFetching
	} = apiBoilerParts.usePaginateAndFilterQuery(queryParams)

	const boilerData = (products[0] as IBoilerPartsData[]) || []
	const boilerCount = (products[1] as number) || 0

	const { boilerManufacturer, manufacturerParts } = useBoilerManufact()
	const isAnyCheckboxChecked = !boilerManufacturer.some(item => item.checked)

	const { updateQueryParams, resetFiltersBoiler } = useActions()
	const { setBoilerQueryParams, setManufactureQueryParams } = useActions()
	const path = usePathname()
	const { replace, push, prefetch } = useRouter()
	const searchParams = useSearchParams()
	const mobile = useMediaQuery('(max-width: 767px')
	const table = useMediaQuery('(min-width: 992px')
	const { uploadNewParams } = useCatalogPage(existQuery)
	const { isShow, ref, ref: refFilter, setIsShow } = useOutside(false)
	const { theme } = useMode()

	console.log('catalog')

	useEffect(() => {
		if (isShow) {
			document.body.classList.add('open-filter')
		} else {
			document.body.classList.remove('open-filter')
		}
	}, [isShow])

	const resetFilters = () => {
		const params = new URLSearchParams(searchParams.toString())

		resetFiltersBoiler()
		setRangePrice([100, 10000])
		setIsTouch(true)
		setChangePrice(false)

		searchParams.forEach((value, key) => {
			if (key) {
				params.delete(key)
			}
		})
		push(path + '?' + params.toString())
		setExistQuery(true)
		updateQueryParams({ key: 'offset', value: '0' })
	}

	const applyQueryParams = () => {
		// const encoded = encodeURIComponent()
		const queryPriceFrom = Math.ceil(rangePrice[0])
		const queryPriceTo = Math.ceil(rangePrice[1])
		const boiler = boilerManufacturer
			.filter(item => item.checked)
			.map(item => item.title)

		const manufacturer = manufacturerParts
			.filter(item => item.checked)
			.map(item => item.title)

		const queryBoiler = JSON.stringify(boiler)
		const queryManufacturer = encodeURIComponent(JSON.stringify(manufacturer))

		if (boiler.length && manufacturer.length && changePrice) {
			uploadNewParams('priceFrom', queryPriceFrom)
			uploadNewParams('priceTo', queryPriceTo)
			uploadNewParams('boilerManufacturer', queryBoiler)
			uploadNewParams('manufacturerParts', queryManufacturer)
		}

		if (boiler.length && changePrice) {
			uploadNewParams('priceFrom', queryPriceFrom)
			uploadNewParams('priceTo', queryPriceTo)
			uploadNewParams('boilerManufacturer', queryBoiler)

			return
		}
		if (manufacturer.length && changePrice) {
			uploadNewParams('manufacturerParts', queryManufacturer)
			uploadNewParams('priceFrom', Number(queryPriceFrom))
			uploadNewParams('priceTo', Number(queryPriceTo))
			return
		}

		if (boiler.length) {
			// replace(pathName + `?boiler=${queryBoiler}`)
			// uploadNewParams('offset', currentPage)
			uploadNewParams('boilerManufacturer', queryBoiler)
			console.log(queryBoiler)
		}
		if (manufacturer.length) {
			uploadNewParams('manufacturerParts', queryManufacturer)
			console.log(manufacturer)
		}
		if (queryPriceFrom && queryPriceTo && changePrice) {
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

				<BreadcrumbsNew />
				<div className={styles.catalog__header}>
					{!mobile && (
						<>
							<ManufacturesBlock
								title='Производитель котлов:'
								items={boilerManufacturer}
								setIsTouch={setIsTouch}
								setRangePrice={setRangePrice}
							/>
							<ManufacturesBlock
								title='Производитель запчастей:'
								items={manufacturerParts}
								setIsTouch={setIsTouch}
								setRangePrice={setRangePrice}
							/>
						</>
					)}

					<div className={`${styles.catalog__actions} ${styles.actions}`}>
						{!mobile ? (
							<button
								onClick={resetFilters}
								className={styles.catalog__button}
								disabled={isTouch && isAnyCheckboxChecked}
							>
								Сбросить фильтры
							</button>
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
				<div className={styles.catalog__wrapper}>
					<CatalogFilters
						isTouch={isTouch}
						rangePrice={rangePrice}
						setIsTouch={setIsTouch}
						setRangePrice={setRangePrice}
						changePrice={changePrice}
						setChangePrice={setChangePrice}
						existQuery={existQuery}
						setExistQuery={setExistQuery}
						resetFilters={resetFilters}
						applyQueryParams={applyQueryParams}
						isFetching={isFetching}
						isShow={isShow}
						refFilter={refFilter}
						setIsShow={setIsShow}
					/>
					<CatalogPage
						boilerCount={boilerCount}
						boilerData={boilerData}
						existQuery={existQuery}
						queryParams={queryParams}
						rangePrice={rangePrice}
						setIsTouch={setIsTouch}
						setBoilerQueryParams={setBoilerQueryParams}
						setManufactureQueryParams={setManufactureQueryParams}
						changePrice={changePrice}
						setRangePrice={setRangePrice}
						isFetching={isFetching}
					/>
				</div>
			</div>
		</div>
	)
}
export default Catalog
