import React from 'react';
import { images } from './constants/carouselData';

const Title = ({ contentIndex = 0, isMobile, isTablet }) => {
  const content = images[contentIndex];

  if (!content) {
    return null; // Or fallback UI
  }

  return (
    <div className={`space-y-[10px] md:space-y-1 mt-4 ${isMobile ? 'text-center flex flex-col items-center justify-center' : isTablet ? 'mt-14 flex items-center justify-center' : 'mt-1'} w-full`}>
      <h1 className={`text-white font-semibold ${isMobile ? 'text-2xl' : 'text-4xl'} max-md:text-2xl`} style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 600, lineHeight: '105%' }}>
        {content.title}
      </h1>
      <p className={`text-[#FFFFFF] font-ekmukta-extralight ${isMobile ? 'text-[16x] max-[390px]:text-[14px] leading-5 w-[70%] ' : 'w-[336px] text-[16px]'} `} style={{lineHeight: '120%'}}>
        {content.description}
      </p>
    </div>
  );
};

export default Title;
