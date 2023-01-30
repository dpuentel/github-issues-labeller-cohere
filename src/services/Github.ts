import type { GitHubIssuesRequestParams, Issue, IssuesGroupedByLabel } from '../interfaces/GitHub'

export async function gitHubIssuesGetter ({ owner, repo }: GitHubIssuesRequestParams) {
	return fetch(`https://api.github.com/repos/${owner}/${repo}/issues?per_page=100&page=1`).then(
		(response): Promise<Issue[]> => {
			if (response.status === 200 && response.ok) {
				return response.json()
			}
			return Promise.reject(response)
		}
	)
}

export function filterUnlabelledIssues ({ issues }: { issues: Issue[] }) {
	return issues.filter((issue) => issue.labels.length === 0)
}

export function filterLabeledIssues ({ issues }: { issues: Issue[] }) {
	return issues.filter((issue) => issue.labels.length > 0)
}

export function groupIssuesByLabel ({ issuesLabeled }: { issuesLabeled: Issue[] }) {
	return issuesLabeled.reduce((acc: IssuesGroupedByLabel, issue) => {
		issue.labels.forEach((label) => {
			if (!acc[label.name]) {
				acc[label.name] = []
			}
			acc[label.name].push(issue)
		})
		return acc
	}, {})
}
