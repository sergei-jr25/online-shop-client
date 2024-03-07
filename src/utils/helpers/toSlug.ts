export const toSlug = (str: string) => {
	return decodeURIComponent(str)
		.toLowerCase()
		.replace(/\s+/g, '-')
		.replace(/[^\w-]+/g, '')
}
