'use client'
import Field from '@/component/ui/fields/Field'
import { useAuth } from '@/hook/useAuth'
import { useActions } from '@/hook/useDispatch'
import { useMode } from '@/hook/useMode'
import { validateEmail } from '@/store/regex'
import cn from 'clsx'
import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import styles from './Auth.module.scss'

const Auth: FC = () => {
	const [type, setType] = useState<'register' | 'login'>('login')
	const { theme } = useMode()
	// const { shouldLoadContent } = useRedirectAuthPage(true)

	const darkModeTheme = theme === 'dark' ? 'dark__mode' : ''

	const {
		register,
		control,
		formState: { errors },
		reset,
		handleSubmit
	} = useForm({ mode: 'onChange' })

	const { user, isLoading } = useAuth()
	const { login, logout, register: registerAction } = useActions()

	const onSubmit = (data: any) => {
		if (type === 'register') registerAction(data)
		else login(data)

		// reset()
	}

	return (
		<div className={cn(styles.auth, { [styles.dark]: theme === 'dark' })}>
			<div className={`container ${styles.container}`}>
				<h2 className={`subtitle ${styles.auth__title}`}>
					{user ? 'Авторизация' : 'Регистрация'}
				</h2>
				<form className={styles.auth__form} onSubmit={handleSubmit(onSubmit)}>
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
					/>

					{!user && (
						<Field
							{...register('username', {
								required: 'Username is require'
							})}
							error={errors.username}
							placeholder='Username'
							type='text'
							mode={theme}
						/>
					)}
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
					/>

					<div className={styles.auth__buttons}>
						<button
							onClick={() => setType('login')}
							className={styles.auth__button}
						>
							Вход
						</button>
						<button
							onClick={() => setType('register')}
							className={`${styles.auth__button} ${styles.auth__button_register}`}
						>
							Регистрация
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}
export default Auth
