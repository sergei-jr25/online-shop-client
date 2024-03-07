import { useMode } from '@/hook/useMode'
import { FC } from 'react'
import styles from './Checkbox.module.scss'
import { ICheckbox } from './checkbox.interface'

const Checkbox: FC<ICheckbox> = ({ isChecked, title, handleChange }) => {
	const { theme } = useMode()

	return (
		<label
			className={`${styles.checkbox} ${
				theme === 'dark' ? styles.checkbox_dark : ''
			}`}
		>
			<input
				type='checkbox'
				checked={isChecked}
				onChange={handleChange}
				className={styles.accordion__input}
			/>
			<span className={styles.checkbox__title}>{title}</span>
		</label>
	)
}
export default Checkbox
