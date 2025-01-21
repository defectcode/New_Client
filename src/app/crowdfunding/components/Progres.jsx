import React, { useState, useEffect } from 'react';
import Support from './Support';
import Modal from '/src/app/components/Header/components/Modal.jsx';
import SupportForm from '../../components/Header/components/Payment/SupportForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const FundraisingProgress = ({ data }) => {

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
        <div className="text-white">
            <div className="flex items-center justify-between mb-2 w-full lg:w-[346px]">
                <span className="text-[20px] lg:text-2xl font-ekmukta font-bold text-[#FFFFFF]">${data.raisedAmount}</span>
                <span className="text-md block font-avenir text-[16px] md:text-[#E8E8ED] text-[#FFFFFF]">
                    {data.stageLabel} <span className="text-[#FFFFFF] font-semibold font-ekMukta">{data.stageNumber}</span>
                </span>
            </div>

            <div className="relative w-auto lg:w-[380px]">
                <div className="h-1 bg-[#FFFFFF] rounded-full w-full lg:w-[346px] relative">
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

            <div className="flex items-center justify-between mt-2 lg:w-[346px]">
                <div className="flex flex-col">
                    <span className="font-semibold text-[15px] lg:text-[20px]">
                        <span className='font-semibold font-ekMukta text-[15px] md:text-[#E8E8ED] text-[#FFFFFF]'>
                            {progressPercentage}<span className='text-[13px] font-ekMukta'>%</span>&nbsp;
                        </span>
                        <span className="text-[#FFFFFF] font-ekmukta text-[15px]">
                            raised of ${data.goalAmount} goal
                        </span>
                    </span>
                </div>
                <div className="flex items-center gap-1">
                    <span className="font-semibold font-ekMukta text-[16px] lg:text-[20px] md:text-[#E8E8ED] text-[#FFFFFF]">
                        {data.supportersCount}
                    </span>
                    <span className="flex items-center text-[#FFFFFF] font-ekMukta text-[15px]">
                        {data.supportersLabel}
                    </span>
                </div>
            </div>

            <div className="hidden md:block mt-2 lg:mt-10">
                <Support onClick={openModal}/>
            </div>

            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <Elements stripe={stripePromise}>
                    <SupportForm />
                </Elements>
            </Modal>
        </div>
    );
}

export default FundraisingProgress;
