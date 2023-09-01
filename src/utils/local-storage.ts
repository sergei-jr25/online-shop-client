'use client'

export const getStoreLocal = (name: string) => {
	if (typeof localStorage !== undefined) {
		const storage = localStorage.getItem(name)

		return storage ? JSON.parse(storage) : null
	}

	return null
}
