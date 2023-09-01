import { errorCath } from '@/api/api.helper'
import { IGeoLocation } from '@/shared/type/common'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getLocation = createAsyncThunk<any, IGeoLocation>(
	'get-location',
	async ({ latitude, longitude }, thankAPi) => {
		try {
			const { data } = await axios.get(
				`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&lang=ru&apiKey=b7ff5a6907584978b9dd118be3c7dd75`,
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
