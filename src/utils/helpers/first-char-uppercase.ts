export const firstChatUpperCase = (str: string) => {
	const value = str.slice(1, str.length)
	return str[0].toLocaleUpperCase() + value
}
