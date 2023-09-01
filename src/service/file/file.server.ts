import { instance } from '@/api/http'

export const file = {
	async upload(data: any) {
		console.log(data)

		return await instance.post('/file', data, {
			headers: { 'Content-Type': 'multipart/form-data' }
		})
	}
}
