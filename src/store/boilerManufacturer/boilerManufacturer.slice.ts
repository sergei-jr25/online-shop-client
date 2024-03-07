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
		toggleChecked: (
			state,
			{
				payload
			}: PayloadAction<{ item: ICkeckFilters; type: 'boiler' | 'parts' }>
		) => {
			if (payload.type === 'boiler') {
				state.boilerManufacturer.map(item => {
					if (item.id === payload.item.id) {
						return { ...item, checked: !item.checked }
					}
				})
			} else if (payload.type === 'parts') {
				state.manufacturerParts.map(item => {
					if (item.id === payload.item.id) {
						return { ...item, checked: !item.checked }
					}
				})
			}
		},
		boilerToggleChecked: (state, { payload }: PayloadAction<ICkeckFilters>) => {
			state.boilerManufacturer.filter(item => {
				if (item.id === payload.id) {
					return [...state.boilerManufacturer, (item.checked = !item.checked)]
				}
			})
			// state.boilerManufacturer.filter(item => {
			// 	if (item.id === payload.id) {
			// 		return { ...item, checked: true }
			// 	}
			// })
		},

		partsToggleChecked: (state, { payload }: PayloadAction<ICkeckFilters>) => {
			state.manufacturerParts.filter(item => {
				if (item.id === payload.id) {
					return [...state.manufacturerParts, (item.checked = !item.checked)]
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

		setAllChecked: (
			state,
			{ payload }: PayloadAction<{ type: 'boiler' | 'parts' }>
		) => {
			if (payload.type === 'boiler') {
				state.boilerManufacturer = state.boilerManufacturer.map(item => ({
					...item,
					checked: true
				}))
			} else if (payload.type === 'parts') {
				state.manufacturerParts = state.manufacturerParts.map(item => ({
					...item,
					checked: true
				}))
			}
		},
		removeBoiler: state => {
			state.boilerManufacturer.map(item => (item.checked = false))
		},
		removeParts: state => {
			state.manufacturerParts.map(item => (item.checked = false))
		},
		boilerChecked: state => {
			state.boilerManufacturer.filter(item => {
				item.checked && [state.boilerManufacturer, item.checked]
			})
		},
		manufacturerChecked: state => {
			state.boilerManufacturer.filter(item => item.checked)
		},
		resetFiltersBoilerParts: state => {
			state.boilerManufacturer.map(item => (item.checked = false))
			state.manufacturerParts.map(item => (item.checked = false))
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
		setPartsQueryParams: (
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
