import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IActionsBoilerPartsFilter, IInitState } from './filters.interface'

const initialState: IInitState = {
	isFilterUpdate: false,
	queryParams: {
		offset: 1
	}
}

const filtersSlice = createSlice({
	name: 'query',
	initialState,
	reducers: {
		updateQueryParams: (
			state,
			{ payload }: PayloadAction<IActionsBoilerPartsFilter>
		) => {
			// const { key, value } = payload

			state.queryParams[payload.key] = payload.value
			state.isFilterUpdate = true
		},
		resetFilterUpdate: state => {
			state.isFilterUpdate = false
		}
	}
})

export const { actions, reducer } = filtersSlice
