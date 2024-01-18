'use client'

import CheckSvg from '@/component/ui/IconsSvg/CheckSvg'
import EditSvg from '@/component/ui/IconsSvg/EditSvg'
import { useAuth } from '@/hook/useAuth'
import { api } from '@/service/api/api'

import CartSvg from '@/component/Header/header-icon/CartSvg'
import { FC, useEffect, useState } from 'react'
import OrderItems from './OrderItems'
import styles from './OrderPage.module.scss'

const OrderPage: FC = () => {
	const { user } = useAuth()

	const { data = [] } = api.useGetCartProductsQuery(user?.id, { skip: !user })

	const [removeToCart] = api.useRemoveMutation()

	const [isEdit, isSetEdit] = useState(true)
	const [isAgreement, setIsAgreement] = useState(false)
	const [totalPrice, setTotalPrice] = useState(0)

	const idDisabled = isAgreement && !!!data.length

	const handleNextStep = () => {
		isSetEdit(false)
	}

	useEffect(() => {
		setTotalPrice(data.reduce((acc, item) => (acc += item.totalPrice), 0))
	}, [data])

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
						<button
							className={styles.order__edit}
							onClick={() => isSetEdit(true)}
						>
							<EditSvg />
							<span>Редактировать</span>
						</button>
					</div>
					{isEdit && (
						<div className={styles.order__body}>
							<div className={styles.order__items}>
								<OrderItems data={data} removeToCart={removeToCart} />
							</div>
							<div className={styles.order__sum}>
								<div className={styles.order__info}>
									<div className={styles.order__text}>Сумма заказа:</div>
									<div className={styles.order__totalPrice}>{totalPrice} Р</div>
								</div>
								<button
									className={styles.order__button}
									onClick={handleNextStep}
									disabled={!!!data.length}
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
						<div className={styles.order__value}>Товары {data.length}</div>
						<div className={styles.order__price}>{totalPrice} Р</div>
					</div>
					<div className={styles.order__block}>
						<div className={styles.order__value}>На сумму</div>
						<h3 className={styles.order__price}>{totalPrice} Р</h3>
					</div>
					<button
						className={`${styles.order__submit} ${
							isAgreement && !!data.length && styles.order__submit_ready
						}  `}
						disabled={!data.length && !isAgreement}
						// onClick={() => isSetEdit(false)}
					>
						Оформить заказ
					</button>
					<label className={styles.order__label}>
						<input
							type='checkbox'
							onChange={() => setIsAgreement(!isAgreement)}
						/>
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
