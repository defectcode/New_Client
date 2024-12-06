import Image from 'next/image';
import Link from 'next/link';
import { PUBLIC_URL } from '@/config/url.config';
import { IProduct } from '@/shared/types/product.interface';
import { formatPrice } from '@/utils/string/format-price';
import { FavoriteButton } from '@/app/(root)/product/[id]/product-info/FavoriteButton';
import { COLORS } from '@/app/(root)/product/[id]/product-info/constants/Colors';
import './ProductCard.css'

interface ProductCardProps {
  product: IProduct;
  isBestSeller?: boolean;
  isBestPrice?: boolean; 

}

export function ProductCard({ product, isBestSeller, isBestPrice }: ProductCardProps) {
  const productColors = COLORS;

  return (
    <div className="bg-transparent relative">
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
        <div className="absolute top-3 right-3 p-1 bg-transparent cursor-pointer md:block hidden">
          <FavoriteButton product={product} />
        </div>
      </div>

      {isBestSeller && (
        <p className="mt-2 text-sm text-[#EB001B] font-semibold">Best Seller</p>
      )}

      {isBestPrice && (
        <div className="absolute top-3 left-2 bg-green-100 font-Heebo-16-reg text-green-600 text-xs py-1 px-2 rounded">
          Best Price
        </div>
      )}

      <h3 className="mt-[10px] font-Heebo-16-reg text-[#000000] line-clamp-1">
        {product.title}
      </h3>

      <Link
        href={PUBLIC_URL.category(product.category.id)}
        className="font-heebo text-[14px] text-[#8C8C8C] mb-[10px]"
      >
        {product.category.title}
      </Link>

      <p className="mb-5 text-sm text-[#BDBDBD]">
        {productColors.length} {productColors.length === 1 ? 'Color' : 'Colors'}
      </p>

      <div className="font-Heebo-16-med text-[#1E1E1E] flex items-center gap-2">
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
