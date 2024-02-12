'use client'

import CheckSvg from '@/component/ui/IconsSvg/CheckSvg'
import EditSvg from '@/component/ui/IconsSvg/EditSvg'
import { useAuth } from '@/hook/useAuth'

import CartSvg from '@/component/ui/IconsSvg/header-icons/CartSvg'
import { useCart } from '@/hook/useCart'
import { useActions } from '@/hook/useDispatch'
import { useRouter } from 'next/navigation'
import { FC, useEffect, useState } from 'react'
import OrderItems from './OrderItems'
import styles from './OrderPage.module.scss'

const OrderPage: FC = () => {
	const { user } = useAuth()
	const { items, totalPrice: summTotalPrice, totalCount } = useCart()
	const { push } = useRouter()
	const [isEdit, SetIsEdit] = useState(true)
	const [isAgreement, setIsAgreement] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const { setTotalPrice, countQuantity, removeToCart } = useActions()

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

	useEffect(() => {
		setTotalPrice()
	}, [items])

	useEffect(() => {
		countQuantity()
	}, [items])

	return (
		<div className={`container ${styles.order__container}`}>
			<h1 className={styles.order__title}>Оформление заказа</h1>
			<div className={styles.order__wrapper}>
				<div className={styles.order__content}>
					<div className={styles.order__header}>
						<button className={styles.order__cart}>
							{!isEdit && (
								<span className={styles.order__cart_check}>
									<CheckSvg />
								</span>
							)}
							<CartSvg />
							<span>Корзина</span>
						</button>
						<button className={styles.order__edit} onClick={handleEditTrue}>
							<EditSvg />
							<span>Редактировать</span>
						</button>
					</div>
					{isEdit && (
						<div className={styles.order__body}>
							<div className={styles.order__items}>
								<OrderItems data={items} />
							</div>
							<div className={styles.order__sum}>
								<div className={styles.order__info}>
									<div className={styles.order__text}>Сумма заказа:</div>
									<div className={styles.order__totalPrice}>
										{summTotalPrice} Р
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
						<div className={styles.order__value}>Товары {items?.length}</div>
						<div className={styles.order__price}>{summTotalPrice} Р</div>
					</div>
					<div className={styles.order__block}>
						<div className={styles.order__value}>На сумму</div>
						<h3 className={styles.order__price}>{summTotalPrice} Р</h3>
					</div>
					<button
						className={`${styles.order__submit} ${
							isAgreement && !!items.length && styles.order__submit_ready
						}  `}
						disabled={!items.length && !isAgreement}
						onClick={handleSumbit}
					>
						Оформить заказ
					</button>
					{isLoading && (
						<div className={styles.spinner}>
							<div className={styles.circle}></div>
						</div>
					)}
					<label className={styles.order__label}>
						<input type='checkbox' onChange={handleAgreemnt} />
						<span className={styles.order__agreement}>
							Согласен с условиями Правил пользования торговой площадкой и
							правилами возврата
						</span>
					</label>
				</div>
			</div>
		</div>
	)
}
export default OrderPage
