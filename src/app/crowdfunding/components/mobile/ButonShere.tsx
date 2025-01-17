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

    // Dezactivează scroll-ul când modalul este deschis
    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        // Curățare pentru a evita efecte nedorite
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isModalOpen]);

    return (
        <div
            className={`fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center bg-[#E8E8ED] h-[68px]`}
            style={{
                padding: "10px",
                boxShadow: isShareFixed ? "0 -2px 10px rgba(0, 0, 0, 0.1)" : "none",
            }}
        >
            <div className="flex items-center justify-between w-full px-5 gap-4">
                <div className="flex-[2]">
                    <Support onClick={openModal} />
                </div>
                <ShareButton url={undefined} />
            </div>

            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <Elements stripe={stripePromise}>
                    <SupportForm />
                </Elements>
            </Modal>
        </div>
    );
};

export default ButonShere;
