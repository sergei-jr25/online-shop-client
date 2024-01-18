'use client'
import { IBoilerPartFilter } from '@/shared/type/boilerParts.interface'
import { IOptionProps } from '@/shared/type/common'
import { IBoilerPartsData } from '@/shared/type/user.interface'
import { FC, useEffect, useState } from 'react'
import Select, { ActionMeta, SingleValue } from 'react-select'
import './SortSelect.scss'

const SortSelect: FC<{
	products: IBoilerPartsData[]
	uploadNewParams: (key: keyof IBoilerPartFilter, value: string) => void
}> = ({ products, uploadNewParams }) => {
	const options = [
		{ value: 'popular', label: 'По популярности' },
		{ value: 'low-price', label: 'Сначала дешевые' },
		{ value: 'height-price', label: 'Сначала дорогие' }
	]
	const [categoryOption, setCategoryOption] = useState<IOptionProps>(options[0])

	useEffect(() => {
		uploadNewParams('sort', categoryOption.value)
	}, [])

	// const handleSortOptionChange = (option: IOptionProps) => {
	// 	setCategoryOption(option)
	// 	uploadNewParams('sort', option.value)
	// }

	const handleSortOptionChange = (
		newValue: SingleValue<IOptionProps>,
		actionMeta: ActionMeta<IOptionProps>
	) => {
		if (newValue) {
			setCategoryOption(newValue)
			uploadNewParams('sort', newValue.value)
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
