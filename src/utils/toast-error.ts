import { errorCath } from '@/api/api.helper'
import { toastr } from 'react-redux-toastr'

export const toastError = (error: string | unknown, title?: string) => {
	const message = errorCath(error)

	console.log(message)

	toastr.error(title || 'Error', message)
	throw message
}
