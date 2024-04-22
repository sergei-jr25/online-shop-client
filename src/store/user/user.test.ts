import { getContentType } from '@/api/api.helper'
import { instance } from '@/api/http'
import Cookies from 'js-cookie'
import { toastr } from 'react-redux-toastr'
import { checkAuth, login, register } from './userActions'

jest.mock('@/api/http') // Mock your API calls
jest.mock('react-redux-toastr') // Mock toastr notifications (optional)
jest.mock('js-cookie') // Mock js-cookie access

jest.mock('@/api/http')

describe('user', () => {
	it('registers user successfully', async () => {
		const mockUser = {
			email: 'user@example.com',
			password: 'password',
			username: 'user'
		}
		const mockResponseData = { accessToken: '12345', ...mockUser } // Include other data as needed

		instance.post.mockResolvedValueOnce({ data: mockResponseData }) // Mock successful API response
		toastr.success.mockImplementationOnce(() => {}) // Mock success toast notification (optional)

		const dispatch = jest.fn()
		const thunk = register(mockUser)

		await thunk(dispatch, () => {})

		expect(dispatch).toHaveBeenCalledTimes(2) // Expect two dispatches (pending & fulfilled)

		const [startAction, successAction] = dispatch.mock.calls

		expect(startAction[0].type).toBe('auth/register/pending')
		expect(successAction[0].type).toBe('auth/register/fulfilled')
		expect(successAction[0].payload).toEqual(mockResponseData)

		expect(instance.post).toHaveBeenCalledWith('/auth/register', mockUser) // Verify API call
	})
	it('rejects registration on error', async () => {
		const mockUser = {
			email: 'user@example.com',
			password: 'password',
			username: 'user'
		}
		const mockError = new Error('Registration failed')

		instance.post.mockRejectedValueOnce(mockError) // Mock failed API response
		toastr.error.mockImplementationOnce(() => {}) // Mock error toast notification (optional)

		const dispatch = jest.fn()
		const thunk = register(mockUser)

		await thunk(dispatch, () => {})

		expect(dispatch).toHaveBeenCalledTimes(2) // Expect two dispatches (pending & rejected)

		const [startAction, errorAction] = dispatch.mock.calls

		expect(startAction[0].type).toBe('auth/register/pending')
		expect(errorAction[0].type).toBe('auth/register/rejected')
		expect(errorAction[0].error.message).toEqual('Registration failed')

		expect(errorAction[0].meta.requestStatus).toBe('rejected')
	})
	it('login user successfully', async () => {
		const mockUser = {
			password: 'password',
			username: 'user'
		}
		const mockResponseData = { accessToken: '12345', ...mockUser } // Include other data as needed

		instance.post.mockResolvedValueOnce({ data: mockResponseData }) // Mock successful API response
		toastr.success.mockImplementationOnce(() => {}) // Mock success toast notification (optional)

		const dispatch = jest.fn()
		const thunk = login(mockUser)

		await thunk(dispatch, () => {})

		expect(dispatch).toHaveBeenCalledTimes(2) // Expect two dispatches (pending & fulfilled)

		const [startAction, successAction] = dispatch.mock.calls

		expect(startAction[0].type).toBe('auth/login/pending')
		expect(successAction[0].type).toBe('auth/login/fulfilled')
		expect(successAction[0].payload).toEqual(mockResponseData)

		expect(instance.post).toHaveBeenCalledWith('/auth/login', mockUser) // Verify API call
	})
	it('login registration on error', async () => {
		const mockUser = {
			password: 'password',
			username: 'user'
		}
		const mockError = new Error('Registration failed')

		instance.post.mockRejectedValueOnce(mockError) // Mock failed API response
		toastr.error.mockImplementationOnce(() => {}) // Mock error toast notification (optional)

		const dispatch = jest.fn()
		const thunk = login(mockUser)

		await thunk(dispatch, () => {})

		expect(dispatch).toHaveBeenCalledTimes(2) // Expect two dispatches (pending & rejected)

		const [startAction, errorAction] = dispatch.mock.calls

		expect(startAction[0].type).toBe('auth/login/pending')
		expect(errorAction[0].type).toBe('auth/login/rejected')
		expect(errorAction[0].error.message).toEqual('Registration failed')

		expect(errorAction[0].meta.requestStatus).toBe('rejected')
	})

	it('fetches user data with valid refresh token', async () => {
		const mockRefreshToken = 'valid-refresh-token'
		const mockUserData = { id: 1, username: 'user' }

		Cookies.get.mockReturnValueOnce(mockRefreshToken) // Mock cookie retrieval
		instance.post.mockResolvedValueOnce({ data: mockUserData }) // Mock successful API response
		toastr.error.mockImplementationOnce(() => {}) // Mock error toast notification (optional)

		const dispatch = jest.fn()
		const thunk = checkAuth()

		await thunk(dispatch, () => {})

		expect(dispatch).toHaveBeenCalledTimes(2) // Expect two dispatches (pending & fulfilled)

		const [startAction, successAction] = dispatch.mock.calls

		expect(startAction[0].type).toBe('check/auth/pending')
		expect(successAction[0].type).toBe('check/auth/fulfilled')
		expect(successAction[0].payload).toEqual(mockUserData)

		expect(Cookies.get).toHaveBeenCalledWith('refreshToken') // Verify cookie access
		expect(instance.post).toHaveBeenCalledWith(
			'/auth/login-token',
			{
				refreshToken: mockRefreshToken
			},
			{ headers: getContentType() } // Assuming getContentType function is mocked or doesn't need testing
		) // Verify API call
	})
})
