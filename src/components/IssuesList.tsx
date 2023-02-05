import type { Issue } from '../interfaces/GitHub'
import { IssueListItem } from './IssueListItem'

export function IssuesList ({ issues, headerText, openModal }: { issues: Issue[]; headerText?: string, openModal: (issue: Issue) => void }) {
	return (
		<>
			{headerText && <h2 className='text-3xl font-bold'>{headerText}</h2>}
			{issues.length > 0 && (
				<ul>
					{issues.map((issue) => (
						<li
							key={issue.id}
							className='grid grid-cols-7 gap-4 p-2 my-2 justify-evenly items-center border border-gray-600 rounded-lg bg-gray-800 hover:bg-gray-700 cursor-pointer'
							onClick={() => openModal(issue)}
						>
							<IssueListItem issue={issue} />
						</li>
					))}
				</ul>
			)}
			{issues.length === 0 && <div>There aren't issues to show here 😭</div>}
		</>
	)
}
