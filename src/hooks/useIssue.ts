import { useContext } from 'react'
import { IssueContext } from '../context/issue'
import type { Issue } from '../interfaces/GitHub'

export function useIssue () {
	const context = useContext(IssueContext)

	if (!context) {
		throw new Error('useAccessToken must be used within a AuthProvider')
	}

	const { issue, setIssue } = context

	const openModal = (issue: Issue) => {
		setIssue(issue)
	}

	const closeModal = () => {
		setIssue(null)
	}

	return { issue, openModal, closeModal }
}
