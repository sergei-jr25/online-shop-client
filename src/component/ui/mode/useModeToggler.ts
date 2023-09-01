import { useMode } from '@/hook/useMode'

export const useModeTheme = () => {
	const { theme } = useMode()

	const darkModeTheme = theme === ' dark' ? 'dark__mode' : ''
	return { darkModeTheme }
}
