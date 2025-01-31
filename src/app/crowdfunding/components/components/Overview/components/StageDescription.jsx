import React from "react";
import { stageDescriptionData, stageDescription } from '../constants/stagerData';
import DetailedSteps from "./DetailedSteps";

const StageDescription = () => {
    return (
        <div id="overview" className="w-full flex flex-col items-start font-heebo">
            <div>
                <h2 className="text-[24px] text-[#1E1E1E] font-semibold mt-10 mb-4">
                    {stageDescriptionData.stageTitle}
                </h2>
                <p className="text-[#6F6F6F] text-[16px] max-w-[664px] w-auto">
                    {stageDescriptionData.stageHistory}
                </p>
                <img 
                    src={stageDescriptionData.imageUrl_1} 
                    alt="Stage Description" 
                    className="mt-10" 
                    style={{ width: '624px', height: '624px', objectFit: 'cover' }}
                />
            </div>
            <div className="mt-10">
                <h2 className="text-[24px] text-[#1E1E1E] font-semibold">
                    {stageDescriptionData.fundingTitle}
                </h2>
                <div className="text-[#6F6F6F] text-[16px]">
                    <p className="mt-4 w-[670px]">
                        {stageDescriptionData.fundingProgress}
                        <br />
                        {stageDescriptionData.requiredAmount}
                        <br />
                        {stageDescriptionData.monthlyCostsTitle}
                    </p>
                    <ul className="list-disc list-inside list-small ml-2">
                        {stageDescriptionData.monthlyCosts.map((cost, index) => (
                            <li key={index}>{cost.item}: {cost.cost}</li>
                        ))}
                    </ul>
                    <p className="mt-4">
                        {stageDescriptionData.totalMonthlyCosts}
                    </p>
                </div>
                <img 
                    src={stageDescriptionData.imageUrl_2} 
                    alt="Stage Description" 
                    className="mt-10 ml-5" 
                    style={{ width: '624px', height: '624px', objectFit: 'cover' }}
                />
            </div>
            {/* <DetailedSteps/> */}
            <style jsx>{`
                ul.list-small li::marker {
                    font-size: 0.7em; /* Ajustează dimensiunea după cum este necesar */
                }
            `}</style>
        </div>
    )
}

export default StageDescription;
