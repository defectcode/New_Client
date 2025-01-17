'use client';
import { useState } from "react";
import { footerData } from "./constants/constants";
import Image from "next/image";
import { SubscribeForm } from "./components/SubscribeForm";
import Link from "next/link";

export default function MobileFooter() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (title: string) => {
    setOpenSection((prev) => (prev === title ? null : title));
  };

  return (
    <footer className="bg-[#F9F9F9] pb-14 md:py-10 md:mt-0 md:px-0 px-5">
      <div className="md:max-w-[1400px] w-full mx-auto bg-[#FFFFFF] rounded-[20px] md:p-10 md:px-0 px-5">
        <div className="flex flex-col items-center text-center py-5">
          <Image src="/images/logoBlack.svg" width={95.5} height={24} alt="logo" />
          <p className="mt-5 font-heebo text-[16px] text-[#333]">Subscribe to our Newsletter</p>
          <div className="mt-4 w-full max-w-md">
            <SubscribeForm />
          </div>
        </div>

        <div className="pb-5 ">
        {footerData.map((section) => (
          <div key={section.title} className="border-b border-[#E0E0E0]">
            <button
              onClick={() => toggleSection(section.title)}
              className="w-full flex justify-between items-center py-5 text-left font-bold text-[#333] text-[16px]"
            >
              {section.title}
              <span
                className={`transform transition-transform duration-300 ${
                  openSection === section.title ? 'rotate-90' : 'rotate-0'
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5 text-[#333]"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                openSection === section.title ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <ul className="space-y-2 pl-4 pb-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#BDBDBD] hover:text-gray-900 transition duration-300 block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
      </div>

      

      <div className="w-full h-auto mx-auto flex flex-col items-center justify-center mt-5 gap-5 mb-5 bg-[#1E1E1E] rounded-[20px] py-6">
        <div className="flex flex-col items-center">
          <p className="text-[14px] text-[#FFFFFF] mb-2">Follow Us:</p>
          <div className="flex space-x-6">
            <Link href="#"><Image src="/images/footer/tiktok.svg" alt="tiktok" width={19} height={22} /></Link>
            <Link href="#"><Image src="/images/footer/instagram.svg" alt="instagram" width={20} height={20} /></Link>
            <Link href="#"><Image src="/images/footer/youtube.svg" alt="youtube" width={23} height={17} /></Link>
            <Link href="#"><Image src="/images/footer/x.svg" alt="x" width={18} height={18} /></Link>
            <Link href="#"><Image src="/images/footer/facebook.svg" alt="facebook" width={12} height={22} /></Link>
          </div>
        </div>

        <div className="w-4/5 border-t-[1px] border-[#FFFFFF] opacity-20 my-5"></div>

        <div className="flex flex-col items-center">
          <p className="text-[14px] text-[#FFFFFF] mb-2">Pay With:</p>
          <div className="flex space-x-4">
            <Image src="/images/footer/pay.svg" alt="Apple Pay" width={34.98} height={15.13} />
            <Image src="/images/footer/master.svg" alt="Mastercard" width={32.85} height={21.73} />
            <Image src="/images/footer/pal.svg" alt="Paypal" width={32.85} height={8.98} />
            <Image src="/images/footer/visa.svg" alt="Visa" width={30.36} height={9.84} />
          </div>
        </div>
      </div>

      <div className="text-[#BDBDBD] text-[14px] font-heebo text-center mt-5">
        <p>&copy; 2024 Fynely. All Rights Reserved. Privacy Policy</p>
      </div>
    </footer>
  );
}
