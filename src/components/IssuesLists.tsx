import { useContext, useEffect } from 'react'
import { IssuesContext } from '../context/issues'
import { useClassify } from '../hooks/useClassify'
import { IssuesList } from './IssuesList'

export function IssuesLists () {
	const context = useContext(IssuesContext)

	if (!context) {
		throw new Error('IssuesLists must be used within a IssuesProvider')
	}

	const {
		issues,
		issuesLabeled,
		issuesUnlabelled,
		issuesGroupedByLabel,
		setIssuesUnlabelled,
		setIsLoading
	} = context

	const { classifies } = useClassify({ issuesLabeled, issuesUnlabelled, issuesGroupedByLabel })

	useEffect(() => {
		const newIssuesUnlabelled = [...issuesUnlabelled]
		classifies.forEach((classify) => {
			const prediction = classify.prediction
			const confidence = classify.confidence
			const issue = newIssuesUnlabelled.find((issue) => issue.title === classify.input)
			if (!issue) return
			issue.prediction = prediction
			issue.confidence = Number((confidence * 100).toFixed())
		})
		setIssuesUnlabelled(newIssuesUnlabelled)
		setIsLoading(false)
	}, [classifies])

	return (
		<>
			{issues.length > 0 && (
				<>
					<IssuesList issues={issuesUnlabelled} headerText={'Unlabeled'} />
					<IssuesList issues={issuesLabeled} headerText={'Labeled'} />
				</>
			)}
		</>
	)
}
