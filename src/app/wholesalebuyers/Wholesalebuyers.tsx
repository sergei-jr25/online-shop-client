'use client'

import BreadcrumbsNew from '@/component/ui/breadbrambs/NewBreadcrumbs'
import Feedback from '@/component/ui/Feedback/Feedback'
import emailjs from '@emailjs/browser'
import { FC, useState } from 'react'
import styles from './Wholesalebuyers.module.scss'

const Wholesalebuyers: FC = () => {
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
		<div className={styles.buyers}>
			<div className={`container ${styles.buyers__container}`}>
				<BreadcrumbsNew />
				<h2 className={`subtitle ${styles.buyers__title}`}>
					Оптовым покупателям
				</h2>
				<div className={styles.buyers__wrapper}>
					<div className={styles.buyers__content}>
						<p>
							Условия оптовых заказов решаются индивидуально по телефону:{' '}
							<a href='tel:+75555555555'>+7 (555) 55-55-555 </a>{' '}
						</p>
						<p>
							Либо опишите суть заказа в форме обратной связи и мы с вами
							свяжемся.
						</p>
					</div>

					<Feedback onSubmit={handleSubmit} />
				</div>
			</div>
		</div>
	)
}
export default Wholesalebuyers
