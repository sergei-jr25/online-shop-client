export interface IUser {
	id: number
	username?: string
	email: string
	password: string
}

export interface IBoilerParts {
	0: IBoilerPartsData[]
	1: number
}

export interface IBoilerPartsData {
	id: string
	boilerManufacturer: string
	price: number
	partsManufacturer: string
	vendorCode: string
	name: string
	description: string

	bestsellers: boolean
	new: boolean
	inStock: number

	popularity: number

	compatibility: string

	images: string
}
