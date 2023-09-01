import { FC, useState } from 'react'
import ArrowSvg from '../IconsSvg/ArrowSvg'
import styles from './AccordionMy.module.scss'

const AccordionMy: FC<{
	children: any
	title: string
	titleClass?: string
}> = ({ children, title, titleClass }) => {
	const [isShow, setIsShow] = useState(false)

	const handleSetIsShow = () => {
		setIsShow(!isShow)
	}
	return (
		<div className={styles.accordion}>
			<button
				className={`${titleClass} ${styles.accordion__title} ${
					isShow ? styles.accordion__title_active : ''
				}`}
				onClick={handleSetIsShow}
			>
				{title}
				<ArrowSvg />
			</button>

			<div
				className={`${styles.accordion__children} ${
					isShow ? styles.accordion__children_active : ''
				}`}
			>
				{isShow && children}
			</div>
		</div>
	)
}
export default AccordionMy
