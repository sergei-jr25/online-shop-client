import { useEffect, useRef, useState } from 'react'

export const usePopup = () => {
	const [open, setOpen] = useState(false)

	const ref = useRef<HTMLInputElement>(null)

	const handleEvent = (event: any) => {
		if (ref.current && !ref.current.contains(event.target)) {
			document.body.classList.remove('select-open')
			document.body.classList.remove('open-search')
			setOpen(false)
		}
	}

	const toggleOpen = () => {
		document.body.classList.toggle('select-open')
		document.body.classList.toggle('open-search')

		setOpen(!open)
	}

	useEffect(() => {
		const body = document.body

		body.addEventListener('click', handleEvent)
		return () => body.removeEventListener('click', handleEvent)
	}, [open])

	return { open, toggleOpen, handleEvent, ref }
}
