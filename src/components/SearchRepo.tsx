import { useState, useEffect, useRef } from 'react'
import { useClassify } from '../hooks/useClassify'
import { useGitHubIssues } from '../hooks/useGitHubIssues'
import type { Issue } from '../interfaces/GitHub'
import { ErrorContainer } from './ErrorContainer'
import { IssuesList } from './IssuesList'
import { Loader } from './loader/Loader'
import Modal from './Modal'

interface SearchRepoProps {
	placeholder: string
	label: string
}

export function SearchRepo ({ placeholder, label }: SearchRepoProps) {
	const githubUrlInput = useRef<HTMLInputElement>(null)
	const [url, setUrl] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [modalIssue, setModalIssue] = useState<Issue | null>(null)

	const setLoader = (active: boolean) => {
		setIsLoading(active)
	}

	const {
		issues,
		issuesError,
		issuesLabeled,
		issuesUnlabelled,
		issuesGroupedByLabel,
		reloadIssuesUnlabelledWithPredictions
	} = useGitHubIssues({ url, setLoader })
	const { classifies } = useClassify({ issuesLabeled, issuesUnlabelled, issuesGroupedByLabel })

	useEffect(() => {
		if (githubUrlInput.current && !url) {
			githubUrlInput.current.focus()
		}
	}, [])

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
		reloadIssuesUnlabelledWithPredictions(newIssuesUnlabelled)
		setLoader(false)
	}, [classifies])

	const openModal = (issue: Issue) => {
		setModalIssue(issue)
	}

	const closeModal = () => {
		setModalIssue(null)
	}

	return (
		<>
			<Modal closeModal={closeModal} title={modalIssue?.title} body={modalIssue?.body} link={modalIssue?.html_url} />
			<label className='w-full flex flex-row'>
				<span className='w-fit'>{label}</span>
				<input
					ref={githubUrlInput}
					type='url'
					placeholder={placeholder}
					className='input input-bordered w-full rounded-lg p-2 bg-gray-800'
					value={url}
					onChange={(e) => setUrl(e.target.value)}
					autoFocus
				/>
			</label>
			<Loader isEnabled={isLoading}/>
			<ErrorContainer error={issuesError} />

			{issues.length > 0 && (
				<>
					<IssuesList issues={issuesUnlabelled} headerText={'Unlabeled'} openModal={openModal}/>
					<IssuesList issues={issuesLabeled} headerText={'Labeled'} openModal={openModal}/>
				</>
			)}
		</>
	)
}
