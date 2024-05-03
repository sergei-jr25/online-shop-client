'use client'

import Button from '@/component/ui/button/Button'
import Field from '@/component/ui/form-elements/fields/Field'
import { useAuth } from '@/hook/useAuth'
import { useActions } from '@/hook/useDispatch'
import { useMode } from '@/hook/useMode'
import { validateEmail } from '@/utils/regex'
import cn from 'clsx'
import { useRouter } from 'next/navigation'
import { FC, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import styles from './Auth.module.scss'

const Auth: FC = () => {
	const [type, setType] = useState<'register' | 'login'>('register')
	const [animation, setAnimation] = useState(false)
	const { theme } = useMode()
	const { replace, push } = useRouter()

	const {
		register,
		control,
		formState: { errors },
		reset,
		handleSubmit
	} = useForm({ mode: 'onChange' })

	const { user, isLoading } = useAuth()
	const { login, register: registerAction } = useActions()

	useEffect(() => {
		if (user) push('/')
	}, [user])

	const onSubmit = (data: any) => {
		if (type === 'register') registerAction(data)
		else login(data)

		reset()
	}

	const handleToggleType = () => {
		setType(type === 'register' ? 'login' : 'register')

		setAnimation(!animation)
	}

	return (
		<div className={cn(styles.auth, { [styles.dark]: theme === 'dark' })}>
			<div className={`container ${styles.container}`}>
				<div
					className={`${styles.auth__wrapper} ${
						type === 'register'
							? styles.auth__wrapper_register
							: styles.auth__wrapper_login
					}`}
				>
					<div
						className={`${styles.auth__inner} ${
							animation && styles.auth__inner_active
						}`}
					>
						<div className={styles.auth__head}>
							<button
								onClick={handleToggleType}
								className={`${styles.auth__title} ${
									type === 'login' ? styles.auth__title_active : ''
								} `}
							>
								Вход
							</button>
							<span>/</span>
							<button
								onClick={handleToggleType}
								className={`${styles.auth__title} ${
									type === 'register' ? styles.auth__title_active : ''
								} `}
							>
								Регистрация
							</button>
						</div>
						<form
							className={styles.auth__form}
							onSubmit={handleSubmit(onSubmit)}
						>
							{type === 'register' && (
								<Field
									{...register('email', {
										required: 'Email is require',

										pattern: {
											value: validateEmail,
											message: 'Некорректный email'
										}
									})}
									error={errors.email}
									type='email'
									placeholder='Email'
									mode={theme}
									className={styles.auth__field}
								/>
							)}
							<Field
								{...register('username', {
									required: 'Username is require'
								})}
								error={errors.username}
								placeholder='Username'
								type='text'
								mode={theme}
								className={styles.auth__field}
							/>

							<Field
								{...register('password', {
									required: 'Password is require',
									minLength: {
										value: 6,
										message: 'Минимальный пароль, не менее 6 символов'
									}
								})}
								error={errors.password}
								type='password'
								placeholder='Password'
								mode={theme}
								className={styles.auth__field}
							/>

							<Button className={styles.auth__button}>Отправить</Button>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}
export default Auth
