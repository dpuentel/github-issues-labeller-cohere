import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { PrismAsync as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import rangeParser from 'parse-numeric-range'
import type { ReactElement } from 'react-markdown/lib/react-markdown'

export default function Markdown ({ children }: { children: string }) {
	const syntaxTheme = oneDark

	const handleCode = ({ ...props }): ReactElement => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { node, inline, className, ...rest } = props
		const match = /language-(\w+)/.exec(className || '')
		const hasMeta = node?.data?.meta

		const applyHighlights: object = (applyHighlights: number) => {
			if (!hasMeta) return {}

			const RE = /{([\d,-]+)}/
			const metadata = node.data.meta?.replace(/\s/g, '')
			let strlineNumbers = '0'
			if (RE?.test(metadata)) {
				const regexResult = RE.exec(metadata)
				strlineNumbers = regexResult ? regexResult[1] : '0'
			}
			const highlightLines = rangeParser(strlineNumbers)
			const highlight = highlightLines
			const data: string | null = highlight.includes(applyHighlights) ? 'highlight' : null
			return { data }
		}

		return match
			? (
				<SyntaxHighlighter
					language={match[1]}
					style={syntaxTheme}
					PreTag='div'
					className='codeStyle'
					showLineNumbers={true}
					wrapLines={!!hasMeta}
					useInlineStyles={true}
					lineProps={applyHighlights}
					{...rest}
				>
				</SyntaxHighlighter>

			)
			: (
				<code className={className} {...rest} />
			)
	}

	const handleAnchor = ({ ...props }): ReactElement => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { node, ...rest } = props
		return <a style={{ color: '#7e7eff' }} target='_blank' {...rest} />
	}

	const handleP = ({ ...props }): ReactElement => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { children, node, ...rest } = props
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const hasAnchor = children?.find((child: any) => child?.props?.node?.tagName === 'a')
		return (
			<p
				style={
					hasAnchor ? { overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' } : {}
				}
				{...rest}
			>
				{children}
			</p>
		)
	}

	const MarkdownComponents: object = {
		code: ({ ...props }) => handleCode(props),
		a: ({ ...props }) => handleAnchor(props),
		p: ({ ...props }) => handleP(props)
	}

	return (
		<ReactMarkdown
			components={MarkdownComponents}
			remarkPlugins={[remarkGfm]}
			rehypePlugins={[rehypeRaw]}
			skipHtml={false}
		>
			{children}
		</ReactMarkdown>
	)
}
