import { useState } from "react";
import Image from "next/image";
import { sizeStandards, tableRow, tableRows } from "../constants/sizeSection";

const SizeModalMobile = () => {
  const [selectedCountry, setSelectedCountry] = useState<"US" | "EU" | "UK">("US");
  const [selectedUnit, setSelectedUnit] = useState<"cm" | "dm">("cm");
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showUnitDropdown, setShowUnitDropdown] = useState(false);
  
  const toggleCountryDropdown = () => setShowCountryDropdown(!showCountryDropdown);
  const toggleUnitDropdown = () => setShowUnitDropdown(!showUnitDropdown);
  const [activeTab, setActiveTab] = useState<"sizeCompliance" | "sizes">(
    "sizeCompliance"
  );

  const handleCountryChange = (country: "US" | "EU" | "UK") => {
    setSelectedCountry(country);
    setShowCountryDropdown(false);
  };

  const handleUnitChange = (unit: "cm" | "dm") => {
    setSelectedUnit(unit);
    setShowUnitDropdown(false);
  };

  const handleTabClick = (tab: "sizeCompliance" | "sizes") => {
    setActiveTab(tab);
  };


  return (
    <div>
        <div className="flex justify-center border-b border-transparent gap-20">
          <button
            className={`py-2 font-Heebo-16-bold ${
              activeTab === "sizeCompliance"
                ? "border-b border-black text-black w-[149px]"
                : "text-gray-600"
            }`}
            onClick={() => handleTabClick("sizeCompliance")}
          >
            SIZE COMPLIANCE
          </button>
          <button
            className={`py-2 font-Heebo-16-bold ${
              activeTab === "sizes" 
              ? "border-b border-black text-black w-[54px]" 
              : "text-gray-600"
            }`}
            onClick={() => handleTabClick("sizes")}
          >
            SIZES
          </button>
        </div>

        {activeTab === "sizeCompliance" && (
          <table className="w-full text-left border-transparent mt-5">
            <thead>
              <tr className="w-full bg-[#FFFFFF]">
                <th className="w-1/3 py-2 border-transparent text-[#1E1E1E] h-[48px] font-Heebo-15-med text-center">Standard</th>
                <th className="w-1/3 py-2 border-transparent text-[#1E1E1E] h-[48px] font-Heebo-15-med text-center">Size</th>
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-[#FFFFFF]" : "bg-[#F9F9F9]"}
                >
                  <td className="border border-transparent text-center py-2 text-[#8C8C8C] font-Heebo-15-reg h-[48px]">{row.standard}</td>
                  <td className="border border-transparent text-center py-2 text-[#8C8C8C] font-Heebo-15-reg h-[48px]">{row.size}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeTab === "sizes" && (
            <div className="">
                <div className="flex justify-around items-center h-[48px]">
                    <div className="relative bg-[#FFFFFF]">
                        <button
                            className="flex items-center gap-2 text-gray-700 h-[48px]"
                            onClick={toggleCountryDropdown}
                        >
                            Size {selectedCountry} <Image src="/images/arr.svg" alt="arrow" width={9} height={5} />
                        </button>
                        {showCountryDropdown && (
                            <ul className="absolute left-0 mt-2 bg-white z-10">
                                {Object.keys(sizeStandards).map((country) => (
                                    <li
                                        key={country}
                                        className="px-4 py-2 text-gray-700 cursor-pointer hover:bg-gray-100"
                                        onClick={() => handleCountryChange(country as "US" | "EU" | "UK")}
                                    >
                                        {country}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className="relative">
                    <button
                        className="flex items-center gap-2 text-gray-700"
                        onClick={toggleUnitDropdown}
                    >
                        {selectedUnit} <Image src="/images/arr.svg" alt="arrow" width={9} height={5} />
                    </button>
                    {showUnitDropdown && (
                        <ul className="absolute left-0 mt-2 bg-white z-10">
                            {["cm", "dm"].map((unit) => (
                                <li
                                    key={unit}
                                    className="px-4 py-2 text-gray-700 cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleUnitChange(unit as "cm" | "dm")}
                                >
                                    {unit}
                                </li>
                            ))}
                        </ul>
                    )}
                    </div>
                </div>

                {tableRow.map((row, index) => (
                    <div
                        key={index}
                        className={`flex justify-between items-center py-3 px-4 ${
                            index % 2 === 0 ? "bg-gray-50" : "bg-white"
                        } border-b border-transparent`}
                    >
                        <span className="text-gray-500">{row.size}</span>
                        <span className="text-gray-700">{selectedUnit === "cm" ? row.cm : row.dm}</span>
                    </div>
                ))}
            </div>
        )}
    </div>
  );
};

export default SizeModalMobile;
