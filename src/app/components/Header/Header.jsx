'use client';
import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Navbar from './components/Navbar';
import Support from './components/Support';
import Modal from './components/Modal';
import SupportForm from './components/Payment/SupportForm';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSupportInNavbar, setShowSupportInNavbar] = useState(false);
  const headerRef = useRef(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const updateHeight = () => {
      const viewportHeight = window.innerHeight;
      document.documentElement.style.setProperty('--viewport-height', `${viewportHeight}px`);
    };

    // Setăm înălțimea doar o singură dată la încărcare
    updateHeight();

    return () => {
      window.removeEventListener('resize', updateHeight);
    };
  }, []);

  return (
    <div className="relative h-[100dvh] max-md:h-[var(--viewport-height)] w-auto text-white font-ekMukta overflow-hidden">
      <div
        ref={headerRef}
        className={`absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat max-md:w-auto ${isModalOpen ? 'bg-opacity-50 blur-sm' : ''} md:bg-[url('/imgs/Background.webp')] bg-[url('/imgs/mobile.webp')] max-md:background-fixed`}
      ></div>
      <div className={`absolute bottom-0 w-full h-3/6 -mb-2 bg-gradient-to-t  ${isModalOpen ? 'bg-opacity-50 blur-sm' : ''}`}
      style={{
        background: 'linear-gradient(to top, rgba(0, 0, 0, 0.8) 10%, rgba(0, 0, 0, 0.7) 50%, rgba(0, 0, 0, 0) 100%)',
      }}></div>
      <div className={`relative z-10 h-full overflow-auto ${isModalOpen ? 'blur-sm' : ''}`}>
        <Navbar showSupportInNavbar={showSupportInNavbar} openModal={openModal} />
        <div className="max-w-[1200px] w-auto mx-auto h-full flex flex-col text-white max-2xl:p-4 max-md:p-0">
          <div className="flex-grow flex flex-col justify-end max-2xl:p-2 header-content max-md:p-0">
            <div className={`flex flex-col md:flex-row justify-between max-lg:flex-col max-lg:justify-center customStyles`}>
              <div className="flex flex-col mb-10 max-md:mb-0 items-center md:flex-row gap-3 max-md:gap-0 max-lg:flex-col max-lg:justify-center">
                <div className="md:hidden flex flex-col items-center justify-center mt-8">
                  <Image src="/imgs/logo.svg" alt='logo' className='w-[188px] h-auto max-md:mb-4' width={188} height={1} />
                  <h3 className="text-lg max-md:text-[14px] text-[#979797] font-avenirRoman max-md:mb-4 max-md:leading-4" style={{ fontFamily: 'Avenir Roman, sans-serif' }}>
                    Drama <span style={{ display: 'inline-block', width: '3px', height: '3px', backgroundColor: '#979797', borderRadius: '50%', margin: '0 5px', verticalAlign: 'middle' }}></span> Sci-Fi
                  </h3>
                </div>
                {!showSupportInNavbar && (
                  <div className="md:flex md:items-center md:px-2 max-md:mb-4 font-avenirHeavy max-md:hidden">
                    <Support onClick={openModal} />
                  </div>
                )}
                <div className=" md:flex md:flex-col md:items-start">
                  <p className="text-[16px] max-lg:text-lg max-md:text-[15px] max-md:leading-[1.125rem] max-lg:text-start max-md:text-center max-md:mb-4 text-[#CDCDCD] mx-0 max-md:mx-4 font-ekMukta tracking-neg-3percent">
                    In an ideal city without money, people face real human problems. Your support makes the series possible.
                  </p>
                   {!showSupportInNavbar && (
                    <div className="md:hidden flex justify-center max-md:mb-4">
                      <Support onClick={openModal} />
                    </div>
                  )} 
                  <div className="flex items-center gap-5 max-lg:gap-1 text-[#979797] max-lg:flex-col max-md:space-y-0 max-md:mb-4">
                    <h3 className="text-lg max-md:text-base hidden md:block font-avenirRoman">Drama • Sci-Fi • 2024</h3>
                    <div className="flex gap-4 max-md:gap-1  max-lg:mr-16 max-md:mr-0">
                      <Image src="/imgs/sony.svg" width={64} height={1} alt="sony" className="w-[46px] h-auto max-md:w-10 max-sm:w-[30px] max-sm:h-[7px]" />
                      <Image src="/imgs/netflix.svg" width={64} height={1} alt="netflix" className="w-[46px] h-auto max-md:w-10 max-sm:w-[30px] max-sm:h-[7px]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <Elements stripe={stripePromise}>
          <SupportForm />
        </Elements>
      </Modal>
    </div>
  );
}
