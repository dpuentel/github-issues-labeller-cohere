import { useContext } from 'react'
import { IssuesContext } from '../context/issues'
import type { Issue } from '../interfaces/GitHub'
import { gitHubAddLabelToIssue, gitHubGetIssueLabels } from '../services/Github'

export const useAddLabelToIssue = () => {
	const context = useContext(IssuesContext)

	if (!context) {
		throw new Error('useAddLabelToIssue must be used within a IssuesProvider')
	}

	const { setIssuesError, issues, setIssues, repo, owner, accessToken, setIsLoading } = context

	const addLabelToIssue = async ({ issue, label }: { issue: Issue; label: string }) => {
		if (!owner || !repo) return new Error('No owner or repo found')
		if (!accessToken) {
			setIssuesError(new Error('You need to be logged in to add a label'))
			return new Error('No access token found')
		}

		setIsLoading(true)

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

			const newIssueLabels = await gitHubGetIssueLabels({
				owner,
				repo,
				issueNumber: issue.number,
				accessToken
			})

			const updatedIssues: Issue[] = issues.map((issueItem) => {
				if (issueItem.number === issue.number) {
					issueItem.labels = newIssueLabels
					issueItem.prediction = undefined
					issueItem.confidence = undefined
				}
				return issueItem
			})
			setIssues(updatedIssues)
			setIsLoading(false)
		} catch (error) {
			setIssuesError(new Error('Something went wrong while adding the label'))
			setIsLoading(false)
		}
	}

	return { addLabelToIssue }
}
