'use client'

import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { productService } from '@/services/product.service'

import { IProduct } from '@/shared/types/product.interface'
import { PreOrderCatalogProducts } from '@/components/ui/catalog/PreOrderCatalogProducts'
import { useEffect, useState } from 'react'
import { PreOrderCatalogMobile } from '@/components/ui/catalog/components/PreOrderCatalogMobile'

interface PreOrderProps {
	products: IProduct[]
}

export function PreOrder({ products }: PreOrderProps) {
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
	  <div className="max-w-[1400px] w-full mx-auto bg-[#F9F9F9]">

		{isMobile ? (
			<PreOrderCatalogMobile 
				title={
					searchTerm
					? `Search by request "${searchTerm}"`
					: 'Product Catalog'
				}
				products={data}
			/>
		) : (
        <PreOrderCatalogProducts
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
  