import { actions, reducer } from './mode.slice'

describe('desribe', () => {
	it('toggleTheme', () => {
		const state = {
			theme: 'light'
		}
		const expectState = {
			theme: 'dark'
		}
		expect(reducer(state, actions.toggleTheme())).toEqual(expectState)
	})
})
