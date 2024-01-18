import SearchSvg from '@/component/Header/header-icon/SearchSvg'
import { FC, useState } from 'react'
import SelectComponent from '../select/Select'
import styles from './Search.module.scss'

const Search: FC = () => {
	const [selectOpenClass, setSelectOpenClass] = useState(false)
	return (
		<div
			className={`${styles.search} ${
				selectOpenClass ? styles.search__open : ''
			}`}
		>
			<SelectComponent setSelectOpenClass={setSelectOpenClass} />
			<button className={styles.search__button}>
				<SearchSvg />
			</button>
		</div>
	)
}
export default Search
