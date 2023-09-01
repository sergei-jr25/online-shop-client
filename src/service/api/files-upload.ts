import { api } from './api'

export const fileServer = api.injectEndpoints({
	endpoints: builder => ({
		upload: builder.mutation({
			query: file => ({
				url: '/file',

				body: { file }
			})
		})
	})
})
