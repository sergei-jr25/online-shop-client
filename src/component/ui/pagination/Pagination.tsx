import { FC } from 'react'
interface IPagination {
	length: number
	page: number
	data: number[]
}

const Pagination: FC<IPagination> = ({ data, length, page }) => {
	return (
		<div>
			{data.map((el, idx) => (
				<div key={idx}>{el} </div>
			))}
		</div>
	)
}
export default Pagination
