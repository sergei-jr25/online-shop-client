import { getStoreLocal } from '@/utils/local-storage'
import { createSlice } from '@reduxjs/toolkit'
import { IInitState } from './user.interface'
import { login, logout, register } from './userActions'
const initialState: IInitState = {
	accessToken: '',
	user: getStoreLocal('user'),
	isLoading: false
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(register.pending, (state, action) => {
			state.isLoading = true
		})
		builder.addCase(register.fulfilled, (state, action) => {
			state.accessToken = action.payload.accessToken
			state.isLoading = false
			state.user = action.payload.user
		})
		builder.addCase(register.rejected, (state, action) => {
			state.isLoading = false
			state.user = null
			state.accessToken = ''
		})
		builder.addCase(login.pending, (state, action) => {
			state.isLoading = true
		})
		builder.addCase(login.fulfilled, (state, action) => {
			state.isLoading = false
			state.user = action.payload.user
			state.accessToken = action.payload.accessToken
		})
		builder.addCase(login.rejected, (state, action) => {
			state.accessToken = ''

			state.isLoading = false
			state.user = null
		})
		builder.addCase(logout.fulfilled, (state, action) => {
			state.isLoading = false
			state.user = null
			state.accessToken = ''
		})
	}
})

export const { reducer } = userSlice
