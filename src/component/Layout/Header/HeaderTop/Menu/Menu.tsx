import { useOutside } from '@/hook/useOutside'
import cn from 'clsx'
import Link from 'next/link'
import { FC } from 'react'
import styles from '../HeaderTop.module.scss'

const Menu: FC = () => {
	const { isShow, ref, setIsShow } = useOutside(false)
	const showToggleHandler = () => setIsShow(!isShow)
	return (
		<div>
			<div className={styles.menu}>
				<button
					type='button'
					className={cn(styles.icon_menu, styles.menu__icon, {
						[styles.icon_menu_open]: isShow
					})}
					onClick={showToggleHandler}
					ref={ref}
				>
					<span></span>
					<span></span>
					<span></span>
				</button>
				<nav
					className={cn(styles.menu__nav, { [styles.menu__nav_open]: isShow })}
				>
					<ul className={styles.menu__list}>
						<li className={styles.menu__item}>
							<Link className={styles.menu__link} href={'/catalog'}>
								Доставка товаров
							</Link>
						</li>
						<li>
							<Link className={styles.menu__link} href={'/about-us'}>
								О компании
							</Link>
						</li>
						<li>
							<Link className={styles.menu__link} href={'/contacts'}>
								Контакты
							</Link>
						</li>
						<li>
							<Link className={styles.menu__link} href={'/wholesalebuyers'}>
								Оптовым покупателям
							</Link>
						</li>
					</ul>
				</nav>
			</div>
		</div>
	)
}
export default Menu
