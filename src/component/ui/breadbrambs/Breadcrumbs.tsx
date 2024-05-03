'use client'

import { useMode } from '@/hook/useMode'
import { firstChatUpperCase } from '@/utils/helpers/first-char-uppercase'
import { toSlug } from '@/utils/helpers/toSlug'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import './Breadcrumbs.scss'

const Breadcrumbs = () => {
	const pathname = usePathname()
	const { theme } = useMode()

	// Split the current pathname into segments
	const segments = pathname.split('/').filter(segment => segment !== '')

	// Generate breadcrumb paths dynamically
	const breadcrumbPaths = segments
		.filter(segment => segment !== 'product')
		.map((segment, index) => {
			const path = `/${segments.slice(0, index + 1).join('/')}`
			return {
				label: firstChatUpperCase(toSlug(segment)),
				url: path
			}
		})

	if (pathname === '/') {
		return <></>
	}

	return (
		<div className='container'>
			<nav
				aria-label='breadcrumb'
				className={`breadcrumb ${theme === 'dark' ? 'breadcrumb_dark' : ''}`}
			>
				<ol className='breadcrumb__list'>
					<li className='breadcrumb__item breadcrumb__item_home'>
						<Link href='/'>Home</Link>
					</li>
					{breadcrumbPaths.map((path, index) => {
						const isLastSegment = index === breadcrumbPaths.length - 1

						return (
							<li
								className={`breadcrumb__item${
									isLastSegment
										? 'breadcrumb__item breadcrumb__item_active'
										: ''
								}`}
								key={index}
								aria-current={isLastSegment ? 'page' : undefined}
							>
								{isLastSegment ? (
									path.label
								) : (
									<Link href={path.url}>
										<span>/</span>
										{path.label}
									</Link>
								)}
							</li>
						)
					})}
				</ol>
			</nav>
		</div>
	)
}

export default Breadcrumbs
