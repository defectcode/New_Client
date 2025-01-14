import { FaRegHeart } from "react-icons/fa";
import React from 'react';
import Image from "next/image";


const SupportCenter = ({ onClick }) => {
  return (
    <div>
      <button
        onClick={onClick}
        className="w-[189px] h-[40px] flex items-center justify-center bg-white text-[#1E1E1E] rounded-[8px] gap-1 text-[15px] font-bold font-avenir-heavy"
      >
        <Image src='/imgs/heart.svg' width={14} height={12} alt="heart" className="w-[14px] h-[12px] mb-[1px]" />
        Support
      </button>
    </div>
  );
};

export default SupportCenter;
