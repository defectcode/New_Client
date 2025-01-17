import React from "react";
import { stageDescription, stageDescriptionData } from '../constants/stagerData';

const DetailedSteps = () => {
    const images = [
        stageDescriptionData.imageUrl_3,
        stageDescriptionData.imageUrl_4,
        stageDescriptionData.imageUrl_5,
        stageDescriptionData.imageUrl_6,
        stageDescriptionData.imageUrl_7,
        stageDescriptionData.imageUrl_8,
    ];

    return (
        <div>
            <div className="mt-10 font-heebo">
                <h2 className="text-[26px] text-[#FFFFFF] font-semibold">Detailed Steps</h2>
                <div className="text-[#CDCDCD] mt-4">
                    {stageDescription.detailedSteps.map((step, index) => (
                        <div key={index} className="mt-6">
                            <h3 className="text-xl text-[#E60716] font-semibold">
                                {index + 1}.  {step.title}
                            </h3>
                            <ul className="list-disc list-inside list-small ml-2 w-[484px]">
                                {step.items.map((item, idx) => (
                                    <li key={idx}>
                                        <span className="font-bold text-[#FFFFFF] text-[16px]">{item.item}:</span> <span className="text-[#CDCDCD] text-[16px] font-ekMukta">{item.cost}</span>
                                    </li>
                                ))}
                            </ul>
                            {/* Imaginea corespunzătoare fiecărui pas */}
                            {images[index] && (
                                <img 
                                    src={images[index]} 
                                    alt={`Stage Description ${index + 1}`} 
                                    className="mt-6 ml-10"
                                    style={{ width: '624px', height: '624px', objectFit: 'cover' }} // Lățime și înălțime specifice
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <div className="my-10">
                <h2 className="text-[#FFFFFF] font-semibold text-[26px]">{stageDescription.helpTitle}</h2>
                <p className="text-[#CDCDCD] w-[764px] text-[16px]">{stageDescription.helpInfo}</p>
                <img 
                    src={stageDescriptionData.imageUrl_8} 
                    alt="Stage Description" 
                    className="mt-10 ml-5" 
                    style={{ width: '624px', height: '624px', objectFit: 'cover' }}
                />
            </div>
            <style jsx>{`
                ul.list-small li::marker {
                    font-size: 0.7em; /* Ajustează dimensiunea după cum este necesar */
                }
            `}</style>
        </div>
    )
}

export default DetailedSteps;
