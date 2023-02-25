import type { MouseEvent } from 'react'
import { useAddLabelToIssue } from '../hooks/useAddLabelToIssue'
import type { Issue } from '../interfaces/GitHub'

export function IssueModalExtraHeaderContent ({ issue }: {issue: Issue}) {
	const { addLabelToIssue } = useAddLabelToIssue()

	const acceptDialog = (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()
		event.stopPropagation()

		if (!issue.prediction) return

		addLabelToIssue({ issue, label: issue.prediction })
	}
	return (
		<>
			{issue.prediction && (
				<div className='container max-w-3xl p-2 w-3xl justify-evenly relative rounded-lg text-gray-300 text-center font-semibold items-center border border-gray-600 bg-indigo-800 cursor-pointer'>
					<p>The AI predicted the label <b>{issue.prediction}</b> with a <b>{issue.confidence}%</b> confidence! Apply it?</p>
					<form method='dialog' className='text-center inline-flex gap-4'>
						<button className='rounded-lg border border-gray-400 w-24 bg-green-800 hover:bg-green-700' onClick={acceptDialog}>OK</button>
					</form>
				</div>
			)}
		</>
	)
}
