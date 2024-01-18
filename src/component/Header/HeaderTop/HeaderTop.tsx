'use client'
import CityButton from '@/component/ui/header/CityButton/CityButton'
import ModeToggler from '@/component/ui/mode/ModeToggler'
import useMediaQuery from '@/hook/useMediaQuery'
import { useMode } from '@/hook/useMode'
import { useOutside } from '@/hook/useOutside'
import cn from 'clsx'
import { FC, useRef } from 'react'
import PhoneSvg from '../header-icon/PhoneSvg'
import ProfileSvg from '../header-icon/ProfileSvg'
import styles from './HeaderTop.module.scss'
import Menu from './Menu/Menu'
import Profile from './Profile/Profile'

const HeaderTop: FC = () => {
	const { theme } = useMode()
	const { isShow, ref, setIsShow } = useOutside(false)
	const showToggleHandler = () => setIsShow(!isShow)
	const tablet = useMediaQuery('(max-width: 992px)')

	const refMenuButton = useRef()

	return (
		<div
			className={cn(styles.header, {
				[styles.header_dark]: theme === 'dark',
				[styles.header_light]: theme === 'light'
			})}
		>
			<div className={`container ${styles.header__container}`}>
				<div className={styles.header__location}>
					<CityButton />
				</div>
				{tablet && (
					<div className={styles.header__toggler}>
						<ModeToggler />
					</div>
				)}
				<div className={styles.header__menu}>
					<Menu />
				</div>
				<div className={`${styles.header__profile} ${styles.profile}`}>
					<div
						className={styles.profile__icon}
						onClick={showToggleHandler}
						ref={ref}
					>
						<ProfileSvg />
					</div>
					<div
						className={cn(styles.profile__content, {
							[styles.profile__content_show]: isShow
						})}
					>
						<Profile refP={ref} />
					</div>
				</div>
				<div className={styles.header__actions}>
					<div className={`${styles.header__phone} ${styles.phone}`}>
						<a className={styles.phone__action} href='to:+780955555555'>
							<PhoneSvg />
							<span>+7(8095) 555-55-55</span>
						</a>
					</div>
					{!tablet && (
						<div className={styles.header__toggler}>
							<ModeToggler />
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
export default HeaderTop
