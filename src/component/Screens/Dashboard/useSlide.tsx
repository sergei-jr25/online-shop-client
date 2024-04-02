import { useState } from 'react'

export const useSlider = (length: number) => {
	const [currentIndex, setCurrentIndex] = useState<number>(0)
	const [sideIn, setSideIn] = useState<boolean>(false)

	const isPrevExist = currentIndex + 1 < length
	const isNextExist = currentIndex ? currentIndex - 1 < length : false

	const handleArrowClick = (direction: 'prev' | 'next') => {
		const newIndex = direction === 'prev' ? currentIndex - 1 : currentIndex + 1
		setSideIn(false)

		setTimeout(() => {
			setCurrentIndex(newIndex)
			setSideIn(true)
		}, 300)
	}

	return { currentIndex, isNextExist, isPrevExist, handleArrowClick, sideIn }
}
