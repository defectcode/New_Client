'use client'
import { useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
const DynamicVideoPlayer = dynamic(() => import('./VideoPlayer'), { ssr: false });

const Icons = ({ isMuted, toggleMute }) => {
  const [isVideoVisible, setIsVideoVisible] = useState(false);

  const handleScreenClick = () => {
    setIsVideoVisible(true);  // Arată videoul
    document.body.classList.add('overflow-hidden');
  };

  const handleClose = () => {
    setIsVideoVisible(false);
    document.body.classList.remove('overflow-hidden');
  };

  return (
    <div className='max-lg:absolute max-lg:top-10 max-lg:right-5 max-md:mt-6 max-md:mr-4 lg:mt-0 flex justify-end lg:justify-start gap-5 max-md:gap-2'>
      <button onClick={toggleMute} className='w-auto h-5 items-center relative'>
        <Image src={isMuted ? "/imgs/muted.svg" : "/imgs/sound.svg"} width={20} height={20} alt='volume' className='w-auto h-10 items-center max-md:h-6' />
        {isMuted}
      </button>
      <button onClick={handleScreenClick} className='w-auto h-5 items-center'>
        <Image src="/imgs/screen.svg" width={30} height={30} alt='screenSize' className='w-auto h-10 items-center max-md:h-6' />
      </button>
      {isVideoVisible && (
        <DynamicVideoPlayer
          videoId="IRsFc2gguEg"
          onClose={handleClose}
          isMuted={isMuted}
        />
      )}
    </div>
  );
};

export default Icons;
