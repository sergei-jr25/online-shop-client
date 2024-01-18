import { ICkeckFilters } from '@/shared/type/common'

export interface IInitStateBoiler {
	boilerManufacturer: ICkeckFilters[]
	manufacturerParts: ICkeckFilters[]
	isAnyCheckboxChecked: boolean
}
