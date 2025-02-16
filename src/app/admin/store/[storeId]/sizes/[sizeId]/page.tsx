import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { SizeEdit } from './SizeEdit'


export const metadata: Metadata = {
	title: 'Setting up a category',
	...NO_INDEX_PAGE
}

export default function CategoryEditPage() {
	return <SizeEdit />
}
