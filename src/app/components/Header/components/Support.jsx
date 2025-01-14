import React from 'react';
import Image from "next/image";

const SupportNavBar = ({ onClick }) => {
  return (
    <div>
      <button
        onClick={onClick}
        className="w-[235px] max-md:w-[189px] flex items-center justify-center h-[48px] max-md:h-[38px] bg-white text-[#1E1E1E] rounded-lg max-md:rounded-md gap-1 max-md:gap-[5px] text-[16px] max-md:text-[15px] font-avenir-heavy" // Utilizăm Tailwind pentru greutatea 700
      >
        <Image src='/imgs/heart.svg' width={14} height={12} alt="heart" className="w-[14px] h-[12px] mb-[1px]" />
        Support
      </button>
    </div>
  );
};

export default SupportNavBar;
