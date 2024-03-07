'use client'

import Feedback from '@/component/Screens/Feedback/Feedback'
import emailjs from '@emailjs/browser'
import { FC, useState } from 'react'
import styles from './Contacts.module.scss'
const Contacts: FC = () => {
	const [loading, setLoading] = useState(false)
	const handleSubmit = (data: any) => {
		// e.preventDefault()
		setLoading(true)
		emailjs
			.send('service_ufi0q5q', 'template_oifpizw', data, 'v3gsfTXl7BX89OAVk')
			.then(response => {
				setLoading(false)
				console.log('SUCCESS!', response.status, response.text)
			})
			.catch(e => {
				console.log(e)
			})
	}

	return (
		<div className={styles.contacts}>
			<div className={`container ${styles.contacts__container}`}>
				<h2 className={`subtitle ${styles.contacts__title}`}>Контакты</h2>
				<div className={styles.contacts__wrapper}>
					<div className={styles.contacts__content}>
						<h3 className={`subtitle ${styles.contacts__subtitle}`}>
							Контакты
						</h3>
						<ul className={styles.contacts__list}>
							<li className={styles.contacts__item}>
								<span className={styles.contacts__text}>Офис:</span>
								<span className={styles.contacts__value}>
									г. Москва, ул. ... д....{' '}
								</span>
							</li>
							<li className={styles.contacts__item}>
								<span className={styles.contacts__text}>Склад:</span>
								<span className={styles.contacts__value}>
									г. Москва, ул. ... д....{' '}
								</span>
							</li>
							<li className={styles.contacts__item}>
								<span className={styles.contacts__text}>
									График работы офиса:
								</span>
								<span className={styles.contacts__value}>
									пн-пс: с 8:00 до 22:00
								</span>
							</li>
							<li className={styles.contacts__item}>
								<span className={styles.contacts__text}>
									Наш контактный телефон:
								</span>
								<span className={styles.contacts__value}>
									+7(8095) 555-55-55
								</span>
							</li>
							<li className={styles.contacts__item}>
								<span className={styles.contacts__text}>
									Время приемок завок:
								</span>
								<span className={styles.contacts__value}>
									Пн-Вс: с 8:00 до 22:00
								</span>
							</li>
							<li className={styles.contacts__item}>
								<span className={styles.contacts__text}>
									Прием заказов электронным способом на сайте:
								</span>
								<span className={styles.contacts__value}>круглосуточно</span>
							</li>
							<li className={styles.contacts__item}>
								<span className={styles.contacts__text}>E-mail:</span>
								<span className={styles.contacts__value}>
									info@zapchasti.com.ru
								</span>
							</li>
						</ul>
					</div>
					<Feedback onSubmit={handleSubmit} />
				</div>
			</div>
		</div>
	)
}
export default Contacts
