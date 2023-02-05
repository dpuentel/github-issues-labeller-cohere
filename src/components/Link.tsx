import type { ReactNode } from 'react'

export function Link ({
	href,
	customClass,
	text,
	title,
	external
}: {
	href: string
	customClass?: string
	text: ReactNode
	title?: string
	external?: boolean
}) {
	return (
		<a
			className={`${customClass ?? ''}`}
			href={href}
			rel='noopener noreferrer'
			target={external ? '_blank' : undefined}
			title={title ?? ''}
		>
			{text}
		</a>
	)
}
