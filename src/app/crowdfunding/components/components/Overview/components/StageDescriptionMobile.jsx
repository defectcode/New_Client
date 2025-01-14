import React from "react";
import { stageDescriptionData } from '../constants/stagerData';
import DetailedStepsMobile from './DetailedStepsMobile';

const StageDescriptionMobile = () => {
    return (
        <div id="overview" className="bg-black px-[20px] w-full flex flex-col items-start lg:items-center mt-5">
            <div>
                <h2 className="text-[24px] text-[#FFFFFF] mb-5 font-ekMukta font-semibold">
                    {stageDescriptionData.stageTitle}
                </h2>
                <p className="text-[#CDCDCD] max-w-[764px] w-full font-ekMukta text-[16px] leading-[1.6]">
                    {stageDescriptionData.stageHistory}
                </p>
                <img 
                    src={stageDescriptionData.imageUrl_1} 
                    alt="Stage Description" 
                    className="mt-5 mb-10 w-full h-auto object-cover"
                />
            </div>
            <div>
                <h2 className="text-[24px] text-[#FFFFFF] font-ekMukta font-semibold mb-5">
                    {stageDescriptionData.fundingTitle}
                </h2>
                <div className="font-ekMukta text-[#CDCDCD] text-[16px] leading-[1.6]">
                    <p className="mb-4">
                        <span className="text-[#FFFFFF] font-semibold text-[16px]">Current Progress:</span> {stageDescriptionData.fundingProgress}
                        <br />
                        <span className="text-[#FFFFFF] font-semibold text-[16px]">Required Amount:</span> {stageDescriptionData.requiredAmount}
                        <br />
                        <span className="text-[#FFFFFF] font-semibold text-[16px]">{stageDescriptionData.monthlyCostsTitle}</span>
                    </p>
                    <ul className="list-disc list-inside list-small ml-5 text-[15px]">
                        {stageDescriptionData.monthlyCosts.map((cost, index) => (
                            <li key={index} className="mb-2">{cost.item}: {cost.cost}</li>
                        ))}
                    </ul>
                    <p className="mt-4">
                        <span className="text-[#FFFFFF] font-semibold text-[16px]">Total Monthly Costs: </span>{stageDescriptionData.totalMonthlyCosts}
                    </p>
                </div>
                <img 
                    src={stageDescriptionData.imageUrl_2} 
                    alt="Stage Description" 
                    className="mt-5 mb-10 w-full h-auto object-cover"
                />
            </div>
            <DetailedStepsMobile />
            <style jsx>{`
                ul.list-small li::marker {
                    font-size: 0.7em; /* Ajustează dimensiunea marker-ului în funcție de preferințe */
                }
            `}</style>
        </div>
    );
};

export default StageDescriptionMobile;
