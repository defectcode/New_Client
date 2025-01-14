'use client'
import { useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import DynamicVideoPlayer from '../DynamicVideoPlayer'

const Icons = () => {
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const handleScreenClick = () => {
    setIsVideoVisible(!isVideoVisible);  // Toggle visibility
    document.body.classList.toggle('overflow-hidden');
  };

  const handleClose = () => {
    setIsVideoVisible(false);
    document.body.classList.remove('overflow-hidden');
  };

  const handleVolumeToggle = () => {
    setIsMuted(prev => !prev);
  };

  return (
    <div className='max-lg:absolute max-lg:top-10 max-lg:right-5 mt-20 lg:mt-0 flex justify-end lg:justify-start gap-3'>
      <button onClick={handleVolumeToggle} className='w-auto h-10 items-center relative'>
        <Image src={isMuted ? "/imgs/muted.svg" : "/imgs/sound.svg"} width={30} height={30} alt='volume' className='w-auto h-10 items-center' />
        {isMuted && <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>}
      </button>
    </div>
  );
};

export default Icons;
