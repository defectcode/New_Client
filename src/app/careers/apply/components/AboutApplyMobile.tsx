import { useState } from "react";
import { POSITION_DATA } from "../constants/constants";
import { Link } from "lucide-react";

interface AboutApplyProps {
    selectedPositions: string[];
    position: any;
  }
  
  export default function AboutApplyMobile({ selectedPositions, position }: AboutApplyProps) {
    return (
<section className="bg-neutral-900 py-5 relative h-[286px]">
      <h2 className="text-[24px] px-5 text-[#F7F7F7]/25 leading-[1] mt-10 mb-[10px]">{position.subtitle}</h2>
      <h1 className="text-[32px] px-5 pb-10 font-bold mt-2 leading-[1] text-[#F7F7F7] w-[360px]">{position.title}</h1>
        
        {/* Job Details - Overlapping Section */}
        <div className="absolute bottom-[-70px] left-1/2 transform -translate-x-1/2 w-[90%] bg-[#F7F7F7] px-5 py-5 shadow-md rounded-lg h-[152px]">
        <div className="flex items-center justify-between gap-10">
            <div className="flex flex-col gap-2 space-y-10">
              <div>
                <p className="text-gray-500 text-xs">Position</p>
                <p className="text-sm font-medium">{position.position}</p> 
              </div>
              <div>
                <p className="text-gray-500 text-xs">Location</p>
                <p className="text-sm font-medium">{position.location}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2 space-y-10">
              <div>
                <p className="text-gray-500 text-xs">Team</p>
                <p className="text-sm font-medium">{position.team}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs">Work Type</p>
                <p className="text-sm font-medium">{position.workType}</p>
              </div>
            </div>
          </div>
          
        </div>
      </section>
    );
  }
  