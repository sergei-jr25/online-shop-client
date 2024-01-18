import { errorCath } from '@/api/api.helper'
import { IGeoLocation } from '@/shared/type/common'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getLocation = createAsyncThunk<any, IGeoLocation>(
	'get-location',
	async ({ latitude, longitude }, thankAPi) => {
		console.log(process.env.NEXT_PUBLIC_GEOAPI_KEY)

		try {
			const { data } = await axios.get(
				`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&lang=ru&apiKey=${process.env.NEXT_PUBLIC_GEOAPI_KEY}`,
				{ withCredentials: false }
			)
			// console.log('data', data)

			return data.features[0].properties.city
		} catch (error) {
			console.log(error)
			errorCath(error)
		}
	}
)
