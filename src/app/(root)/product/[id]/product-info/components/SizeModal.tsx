import { useState } from "react";

const SectionSizeTables = () => {
  const [activeTab, setActiveTab] = useState<"sizeCompliance" | "sizes">(
    "sizeCompliance"
  );

  const handleTabClick = (tab: "sizeCompliance" | "sizes") => {
    setActiveTab(tab);
  };

  return (
    <div>
      <div className="flex justify-start border-b border-gray-200 gap-20">
        <button
          className={`py-2 font-Heebo-16-bold ${
            activeTab === "sizeCompliance"
              ? "border-b border-black text-[#000000]"
              : "text-[#000000]"
          }`}
          onClick={() => handleTabClick("sizeCompliance")}
        >
          SIZE COMPLIANCE
        </button>
        <button
          className={` py-2 font-Heebo-16-bold ${
            activeTab === "sizes"
              ? "border-b border-black text-[#000000]"
              : "text-[#000000]"
          }`}
          onClick={() => handleTabClick("sizes")}
        >
          SIZES
        </button>
      </div>

      {activeTab === "sizeCompliance" && (
        <table className="w-full text-left border-transparent mt-4">
          <thead className="bg-black w-full">
            <tr className="w-full bg-[#FFFFFF]">
              <th className="w-1/3 py-2 border-transparent text-[#1E1E1E] h-[48px] font-Heebo-15-med text-center">Standard</th>
              <th className="w-1/3 py-2 border-transparent text-[#1E1E1E] h-[48px] font-Heebo-15-med text-center">Size</th>
              <th className="w-1/3 py-2 border-transparent text-[#1E1E1E] h-[48px] font-Heebo-15-med text-center">US</th>
            </tr>
          </thead>

          <tbody>
            {[
              { standard: "XXS", size: 42, us: "XXS" },
              { standard: "XS", size: 44, us: "XS" },
              { standard: "S", size: 46, us: "S" },
              { standard: "M", size: 48, us: "M" },
              { standard: "L", size: 50, us: "L" },
              { standard: "XL", size: 52, us: "XL" },
              { standard: "XXL", size: 54, us: "XXL" },
              { standard: "XXXL", size: 56, us: "XXXL" },
            ].map((row, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-[#FFFFFF]" : "bg-[#F9F9F9]"}>
                <td className="border border-transparent text-center py-2 text-[#8C8C8C] font-Heebo-15-reg h-[48px]">
                  {row.standard}
                </td>
                <td className="border border-transparent text-center py-2 text-[#8C8C8C] font-Heebo-15-reg">{row.size}</td>
                <td className="border border-transparent text-center py-2 text-[#8C8C8C] font-Heebo-15-reg">{row.us}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {activeTab === "sizes" && (
        <table className="w-full text-left border-collapse border border-transparent mt-4">
          <thead className="bg-[#FFFFFF]">
            <tr>
              <th className="w-1/3 border border-transparent text-[#1E1E1E] text-center h-[48px] font-Heebo-15-med">Size US</th>
              <th className="w-1/3 border border-transparent text-[#1E1E1E] text-center h-[48px] font-Heebo-15-med">cm</th>
              <th className="w-1/3 border border-transparent text-[#1E1E1E] text-center h-[48px] font-Heebo-15-med">dm</th>
            </tr>
          </thead>
          <tbody>
            {[
              { size: "S", cm: 75, dm: 44 },
              { size: "M", cm: 83, dm: 55 },
              { size: "L", cm: 105, dm: 50 },
            ].map((row, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-[#FFFFFF]" : "bg-[#F9F9F9]"}>
                <td className="border border-transparent text-[#8C8C8C] font-Heebo-15-reg h-[48px] text-center">{row.size}</td>
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
