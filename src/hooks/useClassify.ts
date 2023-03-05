import { useEffect, useState } from 'react'
import type { CohereClassification } from '../interfaces/Cohere'
import type { Issue, IssuesGroupedByLabel } from '../interfaces/GitHub'
import { classify, generateExamplesByIssues, generateInputsByIssues } from '../services/Cohere'

export function useClassify ({
	issuesLabeled,
	issuesUnlabelled,
	issuesGroupedByLabel
}: {
	issuesLabeled: Issue[]
	issuesUnlabelled: Issue[]
	issuesGroupedByLabel: IssuesGroupedByLabel
}) {
	const [classifies, setClassifies] = useState<CohereClassification[]>([])

	useEffect(() => {
		if (
			!issuesGroupedByLabel ||
			Object.keys(issuesGroupedByLabel).length === 0 ||
			issuesUnlabelled.length === 0
		) {
			setClassifies([])
			return
		}

		classify({
			inputs: generateInputsByIssues(issuesUnlabelled),
			examples: generateExamplesByIssues(issuesGroupedByLabel)
		}).then((classifies) => {
			if (!classifies || !classifies?.classifications) {
				console.error('classifies is undefined')
				return
			}
			setClassifies(classifies.classifications)
		})
	}, [issuesLabeled])

	return { classifies }
}
