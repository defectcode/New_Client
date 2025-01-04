'use client'
import { CheckoutCartHeader } from "@/components/layouts/main-layout/header/header-menu/header-cart/CheckoutCartHeader";
import { InfoHeader } from "@/components/layouts/main-layout/header/InfoHeader";
import Image from "next/image";
import CheckoutPage from "../page";
import PayPalButton from "@/components/layouts/main-layout/header/header-menu/header-cart/cart-item/PayPalButton";
import Order from "@/components/layouts/main-layout/header/header-menu/header-cart/cart-item/components/order/Order";
import { useState } from "react";
import { useCart } from "@/hooks/useCart";


interface ShippingData {
    company: string;
    firstName: string;
    lastName: string;
    country: string;
    address: string;
    city: string;
    zip: string;
    email: string;
    phone: string;
}


export default function Editing() {
    const { items } = useCart();
    
    const [isExpressCheckoutVisible, setExpressCheckoutVisible] = useState(true); 
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('');
    const [isPaymentVisible, setIsPaymentVisible] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false); 
    const [isEditing, setIsEditing] = useState(false); 


    const [shippingData, setShippingData] = useState<ShippingData>({
       company: '',
       firstName: '',
       lastName: '',
       country: 'MD',
       address: '',
       city: '',
       zip: '',
       email: '',
       phone: '',
    });
    
    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const taxRate = 0.2; 
    const totalAmount = subtotal + subtotal * taxRate; 


    const handleEdit = () => {
        setIsEditing(true);
        setIsSubmitted(false); 
    };

    return(
      <div className='bg-[#F9F9F9] min-h-screen flex flex-col'>
        <div className='bg-[#F9F9F9]'>
          <div className='md:block hidden'>
            <InfoHeader />  
          </div> 
          <div className="w-full lg:w-1/3 md:p-4 md:hidden block p-0 m-0">
              <CheckoutCartHeader />
          </div>
          <div className="container mx-auto flex flex-col lg:flex-row justify-center items-start lg:h-screen pt-6 px-5 sm:px-6 lg:px-0 bg-[#F9F9F9]">
            <div className="w-full max-w-[620px] flex flex-col gap-10 justify-center items-center py-4 sm:p10 mb-6 lg:mb-0">
              <div className="w-full max-w-[520px]">
                <div className="mb-4">
                  <h2 className="font-Heebo-24-- mb-5 text-[#1E1E1E]">When will your order arrive?</h2>
                  <div className="flex items-center justify-between border border-[#1E1E1E] p-5 rounded-[10px] mb-5 h-[56px]">
                    <h3 className="text-[#1E1E1E] font-Heebo-16">Arrives Wed, Oct 22 - Oct 29</h3>
                    <p className="text-[#8C8C8C] font-heebo font-medium text-[14px] leading-[14px]">FREE</p>
                  </div>
                </div>
                <div className="w-full lg:w-full md:p-4 md:hidden block border-b">
                  <div className="py-5">
                    <h1 className="font-Heebo-16 mb-[5px] text-[#1E1E1E]">Keep in mind:</h1>
                    <ul className="list-disc pl-4">
                      <li className="mb-2 font-Heebo-reg-14">
                        <span className='font-Heebo-14-bolt'>Signature: </span>You may need to sign for your delivery.
                      </li>
                      <li className="font-Heebo-reg-14 text-[#1E1E1E]">
                        <span className='font-Heebo-14-bolt text-[#1E1E1E]'>Change delivery: </span>
                        Once shipped, you can track and adjust where your package is delivered (pickup, secure location, or contactless)
                      </li>
                    </ul>
                  </div>
                </div>

                {isExpressCheckoutVisible && (
                  <>
                    <div className="flex flex-col gap-5 mb-6">
                      <div className="flex gap-[15px] md:h-[56px] h-12">
                        <button className="w-full py-2 border rounded-[10px] bg-[#00457C] flex items-center justify-center"
                                  onClick={() => setSelectedPaymentMethod('PayPal')}
                        >
                          <Image src='/images/paypal.svg' alt='PayPal' width={69} height={18} className='md:w-[69px] md:h-[18px] w-[48px] h-[13px]' />
                        </button>
                        <button className="w-full py-2 border rounded-[10px] bg-[#000000] flex items-center justify-center">
                          <Image src='/images/applepay.svg' alt='Apple Pay' width={54} height={20} className='md:w-[54px] md:h-[20px] w-[42px] h-[16px]' />
                          <CheckoutPage />
                        </button>
                        <button className="w-full py-2 border rounded-[10px] bg-[#333E48] flex items-center justify-center">
                          <Image src='/images/amazonpay.svg' alt='Amazon Pay' width={102} height={20} className='mt-1 md:w-[102px] md:h-[20px] w-[81px] h-[15px]' />
                          <CheckoutPage />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-10">
                      <div className="flex-1 border-t border-gray-300"></div>
                      <h1 className="mx-2 font-Heebo-16 text-[#424242]">OR</h1>
                      <div className="flex-1 border-t border-gray-300"></div>
                    </div>
                  </>
                )}

                {selectedPaymentMethod === 'PayPal' && (
                  <div className="w-full">
                    <PayPalButton totalAmount={totalAmount} />
                  </div>      
                )}
                <div className="mt-6 flex justify-between items-center mb-10">
                  <h2 className="font-Heebo-bold-20">Shipping Address</h2>
                  <button className="text-[#8C8C8C] font-semibold font-heebo text-[16px] underline" onClick={handleEdit}>Edit</button>
                </div>
                <div className='text-[#8C8C8C] font-Heebo-reg-16-0'>
                  <p className='font-Heebo-16 text-[#8C8C8C]'>{shippingData.firstName} {shippingData.lastName}</p>
                  <p>{shippingData.address}, {shippingData.city}, {shippingData.country}, {shippingData.zip}</p>
                  <p className='mt-5'>{shippingData.email}</p>
                  {shippingData.company && (
                    <p>{shippingData.company}</p>
                  )}
                  <p>{shippingData.phone}</p>
                  <p className='border-t border-[#BDBDBD] mt-10 mb-5 h-[1px]'></p>
                </div>
                {isPaymentVisible && (
                  <Order items={items} />
                )}
              </div>
            </div>
            <div className="w-full lg:w-1/3 md:p-4 md:block hidden">
              <div className="p-4 text-[14px] font-heebo leading-[14px]">
                <h1 className="font-Heebo-16 mb-[5px] text-[#1E1E1E]">Keep in mind:</h1>
                <ul className="list-disc pl-4 text-[#6F6F6F]">
                  <li className="mb-2 font-Heebo-reg-14"><span className='font-Heebo-14-bolt text-[#1E1E1E]'>Signature: </span>You may need to sign for your delivery.</li>
                  <li className="max-w-[437px] w-full font-Heebo-reg-14 text-[#1E1E1E]"> <span className='font-Heebo-14-bolt text-[#1E1E1E]'>Change delivery: </span>
                    Once shipped, you can track and adjust where your package is delivered (pickup, secure location, or contactless)
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )   
}