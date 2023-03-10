import { MouseEvent, useState } from 'react'
import { useAddLabelToIssue } from '../hooks/useAddLabelToIssue'
import type { Issue } from '../interfaces/GitHub'
import { Dialog } from './Dialog'

export function IssueListItem ({ issue }: { issue: Issue }) {
	const [showConfirmation, setShowConfirmation] = useState(false)
	const { addLabelToIssue } = useAddLabelToIssue()

	const handlerPredictionClick = (e: MouseEvent<HTMLSpanElement>) => {
		e.preventDefault()
		e.stopPropagation()
		setShowConfirmation(true)
	}

	const dialogBody = () => {
		return `Are you sure you want to label this issue as ${issue.prediction}?`
	}

	const handlerDialogClick = ({ isAccepted }: { isAccepted: boolean }) => {
		if (isAccepted && issue.prediction) {
			addLabelToIssue({ issue, label: issue.prediction })
		}
		setShowConfirmation(false)
	}

	return (
		<>
			<Dialog body={dialogBody()} clickHandler={handlerDialogClick} isVisible={showConfirmation} />
			<span
				className='w-fit rounded-lg p-2 text-gray-900 font-semibold max-w-[6em] overflow-hidden overflow-ellipsis'
				style={{
					backgroundColor: `#${issue.labels.at(0)?.color ?? 'e6dae7'}`
				}}
				title={issue.labels.at(0)?.name ?? 'NO LABEL'}
			>
				{issue.labels.at(0)?.name ?? 'NO LABEL'}
			</span>
			<span className='col-span-4 hover:text-gray-200'>{issue.title}</span>
			{issue.prediction && (
				<span
					className='w-fit rounded-lg p-2 text-gray-900 font-black ml-auto relative col-span-2 min-w-[7em] text-center max-w-[12em] overflow-hidden overflow-ellipsis'
					style={{
						background: `linear-gradient(to right, #22c55e ${issue.confidence}%,#e6dae7 ${issue.confidence}%)`
					}}
					title={`${issue.prediction} - ${issue.confidence}%`}
					onClick={handlerPredictionClick}
				>
					{issue.prediction}
					<span className='text-gray-800 text-4xl px-1 absolute left-0 right-0 text-center opacity-50 font-black top-0'>
						{issue.confidence}%
					</span>
				</span>
			)}
		</>
	)
}
