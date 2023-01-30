export function Link ({
	href,
	customClass,
	title,
	external
}: {
	href: string
	customClass?: string
	title: string
	external?: boolean
}) {
	return (
		<a
			className={`${customClass ?? ''}`}
			href={href}
			rel='noopener noreferrer'
			target={external ? '_blank' : undefined}
		>
			{title}
		</a>
	)
}
