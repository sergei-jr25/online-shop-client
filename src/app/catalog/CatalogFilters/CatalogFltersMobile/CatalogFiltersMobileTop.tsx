import { FC } from 'react'
import CataloArrowSvg from '../../CatalogIcons/CataloArrowSvg'
import styles from './CatalogFiltersMobile.module.scss'

interface ICatalogFiltersMobileTop {
	title: string
	titleBtnReset?: string
	closeFilter: () => void
	resetFilters: () => void
	resetBoiler(): () => void
	disabled: boolean
}

const CatalogFiltersMobileTop: FC<ICatalogFiltersMobileTop> = ({
	closeFilter,
	title,
	titleBtnReset,
	resetFilters,
	resetBoiler,
	disabled
}) => {
	console.log('disabled', disabled)

	return (
		<div className={styles.mobile__header}>
			<button onClick={closeFilter} className={styles.mobile__title}>
				<CataloArrowSvg />
				<span>{title}</span>
			</button>

			<button
				className={styles.mobile__button}
				onClick={resetFilters}
				disabled={disabled}
			>
				{titleBtnReset}
			</button>
		</div>
	)
}
export default CatalogFiltersMobileTop
