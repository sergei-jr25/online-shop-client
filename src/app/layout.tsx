import LayoutWrapper from '@/component/Layout/LayoutWrapper'
import { MainProviders } from '@/provider/MainProvider'
import NextProgress from '@/provider/NextProgress'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
	title: 'Details for gas boilers',
	description:
		'The assortment of the Aqua Term X online store includes spare parts for boilers Arderia, Ariston, Baxi, Beretta, Bosch 	Buderus, Chaffoteaux, De Dietrich, Demrad, Electrolux'
}

export default function RootLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<MainProviders>
					<LayoutWrapper>
						<NextProgress />
						{children}
					</LayoutWrapper>
				</MainProviders>
			</body>
		</html>
	)
}
