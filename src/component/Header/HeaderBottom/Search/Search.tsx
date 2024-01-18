import { FC } from 'react'
import SearchSvg from '../../header-icon/SearchSvg'
import styles from '../HeaderBottom.module.scss'

const Search: FC = () => {
	return (
		<div className={styles.search}>
			<form className={styles.search__form}>
				<input placeholder='Я ищу... ' />
				<SearchSvg />
			</form>
		</div>
	)
}
export default Search
