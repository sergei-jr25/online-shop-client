import { ICkeckFilters } from '@/shared/type/common'

export interface IInitStateBoiler {
	boilerManufacturer: ICkeckFilters[]
	partsManufacturer: ICkeckFilters[]
	isAnyCheckboxChecked: boolean
}
