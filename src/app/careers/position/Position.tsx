import { Header } from "@/components/layouts/main-layout/header/Header";
import { PAGE_CONTENT } from "./constants/constants";
import Link from "next/link";

interface PositionProps {
  className?: string;
}

export default function Position({ className = "" }: PositionProps) {
  return (
    <div
      className={`font-heebo w-full bg-white leading-[1.4] tracking-[0px] text-neutral-900 ${className}`}
    >
      <Header />
      <section className="bg-neutral-900 text-white py-5 h-[328px]">
        <div className="max-w-[1400px] mx-auto">
          <p className="text-lg text-[#A1A1A1]/40 mb-20">Jobs / Job Details</p>
          <h2 className="text-[34px] mt-4 text-[#F7F7F7]/25 leading-[1]">{PAGE_CONTENT.subtitle}</h2>
          <h1 className="text-[56px] font-bold mt-2 leading-[1] text-[#F7F7F7] w-[950px]">{PAGE_CONTENT.title}</h1>
          
          <div className="relative">
            <div className="absolute top-0 right-0 bg-[#F7F7F7] shadow-lg rounded-[20px] w-[341px] h-[266px] p-5 flex flex-col justify-between text-[#1E1E1E]">
              
              <div className="flex justify-between gap-6">
                <div className="flex flex-col space-y-10">
                  <div className="text-[15px] space-y-4">
                    <p className="text-[#949494]">Location</p>
                    <p className="font-medium">{PAGE_CONTENT.location}</p>
                  </div>
                  <div className="text-[15px] space-y-4">
                    <p className="text-[#949494]">Work Type</p>
                    <p className="font-medium">{PAGE_CONTENT.workType}</p>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-10">
                  <div className="text-[15px] space-y-4">
                    <p className="text-[#949494]">Team</p>
                    <p className="font-medium">{PAGE_CONTENT.team}</p>
                  </div>
                  <div className="text-[15px] space-y-4">
                    <p className="text-[#949494]">Position</p>
                    <p className="font-medium">{PAGE_CONTENT.position}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <Link href='/careers/apply'>
                  <button className="bg-black text-white text-md font-semibold rounded-md w-[261px] h-[48px] mt-4 hover:bg-gray-800 transition-colors">
                      Apply Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-20 max-w-[1400px] mx-auto px-8">
        <h2 className="text-[34px] font-semibold mb-4">About the Role</h2>
        <p className="w-[775px]">{PAGE_CONTENT.aboutRole}</p>
      </section>

      <section className="pt-10 max-w-[1400px] mx-auto px-8">
        <h2 className="text-[34px] font-semibold mb-4">What You'll Do</h2>
        <ul className="list-disc ml-5 w-[775px] space-y-2">
          {PAGE_CONTENT.whatYoullDo.map((task, index) => (
            <li key={index}>{task}</li>
          ))}
        </ul>
      </section>

      <section className="pt-10 max-w-[1400px] mx-auto px-8">
        <h2 className="text-[34px] font-semibold mb-4">What Makes You a Great Fit</h2>
        <ul className="list-disc ml-5 w-[775px] space-y-2">
          {PAGE_CONTENT.greatFit.map((quality, index) => (
            <li key={index}>{quality}</li>
          ))}
        </ul>
      </section>

      <section className="pt-10 max-w-[1400px] mx-auto px-8">
        <h2 className="text-[34px] font-semibold mb-4">Where You'll Be</h2>
        <p>{PAGE_CONTENT.locationDetails}</p>
      </section>

      <section className="pt-10 pb-20 max-w-[1400px] mx-auto px-8">
        <h2 className="text-[34px] font-semibold mb-4">Benefits of Joining Our Team</h2>
        <ul className="list-disc ml-5 space-y-2">
          {PAGE_CONTENT.benefits.map((benefit, index) => (
            <li key={index}>{benefit}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
