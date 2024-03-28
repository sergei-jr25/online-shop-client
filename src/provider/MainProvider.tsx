'use client'
import { store } from '@/store/store'
import { Provider } from 'react-redux'
import AuthProvides from './CheckAuthGuard/AuthProvides'
import ReduxToastrComponent from './ReduxToastr'

export function MainProviders({ children }: { children: React.ReactNode }) {
	return (
		<>
			{/* <NextProgress /> */}
			<Provider store={store}>
				<ReduxToastrComponent />
				<AuthProvides>{children}</AuthProvides>
			</Provider>
		</>
	)
}
