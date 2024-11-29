import Image from 'next/image';
import Link from 'next/link';

import { PUBLIC_URL } from '@/config/url.config';

import { IProduct } from '@/shared/types/product.interface';

import { formatPrice } from '@/utils/string/format-price';
import { FavoriteButton } from '@/app/(root)/product/[id]/product-info/FavoriteButton';
import { COLORS } from '@/app/(root)/product/[id]/product-info/constants/Colors';

interface ProductCardProps {
  product: IProduct;
  isBestSeller?: boolean; // Proprietate pentru Best Seller
  isBestPrice?: boolean; // Proprietate pentru Best Price

}

export function ProductCard({ product, isBestSeller, isBestPrice }: ProductCardProps) {
  const productColors = COLORS;

  return (
    <div className="bg-transparent relative">
      
      {/* Imaginea produsului */}
      <div className="relative group">
        <Link href={PUBLIC_URL.product(product.id)}>
          <Image
            src={product.images[0]}
            alt={product.title}
            width={352}
            height={352}
            className="rounded-[10px] bg-white"
          />
        </Link>
        {/* FavoriteButton plasat pe imagine */}
        <div className="absolute top-3 right-3 p-1 bg-transparent cursor-pointer md:block hidden">
          <FavoriteButton product={product} />
        </div>
      </div>


      {isBestSeller && (
        <p className="mt-2 text-sm text-[#EB001B] font-semibold">Best Seller</p>
      )}

	  {isBestPrice && (
        <div className="absolute top-3 left-2 bg-green-100 text-green-600 text-xs font-semibold py-1 px-2 rounded">
          Best Price
        </div>
      )}
      {/* Titlul produsului */}
      <h3 className="mt-[10px] font-semibold text-[#000000] line-clamp-1 font-Heebo-16-reg">
        {product.title}
      </h3>

      {/* Text "Best Seller" sub titlu */}


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
	  <div className="font-medium text-[16px] text-[#1E1E1E] flex items-center gap-2">
        {isBestPrice ? (
          <>
            <span className="line-through text-[#BDBDBD]">
              {formatPrice(product.price)}
            </span>
            <span className="text-green-600">
              {formatPrice(product.discountedPrice || product.price * 0.9)}
            </span>
          </>
        ) : (
          <span>{formatPrice(product.price)}</span>
        )}
      </div>
    </div>
  );
}
