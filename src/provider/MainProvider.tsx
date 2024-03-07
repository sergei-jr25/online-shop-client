'use client'
import ProgressBar from '@/component/ui/bpogress-bar/ProgressBar'
import { store } from '@/store/store'
import { Provider } from 'react-redux'
import ReduxToastr from 'react-redux-toastr'
import AuthProvides from './CheckAuthGuard/AuthProvides'

export function MainProviders({ children }: { children: React.ReactNode }) {
	return (
		<Provider store={store}>
			<AuthProvides>
				<ProgressBar />
				<ReduxToastr
					newestOnTop={false}
					preventDuplicates
					position='top-left'
					transitionIn='fadeIn'
					transitionOut='fadeOut'
					timeOut={700}
					progressBar
				/>
				{children}
			</AuthProvides>
		</Provider>
	)
}
