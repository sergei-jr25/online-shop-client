import { useDebunce } from '@/hook/useDebunce'
import { apiBoilerParts } from '@/service/api/boiderl-parts'
import { IBoilerPartsData } from '@/shared/type/user.interface'
import { FC, useState } from 'react'
import SearchSelect from '../../shared/components/SearchSelect/SearchSelect'
import styles from './Search.module.scss'

const Search: FC<{ initData: IBoilerPartsData[] }> = ({ initData }) => {
	const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false)

	const [searchTerm, setSearchTerm] = useState<string>('')

	const { debaunced } = useDebunce(searchTerm, 500)

	const { data: boilers = [] as IBoilerPartsData[], isFetching } =
		apiBoilerParts.useGetSearchQuery(debaunced)

	const dataValue = boilers.length ? boilers : initData || []

	return (
		<div
			className={`${styles.search} ${isSelectOpen ? styles.search__open : ''}`}
		>
			<SearchSelect
				setIsSelectOpen={setIsSelectOpen}
				data={dataValue}
				setSearchTerm={setSearchTerm}
				isFetching={false}
			/>
		</div>
	)
}
export default Search
