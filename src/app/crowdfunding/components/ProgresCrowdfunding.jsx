import React, { useState, useEffect } from 'react';
import Support from './Support';
import Modal from '/src/app/components/Header/components/Modal.jsx';
import SupportForm from '../../components/Header/components/Payment/SupportForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const ProgresCrowdfunding = ({ data }) => {

    const raisedAmount = parseInt(data.raisedAmount.replace(/,/g, ''), 10);
    const goalAmount = parseInt(data.goalAmount.replace(/,/g, ''), 10);

    let rawProgressPercentage = (raisedAmount / goalAmount) * 100 || 0;
    let progressPercentage;
    if (rawProgressPercentage > 0 && rawProgressPercentage < 1) {
        progressPercentage = rawProgressPercentage.toFixed(1);  
    } else {
        progressPercentage = Math.round(rawProgressPercentage); 
    }

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="text-white w-full px-5 mb-5">
            <h2 className='font-ekMukta font-extrabold text-[24px]'>Limited Edition Bars</h2>
            <div className="flex items-center justify-between mb-2">
                <span className="text-[20px] font-ekMukta font-bold">${data.raisedAmount}</span>
                <span className="text-sm font-medium text-gray-300">
                    {data.stageLabel} <span className="font-bold text-white">{data.stageNumber}</span>
                </span>
            </div>

            <div className="relative w-auto">
                <div className="h-1 bg-[#FFFFFF] rounded-full w-full relative">
                    <div
                    className="h-full rounded-full bg-gradient-to-r from-[#E50815] via-[#E50815] to-white"
                    style={{ width: `${progressPercentage}%` }}
                    ></div>
                    <div
                    className="absolute top-1/2 -translate-y-1/2"
                    style={{ left: `calc(${progressPercentage}% - 10px)` }}
                    >
                        <div className="w-[8px] h-[8px] rounded-full bg-white flex items-center justify-center">
                            <div className="w-[6px] h-[6px] rounded-full bg-black"></div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="flex items-center justify-between mt-2 text-[#FFFFFF]">
                <div>
                    <span className="text-[16px] font-ekMukta font-semibold">
                        {progressPercentage}% raised of ${data.goalAmount} goal
                    </span>
                </div>
                {/* <div className="flex items-center gap-1">
                    <span className="text-lg font-semibold">{data.supportersCount}</span>
                    <span className="text-sm font-medium text-gray-300">{data.supportersLabel}</span>
                </div> */}
            </div>
        </div>
    );
}

export default ProgresCrowdfunding;
