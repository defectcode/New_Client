import React from 'react';
import Button from './Button';
import { images } from './constants/carouselData';
import Image from 'next/image';
import styles from './style/Progres.module.css';

const FundraisingProgress = ({ raisedAmount, goalAmount, contentIndex = 0 }) => {
  const content = images[contentIndex];

  // Asigură-te că valorile sunt string-uri înainte de curățare
  const cleanGoalAmount = parseFloat(content.goalAmount.toString().replace(/,/g, '').replace(/\./g, ''));
  const cleanRaisedAmount = parseFloat(content.raisedAmount.toString().replace(/,/g, '').replace(/\./g, ''));

  // Calculul procentului după curățare
  const rawProgressPercent = (cleanRaisedAmount / cleanGoalAmount) * 100;

  // Logică pentru rotunjirea procentului
  let progressPercent;
  if (rawProgressPercent > 1) {
    progressPercent = Math.round(rawProgressPercent);
  } else if (rawProgressPercent > 0) {
    progressPercent = rawProgressPercent.toFixed(1); 
  } else {
    progressPercent = 0; 
  }

  return (
    <div className="text-white flex flex-col justify-end h-full md:h-auto mb-[30px]">
      <div>
        <div className={styles.titleConcept} style={{lineHeight: '105%'}}>
          {content.titleConcept}
        </div>
      </div>

      <div className="flex justify-between w-full lg:w-[346px] -mb-[6px] lg:mb-0">
        {content.status === 'Next' ? (
          <span className="text-[20px] lg:text-2xl font-ekmukta font-bold text-[#FFFFFF]" style={{lineHeight: '105%'}}>Next Fundraising</span>
        ) : (
          <span className="text-[20px] lg:text-2xl font-ekmukta font-bold mb-2 md:mb-0 text-[#FFFFFF]" style={{lineHeight: '105%'}}>${content.raisedAmount}</span>
        )}
        <span className="text-[13px] block font-avenir font-light text-[#C1C1C1] mb-2 md:mb-0" style={{lineHeight: '105%'}}>
          {content.stageLabel} <span className="text-[#FFFFFF] font-semibold font-avenir">{content.stageNumber}</span>
        </span>
      </div>
      
      <div className="relative w-auto lg:w-[380px] mt-2">
        <div className="h-1 bg-[#6F6F6F] rounded-full w-full lg:w-[346px]">
          {content.status === 'Next' ? (
            <div className="h-full rounded-full bg-gradient-to-r from-[#E50815] via-[#E50815] to-white" style={{ width: `0%` }}></div>
          ) : (
            <div className="h-full rounded-full bg-gradient-to-r from-[#E50815] via-[#E50815] to-white" style={{ width: `${progressPercent}%` }}></div>
          )}
        </div>
        {content.status !== 'Next' && (
          <div
            className="absolute top-0 -translate-y-1/2 transform mt-[2px] ml-[1px] lg:ml-0"
            style={{ left: `calc(${progressPercent}% - 3px)` }}
          >
            <div className="w-[6px] h-[6px] lg:w-[10px] lg:h-[10px] rounded-full bg-white"></div>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center w-full lg:w-[346px] mt-2 mb-2 lg:mb-0">
        <div className="flex items-center text-[14px] sm:text-[15px] mt-[-8px] md:mt-0">
          {content.status === 'Next' ? (
            <p className="text-[#C1C1C1] text-[15px] max-lg:text-md max-sm:text-[12px] max-md:p-0 max-md:-mt-1 font-ekMukta">
              This stage is now closed
            </p>
          ) : (
            <>
              <span className="font-semibold font-ekMukta text-[15px] tracking-tight">
                {progressPercent === 0 ? (
                  <>
                    <span className="text-[15px]">0</span>
                    <span className="text-[13px]">%</span>
                  </>
                ) : (
                  <>
                    <span className="text-[15px]">{progressPercent}</span>
                    <span className="text-[13px]">%</span>
                  </>
                )}
              </span>
              <span className="text-[#C1C1C1] font-ekmukta text-[12px] tracking-tight ml-1">
                raised of ${content.goalAmount} goal
              </span>
            </>
          )}
        </div>
        {content.status !== 'Next' && (
          <div className="flex justify-between items-center space-x-[2px] text-[14px] sm:text-[15px]">
            <span className="font-semibold font-ekMukta text-[15px] lg:text-[20px] tracking-tight">
              {content.supportersCount}
            </span>
            <span className="text-[#C1C1C1] font-ekMukta text-[12px] tracking-tight">
              {content.supportersLabel}
            </span>
          </div>
        )}
      </div>

      {content.status === 'Process' ? (
        <Button link={content.link} />  // Pass the link prop to the Button component
      ) : (
        ""
      )}
    </div>
  );
};

export default FundraisingProgress;
