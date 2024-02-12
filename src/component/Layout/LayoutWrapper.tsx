import { FC, PropsWithChildren } from 'react'
import Footer from './Footer/Footer'
import Header from './Header/Header'

const LayoutWrapper: FC<PropsWithChildren> = ({ children }) => {
	return (
		<div>
			<Header />
			{children}
			<Footer />
		</div>
	)
}
export default LayoutWrapper
