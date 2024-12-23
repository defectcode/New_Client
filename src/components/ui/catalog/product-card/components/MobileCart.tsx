import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/hooks/useCart';
import { FavoriteButton } from '@/app/(root)/product/[id]/product-info/FavoriteButton';
import { CartActions } from '@/components/layouts/main-layout/header/header-menu/header-cart/cart-item/CartActions';
import { formatPrice } from '@/utils/string/format-price';

export function MobileCart() {
  const { items } = useCart();
  const router = useRouter();
  const [promoCode, setPromoCode] = useState('');
  const [showPromoInput, setShowPromoInput] = useState(false);
  const [colorDropdownOpen, setColorDropdownOpen] = useState<{ [key: string]: boolean }>({});
  const [selectedColors, setSelectedColors] = useState<{ [key: string]: string }>({});
  const availableColors = ['Light gray', 'Blue', 'Red', 'Black', 'Green'];

  const toggleColorDropdown = (itemId: string) => {
    setColorDropdownOpen((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const selectColor = (itemId: string, color: string) => {
    setSelectedColors((prev) => ({
      ...prev,
      [itemId]: color,
    }));
    setColorDropdownOpen((prev) => ({
      ...prev,
      [itemId]: false,
    }));
  };

  const togglePromoInput = () => {
    setShowPromoInput(!showPromoInput);
  };

  const handleCheckout = () => {
    router.push('/checkout');
  };

  const totalProducts = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="flex flex-col gap-4 max-w-lg mx-auto">
      <div className="flex items-center justify-between bg-white px-5 h-[56px]">
        <h1 className="font-Heebo-20-semi text-[#1E1E1E]">Bag</h1>
        <Link href="/">
          <p className="underline">Back to shop</p>
        </Link>
      </div>

      <div className="overflow-y-auto max-h-[400px]">
        {items.map((item, index) => (
          <div
            key={item.id}
            className={`flex items-center bg-transparent py-5 ${
              items.length > 1 && index !== items.length - 1 ? 'border-b' : ''
            }`}
            style={{ borderColor: '#E8E8ED', marginLeft: '20px', marginRight: '20px' }}
          >
            <Link
              href={`/product/${item.product.id}`}
              className="flex-shrink-0 bg-white w-[100px] h-[100px] flex items-center justify-center"
            >
              <Image
                src={item.product.images[0]}
                alt={item.product.title}
                width={90}
                height={90}
                className="object-cover rounded-md w-[90px] h-[90px]"
              />
            </Link>
            <div className="ml-[10px] flex flex-col justify-between w-full h-[80px]">
              <div className="flex items-center justify-between">
                <h2 className="font-Heebo-15 text-[#1E1E1E] truncate-2-lines">{item.product.title}</h2>
                <FavoriteButton product={item.product} />
              </div>
              <div>
                <div className="flex gap-[5px]">
                  <h2
                    className="font-Heebo-16 text-[#8C8C8C] truncate-2-lines cursor-pointer"
                    onClick={() => toggleColorDropdown(String(item.id))}
                  >
                    {selectedColors[String(item.id)] || item.product.color?.name || 'Select color'}
                  </h2>

                  <Image
                    src="/images/arr.svg"
                    alt="arrow"
                    width={12}
                    height={10}
                    className={`text-[#8C8C8C] transition-transform duration-300 ${
                      colorDropdownOpen[item.id] ? 'rotate-180' : ''
                    }`}
                  />
                </div>

                {colorDropdownOpen[item.id] && (
                  <div className="absolute bg-white shadow-lg border mt-1">
                    {availableColors.map((color) => (
                      <div
                        key={color}
                        className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                        onClick={() => selectColor(String(item.id), color)}
                      >
                        {color}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="font-Heebo-14-med flex items-center justify-between h-[20px]">
                <p className="text-[#5D5D5D]">{formatPrice(item.product.price)}</p>
                <CartActions item={item} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-5">
        <div className="flex items-center justify-between">
          <h2 className="font-Heebo-20-semi text-[#1E1E1E]">Summary</h2>
          <p>
            {totalItems} {totalItems === 1 ? 'item' : 'items'}
          </p>
        </div>
        <div className="border-t border-[#E8E8ED] pt-4 mt-4">
          <div
            className="flex justify-between items-center text-sm cursor-pointer mb-4"
            onClick={togglePromoInput}
          >
            <p className="font-Heebo-16-semi text-[#1E1E1E]">Do you have Promo Code?</p>
            <span
              className={`${
                showPromoInput ? 'rotate-180 transition-transform duration-300' : 'transition-transform duration-300'
              }`}
            >
              <Image src="/images/arr.svg" alt="arrow" width={16} height={16} />
            </span>
          </div>
          {showPromoInput && (
            <div className="relative mb-5">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Enter your promo code"
                className="w-full p-2 pr-[60px] border rounded-md text-[#6F6F6F] bg-[#F9F9F9] h-[40px]"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#FFFFFF] px-3 py-1 rounded-md text-sm">
                Apply
              </button>
            </div>
          )}
        </div>

        <div className="text-sm text-gray-700 space-y-2">
          <div className="flex flex-col border-y border-[#E8E8ED]">
            <div className="flex justify-between text-sm mt-5">
              <p className="text-[#1E1E1E]">Subtotal</p>
              <p className="text-[#5D5D5D]">{formatPrice(totalProducts)}</p>
            </div>
            <div className="flex justify-between text-sm">
              <p className="text-[#1E1E1E]">Shipping</p>
              <p className="text-[#5D5D5D]">FREE</p>
            </div>
          </div>
        </div>
        <div className="flex justify-between font-Heebo-16-semi py-5">
          <p>Total</p>
          <p>{formatPrice(totalProducts)}</p>
        </div>
        <button
          className="w-full py-3 text-white rounded-lg bg-black"
          onClick={handleCheckout}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
