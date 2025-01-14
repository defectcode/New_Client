import { FaRegHeart } from "react-icons/fa";
import React from 'react';

const Support = ({ onClick }) => {
  return (
    <div>
      <button
        onClick={onClick}
        className="w-[156px] h-[38px] lg:w-[176px] flex items-center justify-center bg-white text-black rounded-md max-md:rounded-md gap-1 max-md:gap-[5px] text-[16px] max-md:text-[15px] font-bold font-avenir-heavy"
        style={{ fontFamily: 'Avenir Heavy, sans-serif' }}
      >
        <FaRegHeart className="w-[14px] h-auto" />
        Support
      </button>
    </div>
  );
};

export default Support;
