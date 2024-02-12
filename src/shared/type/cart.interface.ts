export interface ICart {
	id: string
	userId: number
	partId: number
	boilerManufacturer: string
	price: number
	partsManufacturer: string

	name: string

	inStock: number

	image: string

	count: number
	totalPrice: number
}
export interface ICartAll {
	data: ICart[]
	totalSum: number
}

export interface ICartDto {
	userId?: number
	partId: number
	username: string | undefined
}
