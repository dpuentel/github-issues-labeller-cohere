export function ErrorContainer ({ error }: { error: Error }) {
	return <section className='bg-red-800 rounded-lg p-4'>{error.message}</section>
}
