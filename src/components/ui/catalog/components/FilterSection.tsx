'use client'
import Image from "next/image";
import { useState, useEffect } from "react";
import '../Catalog.css';

interface FilterSectionProps {
  title: string;
  options: string[];
  onFilterChange: (title: string, selectedOptions: string[]) => void;
  resetFilters: boolean;
  isLast?: boolean; 
}

const FilterSection: React.FC<FilterSectionProps> = ({
  title,
  options,
  onFilterChange,
  resetFilters,
  isLast = false,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const toggleOption = (option: string) => {
    const updatedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter((opt) => opt !== option)
      : [...selectedOptions, option];

    setSelectedOptions(updatedOptions);
    onFilterChange(title, updatedOptions);
  };

  useEffect(() => {
    if (resetFilters) {
      setSelectedOptions([]);
      onFilterChange(title, []);
    }
  }, [resetFilters, title, onFilterChange]);

  return (
    <div
      className={`border-t-[1px] border-[#BDBDBD]/50 py-5 ${
        title === 'Size' ? 'border-b-[1px]' : ''
      } ${isLast ? 'pb-24 md:pb-0' : ''}`}
    >
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="font-bold text-[#1E1E1E]">{title}</h2>
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
            <label
              key={index}
              className="flex items-center space-x-2 mx-[10px]"
            >
              <input
                type="checkbox"
                className="form-checkbox"
                checked={selectedOptions.includes(option)}
                onChange={() => toggleOption(option)}
              />
              <span className="text-[#424242]">{option}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterSection;
