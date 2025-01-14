import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Networking from "./Components/Networking";
import { IoIosArrowForward } from "react-icons/io";


export default function Sidebar() {
  const [isOpenSupport, setIsOpenSupport] = useState(false);
  const [isOpenLegal, setIsOpenLegal] = useState(false);
  const [isOpenContact, setIsOpenContact] = useState(false);

  const toggleSupport = () => setIsOpenSupport(!isOpenSupport);
  const toggleLegal = () => setIsOpenLegal(!isOpenLegal);
  const toggleContact = () => setIsOpenContact(!isOpenContact);

  return (
    <div className="bg-[#EBEBF0] text-white px-5 pt-10 pb-20 w-full max-w-md mx-auto h-auto">
            <div className="relative w-full">
        <div className="absolute inset-0 h-[1px] bg-gradient-to-r from-[#272727] to-[#8D8D8D] opacity-20"></div>
      </div>
      <div className="py-3">
        <div className="flex justify-between items-center cursor-pointer text-[#1E1E1E]" onClick={toggleSupport}>
          <h2 className="text-[16px] font-ekMukta leading-none">Support & Donations</h2>
          <span className="text-xl transform transition-transform duration-200 leading-none" style={{ transform: isOpenSupport ? 'rotate(180deg)' : 'rotate(0deg)' }}>
            <Image src='/imgs/Footer/arrow.svg' alt='arrow' width={14} height={6}  className='w-[14px] h-[8px]'/>
          </span>
        </div>
        {isOpenSupport && (
          <ul className="space-y-4 text-[#646464] text-[14px] font-ekMukta gap-4 mt-5 mb-2 px-5">
            <li><Link legacyBehavior href="#"><a>Donation Link</a></Link></li>
            <li><Link legacyBehavior href="#"><a>How Your Contributions Help</a></Link></li>
            <li><Link legacyBehavior href="#"><a>FAQ</a></Link></li>
            <li><Link legacyBehavior href="#"><a>Help Center</a></Link></li>
          </ul>
        )}
      </div>

      <div className="relative w-full">
        <div className="absolute inset-0 h-[1px] bg-gradient-to-r from-[#272727] to-[#8D8D8D] opacity-20"></div>
      </div>

      <div className="py-3">
        <div className="flex justify-between items-center cursor-pointer text-[#1E1E1E]" onClick={toggleLegal}>
          <h2 className="text-[16px] font-ekMukta leading-none">Legal Information</h2>
          <span className="text-xl transform transition-transform duration-200 leading-none" style={{ transform: isOpenLegal ? 'rotate(180deg)' : 'rotate(0deg)' }}>
          <Image src='/imgs/Footer/arrow.svg' alt='arrow' width={14} height={6} className='w-[14px] h-[8px]' />
          </span>
        </div>
        {isOpenLegal && (
          <ul className="space-y-4 text-[#646464] text-[14px] gap-4 font-ekMukta mt-5 mb-2 px-5">
            <li><Link legacyBehavior href="/privacypolicy"><a>Privacy Policy</a></Link></li>
            <li><Link legacyBehavior href="/cookiepolicy"><a>Cookie Policy</a></Link></li>
            <li><Link legacyBehavior href="#"><a>Tearm of Use</a></Link></li>
            <li><Link legacyBehavior href="#"><a>Copyright Information</a></Link></li>
          </ul>
        )}
      </div>

      <div className="relative w-full">
        <div className="absolute inset-0 h-[1px] bg-gradient-to-r from-[#272727] to-[#8D8D8D] opacity-20"></div>
      </div>

      <div className="py-3">
        <div className="flex justify-between items-center cursor-pointer text-[#1E1E1E]" onClick={toggleContact}>
          <h2 className="text-[16px] font-ekMukta leading-none">Contact Us</h2>
          <span className="text-xl transform transition-transform duration-200 leading-none" style={{ transform: isOpenContact ? 'rotate(180deg)' : 'rotate(0deg)' }}>
          <Image src='/imgs/Footer/arrow.svg' alt='arrow' width={9} height={5} className='w-[14px] h-[8px]' />
          </span>
        </div>
        {isOpenContact && (
          <ul className="space-y-4 text-[#646464] text-[14px] gap-4 font-ekMukta mt-5 mb-2 px-5">
            <li className="text-[14px]">Phone: +373 60 877 733</li>
            <li className="text-[14px]">Email: Valery@fyne.pro</li>
        </ul>
        )}
      </div>

      <div className="relative w-full">
        <div className="absolute inset-0 h-[1px] bg-gradient-to-r from-[#272727] to-[#8D8D8D] opacity-20"></div>
      </div>

      <div>
        <div className="flex justify-center items-center mt-10 mb-5">
          <Link href="/">
            <Image src='/imgs/Blogo.svg' alt="logo" width={98} height={24} />
          </Link>
        </div>
        <Networking />
      </div>
    </div>
  );
}
