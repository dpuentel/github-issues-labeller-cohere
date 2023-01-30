import type {
	ApiClassifyResponse,
	CohereClasifyRequestParams,
	CohereExampleGithubIssue
} from '../interfaces/Cohere'
import type { Issue, IssuesGroupedByLabel } from '../interfaces/GitHub'

export function generateExamplesByIssues (
	issuesGroupedByLabel: IssuesGroupedByLabel
): CohereExampleGithubIssue[] {
	const examples: CohereExampleGithubIssue[] = []
	Object.entries(issuesGroupedByLabel).forEach(([label, issues]) => {
		const labelExamples = issues.map((issue) => {
			return {
				text: issue.title,
				label
			}
		})
		examples.push(...labelExamples)
	})
	return examples
}

export function generateInputsByIssues (issuesUnlabelled: Issue[]) {
	return issuesUnlabelled.map((issue) => issue.title)
}

export async function classify (classifyRequest: CohereClasifyRequestParams) {
	return fetch('/api/classify', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(classifyRequest)
	})
		.then((response): Promise<ApiClassifyResponse> => {
			return response.json()
		})
		.catch((error) => {
			console.error(error)
		})
}
