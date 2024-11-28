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
		<div className="bg-transparent relative"> {/* Add relative for positioning the badge */}
			{/* Verificăm dacă produsul este Best Seller folosind prop-ul isBestSeller */}
			{isBestSeller && (
				<div className="absolute top-2 left-2 bg-red-100 text-red-600 text-xs font-semibold py-1 px-2 rounded">
					Best Seller
				</div>
			)}
			{/* Imaginea produsului */}
			<Link href={PUBLIC_URL.product(product.id)} className=''>
				<Image
					src={product.images[0]}
					alt={product.title}
					width={352}
					height={352}
					className="rounded-[10px] bg-white"
				/>
			</Link>

			{/* {product?.id % 2 !== 0 && !isBestSeller && ( */}
				<h2 className="text-[#9B111E] mt-5">
					Best Seller
				</h2>
			{/* )} */}

			{/* Titlu produs */}
			<h3 className="mt-[10px] font-semibold text-[#000000] line-clamp-1 font-Heebo-15-reg md:hidden">{product.title}</h3>
			<h3 className="mt-[10px] font-semibold text-[#000000] line-clamp-1 font-Heebo-16-reg md:block hidden">{product.title}</h3>

			{/* Link către categoria produsului */}
			<Link
				href={PUBLIC_URL.category(product.category.id)}
				className="text-sm text-[#8C8C8C] mb-[10px]"
			>
				{product.category.title}
			</Link>

			{/* Afișează numărul total de culori */}
			<p className="mb-5 text-sm text-[#BDBDBD]">
				{productColors.length} {productColors.length === 1 ? 'Color' : 'Colors'}
			</p>

			{/* Prețul produsului */}
			<p className="font-medium text-[16px] text-[#1E1E1E]">{formatPrice(product.price)}</p>
		</div>
	)
}
