export function getStoreLocal(name: string) {
	if (typeof localStorage !== 'undefined' && localStorage !== null) {
		const storage = localStorage.getItem(name)
		return storage ? JSON.parse(storage) : null
	}
	return null
}
