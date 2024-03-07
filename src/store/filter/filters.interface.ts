import { IQueryParams } from '@/shared/type/query.interface'

export interface IInitState {
	isFilterUpdate: boolean
	queryParams: IQueryParams
	rangePrice: number[]
	isTouchFilter: boolean
	isChangePrice: boolean
	isResettingFilter: boolean
}

export interface IActionsBoilerPartsFilter {
	key: keyof IQueryParams
	value: string | number
}
