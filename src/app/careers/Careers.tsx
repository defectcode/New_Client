'use client'
import { Header } from "@/components/layouts/main-layout/header/Header";
import { useState } from "react";
import { FILTER_TEAMS, HERO_CONTENT, JOB_LISTINGS, STAY_CONNECTED } from "./constants/constants";
import Image from "next/image";
import { Footer } from "@/components/layouts/main-layout/footer/Footer";
import { useRouter } from "next/navigation";

interface Careers {
    className?: string;
}

export default function Careers({ className = "" }: Careers) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('');
  const [visibleJobs, setVisibleJobs] = useState(5); 

  const filteredJobs = JOB_LISTINGS.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedTeam === '' || job.team === selectedTeam)
  );

  const router = useRouter();

  const handleViewDetails = (id: number) => {
    router.push(`/careers/position?id=${id}`);
  };

  const handleShowMore = () => {
    setVisibleJobs(filteredJobs.length); 
  };

  return (
    <div className={`flex flex-col items-center justify-center w-full bg-white ${className}`}>
        <div className="w-full max-w-[1400px] mx-auto h-auto overflow-hidden text-center">
            <Header />
            <section className="flex flex-col items-center justify-center text-center px-5 my-10">
                <h1 className="md:text-[54px] text-[38px] font-extrabold uppercase leading-tight max-w-[952px] w-full">
                    {HERO_CONTENT.title}
                </h1>
                <p className="mt-4 md:text-[18px] text-[14px] max-w-2xl w-full">
                    {HERO_CONTENT.description}
                </p>
                <button className="mt-5 bg-neutral-900 text-white px-6 py-3 rounded-[10px] text-lg w-[254px] h-[48px]">
                    {HERO_CONTENT.buttonText}
                </button>
            </section>

            <div className="md:hidden mb-10 px-5">
                <input
                    type="text"
                    placeholder="Search for jobs"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="p-3 border-[#6F6F6F] h-[56px] rounded-lg bg-transparent border w-full"
                />
            </div>

            <section className="flex flex-col md:flex-row gap-10 px-5 justify-center">
                <div className="flex-1 flex flex-col gap-5 max-w-[570px] w-full">
                    {filteredJobs.slice(0, visibleJobs).map((job, index) => (
                    <div
                        key={index}
                        onClick={() => handleViewDetails(job.id)}
                        className="bg-[#A1A1A1]/20 p-6 rounded-xl shadow-md space-y-[30px] text-left"
                    >
                        <div className="flex items-center justify-between">
                            <h3 className="text-[20px] font-bold truncate">{job.title}</h3>
                            <p className="text-[15px] text-gray-500">{job.location}</p>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="mt-2 flex items-center gap-2">
                                <span className="bg-[#E0E0E0] flex items-center justify-center rounded-[10px] text-[12px] w-[205px] h-[36px] gap-1">
                                    <Image src="/images/all.svg" alt="all" width={18} height={12} />
                                    {job.team}
                                </span>
                                <button
                                    onClick={() => handleViewDetails(job.id)}
                                    className="border border-neutral-900 px-3 py-1 rounded-[10px] text-[12px] w-[140px] h-[36px] md:block hidden"
                                >
                                {job.workType}
                                </button>
                            </div>
                            <p className="text-[15px] text-gray-500 mt-2">{job.workType}</p>
                        </div>
                    </div>
                    ))}
                    {visibleJobs < filteredJobs.length && (
                    <div className="flex items-center ">
                        <button
                        onClick={handleShowMore}
                        className="self-center border border-neutral-900 px-6 py-2 rounded-lg text-sm"
                        >
                        Show More →
                        </button>
                    </div>
                    )}
                </div>

                <div className="w-full md:w-1/3 flex flex-col gap-8 items-center">
                    <div className="md:block hidden">
                        <h4 className="text-xl md:block hidden font-bold mb-2">Search for jobs</h4>
                        <input
                            type="text"
                            placeholder="Search for jobs"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="p-3 rounded-lg bg-gray-100 border w-[342px]"
                        />
                    </div>
                    <div className="md:block hidden">
                        <h4 className="text-xl font-bold mb-2">Filter by teams</h4>
                        <ul className="space-y-2 w-[342px]">
                            {FILTER_TEAMS.map((team, index) => (
                                <li
                                    key={index}
                                    className={`flex justify-between bg-gray-100 p-3 rounded-lg border cursor-pointer ${
                                    selectedTeam === team ? "bg-gray-300" : ""
                                    }`}
                                    onClick={() => setSelectedTeam(team === selectedTeam ? "" : team)}
                                >
                                    <span>{team}</span>
                                    <span className="text-gray-500">{Math.floor(Math.random() * 15)}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            <div className="flex items-center justify-center w-full md:my-[230px] my-[160px] ">
                <div className="flex flex-col items-center justify-center text-center mt-10 mb-5 px-5 bg-[#F2F2F2] md:w-[952px] w-full rounded-[20px] md:pt-[48px] pt-10 md:pb-[48px] pb-5 shadow-lg">
                    <h2 className="md:text-[54px] text-[32px] font-extrabold uppercase md:w-[528px] w-[304px] leading-[1]">
                        {STAY_CONNECTED.title}
                    </h2>
                    <p className="mt-5 md:text-lg text-[14px] md:w-[464px] w-[304px] leading-[1.2]">
                        {STAY_CONNECTED.description}
                    </p>
                    <button className="bg-neutral-900 text-white px-5 py-3 rounded-[10px] text-lg w-[254px] h-[55px] md:mt-[46px] mt-[60px]">
                        {STAY_CONNECTED.buttonText}
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    </div>
  );
}
