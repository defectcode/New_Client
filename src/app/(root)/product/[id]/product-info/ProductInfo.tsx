import Link from 'next/link';
import { useState } from 'react';
import { PUBLIC_URL } from '@/config/url.config';
import { IProduct } from '@/shared/types/product.interface';
import { formatPrice } from '@/utils/string/format-price';
import { AddToCartButton } from './AddToCartButton';
import { FavoriteButton } from './FavoriteButton';
import Image from 'next/image';
import { CartWindow } from '@/components/layouts/main-layout/header/header-menu/header-cart/cart-item/components/CartWindow';
import { CartWindowDesktop } from '@/components/layouts/main-layout/header/header-menu/header-cart/cart-item/components/CartWindowDesktop';
import { useIsDesktop } from '@/hooks/useIsDesktop';

interface ProductInfoProps {
  product: IProduct;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const isDesktop = useIsDesktop(); // Apelăm hook-ul în afara oricărei condiții
  const [isCheckoutCartVisible, setIsCheckoutCartVisible] = useState(false);
  const [recentlyAddedProduct, setRecentlyAddedProduct] = useState<{
    title: string;
    price: number;
    images: string[];
    color: string; 
  } | null>(null);

  const handleCloseCartWindow = () => {
    setIsCheckoutCartVisible(false); 
  };

  const handleAddToCart = () => {
    setRecentlyAddedProduct({
      title: product.title,
      price: product.price,
      images: product.images,
      color: product.color.name, 
    });
    setIsCheckoutCartVisible(true);
  };

  return (
    <div className="mt-10 sm:mt-16 lg:mt-0 md:w-[393px] w-full">
      <div className="flex items-center gap-5 mb-5">
        <h1 className="font-Heebo-24 text-black bg-clip-text">{product.title}</h1>
        <div className="flex items-center justify-center font-Heebo-reg-13 text-[#5D5D5D] md:hidden">
          {formatPrice(product.price)}
        </div>
        <div className="md:block hidden">
          <FavoriteButton product={product} />
        </div>
      </div>
      <div className="flex items-center mb-5">
        <Link
          className="font-Heebo-reg-16 text-[#8C8C8C]"
          href={PUBLIC_URL.category(product.category.id)}
        >
          {product.category.title}
        </Link>
      </div>
      <div className="flex gap-[10px] md:mb-5">
        <div className="flex items-center justify-center font-Heebo-reg-13 text-[#5D5D5D] md:block hidden">
          {formatPrice(product.price)}
        </div>
        <span className="font-Heebo-reg-14">{product.color.name}</span>
      </div>

      <h1 className="text-[#5D5D5D] font-Heebo-reg-16 mb-5">Description</h1>
      <p className="font-Heebo-15-light text-[#8C8C8C] max-w-[393px] w-full mb-10">
        {product.description}
      </p>
      <div className="flex flex-col md:flex-row items-start gap-x-2 w-full">
        <div className="w-full space-y-[10px]">
          <AddToCartButton product={product}/>
          <button className="w-full mb-2 bg-[#1E1E1E] flex items-center justify-center h-[48px] rounded-[10px]">
            <Image
              src="/images/applepayBlack.svg"
              alt="applepay"
              width={42}
              height={16}
              className=""
            />
          </button>
        </div>
      </div>
        {isCheckoutCartVisible && recentlyAddedProduct && (
          <>
            <div
              className="fixed inset-0 bg-black/50 z-40"
              onClick={handleCloseCartWindow}
            ></div>
            {isDesktop ? (
              <CartWindowDesktop
                product={recentlyAddedProduct}
                onClose={handleCloseCartWindow}
              />
            ) : (
              <CartWindow
                product={recentlyAddedProduct}
                onClose={handleCloseCartWindow}
              />
            )}
          </>
        )}
    </div>
  );
}
