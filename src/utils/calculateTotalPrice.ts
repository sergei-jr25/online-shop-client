import { ICart } from '@/shared/type/cart.interface'

export const calculateTotalPrice = <T>(items: ICart[]): number => {
	return items.reduce((acc, item) => {
		acc += item.totalPrice
		return acc
	}, 0)
}
