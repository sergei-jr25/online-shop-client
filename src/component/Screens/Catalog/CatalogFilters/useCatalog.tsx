import { useOutside } from '@/hook/useOutside'

export const useCatalog = () => {
	const { isShow, ref, setIsShow } = useOutside(false)

	return { isShow, ref, setIsShow }
}
