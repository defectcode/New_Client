import { FaRegHeart } from "react-icons/fa";
import React from 'react';

const SupportNavBar = ({ onClick }) => {
  return (
    <div className="mr-5">
        <button
        onClick={onClick}
        className="w-[88px] flex items-center justify-center h-[20px] bg-white text-black rounded-lg gap-2 max-md:gap-1 text-[12px] font-bold font-avenir-heavy"
        >
        <FaRegHeart className="w-3 h-auto" />
        Support
      </button>
    </div>
  );
};

export default SupportNavBar;
