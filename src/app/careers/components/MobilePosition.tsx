'use client';
import { Header } from "@/components/layouts/main-layout/header/Header";
import Link from "next/link";
import { useSearchParams } from 'next/navigation';
import { JOB_LISTINGS } from "../constants/constants";
import { PAGE_CONTENT } from "../position/constants/constants";

interface PositionProps {
  className?: string;
}

export default function MobilePosition({ className = "" }: PositionProps) {
  const searchParams = useSearchParams();
  const id = searchParams?.get('id') ? Number(searchParams.get('id')) : null;

  const job = id ? JOB_LISTINGS.find((job) => job.id === id) : null;
  const pageContent = id ? PAGE_CONTENT.find((content) => content.id === id) : null;

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

  return (
    <div className={`font-heebo w-full bg-white text-neutral-900 ${className}`}>
      <Header/>
      
      <section className="bg-neutral-900 py-5 relative h-[286px]">
      <h2 className="text-[24px] px-5 text-[#F7F7F7]/25 leading-[1] mt-10 mb-[10px]">{pageContent.subtitle}</h2>
      <h1 className="text-[32px] px-5 pb-10 font-bold mt-2 leading-[1] text-[#F7F7F7] w-[350px]">{pageContent.title}</h1>
        
        <div className="absolute bottom-[-70px] left-1/2 transform -translate-x-1/2 w-[90%] bg-[#F7F7F7] px-5 py-5 shadow-md rounded-lg h-[152px]">
        <div className="flex items-center justify-between gap-10">
            <div className="flex flex-col gap-2 space-y-10">
              <div>
                <p className="text-gray-500 text-xs">Position</p>
                <p className="text-sm font-medium">{job.position}</p> 
              </div>
              <div>
                <p className="text-gray-500 text-xs">Location</p>
                <p className="text-sm font-medium">{job.location}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2 space-y-10">
              <div>
                <p className="text-gray-500 text-xs">Team</p>
                <p className="text-sm font-medium">{job.team}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs">Work Type</p>
                <p className="text-sm font-medium">{job.workType}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="pt-16 px-5 mt-10">
        <h2 className="text-[24px] font-semibold mb-2">About the Role</h2>
        <p className="text-[16px]">{pageContent.aboutRole}</p>
      </section>
      <section className="pt-10 px-5">
        <h2 className="text-[24px] font-semibold mb-2">What You'll Do</h2>
        <ul className="list-disc ml-4 space-y-1 text-[16px]">
          {pageContent.whatYoullDo.map((task, index) => (
            <li key={index}>{task}</li>
          ))}
        </ul>
      </section>
      
      <section className="pt-10 px-5">
        <h2 className="text-[24px] font-semibold mb-2">What Makes You a Great Fit</h2>
        <ul className="list-disc ml-4 space-y-1 text-[16px]">
          {pageContent.greatFit.map((quality, index) => (
            <li key={index}>{quality}</li>
          ))}
        </ul>
      </section>
      
      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 flex gap-4 items-center justify-center shadow-md z-50">
        <Link href={`/careers/apply?id=${job.id}`} className="flex-1 min-w-[209px]">
          <button className="bg-black text-white text-md font-semibold rounded-lg h-12 w-full hover:bg-gray-800 transition-colors">
            Apply Now
          </button>
        </Link>
        <div className="flex-1 min-w-[115px]">
          <button className="border border-gray-900 text-gray-900 text-md font-semibold rounded-lg h-12 w-full flex items-center justify-center gap-2">
            Share
            <span>📤</span>
          </button>
        </div>
      </div>
    </div>
  );
}
