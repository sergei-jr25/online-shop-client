import { getStoreLocal } from '@/utils/local-storage'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	theme: getStoreLocal('mode')
}

const modeSLice = createSlice({
	name: 'mode',
	initialState,
	reducers: {
		toggleTheme: state => {
			// const localTheme = JSON.parse(localStorage.getItem('mode') as string)

			if (state.theme === 'light') {
				localStorage.setItem('mode', JSON.stringify('dark'))
				state.theme = 'dark'
			} else if (state.theme === 'dark') {
				localStorage.setItem('mode', JSON.stringify('dark'))
				state.theme = 'light'
			}
		}
	}
})

export const { reducer, actions } = modeSLice
