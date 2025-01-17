import React, { useState } from 'react';
import { rewards } from './constants/rewardsData';

const Rewards = () => {
  const [selectedReward, setSelectedReward] = useState(rewards[0]);

  return (
    <div className="flex justify-center min-h-screen font-heebo">
      <div className="w-full max-w-[1200px] mx-auto">
        <div className="flex items-center justify-between mb-5 mt-[30px]">
              <h2 className="text-[#1E1E1E] font-bold text-[24px] whitespace-nowrap mr-4">
                Select Your Reward
              </h2>
              <div className="flex-grow h-[1px] max-w-[64%] w-full bg-gradient-to-r from-[#272727] to-[#8D8D8D]" />
              </div>
        <div className="flex mt-5">

          <div className="w-1/4 py-5">

            <ul>
              {rewards.map((reward) => (
                <li
                  key={reward.id}
                  onClick={() => setSelectedReward(reward)}
                  className={`cursor-pointer mb-2 p-2 ${
                    selectedReward.id === reward.id ? 'border-l-2 border-[#1E1E1E] text-[#1E1E1E]' : 'text-[#1E1E1E]'
                  }`}
                >
                  <span className="text-[18px] font-semibold">{reward.name}</span>
                  <div className='flex items-center gap-1'>
                    <span className="text-[16px] block font-bold text-[#6F6F6F]">{reward.price}</span>
                    <span className="text-[14px] block font-normal text-[#6F6F6F]">{reward.items}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-2/4 p-4 flex justify-center">
            <div className="bg-[#E8E8ED] text-white p-5 rounded-lg shadow-md w-full max-w-[350px] h-[300px] flex flex-col justify-between">
              <div className='space-y-5'>
                <p className='text-[#6F6F6F] font-extrabold text-[20px]'>{selectedReward.price}</p>
                <h3 className="text-[24px] text-[#1E1E1E] font-bold">{selectedReward.name}</h3>
                <p className="text-[18px] text-[#6F6F6F] mb-4">{selectedReward.description}</p>
              </div>
              <span className="text-[14px] block font-normal text-[#6F6F6F]">{selectedReward.items}</span>
              <button className="bg-[#F5F5F7] text-black py-2 px-6 rounded-[10px]">Select</button>
            </div>
          </div>

          <div className="w-1/4 p-4">
            <h4 className="text-white text-lg mb-4">Includes</h4>
            <ul className="text-gray-400 list-disc list-inside">
              {selectedReward.includes.map((item, index) => (
                <li key={index} className="mb-2">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rewards;



