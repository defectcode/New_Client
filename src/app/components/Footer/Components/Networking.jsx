import React from "react";
import Image from "next/image";
import Link from "next/link";

const Networking = () => {
    return (
        <div className="bg-transparent max-w-[1200px] w-[1300px] max-xl:w-auto mx-10 h-[120px] max-lg:h-auto max-md:w-auto mt-14 max-md:mt-5 rounded-xl flex flex-col lg:flex-row items-center justify-between md:mb-0">
            <div className="mb-5 lg:mb-0">
                <p className="text-[#1E1E1E] text-[16px] text-center max-md:text-[10px] font-ekmukta-extralight">
                    Copyright © 2024 Fyne S.R.L. All right reserved.
                </p>
            </div>
            <div className="flex gap-10 text-[#949494] items-center">
                <Link href='https://tiktok.com/@valery.fain'>
                    <Image 
                        src='/icons/tiktok.svg' 
                        alt="tiktok" 
                        width={20} 
                        height={20} 
                        className="filter brightness-0"
                    />
                </Link>
                <Link href='https://instagram.com/valery.fain'>
                    <Image 
                        src='/icons/instagram.svg' 
                        alt="instagram" 
                        width={20} 
                        height={20} 
                        className="filter brightness-0"
                    />
                </Link>
                <Link href='https://www.youtube.com/'>
                    <Image 
                        src='/icons/youtube.svg' 
                        alt="youtube" 
                        width={20} 
                        height={20} 
                        className="filter brightness-0"
                    />
                </Link>
                <Link href='https://x.com/'>
                    <Image 
                        src='/icons/x.svg' 
                        alt="twitter" 
                        width={20} 
                        height={20} 
                        className="filter brightness-0"
                    />
                </Link>
                <Link href='https://facebook.com/ValreyFine'>
                    <Image 
                        src='/icons/facebook.svg' 
                        alt="facebook" 
                        width={13} 
                        height={13} 
                        className="filter brightness-0"
                    />
                </Link>
            </div>
        </div>
    )
}

export default Networking;
