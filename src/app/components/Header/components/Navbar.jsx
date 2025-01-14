'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { AiOutlineUser, AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import SupportNavBar from './SupportNavBar';
import SupportForm from './Payment/SupportForm';
import { Elements } from '@stripe/react-stripe-js';
import ModalNavBar from './ModalNavBar';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function Navbar({ openModal }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
    openModal();
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
<nav className="bg-black bg-opacity-25 fixed top-0 w-full h-10 md:h-11 z-50 font-avenirRoman backdrop-blur-lg ios-blur">
  <div className="max-w-[1200px]  flex justify-between items-center h-full mx-5 md:mx-auto relative z-50">
    <div className="flex items-center h-full">
          <Link href="/"><Image src="/imgs/fyne.svg" alt='logo' className='md:w-20 h-auto' width={60} height={20} /></Link>
        </div>
        <div className="md:hidden flex items-center relative z-50">

          <button onClick={() => setIsOpen(!isOpen)} className="transition-opacity">
            {isOpen ? <AiOutlineClose className="text-white w-8 h-8 max-md:w-5 max-md:h-5" /> : <Image src="/imgs/burgher.svg" alt='burgher' width={40} height={1} className="text-white w-8 h-8 max-md:w-[20px] max-md:h-[12px]" />}
          </button>
        </div>
        <ul className={`flex-col md:flex md:flex-row gap-10 text-lg md:text-[#D9D9D9] fixed md:static top-0 right-0 h-screen md:h-auto transition-transform transform ${isOpen ? 'translate-x-0 max-md:bg-gradient-to-r from-black to-dark-gray max-md:bg-opacity-100 text-white' : 'translate-x-full bg-opacity-50'} md:translate-x-0 md:w-auto w-2/3 pt-20 md:pt-0 z-50`}>
          <button className="absolute top-6 right-4 md:hidden z-60" onClick={closeMenu}>
            <AiOutlineClose className="text-white w-6 h-6 mt-2" />
          </button>
          <li className="md:mt-0 md:ml-0 ml-4 max-md:ml-10 z-50"><Link legacyBehavior href="/interactive"><a onClick={closeMenu} className="hover:text-gray-300 text-[14px] max-md:text-2xl">Interactive</a></Link></li>
          <li className="mt-9 md:mt-0 md:ml-0 ml-4 max-md:ml-10 z-50"><Link legacyBehavior href="/about"><a onClick={closeMenu} className="hover:text-gray-300 text-[14px] max-md:text-2xl">About</a></Link></li>
          <li className="mt-9 md:mt-0 md:ml-0 ml-4 max-md:ml-10 z-50"><Link legacyBehavior href="/crowdfunding"><a onClick={closeMenu} className="hover:text-gray-300 text-[14px] max-md:text-2xl">Crowdfunding</a></Link></li>
          <li className="mt-9 md:mt-0 md:ml-0 ml-4 max-md:ml-10 z-50"><Link legacyBehavior href="/contact"><a onClick={closeMenu} className="hover:text-gray-300 text-[14px] max-md:text-2xl">Contact Us</a></Link></li>
          <li className="mt-9 md:mt-0 md:ml-0 ml-4 max-md:ml-10 z-50"><Link legacyBehavior href="/careers"><a onClick={closeMenu} className="hover:text-gray-300 text-[14px] max-md:text-2xl">Careers</a></Link></li>
          <div className="md:hidden absolute bottom-4 w-full flex justify-center z-50">
            <Link href="/"><Image src="/imgs/logo.svg" alt='logo' className='w-[118px] h-auto mb-10' width={200} height={50} /></Link>
          </div>
        </ul>
        <div className='hidden md:flex gap-5 items-center text-[#D9D9D9] relative z-50'>
          <Link href="/"><AiOutlineUser className='flex w-auto h-6 z-50' /></Link>
        </div>
      </div>
      <ModalNavBar isOpen={isModalOpen} onClose={closeModal}>
        <Elements stripe={stripePromise}>
          <SupportForm />
        </Elements>
      </ModalNavBar>
    </nav>
  );
}
