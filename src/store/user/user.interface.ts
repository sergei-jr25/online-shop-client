import { IUser } from '@/shared/type/user.interface'

export interface IAuthFields {
	email: string
	password: string
	username?: string
	isAdmin?: boolean
}

export interface IInitState {
	user: {
		id: number
		email: string
		username: string
		isAdmin?: boolean
	}
	isLoading: boolean
	accessToken: string
}

export interface IToken {
	accessToken: string
	refreshToken: string
}
export interface IAuthResponse extends IToken {
	user: IUser
}
