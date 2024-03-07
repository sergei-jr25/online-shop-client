import { IBoilerPartDto } from '@/shared/type/boilerParts.interface'
import { IQueryParams } from '@/shared/type/query.interface'
import { IBoilerParts, IBoilerPartsData } from '@/shared/type/user.interface'
import { FetchArgs } from '@reduxjs/toolkit/query'
import { api } from './api'

export const apiBoilerParts = api.injectEndpoints({
	endpoints: builder => ({
		paginateAndFilter: builder.query<IBoilerParts, Partial<IQueryParams>>({
			query: (query: Partial<IQueryParams> = {}) => ({
				url: '/boiler-parts',
				params: query
			})
		}),

		getBestsellers: builder.query<IBoilerPartsData[], void>({
			query: () => ({ url: '/boiler-parts/bestsellers' })
		}),
		getNew: builder.query<IBoilerPartsData[], void>({
			query: () => ({ url: '/boiler-parts/new' })
		}),
		getSearch: builder.query<IBoilerPartsData[], string | undefined>({
			query: (searchTerm: string | undefined) => {
				if (!searchTerm) {
					// Если поисковый запрос пустой, возвращаем пустой массив
					throw new Error('Search term is empty')
				}
				return {
					url: '/boiler-parts/search',
					params: { searchTerm }
				} as FetchArgs | string
			}
		}),
		getOne: builder.query<IBoilerPartsData, string>({
			query: id => ({
				url: `/boiler-parts/${+id}`
			})
		}),
		getByName: builder.query<IBoilerPartsData, string>({
			query: name => ({
				url: `/boiler-parts/name`,
				method: 'GET',
				params: { name }
			})
		}),
		create: builder.mutation<IBoilerPartsData, IBoilerPartDto>({
			query: (body: any) => ({
				url: '/boiler-parts/boiler',
				method: 'POST',
				body: body
			})
		}),
		edit: builder.mutation<IBoilerPartsData, any>({
			query: ({ data, id }) => ({
				url: `/boiler-parts/edit/${+id}`,
				method: 'PUT',
				body: data
			})
		}),
		delete: builder.mutation<any, string>({
			query: id => ({
				url: `/boiler-parts/remove/${+id}`,
				method: 'DELETE'
			})
		})
	})
})
