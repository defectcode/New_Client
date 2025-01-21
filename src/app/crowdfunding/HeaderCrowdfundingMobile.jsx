import React, { useState, useEffect, useRef } from "react";
import FundraisingProgress from './components/Progres';
import Title from './components/Title';
import VideoPlayer from './components/VideoMobile/VideoPlayer';
import Icons from './components/VideoMobile/Icons';
import { images } from './constants/carouselData';
import styles from './style/Header.module.css';  
// import ButonShere from '../../app/Crowdfunding/components/mobile/ButonShere';
import { Header } from "@/components/layouts/main-layout/header/Header";
import ButonShere from "./components/mobile/ButonShere";
import { HeaderTransparent } from "@/components/layouts/main-layout/header/HeaderTransparent";


const HeaderCrowdfundingMobile = () => {
    const currentData = images[0];
    const [isVideoVisible, setIsVideoVisible] = useState(false);
    const containerRef = useRef(null);
    const buttonRef = useRef(null); 
    const [isShareFixed, setIsShareFixed] = useState(false); 

    const handleScreenClick = () => {
        setIsVideoVisible(true);
        document.body.classList.add('overflow-hidden');
    };

    const handleClose = () => {
        setIsVideoVisible(false);
        document.body.classList.remove('overflow-hidden');
        if (document.fullscreenElement) {
            document.exitFullscreen();
        }
    };

    useEffect(() => {
        const updateHeight = () => {
            const viewportHeight = window.innerHeight;
            document.documentElement.style.setProperty('--viewport-height', `${viewportHeight}px`);
        };

        updateHeight();
        window.addEventListener('resize', updateHeight);

        return () => {
            window.removeEventListener('resize', updateHeight);
        };
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                setIsShareFixed(!entry.isIntersecting); 
            },
            { threshold: 0 } 
        );

        if (buttonRef.current) {
            observer.observe(buttonRef.current);
        }

        return () => {
            if (buttonRef.current) {
                observer.unobserve(buttonRef.current);
            }
        };
    }, []);

    return (
        <div>
            {/* <HeaderTransparent /> */}
            <div
            ref={containerRef}
            className={`${styles.header} relative w-auto text-white font-ekMukta overflow-hidden`}
            >
                <div
                    className={`absolute inset-0 w-full h-[100vh] bg-center bg-white bg-no-repeat max-md:w-auto ${isVideoVisible ? 'bg-opacity-50 blur-sm' : ''}`}
                    style={{
                        backgroundImage: `url('/imgs/Crowdfunding/vellovMobileBack.png')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        width: '100vw', 
                        height: '100vh',
                    }}
                ></div>
                <div
                    className="absolute w-full h-[272px] bottom-0 z-20 pointer-events-none"
                    style={{
                    background: 'linear-gradient(to top, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0.5) 20%, rgba(255, 255, 255, 0.01) 100%)',
                    }}
                ></div>
                <div className={`${styles.contentWrapper} relative z-30 h-full flex flex-col justify-end px-5 pb-5`}>
                    <Title title={currentData.title} description={currentData.description} />
                    <FundraisingProgress data={currentData} />
                </div>

                {!isVideoVisible && (
                    <button
                        onClick={handleScreenClick}
                        className={`${styles.playButton} absolute flex items-center justify-center z-40 bg-transparent`}
                        style={{
                            top: '40%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                        }}
                    >
                        <img src="/imgs/pause.svg" alt="Play Video" className="w-[50px] h-[50px]" />
                    </button>
                )}

                {isVideoVisible && (
                    <VideoPlayer
                        videoSrc="https://www.dropbox.com/scl/fi/bqxswhnitds5u6pqcd9wq/Video.mp4?rlkey=v3rni8n6k9xj05ydyxq9f10xk&st=zpz57pts&raw=1"
                        onClose={handleClose}
                    />
                )}

                <Icons handleScreenClick={handleScreenClick} />

                <div ref={buttonRef} className="relative w-full">
                    <ButonShere isShareFixed={isShareFixed} />
                </div>
            </div>
        </div>
    );
};

export default HeaderCrowdfundingMobile;
