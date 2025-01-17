import React from "react";
import { stageDescriptionData } from '../constants/stagerData';
import DetailedStepsMobile from './DetailedStepsMobile';

const StageDescriptionMobile = () => {
    return (
        <div id="overview" className="bg-[#F9F9F9] px-[20px] w-full flex flex-col items-start lg:items-center font-heebo">
            <div>
                <h2 className="text-[24px] text-[#1E1E1E] mb-5 font-semibold mt-10">
                    {stageDescriptionData.stageTitle}
                </h2>
                <p className="text-[#6F6F6F] w-full text-[16px] leading-[1.6]">
                    {stageDescriptionData.stageHistory}
                </p>
                <img 
                    src={stageDescriptionData.imageUrl_1} 
                    alt="Stage Description" 
                    className="mt-5 mb-10 w-full h-auto object-cover rounded-[20px]"
                />
            </div>
            <div>
                <h2 className="text-[24px] text-[#1E1E1E] font-semibold mb-5">
                    {stageDescriptionData.fundingTitle}
                </h2>
                <div className="font-ekMukta text-[#6F6F6F] text-[16px] leading-[1.6]">
                    <p className="mb-4">
                        <span className="text-[#1E1E1E] font-semibold text-[16px]">Current Progress:</span> {stageDescriptionData.fundingProgress}
                        <br />
                        <span className="text-[#1E1E1E] font-semibold text-[16px]">Required Amount:</span> {stageDescriptionData.requiredAmount}
                        <br />
                        <span className="text-[#1E1E1E] font-semibold text-[16px]">{stageDescriptionData.monthlyCostsTitle}</span>
                    </p>
                    <ul className="list-disc list-inside list-small ml-5 text-[15px]">
                        {stageDescriptionData.monthlyCosts.map((cost, index) => (
                            <li key={index} className="mb-2">{cost.item}: {cost.cost}</li>
                        ))}
                    </ul>
                    <p className="mt-4">
                        <span className="text-[#1E1E1E] font-semibold text-[16px]">Total Monthly Costs: </span>{stageDescriptionData.totalMonthlyCosts}
                    </p>
                </div>
                <img 
                    src={stageDescriptionData.imageUrl_2} 
                    alt="Stage Description" 
                    className="mt-5 mb-10 w-full h-auto object-cover"
                />
            </div>
            {/* <DetailedStepsMobile /> */}
            <style jsx>{`
                ul.list-small li::marker {
                    font-size: 0.7em; /* Ajustează dimensiunea marker-ului în funcție de preferințe */
                }
            `}</style>
        </div>
    );
};

export default StageDescriptionMobile;
