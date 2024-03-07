import { IQueryParams } from '@/shared/type/query.interface'
import { IBoilerPartsData } from '@/shared/type/user.interface'

export interface ICatalogPage {
	boilerCount: number
	boilerData: IBoilerPartsData[]
	queryParams: IQueryParams
	isFetching: boolean
}
