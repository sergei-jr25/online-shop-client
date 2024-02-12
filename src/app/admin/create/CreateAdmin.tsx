'use client'

import { apiBoilerParts } from '@/service/api/boiderl-parts'
import { file } from '@/service/file/file.server'
import { FC } from 'react'
import FormAdmin from '../FormAdmin'

const CreateAdmin: FC = () => {
	const onSubmit = (data: any) => {
		const [createBoilerParts] = apiBoilerParts.useCreateMutation()

		let formData = new FormData()
		const formDataImage = new FormData()

		formData.append('file', data.file[0])
		data.file = data.file[0].name

		try {
			file.upload(formData)
			createBoilerParts(data)
		} catch (error) {
			console.log(error)
		}
	}
	return (
		<div className='container'>
			<FormAdmin buttonValue='Создать товар' onSubmit={onSubmit} />
		</div>
	)
}
export default CreateAdmin
