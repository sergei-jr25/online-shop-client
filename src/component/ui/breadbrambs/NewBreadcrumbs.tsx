'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import './NewBreadcrumbs.scss'

const BreadcrumbsNew = () => {
	const pathname = usePathname()

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
		<nav aria-label='breadcrumb' className='breadcrumb'>
			<ol className='breadcrumb__list'>
				<li className='breadcrumb__item breadcrumb__item_home'>
					<Link href='/'>Home</Link>
				</li>
				{breadcrumbPaths.map((path, index) => {
					const isLastSegment = index === breadcrumbPaths.length - 1

					return (
						<li
							className={`breadcrumb__item${
								isLastSegment ? 'breadcrumb__item breadcrumb__item_active' : ''
							}`}
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

export default BreadcrumbsNew
