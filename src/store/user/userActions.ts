import { getContentType } from '@/api/api.helper'
import { instance } from '@/api/http'
import { removeCookie, saveTokenStorage } from '@/service/auth/auth.helper'
import { toastError } from '@/utils/toast-error'
import { createAsyncThunk } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'
import { toastr } from 'react-redux-toastr'
import { IAuthFields, IAuthResponse } from './user.interface'

export const register = createAsyncThunk<IAuthResponse, IAuthFields>(
	'auth/register',
	async ({ email, password, username }, thunkApi) => {
		try {
			const { data } = await instance.post('/auth/register', {
				email,
				password,
				username
			})

			if (data.accessToken) {
				saveTokenStorage(data)
			}
			toastr.success('Вход', 'выполнен успешно')
			return data
		} catch (error) {
			toastError(error)
			return thunkApi.rejectWithValue(error)
		}
	}
)
export const login = createAsyncThunk<IAuthResponse, IAuthFields>(
	'auth/login',
	async ({ email, password, username }, thunkApi) => {
		try {
			const { data } = await instance.post('/auth/login', {
				email,
				password,
				username
			})

			if (data.accessToken) {
				saveTokenStorage(data)
			}
			toastr.success('Вход', 'выполнен успешно')

			return data
		} catch (error) {
			toastError(error)
			return thunkApi.rejectWithValue(error)
		}
	}
)

export const logout = createAsyncThunk('auth/logout', (_, thunkApi) => {
	removeCookie()
	localStorage.removeItem('user')
	toastr.success('Вы вышли', '')
})

export const checkAuth = createAsyncThunk('check/auth', async (_, thunkApi) => {
	try {
		const refreshToken = Cookies.get('refreshToken')
		const { data } = await instance.post(
			'auth/login-token',
			{ refreshToken },
			{ headers: getContentType() }
		)

		return data
	} catch (error) {
		toastError(error)
		return thunkApi.rejectWithValue(error)
	}
})
