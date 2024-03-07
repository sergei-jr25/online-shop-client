'use client'
import { useMode } from '@/hook/useMode'
import { IOptionProps } from '@/shared/type/common'
import { IQueryParams } from '@/shared/type/query.interface'
import { IBoilerPartsData } from '@/shared/type/user.interface'
import { FC, useState } from 'react'
import Select, { ActionMeta, SingleValue } from 'react-select'
import './SortSelect.scss'

const SortSelect: FC<{
	products: IBoilerPartsData[]
	uploadNewParams: (key: keyof IQueryParams, value: string) => void
}> = ({ products, uploadNewParams }) => {
	const { theme } = useMode()
	const options = [
		{ value: 'popular', label: 'По популярности' },
		{ value: 'low-price', label: 'Сначала дешевые' },
		{ value: 'height-price', label: 'Сначала дорогие' }
	]
	const [categoryOption, setCategoryOption] = useState<IOptionProps>(options[0])

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
		<div className={`select ${theme === 'dark' ? 'select_dark' : ''}`}>
			<Select
				value={categoryOption}
				onChange={handleSortOptionChange}
				isSearchable={false}
				isClearable={false}
				options={options}
				className='select-container-filters'
				classNamePrefix='select-filters'
			/>
		</div>
	)
}

export default SortSelect
