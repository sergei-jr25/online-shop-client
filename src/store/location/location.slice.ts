import { createSlice } from '@reduxjs/toolkit'
import { getLocation } from './location.actions'

interface IInitState {
	pos:any
	isLoading: boolean
}
const initialState: IInitState = {
	pos: {
		latitude: 0,
		longitude: 0
	},
	isLoading: false
}

const sliceLocation = createSlice({
	name: 'location',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(getLocation.pending, (state, { payload }) => {
			state.isLoading = true
		})
		builder.addCase(getLocation.fulfilled, (state, { payload }) => {
			state.pos = payload
			state.isLoading = false
		})
		builder.addCase(getLocation.rejected, (state, { payload }) => {
			state.pos = null
			state.isLoading = false
		})
	}
})

export const { reducer } = sliceLocation
