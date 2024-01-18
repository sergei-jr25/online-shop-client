import { FC } from 'react'
import HeaderBottom from './HeaderBottom/HeaderBottom'
import HeaderTop from './HeaderTop/HeaderTop'

const Header: FC = () => {
	return (
		<div>
			<HeaderTop />
			<HeaderBottom />
		</div>
	)
}
export default Header
