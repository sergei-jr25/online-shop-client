import Link from 'next/link'
import { useRouter } from 'next/router'

const Breadcrumbs = () => {
	const router = useRouter()
	const { asPath, pathname } = router

	// Split the current pathname into segments
	const segments = pathname.split('/').filter(segment => segment !== '')

	// Generate breadcrumb paths dynamically
	const breadcrumbPaths = segments.map((segment, index) => {
		const path = `/${segments.slice(0, index + 1).join('/')}`
		return {
			label: segment,
			url: path
		}
	})

	return (
		<nav aria-label='breadcrumb'>
			<ol className='breadcrumb'>
				<li className='breadcrumb-item'>
					<Link href='/'>Home</Link>
				</li>
				{breadcrumbPaths.map((path, index) => {
					const isLastSegment = index === breadcrumbPaths.length - 1

					return (
						<li
							className={`breadcrumb-item${isLastSegment ? ' active' : ''}`}
							key={index}
							aria-current={isLastSegment ? 'page' : undefined}
						>
							{isLastSegment ? (
								path.label
							) : (
								<Link href={path.url}>{path.label}</Link>
							)}
						</li>
					)
				})}
			</ol>
		</nav>
	)
}

export default Breadcrumbs
