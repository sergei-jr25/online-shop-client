import { createSlice } from '@reduxjs/toolkit'
import { IInitState } from './cart.interface'

const initialState: IInitState = {
	items: []
}

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart: (state, { payload }) => {
			state.items = state.items.filter(item => item === payload.itemId)
		},
		removeToCart: (state, { payload }) => {
			state.items = state.items.filter(item => !item === payload.productId)
		},
		totalPrice: (state, { payload }) => {
			state.items.reduce((acc, item) => (acc += item.price), 0)
		}
	}
})

export const { actions, reducer } = cartSlice
