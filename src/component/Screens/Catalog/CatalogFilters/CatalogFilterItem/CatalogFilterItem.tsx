import Checkbox from '@/component/ui/checkbox/Checkbox'
import { useBoilerManufact } from '@/hook/useBoilerMunfuctParts'
import { useActions } from '@/hook/useDispatch'
import { ICkeckFilters } from '@/shared/type/common'
import { FC } from 'react'

interface ICatalogFilterItem {
	item: ICkeckFilters

	isChangePrice: boolean
}

const CatalogFilterItem: FC<ICatalogFilterItem> = ({
	item,

	isChangePrice
}) => {
	const { toggleChecked, setTouchFilter } = useActions()
	const { isAnyCheckboxChecked } = useBoilerManufact()

	const handleCheckboxChange = () => {
		toggleChecked({ item: item, type: 'boiler' })
		toggleChecked({ item: item, type: 'parts' })
		setTouchFilter({ flag: false })

		if (!isAnyCheckboxChecked) {
			if (!isChangePrice) {
				setTouchFilter({ flag: true })
			}
		}
	}

	return (
		<Checkbox
			handleChange={handleCheckboxChange}
			isChecked={item.checked}
			title={item.title}
		/>
	)
}
export default CatalogFilterItem
