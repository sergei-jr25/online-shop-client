import { createSlice } from '@reduxjs/toolkit'
import { IInitialState } from './catalog.interface'

const initialState: IInitialState = {
	products: []
}
const catalogSlice = createSlice({
	name: 'boilerParts',
	initialState,
	reducers: {
		toCheapSort: (state, action) => {
			console.log(action.payload)

			state.products = action.payload.sort((a, b) => a.price - b.price)
		},
		toGreatSort: (state, action) => {
			console.log(action.payload)
			state.products = action.payload.sort((a, b) => b.price - a.price)
		},
		toPopularSort: (state, action) => {
			state.products.sort((a, b) => b.popularity - a.popularity)
		}
	}
})

export const { reducer, actions } = catalogSlice
