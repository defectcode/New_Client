'use client'
import Link from 'next/link';
import Image from 'next/image';
import './Footer.css'
import { footerData } from './constants/constants';
import { SubscribeForm } from './components/SubscribeForm';
import { useEffect, useState } from 'react';
import MobileFooter from './MobileFooter';


export const Footer = () => {
  const [isMobile, setIsMobile] = useState(false)


  useEffect(() => {
      const updateIsMobile = () => {
        setIsMobile(window.matchMedia("(max-width: 768px)").matches);
      };
  
      updateIsMobile();
      window.addEventListener("resize", updateIsMobile);
      return () => window.removeEventListener("resize", updateIsMobile);
    }, []);
  

  if(isMobile) {
    return (
      <MobileFooter/>
    )
  }

  return (
    <footer className="bg-[#F9F9F9] pb-14 md:py-10 md:mt-0 mt-5 md:px-0 px-5">
      <div className="lg:max-w-[1400px] w-full mx-auto bg-[#FFFFFF] rounded-[20px] md:p-10 px-5">
        <div className="flex md:flex-nowrap flex-wrap md:justify-between justify-center items-start w-full ">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-20 footer-sections">
            {footerData.map((section) => (
              <div key={section.title}>
                <h3 className="text-[16px] font-heebo mb-4">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link legacyBehavior href={link.href}>
                        <a className="text-sm font-heebo text-[#BDBDBD] hover:text-gray-900">
                          {link.name}
                        </a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-start max-w-[350px] md:max-w-[500px]">
            <Image src="/images/logoBlack.svg" width={95.5} height={24} alt='logo'/>
            <p className="mt-10 font-heebo text-[16px]">Subscribe to our Newsletter</p>
            <div className="mt-[10px] flex w-full">
              <SubscribeForm/>
            </div>
          </div>
        </div>  
      </div>

      <div className='md:max-w-[1400px] w-full mx-auto flex flex-wrap md:flex-nowrap items-center md:justify-between justify-center mt-5 gap-5 md:gap-0 mb-5 md:mb-0 bg-[#1E1E1E] h-[102px] md:px-10 rounded-[20px]'>
          <div className="flex justify-center space-x-4">
            <Image src="/images/footer/pay.svg" alt="Apple Pay" width={34.98} height={15.13} />
            <Image src="/images/footer/master.svg" alt="Mastercard" width={32.85} height={21.73} />
            <Image src="/images/footer/pal.svg" alt="Paypal" width={32.85} height={8.98} />
            <Image src="/images/footer/visa.svg" alt="Visa" width={30.36} height={9.84} />
          </div>

          <div className='text-[#BDBDBD] text-[14px] font-heebo'>
            <p>&copy; 2024 Fynely. All Rights Reserved. Privacy Policy</p>
          </div>

          <div className="flex space-x-6">
            <Link href="#"><Image src='/images/footer/tiktok.svg' alt='tiktok' width={19} height={22} /></Link>
            <Link href="#"><Image src='/images/footer/instagram.svg' alt='instagram' width={20} height={20} /></Link>
            <Link href="#"><Image src='/images/footer/youtube.svg' alt='youtube' width={23} height={17} /></Link>
            <Link href="#"><Image src='/images/footer/x.svg' alt='x' width={18} height={18} /></Link>
            <Link href="#"><Image src='/images/footer/facebook.svg' alt='facebook' width={12} height={22} /></Link>
          </div>
        </div>
    </footer>
  );
};
