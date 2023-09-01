import ReduxToastr from 'react-redux-toastr'

export function ReduxToast({ children }: { children: React.ReactNode }) {
	return (
		<>
			<ReduxToastr
				newestOnTop={false}
				preventDuplicates
				position='top-left'
				transitionIn='fadeIn'
				transitionOut='fadeOut'
				timeOut={4000}
				progressBar
			/>
			{children}
		</>
	)
}

export default ReduxToast
