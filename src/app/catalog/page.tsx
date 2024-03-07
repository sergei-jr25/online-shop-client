import { queryStringParamsInit } from '@/shared/query-params'
import Catalog from '../../component/Screens/Catalog/Catalog'

async function getData() {
	const data = await fetch(
		`${process.env.NEXT_PUBLIC_APP_URL}/boiler-parts?${queryStringParamsInit}`
	)
	return data.json()
}

// This is an async Server Component
export default async function Page() {
	let data
	try {
		data = await getData()
	} catch (error) {
		console.error('An error occurred while fetching data:', error)

		data = []
	}

	return (
		<main>
			<Catalog initialData={data[0]} />
		</main>
	)
}
