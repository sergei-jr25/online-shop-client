'use client'

import Search from '@/component/ui/header/Search'
import { useMode } from '@/hook/useMode'
import cn from 'clsx'
import { FC } from 'react'
import Cart from './Cart/Cart'
import styles from './HeaderBottom.module.scss'
import Logo from './Logo'

const HeaderBottom: FC = () => {
	const { theme } = useMode()
	// const {} = usePopup()

	return (
		<div
			className={cn(styles.header, {
				[styles.dark]: theme === 'dark',
				[styles.light]: theme === 'light'
			})}
		>
			<div className={`container ${styles.container}`}>
				<Logo />
				{/* <Search /> */}
				<div className={styles.select}>
					<Search />
				</div>
				<Cart />
			</div>
		</div>
	)
}
export default HeaderBottom
