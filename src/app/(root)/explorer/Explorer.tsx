'use client'

import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'

import { Catalog } from '@/components/ui/catalog/Catalog'

import { productService } from '@/services/product.service'

import { IProduct } from '@/shared/types/product.interface'
import { CatalogProducts } from '@/components/ui/catalog/CatalogProducts'
import { useEffect, useState } from 'react'
import { CatalogMobile } from '@/components/ui/catalog/components/CatalogMobile'

interface ExplorerProps {
	products: IProduct[]
}

export function Explorer({ products }: ExplorerProps) {
	const searchParams = useSearchParams();
	const searchTerm = searchParams?.get('searchTerm');
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const updateIsMobile = () => {
		  setIsMobile(window.matchMedia("(max-width: 768px)").matches);
		};
	
		updateIsMobile();
		window.addEventListener("resize", updateIsMobile);
		return () => window.removeEventListener("resize", updateIsMobile);
	  }, []);
	
  
	const { data } = useQuery({
	  queryKey: ['product explorer', searchTerm],
	  queryFn: () => productService.getAll(searchTerm),
	  initialData: products
	});
  
	return (
	  <div className="max-w-[1400px] w-full mx-auto bg-[#FFFFFF]">

		{isMobile ? (
			<CatalogMobile 
				title={
					searchTerm
					? `Search by request "${searchTerm}"`
					: 'Product Catalog'
				}
				products={data}
			/>
		) : (
        <CatalogProducts
		  title={
			searchTerm
			  ? `Search by request "${searchTerm}"`
			  : 'Product Catalog'
		  }
		  products={data}
		/>
      )}
	  </div>
	);
  }
  