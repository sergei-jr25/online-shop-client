'use client'
import { validateEmail } from '@/store/regex'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import Field from '../fields/Field'
import TextArea from '../textArea/textArea'
import styles from './Feedback.module.scss'

const Feedback: FC<{ onSubmit: (data: any) => void }> = ({ onSubmit }) => {
	const {
		handleSubmit,
		formState: { errors },
		register
	} = useForm({ mode: 'onChange' })

	return (
		<div className={styles.feedback}>
			<h3 className={styles.feedback__title}>Форма обратной связи</h3>
			<form className={styles.feedback__form} onSubmit={handleSubmit(onSubmit)}>
				<Field
					{...register('name', {
						required: 'Name is required'
					})}
					error={errors.name}
					type='name'
					placeholder='Select'
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
					placeholder='Select'
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

				<button className={styles.feedback__button}>Отправить сообщение</button>
			</form>
		</div>
	)
}
export default Feedback
