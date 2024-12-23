import Image from 'next/image';
import Link from 'next/link';
import { PUBLIC_URL } from '@/config/url.config';
import { IProduct } from '@/shared/types/product.interface';
import { formatPrice } from '@/utils/string/format-price';
import { FavoriteButton } from '@/app/(root)/product/[id]/product-info/FavoriteButton';
import '../components/style/HomeProducts.css';
import { AddCartSize } from '@/app/(root)/product/[id]/product-info/components/AddCartSize';
import MobileSizeButton from '@/components/ui/catalog/product-card/components/size/MobileSizeButton';
import { Color } from '@/components/ui/catalog/product-card/components/Color';
import { usePathname } from 'next/navigation'; // Import corect pentru app directory

interface ExplorerProductsProps {
  product: IProduct;
  isBestSeller?: boolean;
  isBestPrice?: boolean;
}

export function HomeProducts({ product, isBestSeller, isBestPrice }: ExplorerProductsProps) {  

  const pathname = usePathname();
  const isRootPage = pathname === '/';


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
        <div className="absolute w-full flex items-center justify-center bg-[#A1A1A1]/10 rounded-full md:hidden">
          <div className="max-w-[110px] w-full">
            <MobileSizeButton product={product} />
          </div>
        </div>

        <div className="absolute top-3 right-3 p-1 bg-transparent cursor-pointer md:block hidden">
          <FavoriteButton product={product} />
        </div>

        <div className="md:block hidden h-0">
          <AddCartSize product={product}/>
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
