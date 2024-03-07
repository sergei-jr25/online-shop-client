import ProductPage from '../ProductPage'

async function getStaticParams(slug: string) {
	const data = await fetch(
		`${process.env.NEXT_PUBLIC_APP_URL}/boiler-parts/by-slug/${slug}`
	)
	return data.json()
}

type Props = {
	params: {
		slug: string
	}
}

const PageProduct = async ({ params: { slug } }: Props) => {
	let product
	try {
		product = await getStaticParams(slug)
	} catch (e) {
		product = []
		console.log(e)
	}

	return <ProductPage item={product || []} />
}
export default PageProduct
