import { ICkeckFilters } from '@/shared/type/common'

export interface IInitStateBoiler {
	boilerParts: ICkeckFilters[]
	manufacturerParts: ICkeckFilters[]
	isAnyCheckboxChecked: boolean
}
