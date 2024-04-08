'use client'

import Skeleton from '@/component/ui/spinner/Spinner'
import { useMode } from '@/hook/useMode'
import { IBoilerPartsData } from '@/shared/type/user.interface'
import cn from 'clsx'
import { FC, LazyExoticComponent, Suspense, lazy } from 'react'
import Cart from './Cart/Cart'
import styles from './HeaderBottom.module.scss'
import Logo from './Logo'

const LazySearch: LazyExoticComponent<FC<{ initData: IBoilerPartsData[] }>> =
	lazy(() => import('@/component/ui/header/Search'))

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

				<div className={styles.select}>
					<Suspense fallback={<Skeleton width='100%' height='50px' />}>
						<LazySearch initData={initData} />
					</Suspense>
					{/* <Search initData={initData} /> */}
				</div>
				<Cart />
			</div>
		</div>
	)
}
export default HeaderBottom
