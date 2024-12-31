import { useState } from "react";
import { POSITION_DATA } from "../constants/constants";
import FileUploader from "./FileUploader";

interface PortfolioProps {
    setLinkedin: (value: string) => void;
    setPortfolio: (value: string) => void;
    position: any
  }
  
  export default function Portfolio({ setLinkedin, setPortfolio, position }: PortfolioProps) {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
    const handleFileSelect = (file: File | null) => {
      setSelectedFile(file);
      console.log("Selected file:", file?.name || "No file selected");
    };
  
    return (
      <div className="md:w-[615px] w-full md:px-0 px-5">
        <h3 className="text-2xl font-bold mb-4">Show Us Your Work</h3>
        <p className="text-neutral-400 mb-4">{position.resumeLabel}</p>
        <div className="flex flex-col gap-4">
          <FileUploader/>
          <div className="relative w-full">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35M9.75 17.25a7.5 7.5 0 1 1 7.5-7.5 7.5 7.5 0 0 1-7.5 7.5z"
                />
              </svg>
            </div>
            <input
              type="text"
              onChange={(e) => setLinkedin(e.target.value)}
              placeholder="Link to LinkedIn profile (optional)"
              className="pl-10 pr-4 border border-[#6F6F6F] rounded-lg p-2 h-[56px] w-full"
            />
          </div>
          <div className="relative w-full">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35M9.75 17.25a7.5 7.5 0 1 1 7.5-7.5 7.5 7.5 0 0 1-7.5 7.5z"
                />
              </svg>
            </div>
            <input
              type="text"
              onChange={(e) => setPortfolio(e.target.value)}
              placeholder="Link to your portfolio site (optional)"
              className="pl-10 pr-4 border border-[#6F6F6F] rounded-lg p-2 h-[56px] w-full"
            />
          </div>
        </div>

      </div>
    );
  }
  