import Image from "next/image";
import { useState } from "react";


export function Promocode() {

    const [showPromoInput, setShowPromoInput] = useState(false)
    const [promoCode, setPromoCode] = useState('')

    const togglePromoInput = () => {
        setShowPromoInput(!showPromoInput)
    }


    return (
         <div className="">
           <div className="flex justify-between items-center text-sm cursor-pointer mb-5" onClick={togglePromoInput}>
             <p className='font-Heebo-16-semi text-[#1E1E1E]'>Do you have Promo Code?</p>
             <span className={showPromoInput ? 'rotate-180 transition-transform duration-300' : 'transition-transform duration-300'}>
               <Image src='/images/arr.svg' alt='arrow' width={16} height={16} />
             </span>
           </div>
           {showPromoInput && (
             <div className="relative mb-5">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Send your promo code"
                className="w-full p-2 pr-[60px] border border-transparent rounded-md text-[#6F6F6F] bg-[#F9F9F9] h-[40px]"
              />
              <button 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 w-[116px] bg-[#FFFFFF] px-3 py-2 rounded-md text-sm text-[#424242] font-Heebo-13 h-[30px]"
              >
                Apply
              </button>
            </div>
           )}
       </div>
    )
}