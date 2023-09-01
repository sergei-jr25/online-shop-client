import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	theme: 'light'
}

const modeSLice = createSlice({
	name: 'mode',
	initialState,
	reducers: {
		toggleTheme: state => {
			const localTheme = JSON.parse(localStorage.getItem('mode') as string)

			if (state.theme === 'light') {
				if (localTheme) {
				}
				localStorage.setItem('mode', JSON.stringify('light'))
				state.theme = 'dark'
			} else if (state.theme === 'dark') {
				localStorage.setItem('mode', JSON.stringify('dark'))
				state.theme = 'light'
			}
		}
	}
})

export const { reducer, actions } = modeSLice
