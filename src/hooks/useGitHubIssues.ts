import { useContext, useEffect } from 'react'
import { IssuesContext } from '../context/issues'
import type { GitHubIssuesRequestParams, Issue, IssuesGroupedByLabel } from '../interfaces/GitHub'
import {
	gitHubIssuesGetter,
	filterLabeledIssues,
	filterUnlabelledIssues,
	groupIssuesByLabel
} from '../services/Github'

export function useGitHubIssues() {
	const context = useContext(IssuesContext)

	if (!context) {
		throw new Error('useGitHubIssues must be used within a IssuesProvider')
	}

	const {
		issues,
		setIssues,
		issuesError,
		setIssuesError,
		issuesLabeled,
		setIssuesLabeled,
		issuesUnlabelled,
		setIssuesUnlabelled,
		issuesGroupedByLabel,
		setIssuesGroupedByLabel,
		isLoading,
		setIsLoading,
		repoUrl,
		setRepoUrl,
		repo,
		setRepo,
		owner,
		setOwner,
		accessToken
	} = context

	const fetchIssues = ({ owner, repo }: GitHubIssuesRequestParams) => {
		setIsLoading(true)
		gitHubIssuesGetter({ owner, repo, accessToken })
			.then((response) => {
				if (!response) {
					setIssuesError(new Error('No issues found or repo not exits'))
					setIssues([])
					setIsLoading(false)
					return
				}
				if (issuesError) setIssuesError(null)
				if (response.length === 0) {
					setIssuesError(new Error('No issues found on the repo'))
					setIsLoading(false)
					return
				}
				setIssues(response)
				setRepo(repo)
				setOwner(owner)
			})
			.catch((error) => {
				setIssuesError(new Error(`No issues found or repo not exits. ${error.message}`))
				setIssues([])
				setIsLoading(false)
			})
	}

	const getUserAndRepoFromUrl = ({ url }: { url: string }) => {
		return url.replace('https://github.com/', '').split('/')
	}

	useEffect(() => {
		if (!repoUrl) return

		if (!repoUrl.startsWith('https://github.com/')) {
			setIssuesError(new Error('The url must start with [https://github.com/]'))
			return
		}
		const urlParts = getUserAndRepoFromUrl({ url: repoUrl })
		if (urlParts.length !== 2) {
			console.error('Invalid URL')
			setIssuesError(new Error('The url must be in the format [https://github.com/USER/REPO]'))
			return
		}
		// debouncing
		const timeout = setTimeout(() => {
			const [owner, repo] = urlParts
			fetchIssues({ owner, repo, accessToken })
		}, 800)
		return () => clearTimeout(timeout)
	}, [repoUrl])

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
		isLoading,
		setIsLoading,
		repoUrl,
		setRepoUrl,
		repo,
		owner,
		reloadIssuesUnlabelledWithPredictions
	}
}
