import { removeCookie } from '@/service/auth/auth.helper'
import axios from 'axios'
import Cookies from 'js-cookie'
import { errorCath, getContentType } from './api.helper'
const api = process.env.NEXT_PUBLIC_APP_URL
console.log(api)

export const instance = axios.create({
	baseURL: 'http://localhost:5000/api',

	headers: getContentType()
})

export const http = axios.create({
	baseURL: 'http://localhost:5000/api',

	headers: getContentType()
})

http.interceptors.request.use(config => {
	const accessToken = Cookies.get('accessToken')

	if (config.headers && accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`
	}

	return config
})

http.interceptors.response.use(
	config => config,
	async error => {
		const originalRequest = error.config

		if (
			(error.response.status === 401 ||
				errorCath(error) === 'jwt expired' ||
				errorCath(error) === 'jwt must be provider') &&
			error.config &&
			!error.config._isRetry
		) {
			originalRequest._isRetry = true

			try {
				return http.request(originalRequest)
			} catch (error) {
				if (errorCath(error) === 'jwt expired') removeCookie()
			}
		}

		throw error
	}
)
