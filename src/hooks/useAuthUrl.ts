import { useEffect, useState } from 'react'

export function useAuthUrl () {
	const [authUrl, setAuthUrl] = useState<string>('')
	useEffect(() => {
		fetch('/api/auth-url')
			.then((response) => response.json())
			.then((response) => {
				setAuthUrl(response.githubOauthUrl)
			})
	}, [])
	return { authUrl }
}
