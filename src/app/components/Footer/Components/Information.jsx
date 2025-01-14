import React from "react";
import Description from "./Description";
import Link from "next/link";
import Image from "next/image";


const Information = () => {
  return (
    <div className="flex flex-row justify-between items-start max-w-[1200px] mx-auto w-full text-white  max-lg:flex-col max-lg:justify-around max-md:lg:items-start max-lg:items-center">
      <div className="mb-4 lg:mb-0">
          <Link href="/">
            <Image src='/imgs/Blogo.svg' alt="logo" width={102} height={24} />
          </Link>
      </div>
      <div className="flex flex-row justify-between items-start max-w-[800px] w-full text-white">
        <div className="flex flex-col gap-3 mb-10 lg:mb-0 text-start max-lg:text-center max-md:gap-4">
          <h1 className="text-[18px] text-[#1E1E1E] font-semibold font-ekMukta">Support And Donations</h1>
          <div className="flex flex-col text-[#949494] gap-4 text-sm md:text-base max-md:gap-3 font-ekMukta font-normal">
            <Link className="text-[14px]" href="/">Donation Link</Link>
            <Link className="text-[14px]" href="/">How Your Contributions Help</Link>
            <Link className="text-[14px]" href="/">FAQ</Link>
            <Link className="text-[14px]" href="/">Help Center</Link>
          </div>
        </div>
        <div className="flex flex-col gap-3 mb-10 lg:mb-0 text-start max-lg:text-center max-md:gap-4">
          <h1 className="text-[18px] text-[#1E1E1E] font-semibold font-ekMukta">Legal Information</h1>
          <div className="flex flex-col text-[#949494] gap-4 text-sm md:text-base max-md:gap-3 font-ekMukta font-normal">
            <Link className="text-[14px]" href="/privacypolicy">Privacy Policy</Link>
            <Link className="text-[14px]" href="/cookiepolicy">Cookie Policy</Link>
            <Link className="text-[14px]" href="/">Terms of Use</Link>
            <Link className="text-[14px]" href="/">Copyright Information</Link>
          </div>
        </div>
        <div className="flex flex-col gap-3 text-start max-lg:text-center max-md:gap-6 max-md:mb-4">
          <h1 className="text-[18px] text-[#1E1E1E] font-semibold font-ekMukta">Contact Us</h1>
          <ul className="flex flex-col text-[#949494] gap-4 max-md:gap-3 text-sm md:text-base md:gap-3 max-lg:w-auto font-ekMukta font-normal">
            <li className="text-[14px]">Phone: +373 60 877 733</li>
            <li className="text-[14px]">Email: Valery@fyne.pro</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Information;
