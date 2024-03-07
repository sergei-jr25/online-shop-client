'use client'
import NextNProgress from 'nextjs-progressbar'
import { FC } from 'react'

const ProgressBar: FC = () => {
	return (
		<div>
	 
			<NextNProgress
				color='#29D'
				startPosition={0.3}
				stopDelayMs={200}
				height={3}
				showOnShallow={true}
			/>
		</div>
	)
}
export default ProgressBar
