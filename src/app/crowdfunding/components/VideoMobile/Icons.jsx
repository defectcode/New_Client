// Icons.jsx
import { useState } from 'react';
import Image from 'next/image';

const Icons = ({ isMuted, setIsMuted, handleScreenClick }) => {
    const handleVolumeToggle = () => {
        setIsMuted(prev => !prev);
    };

    return (
        <div className='max-lg:absolute max-lg:top-10 max-lg:right-5 mt-20 lg:mt-0 flex justify-end lg:justify-start gap-3'>
            <button onClick={handleVolumeToggle} className='w-auto h-10 items-center relative'>
                {/* <Image src={isMuted ? "/imgs/muted.svg" : "/imgs/sound.svg"} width={30} height={30} alt='volume' className='w-auto h-10 items-center' />
                {isMuted && <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>} */}
            </button>
            <button onClick={handleScreenClick} className='w-auto h-10 items-center relative'>
                {/* <Image src="/imgs/play.svg" width={30} height={30} alt='play' className='w-auto h-10 items-center' /> */}
            </button>
        </div>
    );
};


export default Icons;
