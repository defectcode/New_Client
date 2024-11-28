import Image from 'next/image'
import Link from 'next/link'

import { PUBLIC_URL } from '@/config/url.config'

import { IProduct } from '@/shared/types/product.interface'

import { formatPrice } from '@/utils/string/format-price'

// Definim un array de culori pentru produse
const AVAILABLE_COLORS = ['Red', 'Blue', 'Green', 'Yellow', 'Black', 'White'];

interface ProductCardProps {
	product: IProduct,
    isBestSeller?: boolean; // New property
}

export function ProductCard({ product, isBestSeller }: ProductCardProps) {
	// Generăm un array de culori pentru produs pe baza indexului său
	const productColors = AVAILABLE_COLORS.slice(0, Math.max(1, Math.floor(4) + 1)); // Între 1 și 4 culori

	return (
		<div className="bg-transparent">
			{isBestSeller && (
				<div className="absolute top-2 left-2 bg-red-100 text-red-600 text-xs font-semibold py-1 px-2 rounded">
					Best Seller
				</div>
			)}
			<Link href={PUBLIC_URL.product(product.id)}>
				<Image
					src={product.images[0]}
					alt={product.title}
					width={352}
					height={352}
					className="rounded-[10px]"
				/>
			</Link>

			<h3 className="mt-4 font-semibold text-gray-700 line-clamp-1">{product.title}</h3>
			<Link
				href={PUBLIC_URL.category(product.category.id)}
				className="mt-1 text-sm text-gray-500"
			>
				{product.category.title}
			</Link>
			{/* Afișează numărul total de culori */}
			<p className="mt-1 text-sm text-gray-500">
				{productColors.length} {productColors.length === 1 ? 'Color' : 'Colors'}
			</p>
			<p className="mt-1 font-medium text-sm text-gray-900">{formatPrice(product.price)}</p>
		</div>
	)
}
