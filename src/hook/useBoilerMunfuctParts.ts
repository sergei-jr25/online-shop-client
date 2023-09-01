import { useTypedSelector } from './useTypedSelector'

export const useBoilerManufact = () => {
	return useTypedSelector(state => state.boilerManufacturer)
}
