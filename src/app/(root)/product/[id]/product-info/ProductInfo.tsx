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

import './Production.css'

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

  // Lista de culori disponibile
  const COLORS = [
    { name: 'Gray', value: '#D3D3D3' },      // Gri
    { name: 'Pink', value: '#FFC0CB' },      // Roz
    { name: 'Beige', value: '#D2B48C' },     // Bej
    { name: 'Light Blue', value: '#ADD8E6' }, // Albastru deschis
    { name: 'Light Green', value: '#D3D9AE' }, // Verde deschis
    { name: 'Purple', value: '#9370DB' },    // Mov
    { name: 'Black', value: '#000000' },     // Negru
  ];

  const [selectedColor, setSelectedColor] = useState(COLORS[0]); // Selectează culoarea implicită

  const handleCloseCartWindow = () => {
    setIsCheckoutCartVisible(false);
  };

  const handleAddToCart = () => {
    setRecentlyAddedProduct({
      title: product.title,
      price: product.price,
      images: product.images,
      color: selectedColor.name, // Utilizează culoarea selectată
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
        <span className="font-Heebo-reg-14 md:block hidden">{selectedColor.name}</span> {/* Afișează culoarea selectată */}
      </div>

      <div className="flex gap-2 my-5 max-md:hidden">
        {COLORS.map((color) => (
          <div
            key={color.value}
            onClick={() => setSelectedColor(color)} // Actualizează culoarea selectată
            className={`w-[18px] h-[18px] rounded-full border`}
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
              onClick={() => setSelectedColor(color)} // Actualizează culoarea selectată
              className={`w-[18px] h-[18px] rounded-full border`}
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
        <span className="font-Heebo-reg-14">{selectedColor.name}</span> 
      </div>

      <h1 className="text-[#5D5D5D] font-Heebo-reg-16 mb-5">Description</h1>
      <p className="font-Heebo-15-light text-[#8C8C8C] max-w-[393px] w-full md:mb-10 mb-5">
        {product.description}
      </p>
      <div className="flex flex-col md:flex-row items-start gap-x-2 w-full md:block hidden">
        <div className="w-full space-y-[10px] md:block hidden">
          <AddToCartButton product={product} />
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

        <div className="flex justify-between items-center mt-5 space-x-4 md:hidden">
            <div className="flex-1">
              <AddToCartButton product={product} />
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

        <div className="flex justify-between items-center mt-5 space-x-4 md:hidden">
  <div className="flex-1">
    <AddToCartButton product={product} />
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
