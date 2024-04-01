/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ['localhost'],

		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**'
			}
		]
	},

	env: {
		APP_URL: process.env.NEXT_PUBLIC_APP_URL
	},
	async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination: `${process.env.NEXT_PUBLIC_APP_URL}/:path*`
			},
			{
				source: '/uploads/:path*',
				destination: `${process.env.NEXT_PUBLIC_APP_URL_UPLOADS}/:path*`
			}
		]
	}
}

module.exports = nextConfig
