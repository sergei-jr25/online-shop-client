'use client'
import 'swiper/css'

import BreadcrumbsNew from '@/component/ui/breadbrambs/NewBreadcrumbs'
import { useAuth } from '@/hook/useAuth'
import { useMode } from '@/hook/useMode'
import { useRedirectAuthPage } from '@/hook/useRedirectAuthPage'
import { api } from '@/service/api/api'
import { ICart } from '@/shared/type/cart.interface'
import { IBoilerPartsData } from '@/shared/type/user.interface'
import { FC, useCallback, useState } from 'react'
import About from './About/About'
import Bestsellers from './Bestsellers/Bestsellers'
import Brands from './Brands/Brands'
import CartAction from './CartAction/CartAction'
import styles from './Dashboard.module.scss'
import New from './New/New'

interface IDashboard {
	bestsellers: IBoilerPartsData[]
	news: IBoilerPartsData[]
}

const Dashboard: FC<IDashboard> = ({ bestsellers, news }) => {
	const { shouldLoadContent } = useRedirectAuthPage()

	const getDefaultTextGenerator = useCallback(() => '', [])
	const getTextGenerator = useCallback((param: string) => '', [])

	const { user } = useAuth()

	const { theme } = useMode()

	const { isLoading, data: carts = [] as ICart[] } =
		api.useGetCartProductsQuery(user?.id, { skip: !user })
	const [shouldCartAction, setShouldCartAction] = useState(true)

	const actionCartClose = () => {
		setShouldCartAction(false)
	}

	const sumProductCart = carts.reduce((acc, cart) => {
		acc += cart.price
		return acc
	}, 0)

	return (
		<div
			className={`${styles.dashboard} ${theme === 'dark' ? styles.dark : ''}`}
		>
			<div className={`container ${styles.dashboard__container}`}>
				<div>
					<BreadcrumbsNew />
				</div>
				{shouldCartAction && (
					<div className={styles.dashboard__info}>
						<CartAction
							count={carts.length}
							handleClick={actionCartClose}
							price={sumProductCart}
						/>
					</div>
				)}
				<h1 className={`title ${styles.dashboard__title}`}>
					Детали для газовых котлов
				</h1>

				<div className={styles.dashboard__blocks}>
					<Brands />
					<Bestsellers bestsellers={bestsellers} />
					<New news={news} />
					<About />
				</div>
			</div>
		</div>
	)
}
export default Dashboard
