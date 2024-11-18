'use client'

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PUBLIC_URL } from '@/config/url.config';
import { ICartItem } from '@/shared/types/cart.interface';
import { formatPrice } from '@/utils/string/format-price';
import { CartActions } from './CartActions';
import { useDispatch } from 'react-redux';
import { FavoriteButton } from '@/app/(root)/product/[id]/product-info/FavoriteButton';
import { cartSlice } from '@/store/cart/cart.slice';
import { colorColumns } from '../../../../../../../app/store/[storeId]/colors/ColorColumns';

interface CartItemProps {
  item: ICartItem;
  isLastItem: boolean;
  isSingleItem: boolean;
}

export function CartItem({ item, isLastItem, isSingleItem }: CartItemProps) {
  const dispatch = useDispatch();

  // Verificăm dacă suntem pe pagina /checkout
  const isCheckoutPage = typeof window !== 'undefined' && window.location.pathname === '/checkout';

  // State for color dropdown
  const [colorDropdownOpen, setColorDropdownOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string>(item.product.color.name);

  // Available colors
  const availableColors = ['Light gray', 'Blue', 'Red', 'Black'];

  const handleRemoveItem = () => {
    dispatch(cartSlice.actions.removeFromCart({ id: item.id }));
  };

  const toggleColorDropdown = () => {
    if (!isCheckoutPage) {
      setColorDropdownOpen((prev) => !prev);
    }
  };

  const selectColor = (color: string) => {
    if (!isCheckoutPage) {
      setSelectedColor(color);
      setColorDropdownOpen(false);
    }
  };

  return (
    <div
      className={`flex items-center relative ${
        !isLastItem && !isSingleItem ? 'border-b border-[#8C8C8C]/10' : ''
      } ${item.id === 0 ? 'pt-0 pb-[20px]' : 'pt-[20px] pb-[20px]'}`}
    >

      {/* Product Image */}
      <Link
        href={PUBLIC_URL.product(item.product.id)}
        className="relative flex items-center justify-center w-[100px] h-[100px] bg-white border border-transparent"
      >
        <div className="flex items-center justify-center w-[90px] h-[90px]">
          <Image
            src={item.product.images[0]}
            alt={item.product.title}
            width={90}
            height={90}
            className="object-cover"
          />
        </div>
      </Link>

      {/* Product Details */}
      <div className="flex flex-col ml-[10px] w-3/4 relative">
        <div className="flex items-center justify-between w-full">
          <h2 className="text-[15px] font-semibold truncate max-w-[300px]">{item.product.title}</h2>
          {/* Ascunde FavoriteButton pe pagina checkout */}
          {!isCheckoutPage && <FavoriteButton product={item.product} />}
        </div>

        {/* Color Selector */}
        <div
          className={`flex items-center gap-1 mt-[2px] relative ${
            isCheckoutPage ? 'pointer-events-none opacity-50' : 'cursor-pointer'
          }`}
          onClick={toggleColorDropdown}
        >
          <p className="text-sm text-gray-500">{selectedColor}</p>
          {/* Ascunde săgeata pe pagina checkout */}
          {!isCheckoutPage && (
            <Image
              src="/images/arr.svg"
              alt="dropdown arrow"
              width={12}
              height={10}
              className={`text-[#8C8C8C] transition-transform duration-300 ${
                colorDropdownOpen ? 'rotate-180' : ''
              }`}
            />
          )}
          {/* Dropdown */}
          {!isCheckoutPage && colorDropdownOpen && (
            <div
              className="absolute bg-white shadow-lg border rounded-md z-10"
              style={{
                top: 'calc(100% + 5px)', // Poziționare sub selector
                left: 0, // Aliniere cu săgeata
                minWidth: '120px',
              }}
            >
              {availableColors.map((color) => (
                <div
                  key={color}
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => selectColor(color)}
                >
                  {color}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between mt-[10px] w-full h-[12px]">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <p>{formatPrice(item.product.price)}</p>
          </div>
          {/* Ascunde CartActions pe pagina checkout */}
          {!isCheckoutPage && <CartActions item={item} />}
        </div>
      </div>
    </div>
  );
}
