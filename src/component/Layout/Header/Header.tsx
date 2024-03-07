import { IBoilerPartsData } from '@/shared/type/user.interface'
import { FC } from 'react'
import HeaderBottom from './HeaderBottom/HeaderBottom'
import HeaderTop from './HeaderTop/HeaderTop'

const Header: FC<{ initData: IBoilerPartsData[] }> = ({ initData }) => {
	return (
		<div>
			<HeaderTop />
			<HeaderBottom initData={initData} />
		</div>
	)
}
export default Header
