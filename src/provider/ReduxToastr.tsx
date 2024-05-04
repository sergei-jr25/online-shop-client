'use client'
import ReduxToastr from 'react-redux-toastr'

const ReduxToastrComponent = () => {
	return (
		<ReduxToastr
			timeOut={4000}
			newestOnTop={false}
			position='top-left'
			transitionIn='fadeIn'
			transitionOut='fadeOut'
			progressBar
		/>
	)
}
export default ReduxToastrComponent
