export const getContentType = () => ({
	'Content-Type': 'application/json',
	'Access-Control-Allow-Origin': '*'
})

export const errorCath = (error: any) => {
	return error.response && error.response.data
		? typeof error.response.data === 'object'
			? error.response.data.message
			: error.response.data
		: error.message
}
