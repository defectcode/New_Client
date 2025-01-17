import React from 'react';
import { images } from '../constants/carouselData';

const Title = ({ contentIndex = 0 }) => {
  const content = images[contentIndex];

  if (!content) {
    return null;
  }

  return (
    <div className="w-full text-center lg:text-start font-heebo md:space-y-5 space-y-2 md:mb-0 mb-5">
      <h1 className="text-white md:text-[36px] text-[24px] md:font-semibold font-extrabold max-md:text-2xl leading-[1]">
        {content.title}
      </h1>
      <p 
      className="md:text-[#DBDBDB] text-[#FFFFFF] text-[16px] md:font-normal font-light w-full lg:w-[60%] lg:px-0 md:px-1 leading-[1.2]">
        {content.description}
      </p>

    </div>
  );
};

export default Title;
