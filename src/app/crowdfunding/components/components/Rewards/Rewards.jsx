import React, { useState } from 'react';
import { rewards } from './constants/rewardsData';

const Rewards = () => {
  const [selectedReward, setSelectedReward] = useState(rewards[0]);

  return (
    <div className="flex justify-center min-h-screen bg-black">
      <div className="w-full max-w-[1200px] mx-auto">
        <div className="flex">
          <div className="w-1/4 p-4">
            <h2 className="text-white text-lg mb-4">Select Your Reward</h2>
            <ul>
              {rewards.map((reward) => (
                <li
                  key={reward.id}
                  onClick={() => setSelectedReward(reward)}
                  className={`cursor-pointer mb-2 p-2 rounded ${
                    selectedReward.id === reward.id ? 'border-l border-red-500 text-white' : 'text-gray-400'
                  }`}
                >
                  <span className="text-[18px] font-semibold font-ekMukta">{reward.name}</span>
                  <div>
                    <span className="text-[16px] block font-bold text-[#8B8B8C]">{reward.price}</span>
                    <span className="text-[14px] block font-normal text-[#8B8B8C]">{reward.items}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-2/4 p-4 flex justify-center">
            <div className="bg-[#212121] text-white p-6 rounded-lg shadow-md w-full max-w-[350px] h-[300px] text-center flex flex-col justify-between">
              <div>
                <h3 className="text-xl mb-2">{selectedReward.name}</h3>
                <p className="text-sm mb-4">{selectedReward.description}</p>
              </div>
              <button className="bg-[#F5F5F7] text-black py-2 px-6 rounded">Select</button>
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



