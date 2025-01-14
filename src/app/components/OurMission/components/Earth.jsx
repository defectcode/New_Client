'use client'
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

const Earth = () => {
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
            className={`relative h-[115px] w-full flex flex-col items-center justify-center ${isMobile ? 'bg-black' : ''}`}
            ref={ref}
            style={{
                backgroundImage: isMobile ? 'none' : "none",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                // lineHeight: '120%',
            }}
        >
            <motion.div 
                className="flex flex-col items-center justify-center text-center md:mt-0"
            >
                <motion.h1
                    className="text-[24px] lg:text-[36px] text-white mb-[10px] lg:mb-[10px]"
                    style={{ fontFamily: 'Robotom, sans-serif', fontWeight: 600, lineHeight: '105%' }}
                >
                    Our Mission
                </motion.h1>
                <motion.p
                className="text-[16px] w-full text-white px-[30px] md:mt-0 font-ekmukta-extralight"
                style={{ lineHeight: '120%' }}
                >
                Uniting different cultures for a better future <br />
                <span style={{ display: 'block' }}>with love, harmony and innovation</span>
                </motion.p>
            </motion.div>
        </div>
    );
}

export default Earth;
