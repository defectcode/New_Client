'use client';

import { useCart } from "@/hooks/useCart";
import { formatPrice } from '@/utils/string/format-price';
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function Summary() {
    const { items } = useCart();
    const router = useRouter();
    const totalProducts = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
    const delivery = 14.00;
    const sales = totalProducts * 0.2899;
    const total = totalProducts + delivery + sales;
    const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
        'easyReturns': false,
        'securePayment': false,
        'youCanPayBy': false,
    });

    const toggleSection = (section: string) => {
        setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }))
    };

    const handleCheckout = () => {
        router.push('/checkout');
    };


    return (
        <div>
            <h2 className="font-Heebo-20-semi text-[#1E1E1E] mb-5">Summary</h2>

            <div className="w-full bg-white p-5 rounded-lg">
                {/* <Promocode /> */}
                <div className="text-sm text-gray-700">
                    <div className="flex flex-col border-y border-[#E8E8ED]">
                        <div className="flex justify-between text-sm mt-5 font-Heebo-16 mb-[10px]">
                            <p className="text-[#1E1E1E]">Subtotal</p>
                            <p className="text-[#5D5D5D]">{formatPrice(totalProducts)}</p>
                        </div>
                        <div className="flex justify-between text-sm mb-[10px] font-Heebo-16">
                            <p className="text-[#1E1E1E]">Shipping</p>
                            <p className="text-[#5D5D5D]">FREE</p>
                        </div>
                        <div className="flex justify-between text-sm mb-5 font-Heebo-16">
                            <p className="text-[#1E1E1E]">Estimated Tax</p>
                            <p className="text-[#5D5D5D]">{formatPrice(sales)}</p>
                        </div>
                    </div>
                    <div className="flex justify-between font-Heebo-16-semi pt-5">
                        <p className="text-[#1E1E1E]">Total</p>
                        <p className="text-[#1E1E1E]">{formatPrice(total)}</p>
                    </div>
                </div>
            </div>
            <div className="mt-5">
                <button
                  className="w-full py-3 mb-5 text-[#1E1E1E] border border-[#1E1E1E] rounded-lg font-Heebo-16-semi h-[56px]"
                  onClick={handleCheckout}
                >
                  Checkout
                </button>
                <button className="w-full py-3 mb-5 text-white rounded-lg bg-black h-[56px]">
                    <span className="flex justify-center items-center">
                        <Image src="/images/applepay.svg" alt="applepay" width={54} height={20} />
                    </span>
                </button>

                <div className="border-y-[0.5px] border-[#5D5D5D]">
              <div
                className="flex justify-between items-center text-sm cursor-pointer py-5 border-b-[0.5px] border-[#5D5D5D]"
                onClick={() => toggleSection('easyReturns')}
              >
                <div className='flex gap-[10px] items-center '>
                  <Image src='/images/easy.svg' alt='easy' width={16} height={16} />
                  <p className='font-Heebo-16 text-[#1E1E1E]'>EASY RETURNS</p>
                </div>
                <span className={expandedSections.easyReturns ? 'rotate-180 transition-transform duration-300' : 'transition-transform duration-300'}>
                  <Image src='/images/arr.svg' alt='arr' width={16} height={16} />
                </span>
              </div>
              {expandedSections.easyReturns && <p className="text-sm text-gray-500 border-b-[0.5px] border-[#5D5D5D] py-4">Details about easy returns.</p>}

              <div
                className="flex justify-between items-center text-sm cursor-pointer py-5 border-b-[0.5px] border-[#5D5D5D]"
                onClick={() => toggleSection('securePayment')}
              >
                <div className='flex gap-[10px] items-center '>
                  <Image src='/images/secure.svg' alt='secure' width={16} height={16} />
                  <p className='font-Heebo-16 text-[#1E1E1E]'>SECURE PAYMENT</p>
                </div>
                <span className={expandedSections.securePayment ? 'rotate-180 transition-transform duration-300' : 'transition-transform duration-300'}>
                  <Image src='/images/arr.svg' alt='arr' width={16} height={16} />
                </span>
              </div>
              {expandedSections.securePayment && <p className="text-sm text-gray-500 border-b-[0.5px] border-[#5D5D5D] py-4">Information about secure payments.</p>}
              <div
                className="flex justify-between items-center text-sm cursor-pointer py-5"
                onClick={() => toggleSection('youCanPayBy')}
              >
                <div className='flex gap-[10px] items-center '>
                  <Image src='/images/pay.svg' alt='pay' width={20} height={16} />
                  <p className='font-Heebo-16 text-[#1E1E1E]'>YOU CAN PAY BY</p>
                </div>
                <span className={expandedSections.youCanPayBy ? 'rotate-180 transition-transform duration-300' : 'transition-transform duration-300'}>
                  <Image src='/images/arr.svg' alt='arr' width={16} height={16} />
                </span>
              </div>
              {expandedSections.youCanPayBy && <p className="text-sm text-gray-500 py-4">Accepted payment methods.</p>}
            </div>
            </div>
        </div>
    );
}
