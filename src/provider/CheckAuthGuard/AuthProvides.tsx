import { useAuth } from '@/hook/useAuth'
import { useActions } from '@/hook/useDispatch'
import Cookies from 'js-cookie'
import { usePathname, useRouter } from 'next/navigation'
import { FC, ReactNode, useEffect } from 'react'

const AuthProvides: FC<{ children: ReactNode }> = ({ children }) => {
	const { checkAuth, logout } = useActions()
	const { replace } = useRouter()
	const pathname = usePathname()
	const { user } = useAuth()

	useEffect(() => {
		const accessToken = Cookies.get('accessToken')
		console.log('checkAuthToken')

		if (accessToken) {
			checkAuth()
		}
	}, [])
	useEffect(() => {
		const refreshToken = Cookies.get('refreshToken')
		if (!refreshToken && user) logout()
	}, [pathname])
	return <>{children}</>
}
export default AuthProvides
