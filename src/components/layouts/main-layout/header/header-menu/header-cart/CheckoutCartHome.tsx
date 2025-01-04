

import { useEffect, useState } from 'react';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/utils/string/format-price';
import { CheckoutCartItem } from './cart-item/CheckoutCartItem';
import './cart-item/PayPal.css';
import Image from 'next/image';
import Link from 'next/link';
import { Logo } from '../../logo/Logo';
import CheckoutButton from '@/app/checkout/components/ButtonCheckout';

export function CheckoutCartHome() {
  const [isSummaryVisible, setIsSummaryVisible] = useState(true);
  const { items, total } = useCart();
  const totalItemsCount = items.reduce((accumulator, item) => accumulator + item.quantity, 0);
  const itemText = totalItemsCount === 1 ? 'item' : 'items';
  const estimatedTax = total * 0.2;
  const finalTotal = total + estimatedTax;


  useEffect(() => {
    if (isSummaryVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isSummaryVisible]);

  const handleToggleSummary = () => {
    setIsSummaryVisible(!isSummaryVisible);
    document.body.style.overflow = isSummaryVisible ? '' : 'hidden'; 
  };

  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className="relative flex items-center justify-between bg-[#F9F9F9]">
        {isSummaryVisible && (
          <div className="fixed inset-0 bg-[#000000] bg-opacity-60 z-40" onClick={handleToggleSummary}></div>
        )}

      {isSummaryVisible && (
        <div className="fixed inset-x-0 bottom-0 bg-[#F9F9F9] shadow-lg rounded-t-2xl z-50 md:hidden">
          <div className="py-5">
            <div className="flex items-center justify-between px-5">
              <h2 className="text-[16px] font-medium text-black">Your Shopping Bag</h2>
              <button
                className="text-black"
                onClick={handleToggleSummary} 
              >
                <Image src="/images/close.svg" alt="close" width={14} height={14} />
              </button>
            </div>

            <div className="relative mt-4 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-5 bg-gradient-to-b from-black/10 to-transparent z-10"></div>
              <div className="overflow-y-auto overflow-x-hidden px-5 min-h-[110px] max-h-[350px]">
                {items.length ? (
                  items.map((item, index) => (
                    <CheckoutCartItem
                      item={item}
                      key={item.id}
                      isLastItem={index === items.length - 1}
                      isSingleItem={items.length === 1}
                    />
                  ))
                ) : (
                  <div className="text-sm text-muted-foreground">The cart is empty!</div>
                )}
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-5 bg-gradient-to-t from-black/10 to-transparent z-10"></div>
            </div>
            <div className="border-t border-gray-200 pt-5 px-5">
            <div className="flex items-center justify-between text-[16px] mb-3 border-b border-[#E8E8ED] pb-5">
              <p className="font-Heebo-16 text-[#1E1E1E]">{`${totalItemsCount} ${itemText}`}</p>
              <a href="/bag" className="underline font-Heebo-reg-16 text-[#5D5D5D] ">View Bag</a>
            </div>
            <div className="flex items-center justify-between text-[16px] border-b border-[#E8E8ED] pb-5 mt-5">
              <p className="font-Heebo-18 text-[#1E1E1E]">Total</p>
              <span className="font-Heebo-18 text-[#1E1E1E]">{formatPrice(finalTotal)}</span>
            </div>
            <div className="flex items-center justify-center space-x-4 mt-5">
              <Link href="/checkout" className="flex-1 max-w-[185px]">
                <button className="font-bold border border-black/50 rounded-[10px] w-full h-[48px] flex items-center justify-center bg-white text-[#1E1E1E]">
                  Checkout
                </button>
              </Link>
              <Link href="/bag" className="flex-1 max-w-[185px]">
                  <button className="w-full bg-[#1E1E1E] flex items-center justify-center h-[48px] rounded-[10px]">
                    <Image src='/images/applepayBlack.svg' alt='applepay' width={42} height={16} />
                  </button>
              </Link>
            </div>
          </div>
          </div>
        </div>
      )}


          {/* Structura desktop */}
      <div className="md:block hidden">
        <div className="py-4 bg-[#F9F9F9] max-w-[300px]">
          {/* Desktop Drawer */}
          {isSummaryVisible && (
            <div className="fixed right-0 w-[400px] bg-white z-50 top-[20px] bottom-[20px] shadow-lg overflow-hidden rounded-tl-[20px] rounded-bl-[20px] flex flex-col">
              
              {/* Header Section */}
              <div className="flex items-center justify-between h-[56px] p-5 bg-white">
                <h2 className="font-Heebo-16-medium text-[#1E1E1E]">Your Shopping Bag</h2>
                <button className="text-[16px] text-black" onClick={() => setIsSummaryVisible(false)}>
                  <Image src='/images/close.svg' alt='close' width={14} height={14} />
                </button>
              </div>

              {/* Scrollable Products Section */}
              <div className="relative flex-grow overflow-y-auto">
                <div className="absolute top-0 left-0 right-0 h-5 bg-gradient-to-b from-black/10 to-transparent z-10"></div>
                <div className="scroll-content-product px-5 py-5 h-full">
                  {items.length ? (
                    items.map((item, index) => (
                      <CheckoutCartItem
                        item={item}
                        key={item.id}
                        isLastItem={index === items.length - 1}
                        isSingleItem={items.length === 1}
                      />
                    ))
                  ) : (
                    <div className="text-sm text-muted-foreground">The cart is empty!</div>
                  )}
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-5 bg-gradient-to-t from-black/10 to-transparent z-10"></div>
              </div>

              {/* Footer Section */}
              <div className="px-5 pt-5 bg-white h-[280px] mb-[20px] rounded-bl-[20px]">
                <div className="flex items-center justify-between text-[#111111] font-Heebo-16 text-[16px] mb-5 border-b border-[#E8E8ED] pb-5">
                  <p>{`${totalItemsCount} ${itemText}`}</p>
                  <a href="/bag" className="underline font-Heebo-med--16 text-[#5D5D5D]">View Bag</a>
                </div>
                <div className="font-Heebo-16 text-[#111111] my-5 flex items-center justify-between border-b border-[#E8E8ED] pb-5">
                  <p className="font-Heebo-16">Total</p>
                  <p className="font-Heebo-16">{formatPrice(finalTotal)}</p>
                </div>
                <div className="space-y-5 mt-10">
                  <CheckoutButton />
                  <button className="w-full mb-2 bg-[#1E1E1E] flex items-center justify-center h-[48px] rounded-[10px]">
                    <Image src='/images/applepayBlack.svg' alt='applepay' width={42} height={16} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
