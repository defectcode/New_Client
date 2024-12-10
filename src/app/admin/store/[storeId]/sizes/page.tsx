import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { Sizes } from './Sizes';

export const metadata: Metadata = {
  title: 'Sizes',
  ...NO_INDEX_PAGE
}

export default function SizesPage() {
  return <Sizes />;
}
