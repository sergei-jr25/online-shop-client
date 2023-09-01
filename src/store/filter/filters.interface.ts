import { IBoilerPartFilter } from '@/shared/type/boilerParts.interface'

export interface IInitState {
	isFilterUpdate: boolean
	queryParams: IBoilerPartFilter
}

export interface IActionsBoilerPartsFilter {
	key: keyof IBoilerPartFilter
	value: string | number
}
