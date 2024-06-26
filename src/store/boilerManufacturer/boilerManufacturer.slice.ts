import { ICkeckFilters } from '@/shared/type/common'
import { boilerPartsData, manufacturersPartsData } from '@/utils/catalog'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IInitStateBoiler } from './boilerManufacturer.interface'

const initialState: IInitStateBoiler = {
	boilerManufacturer: boilerPartsData,
	partsManufacturer: manufacturersPartsData,
	isAnyCheckboxChecked: true
}

export const boilerManufacturer = createSlice({
	name: 'boilerpartsManufacturer',
	initialState,
	reducers: {
		toggleChecked: (
			state,
			{
				payload
			}: PayloadAction<{ item: ICkeckFilters; type: 'boiler' | 'parts' }>
		) => {
			const { item, type } = payload

			const targetList =
				type === 'boiler' ? state.boilerManufacturer : state.partsManufacturer
			const findIdex = targetList.findIndex(el => el.id === item.id)

			if (findIdex !== -1) {
				targetList[findIdex].checked = !targetList[findIdex].checked
			}
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
				state.partsManufacturer = state.partsManufacturer.map(item => ({
					...item,
					checked: true
				}))
			}
		},

		removeBoiler: state => {
			state.boilerManufacturer.map(item => (item.checked = false))
		},
		removeParts: state => {
			state.partsManufacturer.map(item => (item.checked = false))
		},
		resetFiltersBoilerParts: state => {
			state.boilerManufacturer.map(item => (item.checked = false))
			state.partsManufacturer.map(item => (item.checked = false))
		}, // need delete
		boilerChecked: state => {
			state.boilerManufacturer.filter(item => {
				item.checked && [state.boilerManufacturer, item.checked]
			})
		},
		manufacturerChecked: state => {
			state.boilerManufacturer.filter(item => item.checked)
		},
		removeItem: (state, { payload }: PayloadAction<{ title: string }>) => {
			const isSomeItemPart = state.partsManufacturer.findIndex(
				item => item.title === payload.title
			)
			const isSomeItemBoiler = state.boilerManufacturer.findIndex(
				item => item.title === payload.title
			)
			if (isSomeItemPart !== -1) {
				state.partsManufacturer[isSomeItemPart].checked = false
			}
			if (isSomeItemBoiler !== -1) {
				state.boilerManufacturer[isSomeItemBoiler].checked = false
			}
		},

		setBoilerQueryParams: (
			state,
			{ payload }: PayloadAction<{ items: string[] }>
		) => {
			state.boilerManufacturer.forEach(item => {
				if (payload.items.includes(item.title)) {
					item.checked = true
				}
			})
		},

		setPartsQueryParams: (
			state,
			{ payload }: PayloadAction<{ items: string[] }>
		) => {
			state.partsManufacturer.forEach(item => {
				if (payload.items.includes(item.title)) {
					item.checked = true
				}
			})
		}
	}
})

export const { actions, reducer } = boilerManufacturer
