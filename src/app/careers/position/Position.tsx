'use client';
import { Header } from "@/components/layouts/main-layout/header/Header";
import { JOB_LISTINGS, PAGE_CONTENT } from "./constants/constants";
import Link from "next/link";
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from "react";
import MobilePosition from "../components/MobilePosition";

interface PositionProps {
  className?: string;
}

export default function Position({ className = "" }: PositionProps) {
  const searchParams = useSearchParams();
  const id = searchParams?.get('id') ? Number(searchParams.get('id')) : null;
  const job = id ? JOB_LISTINGS.find((job) => job.id === id) : null;
  const pageContent = id ? PAGE_CONTENT.find((content) => content.id === id) : null;
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() =>  {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [])

  if (!job || !pageContent) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl text-red-600">Job not found!</h1>
        <Link href="/careers">
          <button className="mt-4 px-4 py-2 bg-gray-700 text-white rounded-md">
            ← Back to Careers
          </button>
        </Link>
      </div>
    );
  }

  if (isMobile) {
    return <MobilePosition />;
  }


  return (
    <div className={`font-heebo w-full bg-white leading-[1.4] tracking-[0px] text-neutral-900 ${className}`}>
      <Header />
      <section className="bg-neutral-900 text-white py-5 h-[328px]">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="md:text-[34px] text-[24px] md:px-0 px-5 text-[#F7F7F7]/25 leading-[1] mt-[80px] mb-5">{pageContent.subtitle}</h2>
          <h1 className="md:text-[56px] text-[32px] md:px-0 px-5 md:pb-0 pb-10 font-bold mt-2 leading-[1] text-[#F7F7F7] md:w-[950px] w-full">{pageContent.title}</h1>
          <div className="relative">
            <div
              className="fixed top-30 right-[20%] z-50 bg-[#F7F7F7] shadow-lg rounded-[20px] md:w-[341px] w-[300px] md:h-[266px] h-[152px] p-5 flex flex-col justify-between text-[#1E1E1E]"
            >
              <div className="flex justify-between gap-6">
                <div className="flex flex-col space-y-10">
                  <div className="text-[15px] space-y-4">
                    <p className="text-[#949494]">Location</p>
                    <p className="font-medium">{job.location}</p>
                  </div>
                  <div className="text-[15px] space-y-4">
                    <p className="text-[#949494]">Work Type</p>
                    <p className="font-medium">{job.workType}</p>
                  </div>
                </div>
                <div className="flex flex-col space-y-10">
                  <div className="text-[15px] space-y-4">
                    <p className="text-[#949494]">Team</p>
                    <p className="font-medium">{job.team}</p>
                  </div>
                  <div className="text-[15px] space-y-4">
                    <p className="text-[#949494]">Position</p>
                    <p className="font-medium">{job.position}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center max-md:hidden">
                <Link href={`/careers/apply?id=${job.id}`}>
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
        <h2 className="text-[34px] font-semibold mb-4">{pageContent.about}</h2>
        <p className="w-[775px]">{pageContent.aboutRole}</p>
      </section>

      <section className="pt-10 max-w-[1400px] mx-auto px-8">
        <h2 className="text-[34px] font-semibold mb-4">{pageContent.what}</h2>
        <ul className="list-disc ml-5 w-[775px] space-y-2">
          {pageContent.whatYoullDo.map((task, index) => (
            <li key={index}>{task}</li>
          ))}
        </ul>
      </section>

      <section className="pt-10 max-w-[1400px] mx-auto px-8">
        <h2 className="text-[34px] font-semibold mb-4">{pageContent.make}</h2>
        <ul className="list-disc ml-5 w-[775px] space-y-2">
          {pageContent.greatFit.map((quality, index) => (
            <li key={index}>{quality}</li>
          ))}
        </ul>
      </section>

      <section className="pt-10 max-w-[1400px] mx-auto px-8">
        <h2 className="text-[34px] font-semibold mb-4">{pageContent.where}</h2>
        <p>{pageContent.locationDetails}</p>
      </section>

      <section className="pt-10 pb-20 max-w-[1400px] mx-auto px-8">
        <h2 className="text-[34px] font-semibold mb-4">{pageContent.teamBenefits}</h2>
        <ul className="list-disc ml-5 space-y-2">
          {pageContent.benefits.map((benefit, index) => (
            <li key={index}>{benefit}</li>
          ))}
        </ul>
      </section>

    </div>
  );
}
