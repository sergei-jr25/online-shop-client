export interface IOptionProps {
	label: string
	value: string
}

export interface IAccordionProps {
	children?: React.ReactNode
	title: string
	titleClass?: string
	arrowOpenClass?: string
	isMobileForFilters?: boolean
	hideArrowClass?: string
	isShowContent?: () => void
	accordionClass?: string
}

export interface ICkeckFilters {
	title: string
	checked: boolean
	id: string
}

export interface IGeoLocation {
	latitude: number
	longitude: number
}
