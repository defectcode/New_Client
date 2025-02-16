import { ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'

import { Button } from '@/components/ui/Button'

import { PUBLIC_URL } from '@/config/url.config'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'


export const metadata: Metadata = {
	title: 'Thank you for your purchase',
	...NO_INDEX_PAGE
}

export default function ThanksPage() {
	return (
		<div>
			<h1>Thank you for your purchase</h1>
			<p>
				Thank you for your order! We appreciate your trust and will do our best to deliver your order as soon as possible.
			</p>
			<Link href={PUBLIC_URL.home()}>
				<Button variant='primary'>
				To the main page
					<ArrowRight />
				</Button>
			</Link>
		</div>
	)
}
