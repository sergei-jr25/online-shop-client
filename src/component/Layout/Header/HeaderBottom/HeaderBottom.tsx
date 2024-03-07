'use client'

import Search from '@/component/ui/header/Search'
import { useMode } from '@/hook/useMode'
import { IBoilerPartsData } from '@/shared/type/user.interface'
import cn from 'clsx'
import dynamic from 'next/dynamic'
import { FC } from 'react'
import styles from './HeaderBottom.module.scss'
import Logo from './Logo'

const CartDynamic = dynamic(() => import('./Cart/Cart'), { ssr: false })
const HeaderBottom: FC<{ initData: IBoilerPartsData[] }> = ({ initData }) => {
	const { theme } = useMode()

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
					<Search initData={initData} />
				</div>
				<CartDynamic />
				{/* <Cart /> */}
			</div>
		</div>
	)
}
export default HeaderBottom
