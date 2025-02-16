import React, { useEffect } from 'react';
import Image from 'next/image';

const Modal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div onClick={onClose} className="fixed inset-0 z-50 flex items-center max-md:items-end justify-center bg-[black] bg-opacity-75 max-lg:p-[20px] w-auto" >
      <div onClick={(e) => e.stopPropagation()} className="relative bg-[#E8E8ED] rounded-lg min-h-[400px] h-auto max-w-[380px] w-full  text-white shadow-lg flex flex-col items-center justify-center p-5">
        <div className="flex justify-end items-center w-full">
          <h2 className="text-[20px] font-ek-mukta font-extrabold mb-5 flex items-center justify-center mr-[50px] text-[#1E1E1E]">Support Your Series</h2>
          <button onClick={onClose} className="text-[#1E1E1E] text-5xl">
            <Image src="/icons/close.svg" width={16} height={16} alt='close' className='mb-[20px] mr-2'/>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
