
import React from 'react';
import { MdKeyboardArrowRight } from "react-icons/md";

const NextButton = ({ onClick }) => {
    return (
        <button
        onClick={onClick}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-none text-white rounded-full p-2"
        >
            <MdKeyboardArrowRight className='w-44 h-auto max-lg:w-10 text-transparent'/>
        </button>
    );
};

export default NextButton;

