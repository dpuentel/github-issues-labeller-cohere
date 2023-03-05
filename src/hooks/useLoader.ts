import { useContext } from 'react'
import { IssuesContext } from '../context/issues'

export function useLoader () {
	const context = useContext(IssuesContext)

	if (!context) {
		throw new Error('useGitHubIssues must be used within a IssuesProvider')
	}

	const { isLoading, setIsLoading: showLoader } = context

	return { isLoading, showLoader }
}
