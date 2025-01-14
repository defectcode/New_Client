import React, { useState, useEffect, useRef } from 'react';
import { FaTiktok, FaInstagram, FaFacebook } from 'react-icons/fa';
import Image from 'next/image';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { motion } from 'framer-motion'; // Import Framer Motion
import { teamMembers } from '../constants/teamMembers';

const Carousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [windowWidth, setWindowWidth] = useState(0);
    const containerRef = useRef(null);
    const touchPosition = useRef(null);

    const updateWindowWidth = () => {
        setWindowWidth(window.innerWidth);
    };

    useEffect(() => {
        updateWindowWidth();
        window.addEventListener('resize', updateWindowWidth);
        return () => window.removeEventListener('resize', updateWindowWidth);
    }, []);

    const slideDimensions = () => {
        if (windowWidth >= 1024) {
            return { width: 382, height: 547 }; // Desktop dimensions
        } else {
            return { width: 268, height: 378 }; // Mobile dimensions
        }
    };

    const { width: slideWidth, height: slideHeight } = slideDimensions();

    const calculateVisibleSlides = () => {
        if (windowWidth < 416) return 1.5;
        if (windowWidth < 768) return 2.5;
        if (windowWidth < 1024) return 3.5;
        return 5;
    };

    const visibleSlides = calculateVisibleSlides();
    const containerWidth = visibleSlides * slideWidth;

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % teamMembers.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + teamMembers.length) % teamMembers.length);
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    const handleTouchStart = (e) => {
        touchPosition.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e) => {
        if (!touchPosition.current) return;

        const currentTouch = e.changedTouches[0].clientX;
        const diff = touchPosition.current - currentTouch;

        if (diff > 50) {
            nextSlide();
        } else if (diff < -50) {
            prevSlide();
        }

        touchPosition.current = null;
    };

    return (
        <div className="relative w-full mt-4 mb-10 lg:my-10">
            <div className="flex items-center">
                <div
                    ref={containerRef}
                    className="overflow-hidden relative mx-5"
                    style={{ width: containerWidth, cursor: 'grab' }}
                >
                    <motion.div
                        className="flex"
                        initial={false}
                        animate={{ x: `-${currentIndex * (slideWidth - 10)}px` }} // Adjust for partial slide visibility
                        transition={{ type: 'spring', stiffness: 100, damping: 20 }} // Smooth animation
                        onTouchStart={handleTouchStart}
                        onTouchEnd={handleTouchEnd}
                    >
                        {teamMembers.map((member, index) => (
                            <motion.div
                                key={index}
                                className="relative flex-shrink-0 mr-[10px] group overflow-hidden rounded-b-xl"
                                style={{
                                    width: slideWidth,
                                    height: slideHeight,
                                    marginRight: index === teamMembers.length - 1 ? '0px' : '10px', // Adjust margin for last item
                                }}
                                onClick={() => goToSlide(index)}
                            >
                                <Image 
                                    src={member.image} 
                                    alt={member.name} 
                                    className="rounded-xl w-full h-full object-cover" 
                                    width={slideWidth} 
                                    height={slideHeight} 
                                />
                                {/* Improved gradient and blur layer with smooth transition */}
                                <div
                                    className="absolute inset-x-0 bottom-0"
                                    style={{
                                        background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 100%)',
                                        height: '160px',
                                    }}
                                ></div>
                                
                                <div className="absolute inset-0 flex items-end justify-center px-5 py-6 lg:px-10">
                                    <div className="flex items-center justify-between w-full">
                                        <div className="text-[#FFFEFE] gap-2">
                                            <h3 className="text-[18px] font-ekmukta-medium">{member.name}</h3>
                                            <p className="text-[14px] text-[#C1C1C1] font-ekmukta">{member.role}</p>
                                        </div>
                                        <div className="flex space-x-4 items-center">
                                            {member.social.tiktok && (
                                                <a href={member.social.tiktok} className="text-white">
                                                    <Image src='/imgs/OurTeam/tiktok.png' alt='facebook' height={22} width={19} />
                                                </a>
                                            )}
                                            {member.social.instagram && (
                                                <a href={member.social.instagram} className="text-white">
                                                    <Image src='/imgs/OurTeam/instagram.png' alt='facebook' height={20} width={20} />
                                                    </a>
                                            )}
                                            {member.social.facebook && (
                                                <a href={member.social.facebook} className="text-white">
                                                    <Image src='/imgs/OurTeam/facebook.png' alt='facebook' height={21} width={12} />
                                                    </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
            {windowWidth >= 1024 && (
                <div className="flex justify-between mt-5 px-4">
                    <div className="flex items-center">
                        {teamMembers.map((_, index) => (
                            <div
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`w-2 h-2 rounded-full mx-1 cursor-pointer ${index === currentIndex ? 'bg-white' : 'bg-gray-500'}`}
                            />
                        ))}
                    </div>
                    <div className="flex items-center space-x-4 lg:mr-10">
                        <div className="bg-[#636365] p-1 lg:p-2 rounded-full">
                            <IoIosArrowBack className="text-white cursor-pointer" onClick={prevSlide} />
                        </div>
                        <div className="bg-[#636365] p-1 lg:p-2 rounded-full">
                            <IoIosArrowForward className="text-white cursor-pointer" onClick={nextSlide} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Carousel;
