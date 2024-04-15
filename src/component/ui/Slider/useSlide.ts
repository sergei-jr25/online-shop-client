import { useEffect } from 'react'

export const useSlide = <T>(items: T[]) => {
	useEffect(() => {
		console.log('useSlidedashboardSliders')

		const dashboardSliders = document.querySelectorAll('.swiper')
		dashboardSliders.forEach(dashboardSlider => {
			const slides = dashboardSlider.querySelectorAll('.swiper-slide')
			console.log(slides)

			let maxHeight = 0

			slides.forEach(slide => {
				const height = (slide as HTMLElement).offsetHeight
				maxHeight = Math.max(maxHeight, height)
			})

			slides.forEach(slide => {
				;(slide as HTMLElement).style.height = `${maxHeight}px`
			})
		})
	}, [items])
}
