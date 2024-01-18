import { Dispatch, LegacyRef, SetStateAction } from 'react'
import { IBoilerPartFilter } from './boilerParts.interface'
import { ICkeckFilters } from './common'
import { IBoilerPartsData } from './user.interface'

export interface ICatalogProps {
	isTouch: boolean
	rangePrice: number[]
	setIsTouch: Dispatch<SetStateAction<boolean>>
	changePrice: boolean
	setRangePrice: Dispatch<SetStateAction<number[]>>
	setChangePrice: Dispatch<SetStateAction<boolean>>
	existQuery: boolean
	setExistQuery: Dispatch<SetStateAction<boolean>>
	boilerData: IBoilerPartsData[]
	boilerCount: number
	boilerParts: ICkeckFilters[]
	manufacturerParts: ICkeckFilters[]
	queryParams: IBoilerPartFilter
}
export interface ICatalogPageProps {
	boilerCount: number
	boilerData: IBoilerPartsData[]
	rangePrice: number[]
	existQuery: boolean
	queryParams: IBoilerPartFilter
	setIsTouch: Dispatch<SetStateAction<boolean>>
	setBoilerQueryParams: any
	setManufactureQueryParams: any
	changePrice: boolean
	setRangePrice: Dispatch<SetStateAction<number[]>>
	isFetching: boolean
}

export interface ICatalogFilters
	extends Omit<
		ICatalogProps,
		| 'boilerData'
		| 'boilerCount'
		| 'boilerParts'
		| 'manufacturerParts'
		| 'queryParams'
	> {
	resetFilters: () => void
	applyQueryParams: () => void
	isFetching: boolean
	isShow: boolean
	setIsShow: Dispatch<SetStateAction<boolean>>

	refFilter: LegacyRef<HTMLDivElement> | undefined
}

export interface ICatalogDesktop {
	rangePrice: number[]
	isTouch: boolean
	boiler: ICkeckFilters[]
	manufacture: ICkeckFilters[]
	setRangePrice: Dispatch<SetStateAction<number[]>>
	setTouchedChange: () => void
	setIsTouch: Dispatch<SetStateAction<boolean>>
	changePrice: boolean
	setChangePrice: Dispatch<SetStateAction<boolean>>
	existQuery?: boolean
	setExistQuery?: Dispatch<SetStateAction<boolean>>
	addTouchedAll: () => void
	applyQueryParams: () => void
	resetFilters: () => void
}
export interface ICatalogFiltersMobile {
	isTouch: boolean
	rangePrice: number[]
	setRangePrice: Dispatch<SetStateAction<number[]>>
	setTouchedChange: () => void
	setIsTouch: Dispatch<SetStateAction<boolean>>
	// changePrice: boolean
	setChangePrice: Dispatch<SetStateAction<boolean>>
	isShow: boolean
	setIsShow: Dispatch<SetStateAction<boolean>>
	boiler: ICkeckFilters[]
	manufacturer: ICkeckFilters[]
	changePrice: boolean
	mobile: boolean
	resetFilters: () => void
	addTouchedAll: () => void
	isAnyCheckboxChecked: boolean
	applyQueryParams: () => void
}

export interface ICatalogPage
	extends Omit<ICatalogDesktop, 'setTouchedChange'> {}

export interface IManufacturesBlock {
	setIsTouch: Dispatch<SetStateAction<boolean>>
	setRangePrice: Dispatch<SetStateAction<number[]>>

	title: string

	items?: ICkeckFilters[]
}

export interface IRangeFilters {
	rangePrice: number[]
	setRangePrice: Dispatch<SetStateAction<number[]>>
	setTouchedChange: () => void
	setIsTouch: Dispatch<SetStateAction<boolean>>
	setChangePrice: Dispatch<SetStateAction<boolean>>
}
