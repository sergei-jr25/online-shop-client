import { ICkeckFilters } from '@/shared/type/common'
import { boilerPartsData, manufacturersPartsData } from '@/utils/catalog'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IInitStateBoiler } from './boilerManufacturer.interface'

const initialState: IInitStateBoiler = {
	boilerManufacturer: boilerPartsData,
	manufacturerParts: manufacturersPartsData,
	isAnyCheckboxChecked: true
}

export const boilerManufacturer = createSlice({
	name: 'boilerManufacturerParts',
	initialState,
	reducers: {
		toggleChecked: (state, { payload }: PayloadAction<ICkeckFilters>) => {
			state.boilerManufacturer.filter(item => {
				if (item.id === payload.id) {
					return [...state.boilerManufacturer, (item.checked = !item.checked)]
				}
			})
		},
		anyCheckboxChecked: state => {
			state.isAnyCheckboxChecked = !state.boilerManufacturer.some(
				item => item.checked
			)
		},
		resetCheckbox: state => {
			state.isAnyCheckboxChecked = true
		},

		chooseAllToggle: state => {
			state.boilerManufacturer.map(
				item =>
					!item.checked && [...state.boilerManufacturer, (item.checked = true)]
			)
		},
		removeBoiler: (state, { payload }: PayloadAction<{ id: string }>) => {
			state.boilerManufacturer.filter(item => {
				return (
					item.id === payload.id && [
						...state.boilerManufacturer,
						(item.checked = false)
					]
				)
			})
		},
		boilerChecked: state => {
			state.boilerManufacturer.filter(item => {
				item.checked && [state.boilerManufacturer, item.checked]
			})
		},
		manufacturerChecked: state => {
			state.boilerManufacturer.filter(item => item.checked)
		},
		resetFiltersBoiler: state => {
			return state.boilerManufacturer.forEach(item => (item.checked = false))
		},
		setBoilerQueryParams: (
			state,
			{ payload }: PayloadAction<{ items: string[] }>
		) => {
			state.boilerManufacturer.map(item =>
				payload.items.find(title => {
					if (title === item.title) {
						return [state.boilerManufacturer, (item.checked = true)]
					}
				})
			)
		},
		setManufactureQueryParams: (
			state,
			{ payload }: PayloadAction<{ items: string[] }>
		) => {
			state.boilerManufacturer.map(item =>
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
