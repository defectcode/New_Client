// HeaderSeriesConcept.jsx
import React, { useRef, useState } from "react";
import FundraisingProgress from './components/Progres';
import Title from "./components/Title";
import VideoPlayer from './components/Video/VideoPlayer'; 
import { images } from './constants/carouselData';
import { HeaderTransparent } from "@/components/layouts/main-layout/header/HeaderTransparent";


const HeaderSeriesConcept = () => {
    const currentData = images[0];
    const headerRef = useRef(null);
    const [isVideoVisible, setIsVideoVisible] = useState(false);
    const [isMuted, setIsMuted] = useState(false);

    const handleScreenClick = () => {
        setIsVideoVisible(true);
        document.body.classList.add('overflow-hidden');
    };

    const handleClose = () => {
        setIsVideoVisible(false);
        document.body.classList.remove('overflow-hidden');
    };

    return (
        <div ref={headerRef} className="relative min-h-screen font-heebo">
            <HeaderTransparent />
            <div className="header relative bg-cover bg-center min-h-screen bg-no-repeat bg-mobileConcept sm:bg-desktop">
                <div className="max-w-[1200px] absolute top-0 right-0 h-full w-full md:w-[40%] bg-gradient-to-t from-black/95 via-black/95 to-transparent md:bg-gradient-to-r md:from-[transparent] md:via-[#F9F9F9]/40 md:to-[#F9F9F9]/20 flex items-end sm:items-center justify-center sm:justify-end p-4 sm:p-0 md:pl-[150px]">
                    <div className="flex flex-col md:space-y-20 mb-2 lg:mb-0 ">
                        <Title title={currentData.title} description={currentData.description} />
                        <FundraisingProgress data={currentData} />
                    </div>
                </div>
                
                <button 
                    onClick={handleScreenClick} 
                    className="absolute inset-0 flex items-center justify-center z-20 bg-transparent xl:mr-[550px] lg:mr-[450px] md:mr-[350px]"
                >
                    <img src="/imgs/pause.svg" alt="Play Video" className="w-[100px] h-[100px]" />
                </button>
            </div>

            {isVideoVisible && (
                <VideoPlayer 
                    videoSrc="https://www.dropbox.com/scl/fi/93yq0hsq1ptdb6dlgico4/VideoAtelier.mp4?rlkey=c2zddkgjz05b05x3pi39rkenq&st=lauvesd1&raw=1"  // URL-ul videoclipului Dropbox
                    onClose={handleClose}
                    isMuted={isMuted}
                />
            )}

            <style jsx>{`
                @media (max-width: 640px) {
                    .bg-gradient-to-t {
                        height: 50%; 
                        bottom: 0; 
                        top: auto;
                    }
                }
            `}</style>
        </div>
    );
}

export default HeaderSeriesConcept;




