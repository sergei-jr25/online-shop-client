import { useEffect, useState } from 'react'

function useThrottle<T>(value: T, delay: number) {
	const [throttledValue, setThrottledValue] = useState(value)
	const [prevValue, setPrevValue] = useState(value)

	useEffect(() => {
		const handler = setTimeout(() => {
			setThrottledValue(prevValue)
		}, delay)

		return () => {
			clearTimeout(handler)
		}
	}, [prevValue, delay])

	useEffect(() => {
		setPrevValue(value)
	}, [value])

	return throttledValue
}

export default useThrottle
