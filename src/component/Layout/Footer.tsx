'use client'
import AccordionMy from '@/component/ui/accardion/AccordionMy'
import useMediaQuery from '@/hook/useMediaQuery'
import { paymentsImages, socialImages } from '@/utils/imagesPaths/footer'
import Image from 'next/image'
import { FC } from 'react'

import Logo from '../Header/HeaderBottom/Logo'
import EmailSvg from '../Header/header-icon/EmailSvg'
import LocationSvg from '../Header/header-icon/LocationSvg'
import PhoneSvg from '../Header/header-icon/PhoneSvg'
import styles from './Footer.module.scss'

const Footer: FC = () => {
	const query = useMediaQuery('(min-width: 768px)')
	const bigMobile = useMediaQuery('(max-width: 992px)')

	return (
		<div className={styles.footer}>
			<div className={`container ${styles.footer__container}`}>
				<div className={styles.footer__top}>
					<div className={styles.footer__logo}>
						<Logo />
					</div>
					<div className={styles.footer__blocks}>
						{query ? (
							<div className={styles.footer__block}>
								<div className={styles.footer__title}>Интернет магазин</div>
								<ul className={styles.footer__list}>
									<li className={styles.footer__item}>Каталог</li>
									<li className={styles.footer__item}>Доставка и оплата</li>
								</ul>
							</div>
						) : (
							<AccordionMy
								title='Интернет-магазин'
								titleClass={styles.accordion__title}
							>
								<ul className={styles.footer__list}>
									<li className={styles.footer__item}>Каталог</li>
									<li className={styles.footer__item}>Доставка и оплата</li>
								</ul>
							</AccordionMy>
						)}
						{query ? (
							<div className={styles.footer__block}>
								<div className={styles.footer__title}> Компания</div>
								<ul className={styles.footer__list}>
									<li className={styles.footer__item}>О компании</li>
									<li className={styles.footer__item}>Обратная связь</li>
									<li className={styles.footer__item}>Оптовым покупателям</li>
									<li className={styles.footer__item}>Контакты</li>
								</ul>
								{bigMobile && (
									<div className={styles.footer__content}>
										<div className={styles.footer__subtitle}>
											Мы принимаем к оплате:
										</div>
										<div className={styles.footer__payments}>
											{paymentsImages.map(item => (
												<div className={styles.footer__payment} key={item.src}>
													<Image
														src={item}
														width={25}
														height={12}
														alt='payment method'
													/>
												</div>
											))}
										</div>
									</div>
								)}
							</div>
						) : (
							<AccordionMy
								title='Компания'
								titleClass={styles.accordion__title}
							>
								<ul className={styles.footer__list}>
									<li className={styles.footer__item}>О компании</li>
									<li className={styles.footer__item}>Обратная связь</li>
									<li className={styles.footer__item}>Оптовым покупателям</li>
									<li className={styles.footer__item}>Контакты</li>
								</ul>
							</AccordionMy>
						)}
					</div>
					{query ? (
						<div className={styles.footer__block}>
							<div className={styles.footer__title}>Контакты</div>
							<ul className={styles.footer__list}>
								<li className={styles.footer__item}>
									<span>Наш адрес:</span>
									<a className={styles.footer__link}>
										<LocationSvg />
										г. Москва, ул. ... д....
									</a>
								</li>
								<li className={styles.footer__item}>
									<span>Наш контактный телефон:</span>
									<a className={styles.footer__link}>
										<PhoneSvg />
										+7(8095) 555-55-55E-mail:
									</a>
								</li>
								<li className={styles.footer__item}>
									<span>E-mail:</span>
									<a
										className={`${styles.footer__link} ${styles.footer__link_email} `}
									>
										<EmailSvg />
										info@zapchasti.com.ru
									</a>
								</li>
							</ul>
							{bigMobile && (
								<div className={styles.footer__content}>
									<div className={styles.footer__subtitle}>Мы в соцсети:</div>
									<div className={styles.footer__payments}>
										{socialImages.map(item => (
											<Image
												key={item.src}
												src={item}
												width={32}
												height={32}
												alt='socials'
											/>
										))}
									</div>
								</div>
							)}
						</div>
					) : (
						<AccordionMy title='Контакты' titleClass={styles.accordion__title}>
							<ul className={styles.footer__list}>
								<li className={styles.footer__item}>
									<span>Наш адрес:</span>
									<a className={styles.footer__link}>
										<LocationSvg />
										г. Москва, ул. ... д....
									</a>
								</li>
								<li className={styles.footer__item}>
									<span>Наш контактный телефон:</span>
									<a className={styles.footer__link}>
										<PhoneSvg />
										+7(8095) 555-55-55E-mail:
									</a>
								</li>
								<li className={styles.footer__item}>
									<span>E-mail:</span>
									<a
										className={`${styles.footer__link} ${styles.footer__link_email} `}
									>
										<EmailSvg />
										info@zapchasti.com.ru
									</a>
								</li>
							</ul>
						</AccordionMy>
					)}
				</div>
				{(!bigMobile && query) ||
					(bigMobile && !query && (
						<div
							className={`${styles.footer__bottom} ${styles.footer__bottom_dynamic}`}
						>
							<div className={styles.footer__content}>
								<div className={styles.footer__subtitle}>
									Мы принимаем к оплате:
								</div>
								<div className={styles.footer__payments}>
									{paymentsImages.map(item => (
										<div className={styles.footer__payment} key={item.src}>
											<Image
												src={item}
												width={25}
												height={12}
												alt='payment method'
											/>
										</div>
									))}
								</div>
							</div>
							<div className={styles.footer__content}>
								<div className={styles.footer__subtitle}>Мы в соцсети:</div>
								<div className={styles.footer__payments}>
									{socialImages.map(item => (
										<Image src={item} width={32} height={32} alt='socials' />
									))}
								</div>
							</div>
						</div>
					))}
				<div className={styles.footer__copy}>
					<span>© «Детали для газовых котлов» 2021.</span>
				</div>
			</div>
		</div>
	)
}
export default Footer
