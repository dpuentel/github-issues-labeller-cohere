import { createContext, ReactNode, useState } from 'react'
import { useAccessToken } from '../hooks/useAccessToken'
import type { Issue, IssuesGroupedByLabel } from '../interfaces/GitHub'

interface IssuesContextProps {
	issues: Issue[]
	setIssues: (issues: Issue[]) => void
	issuesError: Error | null
	setIssuesError: (error: Error | null) => void
	issuesLabeled: Issue[]
	setIssuesLabeled: (issues: Issue[]) => void
	issuesUnlabelled: Issue[]
	setIssuesUnlabelled: (issues: Issue[]) => void
	issuesGroupedByLabel: IssuesGroupedByLabel
	setIssuesGroupedByLabel: (issuesGroupedByLabel: IssuesGroupedByLabel) => void
	isLoading: boolean
	setIsLoading: (isLoading: boolean) => void
	repoUrl: string | null
	setRepoUrl: (repoUrl: string | null) => void
	repo: string | null
	setRepo: (repo: string | null) => void
	owner: string | null
	setOwner: (owner: string | null) => void
	accessToken: string | null
}

const initialState: IssuesContextProps = {
	issues: [],
	setIssues: () => {
		return null
	},
	issuesError: null,
	setIssuesError: () => {
		return null
	},
	issuesLabeled: [],
	setIssuesLabeled: () => {
		return null
	},
	issuesUnlabelled: [],
	setIssuesUnlabelled: () => {
		return null
	},
	issuesGroupedByLabel: {},
	setIssuesGroupedByLabel: () => {
		return null
	},
	isLoading: false,
	setIsLoading: () => {
		return null
	},
	repoUrl: null,
	setRepoUrl: () => {
		return null
	},
	repo: null,
	setRepo: () => {
		return null
	},
	owner: null,
	setOwner: () => {
		return null
	},
	accessToken: null
}

export const IssuesContext = createContext(initialState)

export function IssuesProvider ({ children }: { children: ReactNode }) {
	const [issues, setIssues] = useState<Issue[]>([])
	const [issuesError, setIssuesError] = useState<Error | null>(null)
	const [issuesLabeled, setIssuesLabeled] = useState<Issue[]>([])
	const [issuesUnlabelled, setIssuesUnlabelled] = useState<Issue[]>([])
	const [issuesGroupedByLabel, setIssuesGroupedByLabel] = useState<IssuesGroupedByLabel>({})
	const [isLoading, setIsLoading] = useState(false)
	const [repoUrl, setRepoUrl] = useState<string | null>(null)
	const [repo, setRepo] = useState<string | null>(null)
	const [owner, setOwner] = useState<string | null>(null)
	const { accessToken } = useAccessToken()

	return (
		<IssuesContext.Provider
			value={{
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
			}}
		>
			{children}
		</IssuesContext.Provider>
	)
}
