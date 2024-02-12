export interface IInitState {
	items: IItemCart[]
	isCartOpen: boolean
	totalPrice: number
	totalCount: number
}

export interface IItemCart {
	id: string
	name: string
	count: number
	price: number
	image: string
	totalPrice: number
}
