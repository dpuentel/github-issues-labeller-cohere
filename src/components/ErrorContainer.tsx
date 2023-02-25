import { useContext } from 'react'
import { IssuesContext } from '../context/issues'

export function ErrorContainer () {
	const context = useContext(IssuesContext)

	if (!context) {
		throw new Error('ErrorContainer must be used within a IssuesProvider')
	}

	const { issuesError: error } = context

	return (
		<section
			className='bg-red-800 rounded-lg p-4 ease-in-out duration-500'
			style={{
				opacity: error ? 1 : 0
			}}
		>
			{error?.message}
		</section>
	)
}
