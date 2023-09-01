export interface IBoilerPartFilter {
	offset: string | number
	first?: string | number
	boilerParts?: string | number
	manufacturerParts?: string | number
	priceFrom?: string | number
	priceTo?: string | number
	expensive: string | undefined | number
	cheap: string | undefined | number
	popular: string | undefined | number
}
export interface IBoilerPartDto {
	boilerManufacturer: string

	partsManufacturer: string

	price: number

	vendorCode: string

	name: string

	description: string

	bestsellers: boolean

	new: boolean

	inStock: number

	popularity: number

	compatibility: string

	file: string
}

export interface IBoilerPartERequest {}
