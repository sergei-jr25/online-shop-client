'use client'
import { validateEmail } from '@/utils/regex'
import { FC } from 'react'
import { useForm } from 'react-hook-form'

import Button from '@/component/ui/button/Button'
import Field from '@/component/ui/form-elements/fields/Field'
import TextArea from '@/component/ui/form-elements/textArea/textArea'
import Skeleton from '@/component/ui/spinner/Spinner'
import { useMode } from '@/hook/useMode'
import styles from './Feedback.module.scss'

const Feedback: FC<{ onSubmit: (data: any) => void; loading: boolean }> = ({
	onSubmit,
	loading
}) => {
	const {
		handleSubmit,
		formState: { errors },
		register
	} = useForm({ mode: 'onChange' })

	const { theme } = useMode()

	return (
		<div
			className={`${styles.feedback} ${
				theme === 'dark' ? styles.feedback_dark : ''
			}`}
		>
			<h3 className={styles.feedback__title}>Форма обратной связи</h3>
			<form className={styles.feedback__form} onSubmit={handleSubmit(onSubmit)}>
				<Field
					{...register('name', {
						required: 'Name is required'
					})}
					error={errors.name}
					type='name'
					placeholder=''
					value='Имя*'
				/>
				<Field
					{...register('phone', {
						required: 'Phone is required',
						minLength: {
							value: 11,
							message: 'Incorrectly phone'
						},
						maxLength: {
							value: 11,
							message: 'Incorrectly phone'
						}
					})}
					error={errors.phone}
					type='phone'
					value='Контактный телефон *'
					placeholder='+7'
				/>
				<Field
					{...register('email', {
						required: 'Email is required',
						pattern: {
							message: 'Incorrectly',
							value: validateEmail
						}
					})}
					error={errors.email}
					type='email'
					placeholder=''
					value='Email *'
				/>
				<TextArea
					{...register('message', {
						required: 'Message is required',
						minLength: 2,
						maxLength: 500
					})}
					error={errors.message}
					type='message'
					placeholder='Введите ваше сообщение'
				
				/>

				<Button className={styles.feedback__button}>
					{' '}
					{loading ? <Skeleton height='10px' /> : ' Отправить сообщение'}{' '}
				</Button>
			</form>
		</div>
	)
}
export default Feedback
