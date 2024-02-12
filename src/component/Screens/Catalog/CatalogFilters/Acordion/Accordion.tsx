import { useMode } from '@/hook/useMode'
import { IAccordionProps } from '@/shared/type/common'
import { FC, useState } from 'react'
import styles from './Accordion.module.scss'

const Accordion: FC<IAccordionProps> = ({
	arrowOpenClass,
	children,
	hideArrowClass,
	isMobileForFilters,
	title,
	isShowContent,
	titleClass,
	accordionClass
}) => {
	const [expended, setExpended] = useState(true)
	const toggleAccordion = () => setExpended(!expended)
	const {theme} = useMode()

	return (
		<div className={`${accordionClass} ${styles.dark}`}>
			<div>
				{title ? (
					isMobileForFilters ? (
						<button
							className={`${arrowOpenClass} ${titleClass} ${arrowOpenClass}`}
							onClick={isShowContent}
						>
							{title}
						</button>
					) : (
						<div
							onClick={toggleAccordion}
							className={`${styles.titleClass} ${
								expended ? styles.titleClass_open : ''
							}`}
						>
							{title}
						</div>
					)
				) : (
					''
				)}
			</div>

			<div
				className={`${styles.accordion} ${
					expended ? styles.accordion_active : ''
				} `}
			>
				{expended ? <div> {children}</div> : <></>}
			</div>
		</div>
	)
}
export default Accordion
