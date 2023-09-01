import { useBoilerManufact } from '@/hook/useBoilerMunfuctParts'
import { useActions } from '@/hook/useDispatch'
import { ICkeckFilters } from '@/shared/type/common'
import { Dispatch, FC, SetStateAction } from 'react'
import styles from './CatalogFilters.module.scss'

interface ICatalogFilterItem {
	item: ICkeckFilters
	setIsTouch: Dispatch<SetStateAction<boolean>>
	items?: any
	changePrice?: boolean
}

const CatalogFilterItem: FC<ICatalogFilterItem> = ({
	item,
	setIsTouch,
	items,
	changePrice
}) => {
	const { toggleChecked, anyCheckboxChecked } = useActions()
	const { manufacturerParts, boilerParts, isAnyCheckboxChecked } =
		useBoilerManufact()
	// const isAnyCheckboxCheckedItem = !boilerParts.some(item => item.checked)

	const handleChangeTouchedItem = (item: ICkeckFilters) => {
		toggleChecked(item)
		setIsTouch(false)
		anyCheckboxChecked()
		if (!isAnyCheckboxChecked) {
			if (!changePrice) {
				setIsTouch(true)
			}
		}
	}

	return (
		<label className={styles.accordion__label}>
			<input
				type='checkbox'
				checked={item.checked}
				onChange={() => handleChangeTouchedItem(item)}
				className={styles.accordion__input}
			/>
			<span className={styles.accordion__title}>{item.title}</span>
		</label>
	)
}
export default CatalogFilterItem
