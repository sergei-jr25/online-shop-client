'use client'

import Field from '@/component/ui/fields/Field'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import styles from './Admin.module.scss'

const FormAdmin: FC<{
	buttonValue: string
	onSubmit: (data: any) => void
	handleRemove?: (id: number) => void
}> = ({ buttonValue, onSubmit, handleRemove }) => {
	const {
		register,
		formState: { errors },
		reset,
		handleSubmit
	} = useForm({ mode: 'onChange' })

	return (
		<form className={styles.admin__form} onSubmit={handleSubmit(onSubmit)}>
			<Field
				{...register('boilerManufacturer', {
					required: 'BoilerManufacturer os required'
				})}
				error={errors.boilerManufacturer}
				placeholder='boilerManufacturer'
			/>
			<Field
				{...register('partsManufacturer', {
					required: 'partsManufacturer os required'
				})}
				error={errors.partsManufacturer}
				placeholder='PartsManufacturer'
			/>
			<Field
				{...register('name', {
					required: 'Name os required'
				})}
				error={errors.name}
				placeholder='Name'
			/>
			<Field
				{...register('compatibility', {
					required: 'Compatibility os required'
				})}
				error={errors.compatibility}
				placeholder='Compatibility'
			/>
			<Field
				{...register('description', {
					required: 'Description os required'
				})}
				error={errors.description}
				placeholder='Description'
			/>
			<Field
				{...register('price', {
					required: 'Price os required'
				})}
				error={errors.price}
				placeholder='Price'
				type='number'
			/>
			<Field
				{...register('popularity', {
					required: 'Popularity os required'
				})}
				error={errors.popularity}
				placeholder='Popularity'
				type='number'
			/>
			<Field
				{...register('inStock', {
					required: 'InStock os required'
				})}
				error={errors.inStock}
				placeholder='InStock'
				type='number'
			/>
			<Field
				{...register('vendorCode', {
					required: 'VendorCode os required'
				})}
				error={errors.vendorCode}
				placeholder='VendorCode'
			/>
			<Field
				{...register('bestsellers', {})}
				error={errors}
				// placeholder='VendorCode'
				type='checkbox'
				value='Bestsellers'
				defaultChecked={false}
			/>
			<Field
				{...register('new', {})}
				error={errors}
				// placeholder='new'
				type='checkbox'
				value='New'
				defaultChecked={false}
			/>
			<Field
				{...register('file', {
					required: 'file os required'
				})}
				error={errors.file}
				type='file'
			/>
			<button>{buttonValue}</button>
		</form>
	)
}
export default FormAdmin
