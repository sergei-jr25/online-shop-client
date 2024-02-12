import Dashboard from '../../component/Screens/Dashboard/Dashboard'

async function getData() {
	const bestsellersJson = await fetch(
		`${process.env.NEXT_PUBLIC_APP_URL}/boiler-parts/bestsellers`
	)
	const newsJson = await fetch(
		`${process.env.NEXT_PUBLIC_APP_URL}/boiler-parts/new`
	)

	return { bestsellersJson, newsJson }
}

const DashboardPage = async () => {
	const { bestsellersJson, newsJson } = await getData()
	const bestsellers = await bestsellersJson.json()
	const news = await newsJson.json()

	return (
		<div>
			<Dashboard bestsellers={bestsellers || []} news={news || []} />
		</div>
	)
}
export default DashboardPage
