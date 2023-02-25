import { useIssue } from '../hooks/useIssue'
import { IssueModalExtraHeaderContent } from './IssueModalExtraHeaderContent'
import Modal from './Modal'

export function IssueModal () {
	const { issue, closeModal } = useIssue()

	const prediction = () => issue && issue?.prediction ? <IssueModalExtraHeaderContent issue={issue}/> : undefined

	return (
		<Modal closeModal={closeModal} title={issue?.title} body={issue?.body} link={issue?.html_url} extraHeaderContent={prediction()} />
	)
}
