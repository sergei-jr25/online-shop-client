'use client'
import ReduxToastr from 'react-redux-toastr'

const ReduxToastrComponent = () => {
	return (
		<ReduxToastr
			timeOut={700}
			newestOnTop={false}
			preventDuplicates
			position='top-right'
			transitionIn='fadeIn'
			transitionOut='fadeOut'
			progressBar
			closeOnToastrClick
		/>
	)
}
export default ReduxToastrComponent
