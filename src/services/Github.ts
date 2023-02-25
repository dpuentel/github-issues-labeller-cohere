import type {
	GitHubIssuesRequestParams,
	Issue,
	IssuesGroupedByLabel,
	Repository,
	GitHubPrivateUser,
	GitHubPublicUser,
	GitHubRepositoryCollaboratorPermission
} from '../interfaces/GitHub'

export async function gitHubIssuesGetter({ owner, repo, accessToken }: GitHubIssuesRequestParams) {
	const headers = new Headers()
	if (accessToken) {
		headers.append('Authorization', `token ${accessToken}`)
	}
	return fetch(`https://api.github.com/repos/${owner}/${repo}/issues?per_page=100&page=1`, {
		headers
	}).then((response): Promise<Issue[]> => {
		if (response.status === 200 && response.ok) {
			return response.json()
		}
		return Promise.reject(response)
	})
}

export async function gitHubUserReposGetter({ accessToken }: { accessToken: string }) {
	if (!accessToken) return Promise.reject(new Error('No access token provided!'))

	const headers = new Headers()
	headers.append('Authorization', `token ${accessToken}`)
	return fetch('https://api.github.com/user/repos?per_page=100&page=1', {
		headers
	}).then((response): Promise<Repository[]> => {
		if (response.status === 200 && response.ok) {
			return response.json()
		}
		return Promise.reject(response)
	})
}

export async function gitHubRepositoryCollaboratorPermissionsGetter({
	owner,
	repo,
	accessToken
}: {
	owner: string
	repo: string
	accessToken: string
}): Promise<GitHubRepositoryCollaboratorPermission> {
	if (!accessToken) throw new Error('No access token provided!')

	const user = await gitHubAuthenticatedUserGetter({ accessToken })

	if (!user || !user.login) throw new Error('No user found!')

	const headers = new Headers()
	headers.append('Authorization', `token ${accessToken}`)

	const response = await fetch(
		`https://api.github.com/repos/${owner}/${repo}/collaborators/${user.login}/permission`,
		{
			headers
		}
	)

	if (response.status !== 200 || !response.ok) {
		throw new Error('No permission found!')
	}

	return await response.json()
}

export async function gitHubUserHasWritePermissionOnRepo({
	owner,
	repo,
	accessToken
}: {
	owner: string
	repo: string
	accessToken: string
}) {
	const permissionResponse = await gitHubRepositoryCollaboratorPermissionsGetter({
		owner,
		repo,
		accessToken
	})
	if (!permissionResponse || !permissionResponse.permission) {
		throw new Error('No permission found!')
	}

	return permissionResponse.permission === 'admin' || permissionResponse.permission === 'write'
}

export async function gitHubAuthenticatedUserGetter({
	accessToken
}: {
	accessToken: string
}): Promise<GitHubPrivateUser | GitHubPublicUser> {
	if (!accessToken) return Promise.reject(new Error('No access token provided!'))

	const headers = new Headers()
	headers.append('Authorization', `token ${accessToken}`)
	return fetch('https://api.github.com/user', {
		headers
	}).then((response): Promise<GitHubPrivateUser | GitHubPublicUser> => {
		if (response.status === 200 && response.ok) {
			return response.json()
		}
		return Promise.reject(response)
	})
}

export async function logout({
	accessToken
}: {
	accessToken: string
}): Promise<{ logout: boolean }> {
	if (!accessToken) return Promise.reject(new Error('No access token provided!'))

	return fetch('/api/logout', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ accessToken })
	}).then((response) => {
		if (response.status === 200 && response.ok) {
			return response.json()
		}
		return Promise.reject(response)
	})
}

export async function gitHubAddLabelToIssue({
	owner,
	repo,
	issueNumber,
	label,
	accessToken
}: {
	owner: string
	repo: string
	issueNumber: number
	label: string
	accessToken: string
}) {
	if (!accessToken) return Promise.reject(new Error('No access token provided!'))

	const headers = new Headers()
	headers.append('Authorization', `token ${accessToken}`)
	return fetch(`https://api.github.com/repos/${owner}/${repo}/issues/${issueNumber}/labels`, {
		method: 'POST',
		headers,
		body: JSON.stringify([label])
	}).then((response): Promise<boolean> => {
		if (response.status === 200 && response.ok) {
			return Promise.resolve(true)
		}
		response.json().then((json) => {
			console.error(json)
		})
		return Promise.reject(response)
	})
}

export function filterUnlabelledIssues({ issues }: { issues: Issue[] }) {
	return issues.filter((issue) => issue.labels.length === 0)
}

export function filterLabeledIssues({ issues }: { issues: Issue[] }) {
	return issues.filter((issue) => issue.labels.length > 0)
}

export function groupIssuesByLabel({ issuesLabeled }: { issuesLabeled: Issue[] }) {
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
