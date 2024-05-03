import { useActions } from '@/hook/useDispatch'
import { useMode } from '@/hook/useMode'
import cn from 'clsx'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { FC } from 'react'
import DeleteChange from '../../../ui/IconsSvg/catalog-icons/DeleteChange'
import { useCatalogPage } from '../CatalogPage/useCatalogPage'
import styles from './CatalogHeader.module.scss'
import { ICatalogHeader } from './catalog-header.interface'

const CatalogHeader: FC<ICatalogHeader> = ({ items, title }) => {
	const searchParams = useSearchParams()!

	const { removeItem } = useActions()
	const { uploadNewParams } = useCatalogPage()
	const { theme } = useMode()
	const pathName = usePathname()
	const { replace, push } = useRouter()

	const selectedItems = items?.filter(item => item.checked)

	const handleRemoveItem = (title: string) => {
		removeItem({ title })

		const updatedSearchParams = new URLSearchParams(searchParams.toString())
		const currentValuesBoilers: string[] =
			updatedSearchParams.getAll('boilerManufacturer')

		const filteredBoilers =
			currentValuesBoilers.length &&
			JSON.parse(currentValuesBoilers[0]).filter(
				(value: string) => value !== title
			)

		const currentValuesParts = updatedSearchParams.getAll('partsManufacturer')

		const filteredParts =
			currentValuesParts.length &&
			JSON.parse(currentValuesParts[0]).filter(
				(value: string) => value !== title
			)

		console.log('filteredBoilers', filteredBoilers)
		console.log('currentValuesParts', currentValuesParts)

		if (filteredBoilers.length || filteredParts.length) {
			// Если есть, устанавливаем или обновляем соответствующие параметры запроса
			if (filteredBoilers.length) {
				updatedSearchParams.set(
					'boilerManufacturer',
					JSON.stringify(filteredBoilers)
				)
			} else {
				updatedSearchParams.delete('boilerManufacturer')
			}

			if (filteredParts.length) {
				updatedSearchParams.set(
					'partsManufacturer',
					JSON.stringify(filteredParts)
				)
			} else {
				updatedSearchParams.delete('partsManufacturer')
			}
		} else {
			// Если ничего не нужно добавлять, удаляем параметры из запроса
			updatedSearchParams.delete('boilerManufacturer')
			updatedSearchParams.delete('partsManufacturer')
		}

		replace(pathName + '?' + updatedSearchParams.toString())
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
							<button onClick={() => handleRemoveItem(item.title)}>
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
