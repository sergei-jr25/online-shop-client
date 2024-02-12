import { useActions } from '@/hook/useDispatch'
import { IManufacturesBlock } from '@/shared/type/catalog.interface'
import { FC } from 'react'
import DeleteChange from '../Catalog-icons/DeleteChange'
import styles from '../Catalog.module.scss'
const ManufacturesBlock: FC<IManufacturesBlock> = ({
	items,
	title,
	setIsTouch,
	setRangePrice
}) => {
	const { removeBoiler } = useActions()

	const boiler = items?.filter(item => {
		return item.checked && [...items, item.checked]
	})

	const handleChangeTouched = (id: string) => {
		boiler?.filter(item => {
			removeBoiler({ id })
			// return item.checked ? setIsTouch(true) : setIsTouch(false)
		})
	}

	return (
		<div className={styles.filter}>
			<div className={styles.filter__title}>{title}</div>
			<div className={styles.filter__block}>
				<div className={styles.filter__items}>
					{boiler?.map(item => (
						<div key={item.id} className={styles.filter__item}>
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
export default ManufacturesBlock
