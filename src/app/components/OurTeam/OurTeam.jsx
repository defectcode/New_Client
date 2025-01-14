import React from "react";
import Carousel from './components/Carousel';


const OurTeam = () => {
    return (
        <div className="h-auto">
            <div className="w-auto h-[520px] lg:h-[854px] lg:pl-[121px] bg-black md:bg-[#0D0D0D]">
                <div className="text-white pt-[9px] md:pt-8 lg:pt-12 gap-2 pl-[20px] lg:pl-0">
                    <h1 className="text-2xl font-semibold font-roboto max-md:absolute" style={{ lineHeight: '105%' }}>Our Team</h1>
                    <p className="w-[306px] lg:w-[266px] text-[16px] font-ekmukta-extralight mt-10 lg:mt-2 max-md:relative" style={{ lineHeight: '120%' }}>
  Creative visionaries united by a passion for storytelling and innovation
</p>

                </div>
                <div className="lg:-ml-[20px] mb-[40px]">
                    <Carousel/>
                </div>
            </div>
        </div>
    );
};

export default OurTeam;
