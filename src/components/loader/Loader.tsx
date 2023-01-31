import './Loader.css'
export function Loader ({ isEnabled }: {isEnabled: boolean}) {
	return (
		<div className='loader-container'>
			<span className='loader ease-in-out duration-500' style={{
				opacity: isEnabled ? 1 : 0
			}}></span>
		</div>
	)
}
