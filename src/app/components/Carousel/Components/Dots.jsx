import React from 'react';

const Dots = ({ totalImages, currentIndex, isMobile, isTablet, onDotClick }) => {
  let positionClass;

  if (isMobile) {
    positionClass = 'bottom-4';
  } else if (isTablet) {
    positionClass = 'bottom';
  } else {
    positionClass = 'top-[790px]';
  }

  return (
    <div className={`absolute ${positionClass} left-1/2 transform -translate-x-1/2 flex space-x-3`}>
      {Array.from({ length: totalImages }).map((_, index) => (
        <div
          key={index}
          className={`h-2 w-2 rounded-full ${currentIndex === index ? 'bg-white' : 'bg-gray-400'}`}
          onClick={() => onDotClick(index)} 
          style={{ cursor: 'pointer' }}
        ></div>
      ))}
    </div>
  );
};

export default Dots;
