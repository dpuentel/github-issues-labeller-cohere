import { useEffect, useState } from 'react'
import type { GitHubIssuesRequestParams, Issue, IssuesGroupedByLabel } from '../interfaces/GitHub'
import {
	gitHubIssuesGetter,
	filterLabeledIssues,
	filterUnlabelledIssues,
	groupIssuesByLabel
} from '../services/Github'

export function useGitHubIssues ({ url }: { url: string }) {
	const [issues, setIssues] = useState<Issue[]>([])
	const [issuesError, setIssuesError] = useState<Error | null>(null)
	const [issuesLabeled, setIssuesLabeled] = useState<Issue[]>([])
	const [issuesUnlabelled, setIssuesUnlabelled] = useState<Issue[]>([])
	const [issuesGroupedByLabel, setIssuesGroupedByLabel] = useState<IssuesGroupedByLabel>({})

	const fetchIssues = ({ owner, repo }: GitHubIssuesRequestParams) => {
		gitHubIssuesGetter({ owner, repo })
			.then((response) => {
				if (!response) {
					setIssuesError(new Error('No issues found or repo not exits'))
					return
				}
				if (issuesError) setIssuesError(null)
				setIssues(response)
			})
			.catch((error) => {
				setIssuesError(new Error(`No issues found or repo not exits. ${error.message}`))
				setIssues([])
			})
	}

	useEffect(() => {
		if (!url) return

		if (!url.startsWith('https://github.com/')) {
			// console.error("Invalid URL");
			setIssuesError(new Error('The url must start with [https://github.com/]'))
			return
		}
		const urlParts = url.replace('https://github.com/', '').split('/')
		if (urlParts.length !== 2) {
			console.error('Invalid URL')
			setIssuesError(new Error('The url must be in the format [https://github.com/USER/REPO]'))
			return
		}
		// debouncing
		const timeout = setTimeout(() => {
			const [owner, repo] = urlParts
			fetchIssues({ owner, repo })
		}, 500)
		return () => clearTimeout(timeout)
	}, [url])

	const filterIssuesGroupedByLabel = (issuesLabeled: Issue[]) => {
		if (!issuesLabeled.length || issuesError) return

		const tmpIssuesGroupedByLabel = groupIssuesByLabel({ issuesLabeled })
		// At least two issues by label are required to train the model
		const labelsExcluded: string[] = []
		const newIssuesGroupedByLabel = Object.keys(tmpIssuesGroupedByLabel).reduce(
			(acc: IssuesGroupedByLabel, label) => {
				if (tmpIssuesGroupedByLabel[label].length > 1) {
					acc[label] = tmpIssuesGroupedByLabel[label]
				} else {
					labelsExcluded.push(label)
				}
				return acc
			},
			{}
		)
		setIssuesGroupedByLabel(newIssuesGroupedByLabel)

		if (labelsExcluded.length === 0) return
		setIssuesError(
			new Error(
				`The following labels have been excluded from the training because they have less than two issues: ${labelsExcluded.join(
					', '
				)}`
			)
		)
	}

	useEffect(() => {
		if (!issues.length) return
		const tmpIssuesLabelled = filterLabeledIssues({ issues })
		setIssuesLabeled(tmpIssuesLabelled)
		setIssuesUnlabelled(filterUnlabelledIssues({ issues }))
		filterIssuesGroupedByLabel(tmpIssuesLabelled)
	}, [issues])

	const reloadIssuesUnlabelledWithPredictions = (issuesUnlabelled: Issue[]) => {
		setIssuesUnlabelled(issuesUnlabelled)
	}

	return {
		issues,
		issuesError,
		issuesLabeled,
		issuesUnlabelled,
		issuesGroupedByLabel,
		reloadIssuesUnlabelledWithPredictions
	}
}
