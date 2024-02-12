import { FC } from 'react'
import LogoSvg from '../../../ui/IconsSvg/header-icons/LogoSvg'
import styles from './HeaderBottom.module.scss'

const Logo: FC = () => {
	return (
		<div className={styles.logo}>
			<LogoSvg />
			<span>
				Детали для <br /> газовых котлов
			</span>
		</div>
	)
}
export default Logo
