import about1 from '@/assets/image/about/about-1.jpg'
import about2 from '@/assets/image/about/about-2.jpg'
import BreadcrumbsNew from '@/component/ui/breadbrambs/NewBreadcrumbs'
import Image from 'next/image'
import { FC } from 'react'
import styles from './AboutUs.module.scss'

const AboutUs: FC = () => {
	return (
		<div className={styles.about}>
			<div className={`container ${styles.about__container}`}>
				<BreadcrumbsNew />
				<div className={`subtitle ${styles.about__title}`}>О компании</div>
				<div className={styles.about__wrapper}>
					<div className={styles.about__content}>
						<p>
							{' '}
							Компания "АкваТермикс" предлагает Вам запасные части для
							европейских, корейских и отечественных газовых и электрических
							котлов. 99% запчастей представленных на сайте постоянно
							поддерживаются в наличии на нашем складе.
						</p>
						<p>
							Ассортимент интернет-магазина "АкваТермикс" включает в себя
							запасные части для котлов Arderia, Ariston, Baxi, Beretta, Bosch,
							Buderus, Chaffoteaux, De Dietrich, Demrad, Electrolux, Ferroli,
							Fondital, Immergas, Junkers, Koreastar, Nova Florida, Saunier
							Duval, Sime, Tiberis, Vaillant, Viessmann, Westen.
						</p>
					</div>
					<div className={styles.about__images}>
						<div className={styles.about__image}>
							<Image fill alt='' src={about1} />
						</div>
						<div className={styles.about__image}>
							<Image fill alt='' src={about2} />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
export default AboutUs
