import { useContext } from 'react'
import { IssuesContext } from '../../context/issues'
import './Loader.css'

export function Loader () {
	const context = useContext(IssuesContext)

	if (!context) {
		throw new Error('Loader must be used within a IssuesProvider')
	}

	const { isLoading } = context
	return (
		<div className='loader-container'>
			<span
				className='loader ease-in-out duration-500'
				style={{
					opacity: isLoading ? 1 : 0
				}}
			></span>
		</div>
	)
}
