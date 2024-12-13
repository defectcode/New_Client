import { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface SortOptionsProps {
  options: string[];
  selectedOption: string;
  onOptionSelect: (option: string) => void;
}

const SortOptions: React.FC<SortOptionsProps> = ({
  options,
  selectedOption,
  onOptionSelect,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex items-center gap-5 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <p className="font-Heebo-16-bold text-[#1E1E1E]">Sort by</p>
        <Image
          src="/images/arr.svg"
          alt="arrow"
          width={10}
          height={5}
          className={`transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-6 bg-[#E8E8ED] shadow-lg w-[162px] h-auto rounded-md border border-[#E0E0E0] z-10 space-y-[10px] py-5 md:mt-5">
          {options.map((option, index) => (
            <p
              key={index}
              className={`px-5 font-Heebo-16-reg cursor-pointer hover:text-[#1E1E1E] ${
                selectedOption === option ? "text-[#1E1E1E]" : "text-[#898989]"
              }`}
              onClick={() => {
                onOptionSelect(option);
                setIsOpen(false);
              }}
            >
              {option !== "Newest" ? `Price: ${option}` : option}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortOptions;
