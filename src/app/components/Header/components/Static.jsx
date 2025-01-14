'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import { AiOutlineUser, AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import SupportForm from './Payment/SupportForm';
import { Elements } from '@stripe/react-stripe-js';
import ModalNavBar from './ModalNavBar';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function Static({ openModal }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const navbarRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.pageYOffset;

      // Bara de navigare se ascunde dacă derulezi în jos
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        navbarRef.current.style.transform = 'translateY(-100%)'; // Ascunde bara de navigare
      } 
      // Bara de navigare revine doar când ajungi aproape la începutul paginii
      else if (currentScrollY <= 50) {
        navbarRef.current.style.transform = 'translateY(0)'; // Afișează bara de navigare
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

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
    <div>
      <nav
        ref={navbarRef}
        className={`StaticNavbar bg-transparent w-full h-11 max-md:h-10 font-avenirRoman backdrop-blur-lg ios-blur fixed`}
        style={{ transition: 'transform 0.3s ease-in-out' }}
      >
  <div className="max-w-[1200px]  flex justify-between items-center h-full mx-5 lg:mx-auto relative z-50">
  <div>
            <Link href="/"><Image src="/imgs/Plogo.svg" alt='logo' className='w-[98px] h-[24px] text-white' width={98} height={24} /></Link>
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="transition-opacity">
              {isOpen ? <AiOutlineClose className="text-white w-8 h-8 max-md:w-5 max-md:h-5" /> : <Image src="/imgs/burgher.svg" alt='burgher' width={40} height={1} className="text-white w-8 h-8 max-md:w-[20px] max-md:h-[12px]" />}
            </button>
          </div>
          <ul className={`flex-col md:flex md:flex-row gap-10 text-lg md:text-[#D9D9D9] fixed md:static top-0 right-0 h-screen md:h-auto transition-transform transform ${isOpen ? 'translate-x-0 max-md:bg-gradient-to-r from-black to-dark-gray max-md:bg-opacity-100 text-white' : 'translate-x-full bg-opacity-50'} md:translate-x-0 md:w-auto w-2/3 pt-20 md:pt-0`}>
            <button className="absolute top-6 right-4 md:hidden" onClick={closeMenu}>
              <AiOutlineClose className="text-white w-6 h-6 mt-2" />
            </button>
            <li className="md:mt-0 md:ml-0 ml-4 max-md:ml-10"><Link legacyBehavior href="/interactive"><a onClick={closeMenu} className="hover:text-gray-300 text-[14px] max-md:text-2xl">Interactive</a></Link></li>
            <li className="mt-9 md:mt-0 md:ml-0 ml-4 max-md:ml-10"><Link legacyBehavior href="/about"><a onClick={closeMenu} className="hover:text-gray-300 text-[14px] max-md:text-2xl">About</a></Link></li>
            <li className="mt-9 md:mt-0 md:ml-0 ml-4 max-md:ml-10"><Link legacyBehavior href="/crowdfunding"><a onClick={closeMenu} className="hover:text-gray-300 text-[14px] max-md:text-2xl">Crowdfunding</a></Link></li>
            <li className="mt-9 md:mt-0 md:ml-0 ml-4 max-md:ml-10"><Link legacyBehavior href="/contact"><a onClick={closeMenu} className="hover:text-gray-300 text-[14px] max-md:text-2xl">Contact Us</a></Link></li>
            <li className="mt-9 md:mt-0 md:ml-0 ml-4 max-md:ml-10"><Link legacyBehavior href="/careers"><a onClick={closeMenu} className="hover:text-gray-300 text-[14px] max-md:text-2xl">Careers</a></Link></li>
            <div className="md:hidden absolute bottom-4 w-full flex justify-center">
              <Link href="/"><Image src="/imgs/logo.svg" alt='logo' className='w-[118px] h-auto mb-10' width={200} height={50} /></Link>
            </div>
          </ul>
          <div className='hidden md:flex gap-5 items-center text-[#D9D9D9]'>
            <Link href="/"><AiOutlineUser className='flex w-auto h-6' /></Link>
          </div>
        </div>
        <ModalNavBar isOpen={isModalOpen} onClose={closeModal}>
          <Elements stripe={stripePromise}>
            <SupportForm />
          </Elements>
        </ModalNavBar>
      </nav>
    </div>
  );
}
