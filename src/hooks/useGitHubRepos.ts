import { useEffect, useState } from 'react'
import type { Repository } from '../interfaces/GitHub'
import { gitHubUserReposGetter } from '../services/Github'
import { useAccessToken } from './useAccessToken'

export function useGitHubRepos () {
	const [userRepos, setUserRepos] = useState<Repository[]>([])
	const { accessToken } = useAccessToken()

	useEffect(() => {
		if (!accessToken) return
		gitHubUserReposGetter({ accessToken }).then((response) => {
			if (response) {
				setUserRepos(response)
			}
		})
	}, [accessToken])

	return { userRepos }
}
