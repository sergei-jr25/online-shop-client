import { FC, ReactNode } from 'react'

const CheckAuthGuard: FC<{
	isAdmin?: boolean | undefined
	children: ReactNode
}> = ({ children, isAdmin = false }) => {
	// if (!isAdmin) {
	// 	replace('/dashboard')
	// 	return
	// }

	return <> {children}</>
}
export default CheckAuthGuard
