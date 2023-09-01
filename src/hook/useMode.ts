import { useTypedSelector } from './useTypedSelector'

export const useMode = () => {
	// const localTheme = JSON.parse(localStorage.getItem('mode') as string)
	const mode = useTypedSelector(state => state.mode)
	return mode
}
