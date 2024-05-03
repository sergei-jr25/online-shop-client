import { useMode } from '@/hook/useMode'
import cn from 'clsx'
import Image from 'next/image'
import { ChangeEvent, forwardRef, useState } from 'react'
import { IFiled } from '../form-elements.interface'
import styles from './Field.module.scss'

// stvsco@mail.ru:89217338264

const Field = forwardRef<HTMLInputElement, IFiled>(
	(
		{ error, type = 'text', value, mode, defaultChecked, className, ...rest },
		ref
	) => {
		const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined)
		const hadnleFileChane = (event: ChangeEvent<HTMLInputElement>) => {
			const file = event.target.files?.[0]

			if (file) {
				const fileUrl = URL.createObjectURL(file)
				setPreviewUrl(fileUrl)
			}
		}
		const { theme } = useMode()
		return (
			<div
				className={cn(styles.field, { [styles.field_dark]: theme === 'dark' })}
			>
				<label
					className={`${styles.field__label} ${
						type === 'checkbox' ? styles.field__label_checkbox : ''
					}`}
				>
					<span className={styles.field__value}>{value}</span>

					{type === 'file' ? (
						<>
							<input
								type={type}
								{...rest}
								ref={ref}
								onChange={hadnleFileChane}
								className={` ${className}`}
							/>
							{previewUrl && (
								<Image src={previewUrl} width={50} height={50} alt={''} />
							)}
						</>
					) : (
						<input
							{...rest}
							ref={ref}
							type={type}
							defaultChecked={defaultChecked}
							className={`${styles.field__input} ${className}`}
						/>
					)}
				</label>
				{error && <div className={styles.error}>{error.message}</div>}
			</div>
		)
	}
)

export default Field
