import React from "react";
import { stageDescriptionData, stageDescription } from '../constants/stagerData';

const DetailedStepsMobile = () => {
    const images = [
        stageDescriptionData.imageUrl_3,
        stageDescriptionData.imageUrl_4,
        stageDescriptionData.imageUrl_5,
        // stageDescriptionData.imageUrl_6,
        stageDescriptionData.imageUrl_7,
        stageDescriptionData.imageUrl_8,
    ];

    return (
        <div className="">
            <div className="">
                <h2 className="text-[24px] text-[#FFFFFF] font-ekMukta font-semibold">Detailed Steps</h2>
                <div className="font-ekMukta text-[#CDCDCD] mt-5">
                    {stageDescription.detailedSteps.map((step, index) => (
                        <div key={index} className={index !== 0 ? 'mt-10' : ''}>
                            <h3 className="text-[18px] text-[#E60716] mb-[10px]">
                                {index + 1}. {step.title}
                            </h3>
                            <ul className="list-disc list-inside list-small">
                                {step.items.map((item, idx) => (
                                    <li key={idx} className="my-2"> {/* Adăugat mb-[10px] pentru spațiu între elemente */}
                                        <span className="font-bold text-[#FFFFFF] text-[16px]">{item.item}:</span> <span className="text-[#CDCDCD] text-[16px]">{item.cost}</span>
                                    </li>
                                ))}
                            </ul>
                            {/* Imaginea corespunzătoare fiecărui pas */}
                            {images[index] && (
                                <img 
                                    src={images[index]} 
                                    alt={`Stage Description ${index + 1}`} 
                                    className="mt-5 w-full h-auto"
                                    style={{ objectFit: 'cover' }}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <div className="mt-10">
                <h2 className="text-[#FFFFFF] font-ekMukta font-semibold text-[26px]">{stageDescription.helpTitle}</h2>
                <p className="text-[#CDCDCD] w-full text-[16px] mt-5">{stageDescription.helpInfo}</p>
                <img 
                    src={stageDescriptionData.imageUrl_8} 
                    alt="Stage Description" 
                    className="mt-5 w-full h-auto"
                    style={{ objectFit: 'cover' }}
                />
            </div>
            <style jsx>{`
                ul.list-small li::marker {
                    font-size: 0.5em; /* Ajustează dimensiunea marker-ului */
                }
            `}</style>
        </div>
    )
}

export default DetailedStepsMobile;
