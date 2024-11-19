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

interface CartItemProps {
  item: ICartItem;
  isLastItem: boolean;
  isSingleItem: boolean;
}

export function CartItem({ item, isLastItem, isSingleItem }: CartItemProps) {
  const dispatch = useDispatch();

  // Detectăm pagina curentă
  const isCheckoutPage = typeof window !== 'undefined' && window.location.pathname === '/checkout';
  const isProductPage = typeof window !== 'undefined' && window.location.pathname.startsWith('/product');

  // State pentru color dropdown
  const [colorDropdownOpen, setColorDropdownOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string>(item.product.color.name);

  // Culori disponibile
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
      } ${item.id === 0 ? 'md:pt-0 pt-[20px] pb-[20px]' : 'pt-[20px] pb-[20px]'}`}
    >
      {/* Imaginea produsului */}
      <Link
        href={PUBLIC_URL.product(item.product.id)}
        className="relative flex items-center justify-center w-[100px] h-[100px] bg-white border border-transparent"
      >
        <div className="relative flex items-center justify-center w-[90px] h-[90px]">
          <Image
            src={item.product.images[0]}
            alt={item.product.title}
            width={90}
            height={90}
            className="object-cover"
          />
          {/* Cerc pentru cantitate */}
          {isCheckoutPage && (
            <div className="absolute -top-3 -right-2 bg-[#5D5D5D]/50 text-[#FFF4F4] text-[12px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
              {item.quantity}
            </div>
          )}
        </div>
      </Link>

      {/* Detalii produs */}
      <div className="flex flex-col ml-[10px] w-3/4 relative">
        <div className="flex items-center justify-between w-full">
          <h2 className="text-[15px] font-semibold truncate max-w-[300px]">{item.product.title}</h2>
          {/* Ascunde FavoriteButton pe paginile `checkout` și `product` */}
          {!isCheckoutPage && !isProductPage && <FavoriteButton product={item.product} />}
        </div>

        {/* Selector de culori */}
        <div
          className={`flex items-center gap-1 mt-[2px] relative ${
            isCheckoutPage || isProductPage ? 'pointer-events-none opacity-50' : 'cursor-pointer'
          }`}
          onClick={toggleColorDropdown}
        >
          <p className="text-sm text-gray-500">{selectedColor}</p>
          {/* Ascunde săgeata pe paginile `checkout` și `product` */}
          {!isCheckoutPage && !isProductPage && (
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
          {!isCheckoutPage && !isProductPage && colorDropdownOpen && (
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
          {/* Ascunde CartActions pe paginile `checkout` și `product` */}
          {!isCheckoutPage && !isProductPage && <CartActions item={item} />}
        </div>
      </div>
    </div>
  );
}
