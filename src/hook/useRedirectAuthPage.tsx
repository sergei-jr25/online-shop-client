import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useAuth } from './useAuth'

export const useRedirectAuthPage = (isAuthPage: boolean = false) => {
	const [shouldLoadContent, setShouldLoadContent] = useState(false)
	const { user } = useAuth()
	const { push, replace } = useRouter()

	useEffect(() => {
		checkUser()
	}, [user])

	const checkUser = () => {
		if (isAuthPage) {
			if (!user) {
				setShouldLoadContent(false)
				return
			}
			push('/dashboard')
			return
		}

		if (!user) {
			push('/auth')
			return
		}

		if (user) {
			setShouldLoadContent(true)
			return
		}
	}

	return { shouldLoadContent }
}
