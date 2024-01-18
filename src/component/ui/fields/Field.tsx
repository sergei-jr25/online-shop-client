import cn from 'clsx'
import Image from 'next/image'
import { ChangeEvent, forwardRef, useState } from 'react'
import { IFiled } from '../form-elemtns/form-elemtns.interface'
import styles from './Field.module.scss'

// stvsco@mail.ru:89217338264

const Field = forwardRef<HTMLInputElement, IFiled>(
	(
		{ error, placeholder, type = 'text', mode, value, defaultChecked, ...rest },
		ref
	) => {
		const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined)
		const hadnleFileChane = (event: ChangeEvent<HTMLInputElement>) => {
			const file = event.target.files?.[0]
			console.log(file)

			if (file) {
				const fileUrl = URL.createObjectURL(file)
				setPreviewUrl(fileUrl)
			}
		}
		return (
			<div className={cn(styles.field, { [styles.dark]: mode === 'dark' })}>
				<label
					className={`${styles.field__label} ${
						type === 'checkbox' ? styles.field__label_checkbox : ''
					}`}
				>
					{type === 'file' ? (
						<>
							<input
								type={type}
								{...rest}
								ref={ref}
								onChange={hadnleFileChane}
							/>
							{previewUrl && (
								<Image src={previewUrl} width={50} height={50} alt={''} />
							)}
						</>
					) : (
						<input
							className={styles.field__input}
							{...rest}
							ref={ref}
							placeholder={placeholder}
							type={type}
							defaultChecked={defaultChecked}
						/>
					)}

					<span className={styles.field__Value}>{value}</span>
				</label>
				{error && <div className={styles.error}>{error.message}</div>}
			</div>
		)
	}
)

export default Field
