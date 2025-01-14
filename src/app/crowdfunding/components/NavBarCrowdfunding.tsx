import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import Support from './Support';
import { RiShare2Line } from "react-icons/ri";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Modal from "@/app/checkout/components/order/ModalPayPal";
import SupportForm from '../../components/Header/components/Payment/SupportForm';

type NavBarCrowdfundingProps = {
    setActiveSection: (section: string) => void;
};

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const NavBarCrowdfunding: React.FC<NavBarCrowdfundingProps> = ({ setActiveSection }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeHash, setActiveHash] = useState('#overview');
    const [isSticky, setIsSticky] = useState(false);
    const navbarRef = useRef<HTMLDivElement | null>(null);
    const placeholderRef = useRef<HTMLDivElement | null>(null);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        const handleHashChange = () => {
            const newHash = window.location.hash || '#overview';
            setActiveHash(newHash);
            setActiveSection(newHash.substring(1));
        };

        window.addEventListener('hashchange', handleHashChange);
        handleHashChange();

        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, [setActiveSection]);

    useEffect(() => {
        const handleScroll = () => {
            const navbar = navbarRef.current;
            const placeholder = placeholderRef.current;

            if (navbar && placeholder) {
                const offsetTop = placeholder.getBoundingClientRect().top;

                if (offsetTop <= 0) {
                    setIsSticky(true);
                    placeholder.style.height = `${navbar.offsetHeight}px`;
                } else {
                    setIsSticky(false);
                    placeholder.style.height = '0px';
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleLinkClick = (hash: string) => {
        setActiveHash(hash);
        setActiveSection(hash.substring(1));
    };

    const linkClasses = (hash: string) => `px-3 py-[6px] text-[16px] flex justify-center items-center font-ekmukta mt-2 ${activeHash === hash ? 'text-[#F1F1F1] border-b-[0.5px] border-[#F1F1F1]' : 'text-[#F1F1F1] border-b-1 border-transparent'}`;

    return (
        <div className="w-full bg-[#1B1B1B]">
            <div ref={placeholderRef} className=""></div>
            <div ref={navbarRef} id="navbar-crowdfunding" className={`flex items-center justify-center w-full h-[60px] ${isSticky ? 'fixed top-0 left-0 right-0 z-50 bg-[#1B1B1B] transition-all duration-300 ease-in-out' : 'bg-black'}`}>
                <div className="max-w-[1200px] w-full flex items-center justify-between px-5 lg:px-0">
                    <div className="flex items-center gap-10 font-ekMukta">
                        <Link href="#overview" passHref legacyBehavior>
                            <a className={linkClasses('#overview')} onClick={() => handleLinkClick('#overview')}>Overview</a>
                        </Link>
                        <Link href="#rewards" passHref legacyBehavior>
                            <a className={linkClasses('#rewards')} onClick={() => handleLinkClick('#rewards')}>Rewards</a>
                        </Link>
                        <Link href="#community" passHref legacyBehavior>
                            <a className={linkClasses('#community')} onClick={() => handleLinkClick('#community')}>Community</a>
                        </Link>
                        <Link href="#extras" passHref legacyBehavior>
                            <a className={linkClasses('#extras')} onClick={() => handleLinkClick('#extras')}>Extras</a>
                        </Link>
                    </div>
                    {isSticky && (
                        <div className="flex items-center gap-4 transition-opacity duration-300 ease-in-out">
                            <div className="flex items-center h-full">
                                <Support onClick={openModal} />
                            </div>
                            <button className="flex items-center gap-2 text-white border border-white px-6 py-2 rounded-xl font-avenirHeavy hover:bg-white hover:text-black">
                                Share
                                <RiShare2Line />
                            </button>
                        </div>
                    )}
                    <Modal isOpen={isModalOpen} onClose={closeModal}>
                        <Elements stripe={stripePromise}>
                            <SupportForm />
                        </Elements>
                    </Modal>
                </div>
            </div>
        </div>
    );
};

export default NavBarCrowdfunding;
