'use client'
import Image from "next/image";
import { useState } from "react";
import '../Catalog.css'


interface FilterSectionProps {
    title: string;
    options: string[];
    onFilterChange: (title: string, selectedOptions: string[]) => void;
  }
  
  const FilterSection: React.FC<FilterSectionProps> = ({ title, options, onFilterChange }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  
    const toggleOption = (option: string) => {
      const updatedOptions = selectedOptions.includes(option)
        ? selectedOptions.filter((opt) => opt !== option)
        : [...selectedOptions, option];
  
      setSelectedOptions(updatedOptions);
      onFilterChange(title, updatedOptions);
    };
  
    return (
      <div className={`border-t-[1px] border-[#BDBDBD]/50 py-5 ${title === 'Size' ? 'border-b-[1px]' : ''}`}>
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <h2>{title}</h2>
          <Image
            src="/images/arr.svg"
            alt="arrow"
            width={10}
            height={5}
            className={`transform transition-transform duration-300 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </div>
        {isOpen && (
          <div className="mt-3 space-y-2 font-Heebo-16-reg">
            {options.map((option, index) => (
              <label key={index} className="flex items-center space-x-2 mx-[10px]">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  checked={selectedOptions.includes(option)}
                  onChange={() => toggleOption(option)}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    );
  };
  
  export default FilterSection;
  