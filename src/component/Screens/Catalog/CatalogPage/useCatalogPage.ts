import { useActions } from '@/hook/useDispatch'
import { IQueryParams } from '@/shared/type/query.interface'
import {
	useParams,
	usePathname,
	useRouter,
	useSearchParams
} from 'next/navigation'

export const useCatalogPage = () => {
	const { replace, push } = useRouter()
	const pathName = usePathname()
	const searchParams = useSearchParams()!
	const params = useParams()
	const { updateQueryParams, resetFilters } = useActions()
	const newParams = new URLSearchParams(searchParams.toString())

	const setInitOffset = (value: string | number = 0) => {
		return updateQueryParams({ key: 'offset', value })
	}

	const checkQueryParams = () => {
		searchParams.forEach((value, key) => {
			updateQueryParams({ key: key as keyof IQueryParams, value })
		})

		// updateQueryParams({ key: 'offset', value: '0' })
	}

	const uploadNewParams = (key: keyof IQueryParams, value: string | number) => {
		if (value) {
			newParams.set(key, String(value))
		} else {
			newParams.delete(key)
		}

		push(pathName + '?' + newParams.toString())
		updateQueryParams({ key, value })
	}

	const resetQueryParams = () => {
		searchParams.forEach((value, key) => {
			if (key) {
				newParams.delete(key)
			}
		})
		resetFilters()
		replace(pathName + '?' + newParams.toString())
	}

	return {
		uploadNewParams,
		setInitOffset,
		checkQueryParams,
		resetQueryParams
	}
}
