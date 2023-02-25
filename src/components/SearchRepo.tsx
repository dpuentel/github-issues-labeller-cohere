import { useEffect, useRef } from 'react'
import { useGitHubIssues } from '../hooks/useGitHubIssues'
import { useGitHubRepos } from '../hooks/useGitHubRepos'

interface SearchRepoProps {
	placeholder: string
	label: string
}

export function SearchRepo ({ placeholder, label }: SearchRepoProps) {
	const githubUrlInput = useRef<HTMLInputElement>(null)
	const { userRepos } = useGitHubRepos()

	const { repoUrl, setRepoUrl } = useGitHubIssues()

	useEffect(() => {
		if (githubUrlInput.current && !repoUrl) {
			githubUrlInput.current.focus()
		}
	}, [])

	return (
		<>
			<label className='w-full flex flex-row'>
				<span className='w-fit'>{label}</span>
				<input
					ref={githubUrlInput}
					type='url'
					placeholder={placeholder}
					list='repos'
					className='input input-bordered w-full rounded-lg p-2 bg-gray-800'
					value={repoUrl || ''}
					onChange={(e) => setRepoUrl(e.target.value)}
					autoFocus
				/>
				<datalist id='repos' className='absolute'>
					{userRepos.map((repo) => (
						<option
							key={repo.id}
							value={repo.html_url}
							className='w-full rounded-lg p-2 bg-gray-800'
						>
							{repo.name}
						</option>
					))}
				</datalist>
			</label>
		</>
	)
}
