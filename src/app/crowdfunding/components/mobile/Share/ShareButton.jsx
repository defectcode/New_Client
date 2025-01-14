import React from "react";
import { RWebShare } from "react-web-share";
import Image from "next/image";



const ShareButton = ({ url }) => {
   

    return (
        <button 
            className="flex-[1] h-[40px] flex items-center justify-center gap-2 text-white bg-black border border-white rounded-[8px] hover:bg-white hover:text-[#1E1E1E] hover:border-black">
            <RWebShare
                data={{
                    url: "https://paradiseproblems.com/costumeatelier",
                    title: "Paradise Problems",
                }}
                onClick={() => console.log("shared successfully!")}
                >
                <button className="flex items-center gap-[6px] font-avenir-heavy text-[15px]">
                    Share
                    <Image src='/imgs/Crowdfunding/Share.svg' width={13} height={11} alt="heart" className="w-[14px] h-[12px] mb-[2px]" />
                </button>
            </RWebShare>
        </button>    
    );
};

export default ShareButton;

