'use client'
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";


export function Info() {
    const router = useRouter();
    const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
        'easyReturns': false,
        'securePayment': false,
        'youCanPayBy': false,
    });

    const toggleSection = (section: string) => {
        setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }))
    };

    

    return (
        <div className="px-5">
            <div className="md:mt-5">
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
    )

}