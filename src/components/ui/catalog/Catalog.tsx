import Link from 'next/link'
import { ICatalog } from './catalog.interface'
import { ProductCard } from './product-card/ProductCard'
import { colorColumns } from '../../../app/store/[storeId]/colors/ColorColumns';

export function Catalog({
	title,
	description,
	linkTitle,
	link,
	products
}: ICatalog) {
	return (
		<div className='max-w-[1400px] w-full mx-auto md:px-0 px-5'>
			<div className="md:flex md:items-center md:justify-between mb-4 md:mt-5">
				<div className="max-w-2xl px-4 lg:max-w-full lg:px-0">
					<h1 className="text-2xl font-bold">{title}</h1>
					{description && <p className="mt-2 text-sm text-muted-foreground">{description}</p>}
				</div>
				{link && linkTitle && (
					<Link href={link} className="hidden text-sm font-medium text-black hover:text-black/50 md:flex">
						{linkTitle}
					</Link>
				)}
			</div>

			<div className="flex items-center w-full">
				<div className="mt-2 w-full grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-4 gap-8">
					{products.length ? (
						products.map(product => (
							<div className="w-full h-full" key={product.id}>
								<ProductCard product={product} />
							</div>
						))
					) : (
						<div>Нечего не найдено</div>
					)}
				</div>
			</div>
		</div>
	)
}
