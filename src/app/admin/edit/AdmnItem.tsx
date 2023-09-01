import DeleteSvg from '@/component/ui/IconsSvg/DeleteSvg'
import EditSvg from '@/component/ui/IconsSvg/EditSvg'
import { apiBoilerParts } from '@/service/api/boiderl-parts'
import { IBoilerPartsData } from '@/shared/type/user.interface'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { FC } from 'react'
import styles from './EditAdmin.module.scss'

const AdmnItem: FC<{ item: IBoilerPartsData }> = ({ item }) => {
	const pahtName = usePathname()

	const { push, replace } = useRouter()
	const [remove] = apiBoilerParts.useDeleteMutation()
	// const image = JSON.parse(item.images)
	return (
		<div className={styles.admin__item}>
			<Image
				width={100}
				height={100}
				src={item.images}
				unoptimized
				alt={item.name}
			/>
			<div className={styles.admin__name}>{item.name}</div>
			<div className={styles.admin__boiler}>{item.boilerManufacturer}</div>
			<div className={styles.admin__parts}>{item.partsManufacturer}</div>
			<div className={styles.admin__vendor}>{item.vendorCode}</div>
			<div className={styles.admin__prrice}>{item.price}</div>
			<div className={styles.admin__stock}>{item.inStock}</div>
			<div className={styles.admin__popularity}>{item.popularity}</div>
			<div className={styles.admin__compatibility}>{item.compatibility}</div>
			<div className={styles.admin__new}>{item.new}</div>
			<div className={styles.admin__bestsellers}>{item.bestsellers}</div>
			<div className={styles.admin__actions}>
				<button onClick={() => push(pahtName + '/' + item.id)}>
					<EditSvg />
				</button>
				<button onClick={() => remove(item.id)}>
					<DeleteSvg />
				</button>
			</div>
		</div>
	)
}
export default AdmnItem
