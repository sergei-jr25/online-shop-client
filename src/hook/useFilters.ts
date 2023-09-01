import { useTypedSelector } from './useTypedSelector'

export const useFilters = () => {
	const filters = useTypedSelector(state => state.filters)
	return filters
}
