import { queryStringParamsInit } from '@/shared/query-params'
import { FC, PropsWithChildren } from 'react'
import ProgressBar from '../ui/bpogress-bar/ProgressBar'
import Breadcrumbs from '../ui/breadbrambs/Breadcrumbs'
import Footer from './Footer/Footer'
import Header from './Header/Header'

async function getData() {
	const data = await fetch(
		`${process.env.NEXT_PUBLIC_APP_URL}/boiler-parts?${queryStringParamsInit}`
	)
	return data.json()
}

const LayoutWrapper: FC<PropsWithChildren> = async ({ children }) => {
	let data
	try {
		data = await getData()
	} catch (e) {
		console.error('An error occurred while fetching data:', e)

		data = []
	}

	console.log(data)

	return (
		<div>
			<Header initData={data[0]} />
			<div>
				<Breadcrumbs />
				<ProgressBar />
				{children}
			</div>

			<Footer />
		</div>
	)
}
export default LayoutWrapper
