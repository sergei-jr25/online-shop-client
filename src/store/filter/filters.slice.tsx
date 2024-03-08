import { LIMIT, OFFSET } from '@/shared/consts/query-params'
import { getStoreLocal } from '@/utils/local-storage'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IActionsBoilerPartsFilter, IInitState } from './filters.interface'

const initialState: IInitState = {
	isFilterUpdate: false,
	isResettingFilter: false,
	queryParams: {
		offset: OFFSET,
		limit: LIMIT
	},
	rangePrice: getStoreLocal('range-price'),
	isTouchFilter: false,
	isChangePrice: false
}

const filtersSlice = createSlice({
	name: 'query',
	initialState,
	reducers: {
		updateQueryParams: (
			state,
			{ payload }: PayloadAction<IActionsBoilerPartsFilter>
		) => {
			state.queryParams[payload.key] = payload.value
			state.isFilterUpdate = true
		},
		resetFilters: state => {
			state.queryParams = {
				offset: OFFSET,
				limit: LIMIT
			}
		},
		resetFilterUpdate: state => {
			state.isFilterUpdate = false
		},
		setTouchFilter: (state, { payload }: PayloadAction<{ flag: boolean }>) => {
			state.isTouchFilter = payload.flag
		},
		setChangePrice: (state, { payload }: PayloadAction<{ flag: boolean }>) => {
			state.isChangePrice = payload.flag
		},
		setRangePrice: (
			state,
			{ payload }: PayloadAction<{ values: number[] }>
		) => {
			state.rangePrice[0] = payload.values[0]
			state.rangePrice[1] = payload.values[1]
		},
		setIsRessitng: (state, { payload }: PayloadAction<{ flag: boolean }>) => {
			state.isResettingFilter = payload.flag
		}
	}
})

export const { actions, reducer } = filtersSlice
