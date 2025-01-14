'use client'
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

const OurMissionTitle = () => {
    const { ref, inView, entry } = useInView();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div 
            className={`relative ${isMobile ? 'h-[100px] bg-black' : 'h-[150px]'} w-full`} 
            ref={ref}
        >
            <motion.div 
                className={`absolute lg:ml-[121px] ${isMobile ? 'static flex flex-col items-center justify-center h-full' : ''}`}
            >
                <motion.h1
                    className={`text-3xl text-white font-semibold font-roboto mb-2 ${isMobile ? 'text-center' : ''}`}
                >
                    Our Mission
                </motion.h1>
                <motion.p
                    className={`w-[306px] lg:w-1/2 text-white text-[16px] font-ekmukta mt-10 lg:mt-2 max-md:relative ${isMobile ? 'text-center px-[50px]' : 'mr-[170px]'}`}
                >
                    Uniting different cultures for a better future with love, harmony and innovation
                </motion.p>
            </motion.div>
        </div>
    );
}

export default OurMissionTitle;
