import React from 'react';
import Image from "next/image";


const Support = ({ onClick }) => {
  return (
    <div>
      <button
        onClick={onClick}
        className="w-full md:w-[209px] min-w-0 h-[48px] flex items-center justify-center bg-white text-[#1E1E1E] rounded-[8px] gap-1 max-md:gap-[5px] text-[16px] max-md:text-[15px] font-bold font-avenir-heavy"
      >
        <Image src='/imgs/heart.svg' width={14} height={12} alt="heart" className="w-[14px] h-[12px] mb-[1px]" />
        Support
      </button>
    </div>
  );
};

export default Support;
