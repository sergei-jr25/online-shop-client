import { useMode } from '@/hook/useMode'
import { usePopup } from '@/hook/usePopup'
import { IOptionProps } from '@/shared/type/common'
import { IBoilerPartsData } from '@/shared/type/user.interface'
import cn from 'clsx'
import { useRouter } from 'next/navigation'
import { FC } from 'react'
import Select, { ActionMeta, MultiValue, SingleValue } from 'react-select'
import SearchSvg from '../../../ui/IconsSvg/header-icons/SearchSvg'
import './SearchSelect.scss'
import { NoOptionsMessage, NoOptionsSpinner } from './SelectOptions'
import { ISelect } from './select-interface'

const SearchSelect: FC<ISelect<IBoilerPartsData>> = ({
	data,
	setIsSelectOpen,
	setSearchTerm,

	isFetching
}) => {
	const { handleEvent, ref } = usePopup()
	const { push } = useRouter()
	const { theme } = useMode()
	const msgStyles = {
		background: 'purple',
		color: 'white'
	}

	const optionsData: IOptionProps[] = data.map(item => ({
		id: item.id,
		value: item.name,
		label: item.name
	}))

	const handleFocus = (params: any) => {
		if (typeof setIsSelectOpen === 'function') {
			setIsSelectOpen(true)
		}
	}
	const handleCHange = (text: string) => {
		if (typeof setSearchTerm === 'function') {
			setSearchTerm(text)
		}
	}

	const handleBlur = () => {
		if (typeof setIsSelectOpen === 'function') {
			setIsSelectOpen(false)
		}
	}

	const onMenuClose = () => {
		document.body.classList.remove('select-open')
		document.body.classList.remove('open-search')
	}

	const onOpenMenu = () => {
		document.body.classList.add('select-open')
		document.body.classList.add('open-search')
	}

	const handleOptionChange = (
		newValue: SingleValue<IOptionProps> | MultiValue<IOptionProps>,
		actionMeta: ActionMeta<IOptionProps>
	) => {
		const selectedValue = newValue as IOptionProps

		push(`/product/${selectedValue.value}`)
	}

	return (
		<div
			className={cn('search-select', {
				['search-select_dark']: theme === 'dark'
			})}
		>
			<Select
				components={{
					NoOptionsMessage: isFetching ? NoOptionsSpinner : NoOptionsMessage
				}}
				styles={{ noOptionsMessage: base => ({ ...base, ...msgStyles }) }}
				options={optionsData}
				className='react-select-container'
				classNamePrefix='react-select-search'
				onFocus={handleFocus}
				onInputChange={handleCHange}
				onChange={handleOptionChange}
				onBlur={handleBlur}
				onMenuClose={onMenuClose}
				onMenuOpen={onOpenMenu}
				closeMenuOnSelect
				placeholder='Я ищу...'
			/>
			<button className='search-select__icon'>
				<SearchSvg />
			</button>
		</div>
	)
}

export default SearchSelect
