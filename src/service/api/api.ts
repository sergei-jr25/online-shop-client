import { ICart, ICartDto } from '@/shared/type/cart.interface'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { accessToken } from './api.helper'

// Define a service using a base URL and expected endpoints
export const api = createApi({
	reducerPath: 'api',
	tagTypes: ['Cart'],
	baseQuery: fetchBaseQuery({
		baseUrl: `${process.env.NEXT_PUBLIC_APP_URL}`,
		prepareHeaders: (headers, { getState }) => {
			// const token = (getState() as RootState).user.accessToken
			let token: string | undefined
			token = accessToken()

			if (token) {
				headers.set('Authorization', `Bearer ${token}`)
			}

			return headers
		}
	}),
	endpoints: builder => ({
		getCartProducts: builder.query<ICart[], number | undefined>({
			query: userId => `/shopping-cart/${userId || ''} `,
			providesTags: (result, error, userId) => [{ type: 'Cart', userId }]
		}),
		createShopCart: builder.mutation<ICart, ICartDto>({
			query: body => ({
				url: '/shopping-cart/create',
				method: 'POST',
				body
			}),
			invalidatesTags: ['Cart']
		}),
		updateTotalPrice: builder.mutation<
			number,
			{ id: number; totalPrice: number }
		>({
			query: ({ id, totalPrice }) => ({
				url: `/shopping-cart/total-price/${id}`,
				method: 'PUT',
				body: { totalPrice }
			})
		}),
		updateCount: builder.mutation<number, any>({
			query: ({ partId, type }) => ({
				url: `/shopping-cart/count/${partId}`,
				method: 'PUT',
				body: { type }
			}),
			invalidatesTags: ['Cart']
		}),
		remove: builder.mutation<ICart, number>({
			query: partID => ({
				url: `/shopping-cart/remove/${partID}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['Cart']
		}),
		removeAll: builder.mutation<ICart[], number>({
			query: id => ({
				url: `/shopping-cart/remove-user-id/:${id}`,
				method: 'DELETE'
			})
		})
	})
})
