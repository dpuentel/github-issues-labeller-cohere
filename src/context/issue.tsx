import { createContext, ReactNode, useState } from 'react'
import type { Issue } from '../interfaces/GitHub'

interface IssueContextProps {
	issue: Issue | null
	setIssue: (issue: Issue | null) => void
}

const initialState: IssueContextProps = {
	issue: null,
	setIssue: () => {
		return null
	}
}

export const IssueContext = createContext(initialState)

export function IssueProvider ({ children }: { children: ReactNode }) {
	const [issue, setIssue] = useState<Issue | null>(null)

	return <IssueContext.Provider value={{ issue, setIssue }}>{children}</IssueContext.Provider>
}
