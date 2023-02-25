import { MouseEvent, useEffect, useState } from 'react'

export function Dialog ({ body, isVisible, clickHandler }: { body?: string, isVisible: boolean, clickHandler: ({ isAccepted }: {isAccepted: boolean}) => void }) {
	const [firstRender, setFirstRender] = useState(true)

	useEffect(() => {
		if (firstRender) {
			setTimeout(() => {
				setFirstRender(false)
			}, 1000)
		}
	}, [])
	const dissmissDialog = (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()
		event.stopPropagation()
		clickHandler({ isAccepted: false })
	}

	const acceptDialog = (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()
		event.stopPropagation()
		clickHandler({ isAccepted: true })
	}
	return (
		<>

			<dialog
				open
				className={`container max-w-3xl p-2 w-3xl justify-evenly rounded-lg z-10 ${firstRender ? 'opacity-0' : ''} ${isVisible ? 'animate-slideInFromLeft' : 'animate-slideOutToLeft'} origin-left text-gray-300 text-center font-semibold items-center border border-gray-600 bg-indigo-800 cursor-pointer`}
				onClick={(e) => e.stopPropagation()}
			>
				<p>{body}</p>
				<form method='dialog' className='text-center inline-flex gap-4'>
					<button className='rounded-lg border border-gray-400 w-24 bg-green-800 hover:bg-green-700' onClick={acceptDialog}>OK</button>
					<button className='rounded-lg border border-gray-400 w-24 bg-red-800 hover:bg-red-700' type='reset' onClick={dissmissDialog}>Cancel</button>
				</form>
			</dialog>
		</>

	)
}
