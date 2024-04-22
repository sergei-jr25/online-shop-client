import { useState } from 'react'

export const useOnloadImage = () => {
	const [isOnload, setIsOnload] = useState<boolean>(true)

	const handleOnLoad = async (img: HTMLImageElement) => {
		setIsOnload(false)
	}
	return { isOnload, handleOnLoad }
}
