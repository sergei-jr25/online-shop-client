import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Crumb({
	text: defaultText,
	textGenerator,
	href,
	last = false
}: {
	text: string
	textGenerator: () => string
	href: string
	last: boolean
}) {
	const [text, setText] = useState(defaultText)

	useEffect(async () => {
		// If `textGenerator` is nonexistent, then don't do anything
		if (!Boolean(textGenerator)) {
			return
		}
		// Run the text generator and set the text again
		const finalText = await textGenerator()
		setText(finalText)
	}, [textGenerator])

	if (last) {
		return <div color='text.primary'>{text}</div>
	}

	return (
		<Link color='inherit' href={href}>
			{text}
		</Link>
	)
}
