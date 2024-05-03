export interface IQueryParamsInit {
	limit: number
	offset: number
}

export interface IQueryParams {
	offset: string | number
	limit?: string | number
	first?: string | number
	boilerManufacturer?: string | number
	partsManufacturer?: string | number
	priceFrom?: string | number
	priceTo?: string | number
	expensive?: string | undefined | number
	cheap?: string | undefined | number
	popular?: string | undefined | number
	sort?: string | number
}
