'use client'
import CityButton from '@/component/ui/header/CityButton/CityButton'
import ModeToggler from '@/component/ui/mode/ModeToggler'
import useMediaQuery from '@/hook/useMediaQuery'
import { useMode } from '@/hook/useMode'
import { useOutside } from '@/hook/useOutside'
import cn from 'clsx'
import { FC } from 'react'

import dyamyc from 'next/dynamic'

import Link from 'next/link'
import PhoneSvg from '../../../ui/IconsSvg/header-icons/PhoneSvg'
import ProfileSvg from '../../../ui/IconsSvg/header-icons/ProfileSvg'
import styles from './HeaderTop.module.scss'
import Menu from './Menu/Menu'

const ProfileDynamic = dyamyc(() => import('./Profile/Profile'), { ssr: false })

const HeaderTop: FC = () => {
	const { theme } = useMode()
	const { isShow, ref, setIsShow } = useOutside(false)
	const showToggleHandler = () => setIsShow(!isShow)
	const tablet = useMediaQuery('(max-width: 992px)')

	console.log(theme)

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
						<ProfileDynamic refP={ref} setIsShow={setIsShow} />
					</div>
				</div>
				<div className={styles.header__actions}>
					<div className={`${styles.header__phone} ${styles.phone}`}>
						<Link className={styles.phone__action} href='to:+780955555555'>
							<PhoneSvg />
							<span>+7(8095) 555-55-55</span>
						</Link>
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
