import Image from 'next/image';
import { FC, useState } from 'react';
import './Production.css';
import { sectionContent } from './constants/sectionContent';

// 
interface SectionListProps {
  product: {
    id: string;
    title: string;
    price: number;
    images: string[];
    color: string | { name: string };
    description: string;
  };
}

interface SectionItem {
  name: string;
  content?: string; // Adăugăm opțional un conținut pentru fiecare secțiune
  image?: string; // Corectăm tipul proprietății image la string
}


export const SectionList: FC<SectionListProps> = ({ product }) => {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  const openModal = (sectionKey: string) => {
    setSelectedSection(sectionKey);
  };

  const closeModal = () => {
    setSelectedSection(null);
  };

  const sections = Object.keys(sectionContent);

  return (
    <div className="w-full bg-white border-t border-b border-gray-200 mt-10 md:px-0 px-5">
      {sections.map((sectionKey, index) => {
        const section = sectionContent[sectionKey as keyof typeof sectionContent];
        return (
          <div
            key={sectionKey}
            className={`${
              index !== sections.length - 1 ? "border-b border-gray-200" : ""
            }`}
          >
            <div
              className="flex items-center justify-between py-4 hover:bg-gray-100 cursor-pointer"
              onClick={() => openModal(sectionKey)}
            >
              <div className="flex items-center justify-center gap-[10px]">
                {section.image && (
                  <Image
                    src={section.image}
                    alt={section.title}
                    width={16}
                    height={16}
                    className="object-contain"
                  />
                )}
                <span className="text-gray-800 text-[16px] font-medium">
                  {section.title}
                </span>
              </div>
              <Image
                src="/images/Pllus.svg"
                alt="arrows"
                width={11}
                height={11}
                className="transform transition-transform duration-300"
              />
            </div>
          </div>
        );
      })}

      {/* Modal */}
      {selectedSection && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg max-w-[663px] w-full h-[712px] p-10 relative">
            <button
              className="absolute top-5 right-5 text-gray-500 hover:text-gray-800"
              onClick={closeModal}
            >
              <Image src="/images/close.svg" alt="close" width={12} height={12} />
            </button>
            <h2 className="text-[18px] font-medium font-Heebo-16-bold mb-4 text-[#1E1E1E]">
              {sectionContent[selectedSection as keyof typeof sectionContent].title}
            </h2>
            {selectedSection === "productDetails" && (
              <div className="flex items-center gap-4 mb-10">
                <Image
                  src={product.images[0]}
                  alt={product.title}
                  width={50}
                  height={50}
                  className="object-cover rounded"
                />
                <div className="flex flex-col justify-center gap-[10px]">
                  <h1 className="font-Heebo-15-med text-[#1E1E1E]">
                    {product.title}
                  </h1>
                  <p className="font-Heebo-med-14 text-[#5D5D5D]">{`$${product.price.toFixed(
                    2
                  )}`}</p>
                </div>
              </div>
            )}
            <p className="font-Heebo-regular-16 text-[#8C8C8C]">
              {sectionContent[selectedSection as keyof typeof sectionContent].description}
            </p>

            {/* Beneficii */}
            {sectionContent[selectedSection as keyof typeof sectionContent].benefits && (
              <>
                <h3 className="font-Heebo-16-bold text-[#1E1E1E] mt-5">Benefits</h3>
                <ul className="list-disc ml-5 mt-[10px] font-Heebo-regular-16 text-[#8C8C8C]">
                  {sectionContent[selectedSection as keyof typeof sectionContent].benefits!.map(
                    (benefit, index) => (
                      <li key={index}>{benefit}</li>
                    )
                  )}
                </ul>
              </>
            )}

            {/* Detalii */}
            {sectionContent[selectedSection as keyof typeof sectionContent].details && (
              <>
                <h3 className="font-Heebo-16-bold text-[#1E1E1E] mt-5">Details</h3>
                <ul className="list-disc ml-5 mt-[10px] font-Heebo-regular-16 text-[#8C8C8C]">
                  {sectionContent[selectedSection as keyof typeof sectionContent].details!.map(
                    (detail, index) => (
                      <li key={index}>{detail}</li>
                    )
                  )}
                </ul>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
