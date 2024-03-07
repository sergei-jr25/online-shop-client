import { LIMIT, OFFSET } from './consts/query-params'

export const queryParamsInit = {
	offset: OFFSET,
	limit: LIMIT,
	sort: 'popular'
}

export const queryStringParamsInit = new URLSearchParams(
	queryParamsInit
).toString()
