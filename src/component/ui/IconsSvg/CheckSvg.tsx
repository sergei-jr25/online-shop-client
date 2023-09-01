import { FC } from 'react'

const CheckSvg: FC = () => {
	return (
		<svg
			width='20'
			height='20'
			viewBox='0 0 20 20'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<circle cx='10' cy='10' r='9.5' fill='white' stroke='#04B19E' />
			<path
				d='M15 7L8.125 12.2526L5 9.86507'
				stroke='#04B19E'
				stroke-width='2'
				stroke-linecap='round'
				stroke-linejoin='round'
			/>
		</svg>
	)
}
export default CheckSvg
