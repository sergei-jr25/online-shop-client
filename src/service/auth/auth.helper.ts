import { IAuthResponse, IToken } from '@/store/user/user.interface'
// import Cookies from "js-cookie";
import Cookies from 'js-cookie'

export const saveCookie = (token: IToken) => {
	Cookies.set('accessToken', token.accessToken)
	Cookies.set('refreshToken', token.refreshToken)
}
export const saveTokenStorage = (data: IAuthResponse) => {
	saveCookie(data)
	localStorage.setItem('user', JSON.stringify(data.user))
}

export const removeCookie = () => {
	Cookies.remove('accessToken')
	Cookies.remove('refreshToken')
}
