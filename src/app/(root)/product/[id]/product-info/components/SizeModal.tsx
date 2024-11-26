import { useState } from "react";
import Image from "next/image";
import { sizeStandards, tableRows } from "../constants/sizeSection";

const SectionSizeTables = () => {
  const [selectedCountry, setSelectedCountry] = useState<"US" | "EU" | "UK">("US");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [activeTab, setActiveTab] = useState<"sizeCompliance" | "sizes">(
    "sizeCompliance"
  );

  const toggleCountryDropdown = () => setShowCountryDropdown(!showCountryDropdown);
  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const handleTabClick = (tab: "sizeCompliance" | "sizes") => {
    setActiveTab(tab);
  };

  const handleCountryChange = (country: "US" | "EU" | "UK") => {
    setSelectedCountry(country);
    setShowDropdown(false); // Închide dropdown-ul după selectare
    setShowCountryDropdown(false); // Asigură că dropdown-ul este ascuns
  };

  return (
    <div>
      {/* Tab-uri pentru SIZE COMPLIANCE și SIZES */}
      <div className="flex justify-start border-b border-transparent gap-20">
        <button
          className={`py-2 font-Heebo-16-bold ${
            activeTab === "sizeCompliance"
              ? "border-b border-black text-black"
              : "text-gray-600"
          }`}
          onClick={() => handleTabClick("sizeCompliance")}
        >
          SIZE COMPLIANCE
        </button>
        <button
          className={`py-2 font-Heebo-16-bold ${
            activeTab === "sizes"
              ? "border-b border-black text-black"
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
              <th className="w-1/3 py-2 border-transparent text-[#1E1E1E] h-[48px] font-Heebo-15-med text-center relative">
                <div className="relative inline-block">
                  <button
                    className="flex items-center justify-center w-full rounded-md px-2 py-1 gap-[6px]"
                    onClick={toggleDropdown}
                  >
                    {selectedCountry} 
                    <Image src='/images/arr.svg' alt="arr" width={9} height={5} className="rotate-180 text-[#0C0C0C]"/>
                  </button>
                  {showDropdown && (
                    <ul className="absolute top-full left-0 mt-2 bg-white border border-gray-300 rounded-md shadow-lg z-10">
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
              </th>
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
                <td className="border border-transparent text-center py-2 text-[#8C8C8C] font-Heebo-15-reg h-[48px]">
                  {sizeStandards[selectedCountry][index]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {activeTab === "sizes" && (
        <table className="w-full text-left border-collapse border border-transparent mt-5">
          <thead>
            <tr className="bg-[#FFFFFF]">
              <th className="w-1/3 border border-transparent text-[#1E1E1E] text-center h-[48px] font-Heebo-15-med relative">
                <div className="relative inline-block">
                  <button
                    className="flex items-center justify-center w-full rounded-md px-2 py-1 gap-[6px]"
                    onClick={toggleDropdown}
                  >
                    <span>Size</span>
                    {selectedCountry} 
                    <Image src='/images/arr.svg' alt="arr" width={9} height={5} className="rotate-180 text-[#0C0C0C]"/>

                  </button>
                  {showDropdown && (
                    <ul className="absolute top-full left-0 mt-2 bg-white border border-gray-300 rounded-md shadow-lg z-10">
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
              </th>
              <th className="w-1/3 border border-transparent text-[#1E1E1E] text-center h-[48px] font-Heebo-15-med">cm</th>
              <th className="w-1/3 border border-transparent text-[#1E1E1E] text-center h-[48px] font-Heebo-15-med">dm</th>
            </tr>
          </thead>
          <tbody>
            {[
              { size: "Chest Circumference", cm: 75, dm: 44 },
              { size: "Length", cm: 83, dm: 55 },
              { size: "Weight", cm: 105, dm: 50 },
            ].map((row, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="border border-transparent text-[#8C8C8C] font-Heebo-15-reg h-[48px] text-center">
                  {sizeStandards[selectedCountry][index]}
                </td>
                <td className="border border-transparent text-[#8C8C8C] font-Heebo-15-reg h-[48px] text-center">{row.cm}</td>
                <td className="border border-transparent text-[#8C8C8C] font-Heebo-15-reg h-[48px] text-center">{row.dm}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SectionSizeTables;
