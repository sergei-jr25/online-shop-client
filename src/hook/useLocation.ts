import { useTypedSelector } from './useTypedSelector'

export const useLocation = () => {
	const location = useTypedSelector(state => state.location)
	return location
}
