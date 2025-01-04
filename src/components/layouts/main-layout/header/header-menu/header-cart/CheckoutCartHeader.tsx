import { useEffect, useState } from 'react';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/utils/string/format-price';
import { CheckoutCartItem } from './cart-item/CheckoutCartItem';
import './cart-item/PayPal.css';
import Image from 'next/image';
import { Logo } from '../../logo/Logo';

export function CheckoutCartHeader() {
  const [isSummaryVisible, setIsSummaryVisible] = useState(false);
  const { items, total } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);

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

    return () => {
      document.body.style.overflow = '';
    };
  }, [isSummaryVisible]);

  return (
    <div className="relative flex items-center justify-between bg-[#F9F9F9]">
      {isSummaryVisible && (
        <div className="fixed inset-0 bg-[#000000] bg-opacity-60 z-40" onClick={handleToggleSummary}></div>
      )}

      {/* Mobile Header */}
      <div className="md:hidden block w-full">
        {isSummaryVisible ? (
          <div>
            <div className="absolute w-full top-0 bg-white z-50 py-[10px] px-5 flex items-center justify-between border-b">
              <div>
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
                <div className="flex items-center justify-between bg-[#F9F9F9] px-5 py-[10px] w-full">
                <div>
                  <Logo />
                </div>
                <div className="flex items-center gap-2 text-[16px] font-Heebo-med text-[#1E1E1E]" onClick={handleToggleSummary}>
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
          </div>
        ) : (
          <div className="flex items-center justify-between bg-[#F9F9F9] px-5 py-[10px] w-full">
            <div>
              <Logo />
            </div>
            <div className="flex items-center gap-2 text-[16px] font-Heebo-med text-[#1E1E1E]" onClick={handleToggleSummary}>
              <span>Summary</span>
              <p>
                {formatPrice(finalTotal)}
              </p>
              <Image
                src="/images/arr.svg"
                alt="arr"
                width={10}
                height={5}
                className={`transition-transform duration-300 ${isSummaryVisible ? 'rotate-180' : 'rotate-0'}`}
              />
            </div>
          </div>
        )}

        <div
          className={`fixed inset-x-0 top-0 transform transition-all duration-300 ease-in-out bg-[#F9F9F9] shadow-lg z-50 mt-[63px] ${
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
          <div className="">
          <div className="relative overflow-hidden">
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


            {/* Static Section with Total Price and Other Information */}
            <div className="px-5 pt-5 bg-white rounded-[10px]">
              <div className="flex items-center justify-between font-Heebo-16 text-[16px] mb-5">
                <p className="text-[#111111]">{`${totalItemsCount} ${itemText}`}</p>
                <a href="/bag" className="font-Heebo-med--16 underline text-[#5D5D5D]">
                  Edit Bag
                </a>
              </div>
              <div className="border-t border-b border-[#E8E8ED] py-5 font-Heebo-med-16 text-[#111111]">
                <div className="font-medium flex items-center justify-between">
                  <p>Subtotal:</p>
                  <span className="text-[#5D5D5D]">{formatPrice(total)}</span>
                </div>
                <div className="font-medium mt-[10px] flex items-center justify-between">
                  <p>Shipping:</p>
                  <span className="text-[#5D5D5D]">FREE</span>
                </div>
                <div className="font-medium mt-[10px] flex items-center justify-between">
                  <p>Estimated Tax:</p>
                  <span className="text-[#5D5D5D]">{formatPrice(estimatedTax)}</span>
                </div>
              </div>
              <div className="font-Heebo-16 text-[#111111] mt-5 flex items-center justify-between pb-5">
                <p>Total</p>
                <span>{formatPrice(finalTotal)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>


     {/* Structura desktop */}
      <div className="md:block hidden">
        <div className="py-4 bg-[#F9F9F9] max-w-[300px]">
          <div className="flex items-center justify-between cursor-pointer gap-10" onClick={handleToggleSummary}>
            <div className="flex items-center gap-[10px]">
              <h2 className="text-[16px]" style={{ fontSize: '16px', fontWeight: '400', color: '#1E1E1E' }}>
                Show order summary
              </h2>
              <span
                className={`transform transition-transform duration-300 ${isSummaryVisible ? 'rotate-180' : 'rotate-0'}`}
              >
                <Image src='/images/arro.svg' alt='arro' width={12} height={7} />
              </span>
            </div>
            <p className="font-semibold text-[16px]" style={{ fontWeight: '600', color: '#1E1E1E' }}>{formatPrice(finalTotal)}</p>
          </div>
          
          {/* Desktop Drawer */}
          {isSummaryVisible && (
            <div className="fixed right-0 w-[400px] bg-[#F9F9F9] z-50 top-[20px] bottom-[20px]  overflow-hidden rounded-tl-[20px] rounded-bl-[20px] flex flex-col h-[calc(100%-40px)]">
              
              <div className="flex items-center justify-between h-[56px] p-5 bg-white">
                <h2 className="font-Heebo-16-medium text-[#1E1E1E]">Your Shopping Bag</h2>
                <button className="text-[16px] text-black" onClick={() => setIsSummaryVisible(false)}>
                  <Image src='/images/close.svg' alt='close' width={14} height={14} />
                </button>
              </div>

              <div className="relative flex-grow overflow-y-auto">
                <div className="absolute top-0 left-0 right-0 h-5 bg-gradient-to-b from-black/5 to-transparent z-10"></div>
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
                <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-black/5 to-transparent z-10"></div>
              </div>

              {/* Footer Section */}
              <div className="px-5 pt-5 bg-white h-[220px]">
                <div className="flex items-center justify-between text-[#111111] font-Heebo-16 text-[16px] mb-5">
                  <p>{`${totalItemsCount} ${itemText}`}</p>
                  <a href="/bag" className="underline font-Heebo-med--16 text-[#5D5D5D]">Edit Bag</a>
                </div>
                <div className='border-t border-b border-[#E8E8ED] py-5 text-[#111111]'>
                  <div className="font-medium flex items-center justify-between">
                    <p className='font-Heebo-reg-16'>Subtotal:</p>
                    <span className='font-Heebo-reg-16 text-[#5D5D5D]'>{formatPrice(total)}</span>
                  </div>
                  <div className="font-medium mt-[10px] flex items-center justify-between">
                    <p className='font-Heebo-reg-16'>Shipping:</p>
                    <span className='font-Heebo-reg-16 text-[#5D5D5D]'>FREE</span>
                  </div>
                  <div className="font-medium mt-[10px] flex items-center justify-between">
                    <p className='font-Heebo-reg-16'>Estimated Tax:</p>
                    <span className='font-Heebo-reg-16 text-[#5D5D5D]'>{formatPrice(estimatedTax)}</span>
                  </div>
                </div>
                <div className="font-Heebo-16 text-[#111111] my-5 flex items-center justify-between">
                  <p className='font-Heebo-16'>Total</p>
                  <p className='font-Heebo-16'>{formatPrice(finalTotal)}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
