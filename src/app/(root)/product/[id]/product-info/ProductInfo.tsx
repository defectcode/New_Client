import Link from 'next/link';
import { useState } from 'react';
import { IProduct } from '@/shared/types/product.interface';
import { formatPrice } from '@/utils/string/format-price';
import { FavoriteButton } from './FavoriteButton';
import Image from 'next/image';
import { CartWindow } from '@/components/layouts/main-layout/header/header-menu/header-cart/cart-item/components/CartWindow';
import { CartWindowDesktop } from '@/components/layouts/main-layout/header/header-menu/header-cart/cart-item/components/CartWindowDesktop';
import { useIsDesktop } from '@/hooks/useIsDesktop';

import './Production.css'
import { COLORS } from './constants/Colors';
import { AddToCartButtonProduct } from './AddToCartButtonProduct';

interface ProductInfoProps {
  product: IProduct;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const isDesktop = useIsDesktop();
  const [isCheckoutCartVisible, setIsCheckoutCartVisible] = useState(false);
  const [recentlyAddedProduct, setRecentlyAddedProduct] = useState<{
    title: string;
    price: number;
    images: string[];
    color: string;
  } | null>(null);

  const [selectedColor, setSelectedColor] = useState(COLORS[0]);

  const handleCloseCartWindow = () => {
    setIsCheckoutCartVisible(false);
  };

  const handleAddToCart = () => {
    setRecentlyAddedProduct({
      title: product.title,
      price: product.price,
      images: product.images,
      color: selectedColor.name, 
    });
    setIsCheckoutCartVisible(true);
  };

  return (
    <div className="mt-10 sm:mt-16 lg:mt-0 md:w-[393px] w-full md:px-0 px-5">
      <div className="flex items-center justify-between gap-5 mb-5">
        <h1 className="font-Heebo-24 text-black bg-clip-text md:block hidden">{product.title}</h1>
        <h1 className="font-Heebo-20 text-black bg-clip-text md:hidden">{product.title}</h1>
        <div className="flex items-center justify-center font-Heebo-15-reg text-[#5D5D5D] md:hidden">
          {formatPrice(product.price)}
        </div>
        <div className="md:block hidden">
          <FavoriteButton product={product} />
        </div>
      </div>

      <div className="flex gap-[10px] md:mb-5 items-center">
        <div className="flex items-center justify-center font-Heebo-reg-13 text-[#5D5D5D] md:block hidden">
          {formatPrice(product.price)}
        </div>
        <span className="text-[#D1D1D1] md:block hidden">|</span>
        <span className="font-Heebo-reg-14 md:block hidden">{selectedColor.name}</span>
      </div>

      <div className="flex gap-2 my-5 max-md:hidden">
        {COLORS.map((color) => (
          <div
            key={color.value}
            onClick={() => setSelectedColor(color)} 
            className={`w-[26px] h-[26px] rounded-full border`}
            style={{
              backgroundColor: color.value,
              boxShadow:
                selectedColor.value === color.value
                  ? '0 0 0 1px white, 0 0 0 2px black'
                  : 'none',
            }}
          ></div>
        ))}
      </div>

      <div className='md:hidden block flex items-center justify-between h-[22px] mb-5'>
        <div className="flex gap-2 my-5">
          {COLORS.map((color) => (
            <div
              key={color.value}
              onClick={() => setSelectedColor(color)}
              className={`w-[28px] h-[28px] rounded-full border`}
              style={{
                backgroundColor: color.value,
                boxShadow:
                  selectedColor.value === color.value
                  ? "0 0 0 2px white, 0 0 0 3px black"
                  : "0 0 0 2px white",
              }}
            ></div>
          ))}
        </div>
        <span className="font-Heebo-reg-14">{selectedColor.name}</span> 
      </div>

      <h1 className="text-[#5D5D5D] font-Heebo-reg-16 mb-5">Description</h1>
      <p className="font-Heebo-15-light text-[#8C8C8C] max-w-[393px] w-full md:mb-10 mb-5">
        {product.description}
      </p>
      <div className="flex flex-col md:flex-row items-start gap-x-2 w-full md:block hidden">
        <div className="w-full space-y-[10px] md:block hidden">
          <AddToCartButtonProduct product={product} />
          <button className="w-full mb-2 bg-[#1E1E1E] flex items-center justify-center h-[48px] rounded-[10px]">
            <Image
              src="/images/applepayBlack.svg"
              alt="applepay"
              width={42}
              height={16}
            />
          </button>
        </div>

        </div>
        <div className="fixed bottom-0 left-0 right-0 bg-[#F9F9F9] z-50 px-5 py-3 shadow-md md:hidden">
          <div className="flex justify-between items-center space-x-4">
            <div className="flex-1">
              <AddToCartButtonProduct product={product}/>
            </div>
            <button className="flex-1 bg-[#1E1E1E] flex items-center justify-center h-[48px] rounded-[10px]">
              <Image
                src="/images/applepayBlack.svg"
                alt="applepay"
                width={42}
                height={16}
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
