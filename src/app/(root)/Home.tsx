'use client'
import { Catalog } from '@/components/ui/catalog/Catalog'
import { PUBLIC_URL } from '@/config/url.config'
import { IProduct } from '@/shared/types/product.interface'
import { Hero } from './hero/Hero'
import { CatalogBag } from '@/components/ui/catalog/CatalogBag'
import { CatalogCheckout } from '@/components/ui/catalog/CatalogChecout'
import { CatalogForProduct } from '@/components/ui/catalog/CatalogForProduct'
import BackgroundHome from '@/components/ui/catalog/components/BackgroundHome'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { productService } from '@/services/product.service'
import { Header } from '@/components/layouts/main-layout/header/Header'
import '../(root)/hero/style/Hero.css'
import { Color } from '@/components/ui/catalog/product-card/components/Color'
import BackgroundHomeButton from '@/components/ui/catalog/components/BackgroundHomeButton'

interface HomeProps {
	products: IProduct[]
}

export function Home({ products }: HomeProps) {
	const searchParams = useSearchParams();
	const searchTerm = searchParams?.get('searchTerm');

	const { data } = useQuery({
		queryKey: ['product explorer', searchTerm],
		queryFn: () => productService.getAll(searchTerm),
		initialData: products
	  });
	return (
		<div>
			<div className='images'>
				<Header />
                <Hero />
            </div>
			<CatalogForProduct
				title="New Arrivals"
				description="Check out the latest additions to our store!"
				linkTitle="Catalog"
				link={PUBLIC_URL.explorer()}
				products={data}
			/>			
			<BackgroundHome/>
			<Catalog
				title='Bestsellers'
				description='The most popular products in our store.'
				linkTitle='Catalog'
				link={PUBLIC_URL.explorer()}
				products={products}
			/>
			<BackgroundHomeButton/>
		</div>
	)
}
