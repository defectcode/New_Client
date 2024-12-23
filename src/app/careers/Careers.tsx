'use client'
import { Header } from "@/components/layouts/main-layout/header/Header";
import { useState } from "react";
import { FILTER_TEAMS, FOOTER_INFO, HERO_CONTENT, JOB_LISTINGS, STAY_CONNECTED } from "./constants/constants";
import Image from "next/image";
import { Footer } from "@/components/layouts/main-layout/footer/Footer";



interface Careers {
  className?: string;
}

export default function Careers({ className = "" }: Careers) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('');

  const filteredJobs = JOB_LISTINGS.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedTeam === '' || job.team === selectedTeam)
  );

  return (
    <div className={`flex flex-col items-center justify-center w-full bg-white ${className}`}>
        <div className="w-full max-w-[1400px] mx-auto h-auto overflow-hidden text-center">
            <Header />
            <section className="flex flex-col items-center justify-center text-center px-5 my-10">
                <h1 className="text-[54px] font-extrabold uppercase leading-tight max-w-[952px] w-full">
                    {HERO_CONTENT.title}
                </h1>
                <p className="mt-4 text-lg max-w-2xl w-full">{HERO_CONTENT.description}</p>
                <button className="mt-5 bg-neutral-900 text-white px-6 py-3 rounded-[10px] text-lg w-[254px] h-[48px]">
                    {HERO_CONTENT.buttonText}
                </button>
            </section>

            <section className="flex flex-col md:flex-row gap-10 px-5 justify-center">
                <div className="flex-1 flex flex-col gap-5 max-w-[570px] w-full">
                    {filteredJobs.length > 0 ? (
                    filteredJobs.map((job, index) => (
                        <div key={index} className="bg-[#A1A1A1]/20 p-6 rounded-xl shadow-md space-y-[30px] text-left">
                        <div className="flex items-center justify-between">
                            <h3 className="text-[20px] font-bold truncate">{job.title}</h3>
                            <p className="text-[15px] text-gray-500">Moldova</p>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="mt-2 flex items-center gap-2">
                            <span className="bg-[#E0E0E0] flex items-center justify-center rounded-[10px] text-[12px] w-[205px] h-[36px] gap-1">
                                <Image src="/images/all.svg" alt="all" width={18} height={12} />
                                {job.team}
                            </span>
                            <button className="border border-neutral-900 px-3 py-1 rounded-[10px] text-[12px] w-[140px] h-[36px]">
                                Volunteer
                            </button>
                            </div>
                            <p className="text-[15px] text-gray-500 mt-2">Full time</p>
                        </div>
                        </div>
                    ))
                    ) : (
                    <p className="text-center text-gray-500">No jobs found. Please adjust your search or filters.</p>
                    )}
                   <div className="flex items-center">
                        <button className="self-center border border-neutral-900 px-6 py-2 rounded-lg text-sm">
                            Show More →
                        </button>
                   </div>
                </div>

                {/* Filter Section */}
                <div className="w-full md:w-1/3 flex flex-col gap-8 items-center">
                    <div>
                        <h4 className="text-xl font-bold mb-2">Search for jobs</h4>
                        <input
                            type="text"
                            placeholder="Search for jobs"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="p-3 rounded-lg bg-gray-100 border w-[342px]"
                        />
                    </div>
                    <div>
                        <h4 className="text-xl font-bold mb-2">Filter by teams</h4>
                        <ul className="space-y-2 w-[342px]">
                            {FILTER_TEAMS.map((team, index) => (
                            <li
                                key={index}
                                className={`flex justify-between bg-gray-100 p-3 rounded-lg border cursor-pointer ${selectedTeam === team ? 'bg-gray-300' : ''}`}
                                onClick={() => setSelectedTeam(team === selectedTeam ? '' : team)}
                            >
                                <span>{team}</span>
                                <span className="text-gray-500">{Math.floor(Math.random() * 15)}</span>
                            </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            <div className="flex items-center justify-center w-full my-[230px] ">
                <div className="flex flex-col items-center justify-center text-center mt-10 mb-5 px-5 bg-[#F2F2F2] w-[952px] rounded-[20px] py-[48px] shadow-lg">
                    <h2 className="text-[54px] font-extrabold uppercase w-[528px] leading-[1]">
                        {STAY_CONNECTED.title}
                    </h2>
                    <p className="mt-5 text-lg w-[464px] leading-[1.2]">
                        {STAY_CONNECTED.description}
                    </p>
                    <button className="bg-neutral-900 text-white px-6 py-3 rounded-[10px] text-lg w-[254px] h-[55px] mt-[46px]">
                        {STAY_CONNECTED.buttonText}
                    </button>
                </div>
            </div>
            <Footer/>
        </div>
    </div>

  );
}
