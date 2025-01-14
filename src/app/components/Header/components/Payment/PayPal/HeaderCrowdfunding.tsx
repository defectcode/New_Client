import React, { useRef } from "react";
import FundraisingProgress from "@/app/crowdfunding/components/Progres";
import { images } from "@/app/crowdfunding/constants/carouselData";

const HeaderCrowdfunding = () => {
    const currentData = images[0];
    const headerRef = useRef(null); 

    return (
        <div ref={headerRef}>
            <div className="header relative bg-cover bg-center min-h-screen bg-no-repeat bg-mobile sm:bg-desktop">
                <div className="max-w-[1200px] absolute top-0 right-0 h-full w-full sm:w-[60%] bg-gradient-to-t from-black/95 via-black/95 to-transparent sm:bg-gradient-to-r sm:from-transparent sm:via-black/90 sm:to-black/90 flex items-end sm:items-center justify-center sm:justify-end p-4 sm:p-0 lg:pl-[150px]">
                    <div className="flex flex-col gap-4 sm:gap-20 mb-2 lg:mb-0">
                        {/* <Title title={currentData.title} description={currentData.description} /> */}
                        <FundraisingProgress data={currentData} />
                    </div>
                </div>
            </div>
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

export default HeaderCrowdfunding;
