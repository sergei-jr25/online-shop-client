import { instance } from '@/api/http'
import ProductPage from '../ProductPage'

async function getStaticParams(id: number) {
	const data = await instance.get(`/boiler-parts/${id}`)
 	return data
}

type Props = {
	params: {
		id: number
	}
}

const Page = async ({ params: { id } }: Props) => {
	const product = await getStaticParams(id)

	return (
		<>
			<ProductPage item={product.data} />
		</>
	)
}
export default Page
