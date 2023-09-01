'use client'
import { useActions } from '@/hook/useDispatch'
import { IOptionProps } from '@/shared/type/common'
import { IBoilerPartsData } from '@/shared/type/user.interface'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { FC, useCallback, useEffect, useState } from 'react'
import Select from 'react-select'
import './SortSelect.scss'

const SortSelect: FC<{
	products: IBoilerPartsData[]
	uploadNewParams: (key: any, value: string) => void
}> = ({ products, uploadNewParams }) => {
	const { toCheapSort, toGreatSort, toPopularSort } = useActions()
	const options = [
		{ value: 'Сначала дешевые', label: 'Сначала дешевые' },
		{ value: 'Сначала дорогие', label: 'Сначала дорогие' },
		{ value: 'По популярности', label: 'По популярности' }
	]
	const [categoryOption, setCategoryOption] = useState<any>(null)
	const router = useRouter()
	const search = useSearchParams()!
	const pathName = usePathname()

	const createQueryString = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(search.toString())
			params.set(name, value)

			return params.toString()
		},
		[search]
	)

	const updateRouteParam = (first: string) => {
		const decodedSearch = encodeURI(first)
		router.push(`${pathName}?${createQueryString('first', first)} `)
	}

	useEffect(() => {
		if (products.length) {
			switch (search.get('first')) {
				case 'cheap':
					uploadNewParams('cheap', 'c')
					setCategoryOption({
						value: 'Сначала дешевые',
						label: 'Сначала дешевые'
					})

					break
				case 'greater':
					uploadNewParams('expensive', 'exp')
					setCategoryOption({
						value: 'Сначала дорогие',
						label: 'Сначала дорогие'
					})

					break
				case 'popular':
					uploadNewParams('popular', 'pop')
					setCategoryOption({
						value: 'По популярности',
						label: 'По популярности'
					})

					break
				default:
					toPopularSort(products)
					setCategoryOption({
						value: 'По популярности',
						label: 'По популярности'
					})
			}
		}
	}, [search.get('first'), products])

	const handleSortOptionChange = (selectedType: IOptionProps) => {
		setCategoryOption(selectedType)

		switch (selectedType.value) {
			case 'Сначала дешевые':
				uploadNewParams('cheap', 'c')
				updateRouteParam('cheap')
				break
			case 'Сначала дорогие':
				uploadNewParams('expensive', 'exp')
				updateRouteParam('greater')

				break
			case 'По популярности':
				uploadNewParams('popular', 'pop')
				updateRouteParam('popular')

				break
			default:
				return
		}
	}

	return (
		<Select
			value={categoryOption}
			onChange={handleSortOptionChange}
			isSearchable={false}
			isClearable={false}
			options={options}
			className='react-select-container-catalog'
			classNamePrefix='react-select-catalog'
		/>
	)
}

export default SortSelect
