import React, { useState } from "react";
import { useSwipeable } from "react-swipeable";
import { rewards } from "./constants/rewardsData";
import Modal from "@/app/checkout/components/order/ModalPayPal";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from '@stripe/stripe-js';
import SupportForm from "@/app/components/Header/components/Payment/SupportForm";
import SupportFormCrowdfunding from "@/app/components/Header/components/Payment/SupportFormCrowdfunding";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const RewardsMobile = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReward, setSelectedReward] = useState(null); 

  const cardWidth = 80; 
  const gapWidth = 5; 

  const handleSwipeLeft = () => {
    if (currentIndex < rewards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleSwipeRight = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handlers = useSwipeable({
    onSwipedLeft: handleSwipeLeft,
    onSwipedRight: handleSwipeRight,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <div className="flex flex-col items-center h-auto font-heebo py-6">
      <h2 className="text-[24px] font-bold text-[#1E1E1E] mb-5 mt-10">Select Your Reward</h2>

      <div
        {...handlers}
        className="relative w-full overflow-hidden"
        style={{ padding: `0 ${gapWidth}%` }}
      >
        <div
          className="flex transition-transform duration-500"
          style={{
            transform: `translateX(calc(-${currentIndex} * (${cardWidth}% + ${gapWidth}%) + ${
              (100 - cardWidth) / 2
            }%))`,
            gap: `${gapWidth}%`, 
          }}
        >
          {rewards.map((reward, index) => (
            <div
              key={reward.id}
              className={`flex-shrink-0 w-[${cardWidth}%] min-h-[270px] h-auto bg-[#E8E8ED] rounded-[10px] flex flex-col items-center justify-between shadow-md p-5 ${
                index === currentIndex ? "border-transparent" : ""
              } transition-transform duration-300`}
              style={{
                opacity: index === currentIndex ? 1 : 0.6,
              }}
            >
              <div className="w-full">
                <p className="text-[#8B8B8C] font-bold text-lg">{reward.price}</p>
                <h3 className="text-[24px] font-bold text-[#1E1E1E] mt-[10px]">{reward.name}</h3>
                <p className="text-[#6F6F6F] text-[16px] mt-[10px]">{reward.description}</p>
                <p className="text-[#6F6F6F] text-[16px] mt-[5px]">Includes</p>
                <ul className="text-gray-500 text-[15px] mt-1">
                  {reward.includes.map((item, i) => (
                      <li
                          key={i}
                          className={`flex items-center relative py-5 ${
                              i !== reward.includes.length - 1 ? "after:border-gradient" : ""
                          }`}
                      >
                      <span className="w-4 h-4 text-[#6F6F6F] rounded-full flex items-center justify-center mr-2">
                          ✔
                      </span>
                          {item}                
                          {i !== reward.includes.length - 1 && (
                              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-[#272727] to-[#8D8D8D]" />
                          )}
                      </li>
                  ))}
                </ul>
              </div>
              <button
                onClick={() => {
                  setSelectedReward(reward); 
                  openModal(); 
                }}
                className="w-full bg-[#F5F5F7] text-[#0D0D0D] text-[16px] h-[48px] font-semibold py-2 px-4 rounded-md mt-5"
              >
                Select
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full h-[40px] bg-[#E8E8ED] mt-5 flex items-center justify-center text-[#979797] text-[14px] font-ekMukta">
        20 rewards
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <Elements stripe={stripePromise}>
          {selectedReward && (
            <SupportFormCrowdfunding
              selectedRewardName={selectedReward.name}
              selectedRewardPrice={selectedReward.price}
              initialAmount={Number(
                selectedReward.price.replace('$', '').replace(/,/g, '')
              ).toLocaleString('en-US')}
            />          
          )}
        </Elements>
      </Modal>
    </div>
  );
};

export default RewardsMobile;
