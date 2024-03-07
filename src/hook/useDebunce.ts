import { useEffect, useState } from 'react'

export const useDebunce = <T>(value: T, ms: number) => {
	const [debaunced, setDebaunced] = useState<T>(value)

	useEffect(() => {
		const hadnler = setTimeout(() => {
			setDebaunced(value)
		}, ms)
		return () => clearTimeout(hadnler)
	}, [value, ms])

	return { debaunced }
}
