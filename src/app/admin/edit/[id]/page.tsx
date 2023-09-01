'use client'

import { apiBoilerParts } from '@/service/api/boiderl-parts'
import { usePathname } from 'next/navigation'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import FormAdmin from '../../FormAdmin'

const EditPage: FC = () => {
	const pathName = usePathname()
	const parts = pathName.split('/')
	const id = parts[parts.length - 1]

	const {
		register,
		formState: { errors },
		reset,
		handleSubmit
	} = useForm({ mode: 'onChange' })
	const [editBoiler] = apiBoilerParts.useEditMutation()
	const { data: boilderParts = {} } = apiBoilerParts.useGetOneQuery(id)

	const onSubmit = (data: any) => {
		console.log(data)
		data.file = data.file[0].name
		editBoiler({ data, id })
	}
	return <FormAdmin buttonValue='Отправить' onSubmit={onSubmit} />
}
export default EditPage
