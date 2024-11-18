// CatalogBag.tsx
import Link from 'next/link'
import { ICatalog } from './catalog.interface'
import { ProductBag } from './product-card/ProductBag'
import { useCart } from '@/hooks/useCart'
import { ProductCard } from './product-card/ProductCard'

export function CatalogBag({
  title,
  description,
  linkTitle,
  link,
  products
}: ICatalog) {
  const { items, total } = useCart()

  return (
    <div className="md:pt-5 rounded-lg md:min-h-screen min-h-[300px] max-w-[1000px] w-full mx-auto flex flex-col items-center justify-between">
      {items.length ? (
				items.map((item) => (
					<ProductBag key={item.id} product={item.product} />
				))
			) : (
        <div className="text-sm text-gray-500 text-center">The cart is empty!</div>
      )}
    </div>
  )
}
