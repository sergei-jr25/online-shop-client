import cn from 'clsx'
import { forwardRef } from 'react'
import { ITextArea } from '../form-elemtns/form-elemtns.interface'
import styles from './textArea.module.scss'

const textArea = forwardRef<HTMLTextAreaElement, ITextArea>(
	({ error, placeholder, type = 'text', mode, value, ...rest }, ref) => {
		return (
			<div className={cn(styles.item, { [styles.dark]: mode === 'dark' })}>
				<label className={styles.field}>
					<span className={styles.value}>{value}</span>
					<textarea {...rest} ref={ref} placeholder={placeholder}></textarea>
				</label>
				{error && <div className={styles.error}>{error.message}</div>}
			</div>
		)
	}
)

export default textArea
