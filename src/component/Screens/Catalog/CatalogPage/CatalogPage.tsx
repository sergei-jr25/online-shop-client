'use client'

import { FC, useEffect, useState } from 'react'

import {
	default as Skeleton,
	default as Spinner
} from '@/component/ui/spinner/Spinner'
import { useMode } from '@/hook/useMode'
import { IBoilerPartsData } from '@/shared/type/user.interface'

import ProductItem from '@/component/shared/components/product-item/ProductItem'
import { useActions } from '@/hook/useDispatch'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import styles from './CatalogPage.module.scss'
import './CatalogPage.scss'
import { ICatalogPage } from './catalog-page.interface'
import { useCatalogPage } from './useCatalogPage'

const CatalogPage: FC<ICatalogPage> = ({
	boilerCount,
	boilerData,
	queryParams,
	isFetching
}) => {
	const { push } = useRouter()
	const pathName = usePathname()
	const searchParams = useSearchParams()!
	const { theme } = useMode()

	const isValidOffset =
		queryParams.offset && !isNaN(+queryParams.offset) && +queryParams.offset > 0

	const [currentPage, setCurrentPage] = useState(
		isValidOffset ? +queryParams.offset - 1 : 0
	)
	const pageCount = Math.ceil(boilerCount / 20)

	const {
		setBoilerQueryParams,
		setPartsQueryParams,
		setTouchFilter,
		setRangePrice
	} = useActions()
	const { uploadNewParams, setInitOffset, checkQueryParams } = useCatalogPage()

	useEffect(() => {
		checkQueryParams()
	}, [])
	useEffect(() => {
		setQueryParams()
	}, [])

	const setQueryParams = () => {
		const boilerQueryStr = searchParams.get('boilerManufacturer')
		const boilerQuery = boilerQueryStr
			? JSON.parse(decodeURIComponent(boilerQueryStr))
			: null

		const manufacturerQueryStr = searchParams.get('manufacturerParts')
		const manufacturerQuery = manufacturerQueryStr
			? JSON.parse(decodeURIComponent(manufacturerQueryStr))
			: null

		const queryPriceFrom = searchParams.get('priceFrom')
		const queryPriceTo = searchParams.get('priceTo')

		if (
			boilerQuery?.length &&
			manufacturerQuery?.length &&
			queryPriceFrom &&
			queryPriceTo
		) {
			setBoilerQueryParams({ items: boilerQuery })
			setPartsQueryParams({ items: manufacturerQuery })
			setRangePrice({ values: [+queryPriceFrom, +queryPriceTo] })
			setTouchFilter({ flag: false })

			return
		}
		if (boilerQuery?.length && manufacturerQuery?.length) {
			setBoilerQueryParams({ items: boilerQuery })
			setPartsQueryParams({ items: manufacturerQuery })
			setTouchFilter({ flag: false })

			return
		}
		if (boilerQuery?.length) {
			setBoilerQueryParams({ items: boilerQuery })
			setTouchFilter({ flag: false })

			return
		}
		if (manufacturerQuery?.length) {
			setPartsQueryParams({ items: manufacturerQuery })
			setTouchFilter({ flag: false })

			return
		}

		if (boilerQuery?.length && queryPriceFrom && queryPriceTo) {
			setBoilerQueryParams({ items: boilerQuery })
			setRangePrice({ values: [+queryPriceFrom, +queryPriceTo] })
			setTouchFilter({ flag: false })
			return
		}
		if (manufacturerQuery?.length && queryPriceFrom && queryPriceTo) {
			setPartsQueryParams({ items: manufacturerQuery })
			setRangePrice({ values: [+queryPriceFrom, +queryPriceTo] })
			setTouchFilter({ flag: false })
			return
		}

		if (queryPriceFrom && queryPriceTo) {
			setTouchFilter({ flag: false })
			setRangePrice({ values: [+queryPriceFrom, +queryPriceTo] })
		}
	}

	const changePageCount = (idx: number) => {
		uploadNewParams('offset', idx)
	}

	return (
		<div
			className={`${styles.cataloPage}  ${theme === 'dark' ? styles.dark : ''}`}
		>
			<div>
				<div className={styles.cataloPage__items}>
					{!!!boilerData
						? [...Array(10)].map((_, idx) => (
								<Spinner key={idx} height='411px' width='400px' />
						  ))
						: boilerData.map((product: IBoilerPartsData) => (
								<ProductItem key={product.id} product={product} />
						  ))}
				</div>
				<div className={styles.paginate}>
					{isFetching ? (
						<Skeleton />
					) : (
						<div className={styles.pagination}>
							{Array.from({ length: pageCount }).map((el, idx) => (
								<button
									key={idx}
									className={`${styles.pagination__item} ${
										+queryParams.offset === idx
											? styles.pagination__item_active
											: ''
									}`}
									onClick={() => changePageCount(idx)}
								>
									{idx + 1}
								</button>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
export default CatalogPage
