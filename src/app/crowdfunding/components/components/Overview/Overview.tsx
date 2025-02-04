import React, { useState, useMemo, useEffect } from 'react';
import StageDescription from './components/StageDescription';
import FundingBreakdown from './components/FundingBreakdown';
import { CrowdfundingProducts } from '@/app/(root)/explorer/components/CrowdfundingProducts';
import { COLORS } from '@/app/(root)/product/[id]/product-info/constants/Colors';
import { CatalogMobile } from '@/components/ui/catalog/components/CatalogMobile';
import { PUBLIC_URL } from '@/config/url.config';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { productService } from '@/services/product.service'
import { CatalogForCrowdfunding } from '@/components/ui/catalog/CatalogForCrowdfunding';


const Overview = ({ products = [] }) => {
  const [filters, setFilters] = useState({});

  const searchParams = useSearchParams();
	const searchTerm = searchParams?.get('searchTerm');

	const { data } = useQuery({
		queryKey: ['product explorer', searchTerm],
		queryFn: () => productService.getAll(searchTerm),
		initialData: products
	  });



  useEffect(() => {
    console.log('Products:', products);
  }, [products]);

  return (
    <div className="flex flex-col items-center justify-center w-full bg-[#F9F9F9] py-8">
      <div className="flex max-w-[1200px] w-full bg-[#F9F9F9]">
        <div className="w-2/3">
          <StageDescription />
        </div>
        <div className="w-1/3">
          <FundingBreakdown />
        </div>
      </div>
      <CatalogForCrowdfunding
              title="New Arrivals"
              description="Check out the latest additions to our store!"
              linkTitle="Catalog"
              link={PUBLIC_URL.explorer()}
              products={data}
            />
      
    </div>
  );
};

export default Overview;
