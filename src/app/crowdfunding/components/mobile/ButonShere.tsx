import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import Support from '../Support';
import SupportCenter from '../SupportCenter';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import ShareButton from './Share/ShareButton';
import Modal from "@/app/checkout/components/order/ModalPayPal";
import SupportForm from "@/app/components/Header/components/Payment/SupportForm";

type ButonShereProps = {
    isShareFixed: boolean;
};

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const ButonShere: React.FC<ButonShereProps> = ({ isShareFixed }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div 
            className={`flex items-center justify-center w-full h-[40px] bg-transparent z-50 ${
                isShareFixed ? 'fixed bottom-0 left-0 right-0' : 'relative'
            }`}
            style={{ bottom: isShareFixed ? '0' : 'auto' }}
        >
            {isShareFixed ? (
                <div className="flex items-center justify-center w-[209px] h-[80px] bg-transparent mb-10">
                    <SupportCenter onClick={openModal} />
                </div>
            ) : (
                <div className="flex items-center justify-center w-full px-5 gap-4">
                    <div className="flex-[2]">
                        <Support onClick={openModal} />
                    </div>
                    {/* <ShareButton /> */}
                </div>
            )}

            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <Elements stripe={stripePromise}>
                    <SupportForm />
                </Elements>
            </Modal>
        </div>
    );
};

export default ButonShere;