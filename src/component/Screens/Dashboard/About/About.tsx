import { useMode } from '@/hook/useMode'
import { FC } from 'react'
import styles from '../Dashboard.module.scss'

const About: FC = () => {
	const { theme } = useMode()
	return (
		<div className={`${styles.dashboard__block}`}>
			<h2 className={`subtitle ${styles.dashboard__subtitle}`}>О компании</h2>
			<div
				className={`text-small ${styles.dashboard__text} ${
					theme === 'dark' ? styles.dashboard__text_dark : ''
				}`}
			>
				<p>
					Инструкции и схемы помогут разобраться в эксплуатации, определить
					неисправность и правильно выбрать запчасть для ремонта Вашего газового
					оборудования. Купить запчасть, деталь для ремонта газового котла
					возможно в любом населенном пункте Российской Федерации: Осуществляем
					доставку запчасти к газовым котлам в следующие города: Москва, Сан
				</p>
			</div>
		</div>
	)
}
export default About
