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
		<div className={cn(styles.mode, { [styles.toggle]: theme === 'light' })}>
			<label>
				{/* <div className={styles.check}></div> */}
				<input
					type='checkbox'
					checked={theme === 'dark'}
					className={styles.input}
					onChange={handleToggleMode}
				/>
				<div className={styles.toggler}>
					{theme === 'dark' ? <NightSvg /> : <LightSvg />}
				</div>
			</label>
		</div>
	)
}
export default ModeToggler
