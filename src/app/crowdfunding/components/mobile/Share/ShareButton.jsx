import React from "react";
import { RWebShare } from "react-web-share";
import Image from "next/image";



const ShareButton = ({ url }) => {
   

    return (
        <button 
            className="flex-[1] h-[48px] flex items-center justify-center gap-2 text-white bg-[#E8E8ED] border border-[#1E1E1E] rounded-[10px] hover:bg-[#1E1E1E] hover:text-[#1E1E1E] hover:border-black">
            <RWebShare
                data={{
                    url: "https://paradiseproblems.com/costumeatelier",
                    title: "Paradise Problems",
                }}
                onClick={() => console.log("shared successfully!")}
                >
                <button className="flex items-center gap-[6px] font-avenir-heavy text-[16px] text-[#1E1E1E]">
                    Share
                    <Image src='/imgs/Crowdfunding/shares.svg' width={15} height={15} alt="heart" className="w-[14px] h-[12px] mb-[2px] text-[#1E1E1E]" />
                </button>
            </RWebShare>
        </button>    
    );
};

export default ShareButton;

