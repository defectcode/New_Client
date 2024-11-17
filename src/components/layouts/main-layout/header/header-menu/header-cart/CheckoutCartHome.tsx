

import { useEffect, useState } from 'react';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/utils/string/format-price';
import { CheckoutCartItem } from './cart-item/CheckoutCartItem';
import './cart-item/PayPal.css';
import Image from 'next/image';
import { Logo } from '../../logo/Logo';
import CheckoutButton from '@/app/checkout/ButtonCheckout';

export function CheckoutCartHome() {
  const [isSummaryVisible, setIsSummaryVisible] = useState(true);
  const { items, total } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Calculul corect al numărului total de articoles
  const totalItemsCount = items.reduce((accumulator, item) => accumulator + item.quantity, 0);
  const itemText = totalItemsCount === 1 ? 'item' : 'items';

  const estimatedTax = total * 0.2;
  const finalTotal = total + estimatedTax;

  const handleToggleSummary = () => {
    setIsSummaryVisible(!isSummaryVisible);
  };

  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    if (isSummaryVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    // Cleanup la demontare
    return () => {
      document.body.style.overflow = '';
    };
  }, [isSummaryVisible]);

  return (
    <div className="relative flex items-center justify-between bg-[#F9F9F9]">
      {/* Background overlay for non-summary elements when summary is open */}
        {isSummaryVisible && (
          <div className="fixed inset-0 bg-[#000000] bg-opacity-60 z-40" onClick={handleToggleSummary}></div>
        )}

        {/* Mobile Header */}
        <div className="md:hidden block w-full">
          {isSummaryVisible ? (
            // Header-ul sumarului când este deschis
            <div className="fixed inset-x-0 top-0 bg-white z-50 py-4 px-5 flex items-center justify-between border-b">
              <div className="flex items-center">
                <Logo />
              </div>
              <div
                className="flex items-center gap-2 text-[16px] font-Heebo-med text-[#1E1E1E]"
                onClick={handleToggleSummary}
              >
                <span>Summary</span>
                <p>{formatPrice(finalTotal)}</p>
                <Image
                  src="/images/arr.svg"
                  alt="arr"
                  width={10}
                  height={5}
                  className={`transition-transform duration-300 ${isSummaryVisible ? 'rotate-180' : 'rotate-0'}`}
                />
              </div>
            </div>
          ) : (
            <div>
            </div>
          )}

        {/* Drawer-ul sumarului */}
        <div
          className={`fixed inset-x-0 top-0 transform transition-all duration-300 ease-in-out bg-white shadow-lg z-50 mt-[72px]  ${
            isSummaryVisible ? 'max-h-[80vh] opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-5'
          }`}
          style={{
            transformOrigin: 'top',
            overflow: 'hidden',
            transitionProperty: 'max-height, opacity, transform',
            borderBottomLeftRadius: '10px',
            borderBottomRightRadius: '10px',
          }}
          >
        {/* Conținut scrollabil */}
        <div className="relative overflow-y-auto h-[calc(55vh)]">
          <div className="absolute top-0 left-0 right-0 h-5 bg-gradient-to-b from-black/10 to-transparent z-10"></div>
          <div className="px-5 pb-5 max-h-[300px] overflow-y-auto">
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

        {/* Footer fix */}
        <div className="fixed bottom-0 left-0 right-0 bg-white px-5 py-4 shadow-lg border-t">
          <div className="flex items-center justify-between text-[16px] mb-3">
            <p className="font-Heebo-16 text-[#1E1E1E]">{`${totalItemsCount} ${itemText}`}</p>
            <a href="/bag" className="underline font-Heebo-reg-16 text-[#5D5D5D]">View Bag</a>
          </div>
          <div className="flex items-center justify-between text-[16px] border-b border-[#E8E8ED] pb-3">
            <p className="font-Heebo-18 text-[#1E1E1E]">Total</p>
            <span className="font-Heebo-18 text-[#1E1E1E]">{formatPrice(finalTotal)}</span>
          </div>
          <div className="space-y-5 mt-4">
            <CheckoutButton />
            <button className="w-full bg-black flex items-center justify-center h-12 rounded-lg">
              <Image src='/images/applepayBlack.svg' alt='applepay' width={42} height={16} />
            </button>
          </div>
        </div>
      </div>
    </div>



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
                <div className="scroll-content-product max-h-[500px] px-5 py-5">
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
