import { getStoreLocal } from '@/utils/local-storage'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IInitState, IItemCart } from './cart.interface'

const initialState: IInitState = {
	items: getStoreLocal('cart') || [],
	isCartOpen: false,
	totalPrice: 0,
	totalCount: 0
}

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart: (state, { payload }: PayloadAction<IItemCart>) => {
			const isExsist = state.items.some(item => item.id === payload.id)

			if (!isExsist) {
				state.items.push(payload)
				localStorage.setItem('cart', JSON.stringify(state.items))
			}
		},
		changePrice: (
			state,
			{ payload }: PayloadAction<{ id: string; type: 'plus' | 'minus' }>
		) => {
			const item = state.items.find(item => item.id === payload.id)

			if (item) {
				if (payload.type === 'plus') {
					item.count++
					item.totalPrice += item.price
					localStorage.setItem('cart', JSON.stringify(state.items))
				} else if (payload.type === 'minus' && item.count >= 2) {
					item.count--
					item.totalPrice -= item.price
					localStorage.setItem('cart', JSON.stringify(state.items))
				}
			}
		},
		removeToCart: (
			state,
			{ payload }: PayloadAction<{ productId: string }>
		) => {
			state.items = [...state.items].filter(
				item => item.id !== payload.productId
			)
			state.totalPrice = state.items.reduce(
				(acc, item) => (acc += item.price),
				0
			)
			// localStorage.setItem('cart', JSON.stringify(state.items))
		},
		setTotalPrice: state => {
			state.totalPrice = state.items.reduce(
				(acc, item) => (acc += item.totalPrice),
				0
			)
		},
		countQuantity: state => {
			state.totalCount = state.items.reduce((acc, item) => {
				return (acc += item.count)
			}, 0)
		}
	}
})

export const { actions, reducer } = cartSlice
