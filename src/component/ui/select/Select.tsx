import { usePopup } from '@/hook/usePopup'
import { apiBoilerParts } from '@/service/api/boiderl-parts'
import { IBoilerPartsData } from '@/shared/type/user.interface'
import { useRouter } from 'next/navigation'
import { Dispatch, FC, SetStateAction, useState } from 'react'
import Select, { NoticeProps, components } from 'react-select'
import './Select.scss'
import { NoOptionsMessage, NoOptionsSpinner } from './SelectOptions'

const options = [
	{ value: 'chocolate', label: 'Chocolate' },
	{ value: 'strawberry', label: 'Strawberry' },
	{ value: 'vanilla', label: 'Vanilla' }
]

const SelectComponent: FC<{
	setSelectOpenClass: Dispatch<SetStateAction<boolean>>
}> = ({ setSelectOpenClass }) => {
	const { push } = useRouter()
	const { handleEvent, ref } = usePopup()
	const [searchTerm, setSearchTerm] = useState('')
	const [boilerName, setBoilerName] = useState('')

	const { data = [], isFetching } = apiBoilerParts.useGetSearchQuery(searchTerm)
	const { data: boilerItem = {} as IBoilerPartsData } =
		apiBoilerParts.useGetByNameQuery(boilerName)

	const msgStyles = {
		background: 'purple',
		color: 'white'
	}
	const handleSearchOptionChange = (select: any) => {
		setBoilerName(select.value)
		if (!boilerItem.id) {
			return
		}
		push(`/product/${boilerItem.id}`)
	}

	const optionsData = data
		.map(item => item.name)
		.map(item => ({
			value: item,
			label: item
		}))

	// const toRedirect = () => {
	// 	setBoilerData(searchTerm)
	// }
	const handleFocus = (params: any) => {
		// document.body.classList.toggle('select-open')
		// document.body.classList.toggle('open-search')
		setSelectOpenClass(true)
	}
	const handleCHange = (text: string) => {
		setSearchTerm(text)

		// document.body.classList.add('select-open')
		// document.body.classList.add('open-search')
	}

	const handleBlur = (param: any) => {
		setSelectOpenClass(false)
	}

	const onMenuClose = () => {
		document.body.classList.remove('select-open')
		document.body.classList.remove('open-search')
	}

	const onOpenMenu = () => {
		document.body.classList.add('select-open')
		document.body.classList.add('open-search')
	}

	const NoOptionsMessageData = (props: NoticeProps) => {
		return (
			<components.NoOptionsMessage {...props}>
				<span>Не найдено</span>
			</components.NoOptionsMessage>
		)
	}
	return (
		<div ref={ref}>
			<Select
				components={{
					NoOptionsMessage: isFetching ? NoOptionsSpinner : NoOptionsMessage
				}}
				styles={{ noOptionsMessage: base => ({ ...base, ...msgStyles }) }}
				options={optionsData}
				// value={searchTerm}
				className='react-select-container'
				classNamePrefix='react-select'
				onFocus={handleFocus}
				// onChange={handleCHange}
				onInputChange={handleCHange}
				onChange={handleSearchOptionChange}
				onBlur={handleBlur}
				onMenuClose={onMenuClose}
				onMenuOpen={onOpenMenu}
				closeMenuOnSelect
			/>
		</div>
	)
}

export default SelectComponent
