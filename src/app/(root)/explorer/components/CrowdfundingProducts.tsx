import Image from 'next/image';
import Link from 'next/link';
import { PUBLIC_URL } from '@/config/url.config';
import { IProduct } from '@/shared/types/product.interface';
import { formatPrice } from '@/utils/string/format-price';
import { FavoriteButton } from '@/app/(root)/product/[id]/product-info/FavoriteButton';
import '../components/style/HomeProducts.css';
import MobileSizeButton from '@/components/ui/catalog/product-card/components/size/MobileSizeButton';
import { Color } from '@/components/ui/catalog/product-card/components/Color';
import { usePathname } from 'next/navigation';
import ProgresCrowdfunding from '@/app/crowdfunding/components/ProgresCrowdfunding';

interface ExplorerProductsProps {
  product: IProduct;
  isBestSeller?: boolean;
  isBestPrice?: boolean;
  index: number; // Adăugăm index pentru a ști dacă este primul produs
}

export function CrowdfundingProducts({ product, isBestSeller, isBestPrice, index }: ExplorerProductsProps) {  
  const pathname = usePathname();
  const isRootPage = pathname === '/';

  // Exemplu de date pentru FundraisingProgress (înlocuiește cu datele reale)
  const fundraisingData = {
    raisedAmount: '5000',
    goalAmount: '10000',
    stageLabel: 'Stage',
    stageNumber: 2,
    fundingPercentage: 50,
    supportersCount: 250,
    supportersLabel: 'Supporters'
  };

  return (
    <div className="bg-transparent relative w-full sm:w-[350px] rounded-[10px]">
      <div className="relative group mb-5 rounded-[10px]">
        <Link href={PUBLIC_URL.product(product.id)}>
          <Image
            src={product.images[0]}
            alt={product.title}
            width={350}
            height={500}
            className="rounded-[16px] bg-transparent w-full object-cover md:w-[350px] md:h-[500px] w-[190px] h-[270px] transition-opacity duration-500 group-hover:opacity-0"
          />
          <Image
            src={product.images[1] || product.images[0]}
            alt={`${product.title} hover`}
            width={350}
            height={500}
            className="rounded-[16px] bg-transparent w-full object-cover md:w-[350px] md:h-[500px] w-[190px] h-[270px] absolute top-0 left-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        </Link>

        {index === 0 ? (
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent bg-opacity-60 text-white flex flex-col justify-end items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[10px] font-heebo font-semibold">
            <ProgresCrowdfunding data={fundraisingData} />
            <button className="mb-[30px] bg-white w-[260px] h-[48px] text-black px-4 py-2 rounded-lg">
              View Details
            </button>
          </div>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent bg-opacity-60 text-white flex flex-col justify-end items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[10px] font-heebo font-semibold">
            <button className="mb-[30px] bg-white text-[#1E1E1E] px-5 py-2 h-[40px] rounded-lg cursor-pointer">
              Coming Soon
            </button>
          </div>
        )}

        <div className="absolute top-3 right-3 p-1 bg-transparent cursor-pointer md:block hidden">
          <FavoriteButton product={product} />
        </div>
      </div>

      {isBestSeller && (
        <p className="mt-2 font-Heebo-16-regular text-[#EB001B]">Best Seller</p>
      )}

      <div className='flex items-center justify-between mt-[10px]'>
        <h3 className="font-Heebo-16-semi text-[#000000] truncate">
          {product.title}
        </h3>

        <div className="font-Heebo-15-reg text-[#424242] flex items-center justify-between gap-5 md:block hidden">
          {isBestPrice ? (
            <div className="price-container"> 
              <span className="font-Heebo-15-reg text-[#424242]">
                {formatPrice(product.price)}
              </span>
              <span className="font-Heebo-15-reg text-[#34A853]">
                {formatPrice(product.discountedPrice || product.price * 0.9)}
              </span>
            </div>
          ) : (
            <span>{formatPrice(product.price)}</span>
          )}
        </div>
      </div> 

      {isRootPage ? '' : <Color product={product}/>}

      <div className="font-Heebo-15-reg text-[#424242] flex items-center md:hidden mt-5">
        {isBestPrice ? (
          <div className='price-container'>
            <span className="font-Heebo-15-reg text-[#424242]">
              {formatPrice(product.price)}
            </span>
            <span className="font-Heebo-15-reg text-[#34A853]">
              {formatPrice(product.discountedPrice || product.price * 0.9)}
            </span>
          </div>
        ) : (
          <span>{formatPrice(product.price)}</span>
        )}
      </div>
    </div>
  );
}
