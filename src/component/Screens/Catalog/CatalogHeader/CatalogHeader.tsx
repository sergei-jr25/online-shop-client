import { useActions } from '@/hook/useDispatch'
import { useMode } from '@/hook/useMode'
import cn from 'clsx'
import { FC } from 'react'
import DeleteChange from '../../../ui/IconsSvg/catalog-icons/DeleteChange'
import styles from './CatalogHeader.module.scss'
import { ICatalogHeader } from './catalog-header.interface'

const CatalogHeader: FC<ICatalogHeader> = ({ items, title }) => {
	const { removeBoiler, removeParts, resetFiltersBoilerParts } = useActions()
	const { theme } = useMode()

	const selectedItems = items?.filter(item => item.checked)

	const handleChangeTouched = (id: string) => {
		selectedItems?.filter(item => {
			resetFiltersBoilerParts()
		})
	}

	return (
		<div
			className={cn(styles.catalogHeader, {
				[styles.catalogHeader_dark]: theme === 'dark'
			})}
		>
			<div className={styles.catalogHeader__title}>{title}</div>
			<div className={styles.catalogHeader__block}>
				<div className={styles.catalogHeader__items}>
					{selectedItems?.map(item => (
						<div key={item.id} className={styles.catalogHeader__item}>
							{item.title}
							<button onClick={() => handleChangeTouched(item.id)}>
								<DeleteChange />
							</button>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
export default CatalogHeader
