'use client'

import CheckSvg from '@/component/ui/IconsSvg/CheckSvg'
import EditSvg from '@/component/ui/IconsSvg/EditSvg'
import { useAuth } from '@/hook/useAuth'

import CartSvg from '@/component/ui/IconsSvg/header-icons/CartSvg'
import Checkbox from '@/component/ui/checkbox/Checkbox'
import { useCart } from '@/hook/useCart'
import { useActions } from '@/hook/useDispatch'
import { useMode } from '@/hook/useMode'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { FC, useEffect, useState } from 'react'
import styles from './OrderPage.module.scss'
import { OrderPageQuantityDynamic } from './OrderPageQuantity'

const OrderItemsDynamic = dynamic(() => import('./OrderItems'), { ssr: false })

const OrderPage: FC = () => {
	const { user } = useAuth()
	const { items, totalPrice: summTotalPrice } = useCart()
	const { theme } = useMode()
	const { push } = useRouter()
	const [isEdit, SetIsEdit] = useState(true)
	const [isAgreement, setIsAgreement] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const { setTotalPrice, countQuantity } = useActions()

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
	console.log(user)

	useEffect(() => {
		setTotalPrice()
		countQuantity()
	}, [items])

	const isDisabled = !items.length || !isAgreement || isEdit

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
									<OrderItemsDynamic data={items} />
								</div>
								<div className={styles.order__sum}>
									<div className={styles.order__info}>
										<div className={styles.order__text}>Сумма заказа:</div>
										<div className={styles.order__totalPrice}>
											{summTotalPrice} ₽
										</div>
									</div>
									<button
										className={styles.order__button}
										onClick={handleEditFalse}
										disabled={!items.length}
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
							<OrderPageQuantityDynamic length={items.length} />
							<div className={styles.order__price}>{summTotalPrice} ₽</div>
						</div>
						<div className={styles.order__block}>
							<div className={styles.order__value}>На сумму</div>
							<h3 className={styles.order__price}>{summTotalPrice} ₽</h3>
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
