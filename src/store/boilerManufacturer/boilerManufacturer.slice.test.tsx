import { boilerPartsData, manufacturersPartsData } from '@/utils/catalog'
import '@testing-library/jest-dom'
import { IInitStateBoiler } from './boilerManufacturer.interface'
import { actions, reducer } from './boilerManufacturer.slice'

describe('boilerManufacturer', () => {
	it('boilerManufacturer initial State', () => {
		const initialState = {
			boilerManufacturer: boilerPartsData,
			manufacturerParts: manufacturersPartsData,
			isAnyCheckboxChecked: true
		}
		const result = (state: IInitStateBoiler) => state
		expect(result(initialState)).toEqual(initialState)
	})

	it('should handle toggleChecked', () => {
		const initState = {
			boilerManufacturer: [
				{ id: 1, checked: false },
				{ id: 2, checked: true }
			],
			manufacturerParts: [
				{ id: 3, checked: false },
				{ id: 4, checked: false }
			]
		}

		const expectedState = {
			boilerManufacturer: [
				{ id: 1, checked: false },
				{ id: 2, checked: true }
			],
			manufacturerParts: [
				{ id: 3, checked: false },
				{ id: 4, checked: false }
			]
		}

		const nextState = reducer(
			initState,
			actions.toggleChecked({ item: 2, type: 'boiler' })
		)

		expect(nextState).toEqual(expectedState)
	})

	it('should handle setAllChecked', () => {
		const state = {
			boilerManufacturer: [
				{ id: 1, checked: false },
				{ id: 2, checked: false }
			],
			manufacturerParts: [
				{ id: 3, checked: false },
				{ id: 4, checked: false }
			]
		}

		const expectedBoiler = {
			boilerManufacturer: [
				{ id: 1, checked: true },
				{ id: 2, checked: true }
			],
			manufacturerParts: [
				{ id: 3, checked: false },
				{ id: 4, checked: false }
			]
		}

		function nextState(type: 'boiler' | 'parts') {
			if (type === 'boiler') {
				return reducer(state, actions.setAllChecked({ type: 'boiler' }))
			} else if (type === 'parts') {
				return reducer(state, actions.setAllChecked({ type: 'parts' }))
			}
		}
		expect(nextState('boiler')).toEqual(expectedBoiler)
		const expectedParts = {
			boilerManufacturer: [
				{ id: 1, checked: false },
				{ id: 2, checked: false }
			],
			manufacturerParts: [
				{ id: 3, checked: true },
				{ id: 4, checked: true }
			]
		}

		expect(nextState('parts')).toEqual(expectedParts)
	})

	it('should handle resetCheckbox', () => {
		const state = {
			isAnyCheckboxChecked: false
		}

		const expectCheckbox = {
			isAnyCheckboxChecked: true
		}

		expect(reducer(state, actions.resetCheckbox())).toEqual(expectCheckbox)
	})
	it('should handle removeBoiler', () => {
		const state = {
			boilerManufacturer: [
				{ id: 1, checked: true },
				{ id: 2, checked: true },
				{ id: 3, checked: true }
			]
		}

		const expectBoiler = {
			boilerManufacturer: [
				{ id: 1, checked: false },
				{ id: 2, checked: false },
				{ id: 3, checked: false }
			]
		}

		expect(reducer(state, actions.removeBoiler())).toEqual(expectBoiler)
	})
	it('should handle removeParts', () => {
		const state = {
			manufacturerParts: [
				{ id: 1, checked: true },
				{ id: 2, checked: true },
				{ id: 3, checked: true }
			]
		}

		const expectParts = {
			manufacturerParts: [
				{ id: 1, checked: false },
				{ id: 2, checked: false },
				{ id: 3, checked: false }
			]
		}

		expect(reducer(state, actions.removeParts())).toEqual(expectParts)
	})
	it('should handle setBoilerQueryParams', () => {
		const state = {
			boilerManufacturer: [
				{ id: 1, title: 'Boiler-1', checked: false },
				{ id: 2, title: 'Boiler-2', checked: false },
				{ id: 3, title: 'Boiler-3', checked: false },
				{ id: 4, title: 'Boiler-4', checked: false }
			]
		}
		const itemsPayload = ['Boiler-1', 'Boiler-2']

		const expectBoiler = {
			boilerManufacturer: [
				{ id: 1, title: 'Boiler-1', checked: true },
				{ id: 2, title: 'Boiler-2', checked: true },
				{ id: 3, title: 'Boiler-3', checked: false },
				{ id: 4, title: 'Boiler-4', checked: false }
			]
		}

		expect(
			reducer(state, actions.setBoilerQueryParams({ items: itemsPayload }))
		).toEqual(expectBoiler)
	})
	it('should handle setPartsQueryParams', () => {
		const state = {
			manufacturerParts: [
				{ id: 1, title: 'Parts-1', checked: false },
				{ id: 2, title: 'Parts-2', checked: false },
				{ id: 3, title: 'Parts-3', checked: false },
				{ id: 4, title: 'Parts-4', checked: false }
			]
		}
		const itemsPayload = ['Parts-1', 'Parts-2']

		const expectParts = {
			manufacturerParts: [
				{ id: 1, title: 'Parts-1', checked: true },
				{ id: 2, title: 'Parts-2', checked: true },
				{ id: 3, title: 'Parts-3', checked: false },
				{ id: 4, title: 'Parts-4', checked: false }
			]
		}

		expect(
			reducer(state, actions.setPartsQueryParams({ items: itemsPayload }))
		).toEqual(expectParts)
	})
})
