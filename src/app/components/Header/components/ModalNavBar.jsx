import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const ModalNavBar = ({ isOpen, onClose, children }) => {
  const [marginTop, setMarginTop] = useState('');

  useEffect(() => {
    const userAgent = window.navigator.userAgent || window.navigator.vendor || window.opera;
    const width = window.innerWidth;
    const height = window.innerHeight;

    if (/iPhone/i.test(userAgent)) {
      // Detect specific iPhone models based on screen size
      if (width === 430 && height === 932) {
        // iPhone 14 Pro Max
        setMarginTop('mt-[900px]');
      } else if (width === 414 && height === 896) {
        // iPhone 11 Pro Max
        setMarginTop('mt-[1000px]');
      } else if (width === 390 && height === 844) {
        // iPhone 12, 13, 14
        setMarginTop('mt-[900px]');
      } else if (width === 375 && height === 812) {
        // iPhone X, XS
        setMarginTop('mt-[900px]');
      } else if (width === 360 && height === 780) {
        // iPhone 12 Mini, 13 Mini
        setMarginTop('mt-[900px]');
      } else {
        // Default for other iPhone models
        setMarginTop('');
      }
    } else {
      // Adjust for Android screen sizes
      if (width >= 720 && width < 1080) {
        setMarginTop('mt-[800px]');
      } else if (width >= 1080) {
        setMarginTop('mt-[1000px]');
      }else if (width <= 680 && width >= 380) {
        setMarginTop('mt-[900px]');
      } else {
        setMarginTop('');
      }
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className={`relative bg-[#252525] rounded-lg py-5 px-10 mx-auto min-h-[400px] h-auto w-[90%] max-w-[344px] text-white shadow-lg ${marginTop} flex items-center justify-center`}>
        <button onClick={onClose} className="absolute top-0 right-0 mt-[37px] mr-5 text-white text-5xl">
          <Image src="/icons/close.svg" width={20} height={20} alt='close' />
        </button>
        {children}
      </div>
    </div>
  );
};

export default ModalNavBar;
