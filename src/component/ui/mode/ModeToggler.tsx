'use client'

import { useActions } from '@/hook/useDispatch'
import { useMode } from '@/hook/useMode'
import cn from 'clsx'
import { FC, useEffect } from 'react'
import LightSvg from '../IconsSvg/LightSvg'
import NightSvg from '../IconsSvg/NightSvg'
import styles from './ModeToggler.module.scss'

const ModeToggler: FC = () => {
	const { theme } = useMode()
	const { toggleTheme } = useActions()

	const handleToggleMode = () => {
		toggleTheme()
		document.body.classList.toggle('dark__mode')
	}

	useEffect(() => {
		document.body.classList.add(theme === 'dark' ? 'dark__mode' : 'body')
	}, [theme])
	return (
		<div
			className={cn(styles.mode, {
				[styles.mode_dark]: theme === 'dark',
				[styles.mode_light]: theme === 'light'
			})}
		>
			<label className={styles.mode__label}>
				<input
					type='checkbox'
					checked={theme === 'dark'}
					className={styles.mode__input}
					onChange={handleToggleMode}
				/>
				<div
					className={`${styles.mode__toggler} ${
						theme === 'dark' ? styles.toggler_dark : ''
					}`}
				>
					{theme === 'dark' ? <NightSvg /> : <LightSvg />}
				</div>
			</label>
		</div>
	)
}
export default ModeToggler
