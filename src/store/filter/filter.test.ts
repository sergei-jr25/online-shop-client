import { LIMIT, OFFSET } from '@/shared/consts/query-params'
import { IQueryParams } from '@/shared/type/query.interface'
import { actions, reducer } from './filters.slice'

describe('fileters-redux', () => {
	it('updateQueryParams', () => {
		const state = {
			queryParams: {
				offset: OFFSET,
				limit: LIMIT
			},
			isFilterUpdate: false
		}

		const expectState = (key: keyof IQueryParams, value: string) => {
			return {
				queryParams: {
					...state.queryParams,
					[key]: value
				},
				isFilterUpdate: true
			}
		}

		expect(
			reducer(state, actions.updateQueryParams({ key: 'offset', value: '20' }))
		).toEqual(expectState('offset', '20'))

		expect(
			reducer(
				state,
				actions.updateQueryParams({ key: 'priceFrom', value: '2000' })
			)
		).toEqual(expectState('priceFrom', '2000'))

		expect(
			reducer(
				state,
				actions.updateQueryParams({ key: 'priceTo', value: '10000' })
			)
		).toEqual(expectState('priceTo', '10000'))
	})

	it('resetFilters', () => {
		const state = {
			queryParams: {
				offset: '25',
				limit: '5',
				priceFrom: '100',
				priceTo: '1000'
			}
		}

		const expectQuery = {
			queryParams: {
				offset: OFFSET,
				limit: LIMIT
			}
		}

		expect(reducer(state, actions.resetFilters())).toEqual(expectQuery)
	})

	it('setTouchFilter', () => {
		const state = {
			isTouchFilter: false
		}

		const expectFilters = {
			isTouchFilter: true
		}

		expect(reducer(state, actions.setTouchFilter({ flag: true }))).toEqual(
			expectFilters
		)
	})

	it('setChangePrice', () => {
		const state = {
			isChangePrice: false
		}
		const expectFilters = {
			isChangePrice: true
		}

		expect(reducer(state, actions.setChangePrice({ flag: true }))).toEqual(
			expectFilters
		)
	})
	it('setRangePrice', () => {
		const state = {
			rangePrice: []
		}

		const receivedState = (values: number[]) => {
			return {
				rangePrice: [values[0], values[1]]
			}
		}

		expect(
			reducer(state, actions.setRangePrice({ values: [200, 20000] }))
		).toEqual(receivedState([200, 20000]))
	})

	it('setIsRessitng', () => {
		const state = {
			isResettingFilter: false
		}

		const expectState = {
			isResettingFilter: true
		}

		expect(reducer(state, actions.setIsRessitng({ flag: true }))).toEqual(
			expectState
		)
	})
})
