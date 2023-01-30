export function Link ({
	href,
	customClass,
	text,
	title,
	external
}: {
	href: string
	customClass?: string
	text: string
	title?: string
	external?: boolean
}) {
	return (
		<a
			className={`${customClass ?? ''}`}
			href={href}
			rel='noopener noreferrer'
			target={external ? '_blank' : undefined}
			title={title ?? text}
		>
			{text}
		</a>
	)
}
