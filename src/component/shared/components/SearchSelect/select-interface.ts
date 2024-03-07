import { Dispatch, SetStateAction } from 'react'

export interface ISelect<T> {
	data: T[]
	setIsSelectOpen?: Dispatch<SetStateAction<boolean>>
	setSearchTerm?: Dispatch<SetStateAction<string>>
	isFetching: boolean
}
