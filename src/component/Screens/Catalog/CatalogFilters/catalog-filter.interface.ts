import { ICkeckFilters } from '@/shared/type/common'
import { Dispatch, SetStateAction } from 'react'

export interface ICatalogFilter {
	resetFilters: () => void
	applyQueryParams: () => void
	isDisabled: boolean
	isShow: boolean
	setIsShow: any
	refFilter: any
	setValue?: any
	value?: any
	isCheckedItem: boolean
}
export interface ICatalogFilterProps
	extends Pick<
		ICatalogFilter,
		'isDisabled' | 'setValue' | 'value' | 'isCheckedItem'
	> {
	boilersChecked: ICkeckFilters[]
	partsChecked: ICkeckFilters[]
	setAllChecked: (type: 'boiler' | 'parts') => void
	applyQueryParams: () => void
	resetFilters: () => void
	isChangePrice?: boolean
}
export interface ICatalogFilterDesktop extends ICatalogFilterProps {}
export interface ICatalogFilterMobile extends ICatalogFilterProps {
	isShow: boolean
	setIsShow: Dispatch<SetStateAction<boolean>>
	mobile: boolean
	isAnyCheckboxChecked: boolean
}
