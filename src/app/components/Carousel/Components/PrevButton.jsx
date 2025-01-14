
import React from 'react';
import { MdKeyboardArrowLeft } from "react-icons/md";

const PrevButton = ({ onClick }) => {
    return (
        <button
        onClick={onClick}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-none text-white rounded-full p-2"
        >
        <MdKeyboardArrowLeft className='w-44 h-auto max-lg:w-10 text-transparent' />
      </button>
    );
};

export default PrevButton;
