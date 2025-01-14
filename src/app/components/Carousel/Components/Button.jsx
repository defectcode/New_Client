import React from "react";
import Link from "next/link";

const Button = ({ link }) => {
  return (
    <div className="max-md:text-center px-[18px] md:mx-0 max-md:ml-0 max-md:mb-0 max-md:flex max-md:items-center max-md:justify-center"> 
      <Link href={link} passHref legacyBehavior>
        <button className="bg-white text-[#1E1E1E] w-[210px] h-[34px] font-semibold rounded-md text-[15px] max-md:-mt-[6px]" style={{ fontFamily: 'Avenir, sans-serif', fontWeight: 700 }}>
          View Details
        </button>
      </Link>
    </div>
  );
}

export default Button;
