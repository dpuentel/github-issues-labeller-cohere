export function ErrorContainer ({ error }: { error: Error | null }) {
	return <section className='bg-red-800 rounded-lg p-4 ease-in-out duration-500'
		style={{
			opacity: error ? 1 : 0
		}}
	>{error?.message}</section>
}
