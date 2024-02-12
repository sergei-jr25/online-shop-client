import { useActions } from '@/hook/useDispatch'
import { IBoilerPartFilter } from '@/shared/type/boilerParts.interface'
import {
	useParams,
	usePathname,
	useRouter,
	useSearchParams
} from 'next/navigation'

export const useCatalogPage = (existQuery: boolean) => {
	const { replace, push } = useRouter()
	const pathName = usePathname()
	const searchParams = useSearchParams()!
	const params = useParams()
	const { updateQueryParams, resetFilterUpdate } = useActions()
	const newParams = new URLSearchParams(searchParams.toString())

	// if (!searchParams.get('offset')) {
	// 	updateQueryParams({ key: 'offset', value: '0' })
	// }

	const setInitOffset = (value: string | number = 0) => {
		return updateQueryParams({ key: 'offset', value })
	}

	const checkQueryParams = () => {
		searchParams.forEach((value, key) => {
			updateQueryParams({ key: key as keyof IBoilerPartFilter, value })
		})

		// updateQueryParams({ key: 'offset', value: '0' })
	}

	const uploadNewParams = (
		key: keyof IBoilerPartFilter,
		value: string | number
	) => {
		if (value) {
			newParams.set(key, String(value))
		} else {
			newParams.delete(key)
		}

		push(pathName + '?' + newParams.toString())
		updateQueryParams({ key, value })
	}

	return {
		uploadNewParams,
		setInitOffset,
		checkQueryParams
	}
}

// const loadBoilerParts = () => {
// 	const createQueryString = (name: string, value: string) => {
// 		const params = new URLSearchParams(searchParams.toString())
// 		params.set(name, value)
// 		return params.toString()
// 	}

// 	if (queryParams.offset) {
// 		if (+queryParams.offset > Math.ceil(productsLength / 20)) {
// 			push(pathName + '?' + newParams.toString())
// 			updateQueryParams({'offset', 0})

// 			return
// 		}

// 		console.log('queryParams.offset')
// 	}

// 	if (isValidOffset) {
// 		const newOffset = +queryParams.offset - 1
// 		console.log('newOffset', newOffset)
// 		console.log('queryParams.offset', queryParams.offset)

// 		// replace(pathName + '?' + createQueryString('offset', String(newOffset)))

// 		setInitOffset(newOffset)
// 	}

// 	updateQueryParams({ key: 'offset', value: newOffset })
// }
