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
				destination: 'http://localhost:3000/api/:path*'
			},
			{
				source: '/uploads/:path*',
				destination: 'http://localhost:3000/uploads/:path*'
			}
		]
	}
}

module.exports = nextConfig
