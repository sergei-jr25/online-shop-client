'use client'
import { Accordion, AccordionItem } from '@szhsin/react-accordion'
import { FC } from 'react'
import './Accordion.scss'

interface IAccordion {
	children: React.ReactNode
	title: string
	titleClass: string
}

const AccordionComponent: FC<IAccordion> = ({
	children,
	title,
	titleClass
}) => {
	return (
		<Accordion>
			<AccordionItem header={title} className={titleClass}>
				{children}
			</AccordionItem>
		</Accordion>
	)
}
export default AccordionComponent
