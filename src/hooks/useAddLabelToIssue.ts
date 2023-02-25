import { useContext } from 'react'
import { IssuesContext } from '../context/issues'
import type { Issue } from '../interfaces/GitHub'
import { gitHubAddLabelToIssue } from '../services/Github'

export const useAddLabelToIssue = () => {
	const context = useContext(IssuesContext)

	if (!context) {
		throw new Error('useAddLabelToIssue must be used within a IssuesProvider')
	}

	const { setIssuesError, repo, owner, accessToken } = context

	const addLabelToIssue = async ({ issue, label }: { issue: Issue; label: string }) => {
		if (!owner || !repo) return new Error('No owner or repo found')
		if (!accessToken) {
			setIssuesError(new Error('You need to be logged in to add a label'))
			return new Error('No access token found')
		}

		try {
			const result = await gitHubAddLabelToIssue({
				owner,
				repo,
				issueNumber: issue.number,
				label,
				accessToken
			})
			if (!result) {
				setIssuesError(new Error('Something went wrong while adding the label'))
			}
		} catch (error) {
			setIssuesError(new Error('Something went wrong while adding the label'))
		}
	}

	return { addLabelToIssue }
}
