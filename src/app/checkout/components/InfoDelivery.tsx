'use client'
import { useState } from "react";



export default function InfoDelivery() {
    const [showCompanyInput, setShowCompanyInput] = useState(false);
    

    return (
        <div className="w-full lg:w-1/3 md:py-10 md:ml-10 md:mr-[35px] md:block hidden">
            <div className=" text-[14px] font-heebo leading-[14px]">
              <h1 className="font-Heebo-16 mb-[5px] text-[#1E1E1E]">Keep in mind:</h1>
              <ul className="list-disc pl-4 text-[#6F6F6F]">
                <li className="mb-2 font-Heebo-reg-14"><span className='font-Heebo-14-bolt text-[#1E1E1E]'>Signature: </span>You may need to sign for your delivery.</li>
                <li className="max-w-[437px] w-full font-Heebo-reg-14"> <span className='font-Heebo-14-bolt text-[#1E1E1E]'>Change delivery: </span>
                  Once shipped, you can track and adjust where your package is delivered (pickup, secure location, or contactless)
                </li>
              </ul>
            </div>
            <div className='mt-[120px] w-full'>
              <p className='max-w-[520px] w-full font-Heebo-reg-14'>Complete your purchase in just one click with <span className='font-Heebo-14 text-[#1E1E1E] w-full'>Express Checkout.</span></p>
            </div>
            <div className='space-y-[58px] leading-[14px]'>
              <div
                className={`text-[14px] font-heebo text-[#1E1E1E] ${
                  showCompanyInput ? 'md:mt-[535px]' : 'md:mt-[500px]'
                }`}
              >
                <p>We’ll send your receipt and updates by email.</p>
              </div>
              <div className="text-[14px] font-heebo text-[#1E1E1E]">
                <p>Make sure your phone number is correct. It can’t be changed.</p>
              </div>
            </div>
        </div>
    )
}