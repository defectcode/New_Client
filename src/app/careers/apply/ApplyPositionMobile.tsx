'use client'
import { Header } from "@/components/layouts/main-layout/header/Header";
import { useRef, useState, useEffect } from "react";
import { POSITION_DATA } from "./constants/constants";
import Portfolio from "./components/Portfolio";
import Info from "./components/Info";
import { useSearchParams } from "next/navigation";
import AboutApplyMobile from "./components/AboutApplyMobile";

interface ApplyPositionProps {
  className?: string;
}

export default function ApplyPosition({ className = "" }: ApplyPositionProps) {
  const [selectedPositions, setSelectedPositions] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [message, setMessage] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [portfolio, setPortfolio] = useState('');
  const [file, setFile] = useState('');

  const resetForm = () => {
    setSelectedPositions([]);
    setEmail('');
    setFullName('');
    setPhone('');
    setCountry('');
    setMessage('');
    setLinkedin('');
    setPortfolio('');
    setFile('');
    setIsDropdownOpen(false);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const response = await fetch('/api/submitEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          position: selectedPositions.join(", "), 
          email, 
          fullName, 
          phone, 
          country, 
          file, 
          linkedin, 
          portfolio 
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to send email');
      }
  
      const result = await response.json();
      setMessage(result.message || 'Success!');
  
      resetForm();
  
    } catch (error: any) {
      console.error('Error:', error.message);
      setMessage('Something went wrong!');
    }
  };
    
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleCheckboxChange = (value: string) => {
    setSelectedPositions((prev) => {
      if (prev.includes(value)) {
        return prev.filter((item) => item !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  const searchParams = useSearchParams();
  const id = searchParams?.get('id') ? Number(searchParams.get('id')) : null;
  const position = POSITION_DATA.find((pos) => pos.id === id);
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() =>  {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [])


  if (!position) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl text-red-600">Job not found!</h1>
      </div>
    );
  }
  return (
    <div className={`w-full bg-white ${className}`}>
      <Header />
      <AboutApplyMobile position={position} selectedPositions={selectedPositions} />
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-5 mt-24">
          <h3 className="text-2xl font-bold mb-4">General Information</h3>
          <div className="flex flex-col gap-4">
              <div className="relative" ref={dropdownRef}>
                <div
                  className="w-full border border-[#6F6F6F] rounded-lg p-2 mt-2 cursor-pointer flex justify-between items-center h-[56px] px-5"
                  onClick={toggleDropdown}
                >
                  {selectedPositions.join(", ") || "Select Positions"}
                  <span
                    className={`transform transition-transform ${
                      isDropdownOpen ? "rotate-180" : "rotate-0"
                    }`}
                  >
                    ▼
                  </span>
                </div>
                {isDropdownOpen && (
                  <ul className="AB7Lab Id5V1 absolute border border-[#FFFFFF] shadow-md rounded-lg mt-1 bg-[#FFFFFF] z-10 w-[615px]">
                    {['Volunteer', 'Full Time', 'Part Time'].map((position) => (
                      <li
                        key={position}
                        onClick={() => {
                          handleCheckboxChange(position);
                          setIsDropdownOpen(false); 
                        }}
                        className="p-2 hover:bg-gray-100 cursor-pointer flex items-center h-[56px]"
                      >
                        <input
                          type="checkbox"
                          checked={selectedPositions.includes(position)}
                          onChange={() => handleCheckboxChange(position)}
                          className="mr-2 w-4 h-4 appearance-none border-[1px] rounded-[4px] border-black bg-white checked:bg-black pointer-events-none"
                        />
                        {position}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <input
                type="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="border border-[#6F6F6F] rounded-lg px-5 h-[56px]"
                placeholder={position.fullName}
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="border border-[#6F6F6F] rounded-lg px-5 h-[56px]"
              />
              <input
                type="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="border border-[#6F6F6F] rounded-lg px-5 h-[56px]"
                placeholder={position.phoneNumber}
              />
              <input
                type="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
                className="border border-[#6F6F6F] rounded-lg px-5 h-[56px]"
                placeholder={position.country}
              />
        </div>
        <Portfolio setLinkedin={setLinkedin} setPortfolio={setPortfolio} position={position} />
        <Info />
        <div className="w-full flex flex-col items-center text-center mt-6">
          <p className="text-sm mb-2">By clicking the "Payment" button, you confirm that you have read, understand, and accept our <a href="#" className="text-blue-500">Terms of Sale</a>, <a href="#" className="text-blue-500">Privacy Policy</a>, and <a href="#" className="text-blue-500">Return Policy</a>.</p>
          <button
            type="submit"
            className="w-[200px] bg-[#1E1E1E] text-white px-6 py-3 rounded-lg hover:bg-gray-800"
          >
            {position.applyButton}
          </button>
        </div>
        {message && <p className="text-center text-green-600 mt-4">{message}</p>}
      </form>
    </div>
  );
}
