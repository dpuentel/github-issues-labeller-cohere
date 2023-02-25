import { useEffect, useState } from 'react'
import { Link } from './Link'
import Markdown from './Markdown'

export default function Modal ({
	title,
	body,
	link,
	extraHeaderContent,
	closeModal
}: {
	title: string | undefined
	body: string | undefined
	link: string | undefined
	extraHeaderContent?: JSX.Element
	closeModal: () => void
}) {
	const [isClosing, setIsClosing] = useState(false)

	useEffect(() => {
		setIsClosing(!(body && title))
	}, [body])

	const handlerCloseModal = () => {
		setIsClosing(true)
		setTimeout(() => {
			closeModal()
		}, 800)
	}
	return (
		<>
			<div
				className='justify-center items-center flex overflow-x-hidden min-h-full bg-gray-900/90 left-0 right-0 overflow-y-auto fixed top-0 -z-10 outline-none focus:outline-none ease-in-out duration-500'
				style={{
					opacity: body && title && !isClosing ? 1 : 0,
					zIndex: body && title ? 50 : -10
				}}
			>
				<div className='relative w-auto my-6 mx-auto max-w-3xl'>
					<div className='border-0 rounded-lg shadow-lg relative flex flex-col overflow-hidden h-[80vh] w-full bg-gray-700 outline-none focus:outline-none'>
						<header className='grid grid-rows-2 p-5 border-b border-solid border-slate-200 rounded-t'>
							<div className='flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t'>
								<h3 className='text-3xl font-semibold'>{title}</h3>
								<div className='float-right flex gap-2'>
									<Link
										customClass='h-8 w-8 text-2xl text-gray-300 hover:text-gray-200'
										text={
											<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
												<path
													fill='none'
													stroke='currentColor'
													strokeLinecap='round'
													strokeLinejoin='round'
													strokeWidth='32'
													d='M384 224v184a40 40 0 0 1-40 40H104a40 40 0 0 1-40-40V168a40 40 0 0 1 40-40h167.48M336 64h112v112M224 288 440 72'
												/>
											</svg>
										}
										title={'Open on GitHub'}
										href={link ?? '#'}
										external={true}
									/>
									<button
										className='bg-transparent text-gray-300 hover:text-gray-200 h-8 w-8 text-2xl block outline-none focus:outline-none'
										onClick={() => handlerCloseModal()}
										title='Close'
									>
										<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
											<path
												fill='none'
												stroke='currentColor'
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth='32'
												d='M368 368 144 144m224 0L144 368'
											/>
										</svg>
									</button>
								</div>
							</div>
							{extraHeaderContent}
						</header>
						<div className='relative p-6 flex-auto overflow-auto'>
							{body && <Markdown children={body}></Markdown>}
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
