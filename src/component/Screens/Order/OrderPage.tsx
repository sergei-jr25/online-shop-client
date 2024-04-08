'use client'

import CheckSvg from '@/component/ui/IconsSvg/CheckSvg'
import EditSvg from '@/component/ui/IconsSvg/EditSvg'
import CartItemPopup from '@/component/ui/cart/CartItem'
import { useAuth } from '@/hook/useAuth'

import CartSvg from '@/component/ui/IconsSvg/header-icons/CartSvg'
import Checkbox from '@/component/ui/checkbox/Checkbox'
import { useMode } from '@/hook/useMode'
import { api } from '@/service/api/api'
import { calculateTotalPrice } from '@/utils/calculateTotalPrice'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { FC, useState } from 'react'
import styles from './OrderPage.module.scss'

const OrderItemsDynamic = dynamic(() => import('./OrderItems'), { ssr: false })

const OrderPage: FC = () => {
	const { user } = useAuth()
	const { data = [], isFetching } = api.useGetCartProductsQuery(user?.id, {
		skip: !user
	})
	const { theme } = useMode()
	const { push } = useRouter()
	const [isEdit, SetIsEdit] = useState(true)
	const [isAgreement, setIsAgreement] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const handleEditFalse = () => {
		SetIsEdit(false)
	}
	const handleEditTrue = () => {
		SetIsEdit(true)
	}

	const handleAgreemnt = () => {
		setIsAgreement(!isAgreement)
	}

	const handleSumbit = () => {
		if (!user) push('/auth')
		setIsLoading(true)
	}
	const totalPrice = calculateTotalPrice(data)

	const isDisabled = !data.length || !isAgreement || isEdit

	return (
		<div
			className={`${styles.order} ${theme === 'dark' ? styles.order_dark : ''}`}
		>
			<div className={`container ${styles.order__container}`}>
				<h1 className={styles.order__title}>Оформление заказа</h1>
				<div className={styles.order__wrapper}>
					<div className={styles.order__content}>
						<div className={styles.order__header}>
							<div className={styles.order__cart}>
								{!isEdit && (
									<span className={styles.order__cart_check}>
										<CheckSvg />
									</span>
								)}
								<CartSvg />
								<span>Корзина</span>
							</div>
							<button
								className={styles.order__edit}
								onClick={handleEditTrue}
								disabled={isEdit}
							>
								<EditSvg />
								<span>₽едактировать</span>
							</button>
						</div>
						{isEdit && (
							<div className={styles.order__body}>
								<div className={styles.order__items}>
									<OrderItemsDynamic data={data} />
								</div>
								<div className={styles.order__sum}>
									<div className={styles.order__info}>
										<div className={styles.order__text}>Сумма заказа:</div>
										<div className={styles.order__totalPrice}>
											{totalPrice} ₽
										</div>
									</div>
									<button
										className={styles.order__button}
										onClick={handleEditFalse}
										disabled={!data.length}
									>
										Продолжить
									</button>
								</div>
							</div>
						)}
					</div>
					<div className={styles.order__footer}>
						<div className={styles.order__block}>
							<div className={styles.order__total}>Итого</div>
						</div>
						<div className={styles.order__block}>
							<ul className={styles.order__list}>
								{data.length ? (
									data.map(item => (
										<li className={styles.order__item} key={item.id}>
											<CartItemPopup item={item} isFetching={isFetching} />
										</li>
									))
								) : (
									<li>Товаров нет</li>
								)}
							</ul>
						</div>
						<div className={styles.order__block}>
							<div className={styles.order__value}>На сумму</div>
							<h3 className={styles.order__price}>{totalPrice} ₽</h3>
						</div>
						<button
							className={`${styles.order__submit} ${
								!isDisabled ? styles.order__submit_ready : ''
							}  `}
							disabled={isDisabled}
							onClick={handleSumbit}
						>
							Оформить заказ
						</button>
						{isLoading && (
							<div className={styles.spinner}>
								<div className={styles.circle}></div>
							</div>
						)}

						<Checkbox
							handleChange={handleAgreemnt}
							isChecked={isAgreement}
							title='Согласен с условиями Правил пользования торговой площадкой и
								правилами возврата'
						/>
					</div>
				</div>
			</div>
		</div>
	)
}
export default OrderPage
