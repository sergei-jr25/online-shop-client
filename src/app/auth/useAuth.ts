// import { useAuth } from '@/hook/useAuth'
// import { useRouter, useSearchParams } from 'next/navigation'
// import { useEffect } from 'react'

// export const useAUthRedirect = () => {
// 	const { user, isLoading } = useAuth()
// 	const query = useSearchParams()
// 	const { push } = useRouter()
// 	const redirect = query.get('search')
// 		? String(query.get('search'))
// 		: '/dashboard'

// 	useEffect(() => {
// 		if (user) push(redirect)
// 	}, [user, query, push])
// }
