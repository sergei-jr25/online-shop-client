import { ICkeckFilters } from '@/shared/type/common'
import { boilerPartsData, manufacturersPartsData } from '@/utils/catalog'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IInitStateBoiler } from './boilerManufacturer.interface'

const initialState: IInitStateBoiler = {
	boilerParts: boilerPartsData,
	manufacturerParts: manufacturersPartsData,
	isAnyCheckboxChecked: true
}

export const boilerManufacturer = createSlice({
	name: 'boilerManufacturerParts',
	initialState,
	reducers: {
		toggleChecked: (state, { payload }: PayloadAction<ICkeckFilters>) => {
			state.boilerParts.filter(item => {
				if (item.id === payload.id) {
					return [...state.boilerParts, (item.checked = !item.checked)]
				}
			})
		},
		anyCheckboxChecked: state => {
			console.log('isAnyCheckboxChecked', state.isAnyCheckboxChecked)

			state.isAnyCheckboxChecked = !state.boilerParts.some(item => item.checked)
		},
		resetCheckbox: state => {
			console.log('state.isAnyCheckboxChecked ', state.isAnyCheckboxChecked)

			state.isAnyCheckboxChecked = true
		},

		chooseAllToggle: state => {
			state.boilerParts.map(
				item => !item.checked && [...state.boilerParts, (item.checked = true)]
			)
		},
		removeBoiler: (state, { payload }: PayloadAction<{ id: string }>) => {
			state.boilerParts.filter(item => {
				return (
					item.id === payload.id && [
						...state.boilerParts,
						(item.checked = false)
					]
				)
			})
		},
		boilerChecked: state => {
			state.boilerParts.filter(item => {
				item.checked && [state.boilerParts, item.checked]
			})
		},
		manufacturerChecked: state => {
			state.boilerParts.filter(item => item.checked)
		},
		resetFiltersBoiler: state => {
			return state.boilerParts.forEach(item => (item.checked = false))
		},
		setBoilerQueryParams: (
			state,
			{ payload }: PayloadAction<{ items: string[] }>
		) => {
			state.boilerParts.map(item =>
				payload.items.find(title => {
					if (title === item.title) {
						return [state.boilerParts, (item.checked = true)]
					}
				})
			)
		},
		setManufactureQueryParams: (
			state,
			{ payload }: PayloadAction<{ items: string[] }>
		) => {
			state.boilerParts.map(item =>
				payload.items.find(title => {
					if (title === item.title) {
						return [state.manufacturerParts, (item.checked = true)]
					}
				})
			)
		}
	}
})

export const { actions, reducer } = boilerManufacturer
