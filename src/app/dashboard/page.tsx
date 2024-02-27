import Dashboard from '../../component/Screens/Dashboard/Dashboard'

async function fetchData(url: any) {
	try {
		const response = await fetch(url)
		if (!response.ok) {
			throw new Error(`Request failed with status ${response.status}`)
		}
		return await response.json()
	} catch (error) {
		console.error('Error fetching data:', error)
		return []
	}
}

const DashboardPage = async () => {
	const [bestsellers, news] = await Promise.all([
		fetchData(`${process.env.NEXT_PUBLIC_APP_URL}/boiler-parts/bestsellers`),
		fetchData(`${process.env.NEXT_PUBLIC_APP_URL}/boiler-parts/new`)
	])

	return (
		<div>
			<Dashboard bestsellers={bestsellers || []} news={news || []} />
		</div>
	)
}

export default DashboardPage
