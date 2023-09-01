'use client'
import { Provider } from 'react-redux'
import ReduxToastr from 'react-redux-toastr'

import { store } from './store'

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<Provider store={store}>
			<div>
				<ReduxToastr
					timeOut={4000}
					newestOnTop={false}
					preventDuplicates
					position='top-left'
					transitionIn='fadeIn'
					transitionOut='fadeOut'
					progressBar
					closeOnToastrClick
				/>
			</div>
			{children}
		</Provider>
	)
}
