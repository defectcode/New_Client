import React, { useEffect } from 'react';
import StageDescriptionMobile from './components/StageDescriptionMobile';
// import DetailedStepsMobile from './components/DetailedStepsMobile';
import FundingBreakdownMobile from './components/FundingBreakdownMobile';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { productService } from '@/services/product.service'
import { CatalogForCrowdfunding } from '@/components/ui/catalog/CatalogForCrowdfunding';
import { PUBLIC_URL } from '@/config/url.config';


const OverviewMobile = ({ products = [] }) => {

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
        <div className="flex flex-col items-center justify-center">
                <div>
                  <StageDescriptionMobile />
                  <FundingBreakdownMobile />
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
}

export default OverviewMobile;
