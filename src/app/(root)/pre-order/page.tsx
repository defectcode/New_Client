import type { Metadata } from 'next'

import { productService } from '@/services/product.service'

import { PreOrder } from './Pre-Order'

export const metadata: Metadata = {
	title: 'Product Catalog'
}

export const revalidate = 60

async function getProducts() {
	const data = await productService.getAll()

	return data
}

export default async function ExplorerPage() {
	const data = await getProducts()

	return <PreOrder products={data} />
}
