'use client'

import ReduxToastr from 'react-redux-toastr'

export function ReduxToast() {
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
		</>
	)
}

export default ReduxToast
