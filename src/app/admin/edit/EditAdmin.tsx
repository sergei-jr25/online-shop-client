'use client'

import { apiBoilerParts } from '@/service/api/boiderl-parts'
import { FC, useState } from 'react'
import AdmnItem from './AdmnItem'
import styles from './EditAdmin.module.scss'

const EditAdmin: FC = () => {
	const [pagination, setPagination] = useState({ offset: 1 })
	console.log(pagination)

	const { data = [] } = apiBoilerParts.usePaginateAndFilterQuery(pagination)

	const coutns = data[1] || 0
	const items = data[0] || []
	console.log(data)

	const hadnleRemove = () => {}

	const paginationNumbers = [...Array(Math.floor(coutns / 20))].map(
		(_, idx) => idx
	)
	const changePagonation = (number: number) => {
		setPagination({ ...pagination, offset: number })
	}

	const handleRemove = (id: string) => {}

	return (
		<div className='container'>
			{/* <FormAdmin buttonValue='Редактировать товар' /> */}
			<div className={styles.admin__items}>
				{items.map(item => (
					<AdmnItem key={item.id} item={item} />
				))}
			</div>
			<div className={styles.admin__paginations}>
				{paginationNumbers.map(number => (
					<li
						key={number}
						className={`${styles.admin__pagination} ${
							pagination.offset === number
								? styles.admin__pagination_active
								: ''
						}   `}
						onClick={() => changePagonation(number)}
					>
						{number + 1}
					</li>
				))}
			</div>
		</div>
	)
}
export default EditAdmin
