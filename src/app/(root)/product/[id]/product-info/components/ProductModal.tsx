import { FC, useEffect, useState } from "react";
import Image from "next/image";
import { sectionContent } from "../constants/sectionContent";


interface ProductSection {
    product: {
      id: string;
      title: string;
      price: number;
      images: string[];
      color: string | { name: string };
      description: string;
    };
  }


export const ProductModal: FC<ProductSection> = ({ product }) =>{
    const [selectedSection, setSelectedSection] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const toggleSection = (sectionKey: string) => {
        if (sectionKey === 'reviews') {
        setSelectedSection(selectedSection === sectionKey ? null : sectionKey);
        } else {
        setSelectedSection(sectionKey);
        setIsModalOpen(true);
        }
    };

    const closeModal = () => {
        setSelectedSection(null);
        setIsModalOpen(false);
    };

    // Adaugă sau elimină `overflow-hidden` pe body când modalul este activ
    useEffect(() => {
        if (isModalOpen) {
        document.body.classList.add('overflow-hidden');
        } else {
        document.body.classList.remove('overflow-hidden');
        }
        return () => {
        document.body.classList.remove('overflow-hidden'); // Asigurare la cleanup
        };
    }, [isModalOpen]);

  const sections = Object.keys(sectionContent);
    return (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-t-lg md:rounded-lg w-full md:max-w-[663px] h-[75vh] md:h-[712px] overflow-y-auto p-6 md:p-10 relative">
            <button
              className="absolute md:top-10 md:right-10 top-5 right-5 text-[#5D5D5D] hover:text-gray-800"
              onClick={closeModal}
            >
              <Image src="/images/close.svg" alt="close" width={12} height={12} />
            </button>
              <div className="flex items-center gap-4 mb-6">
                <Image
                  src={product.images[0]}
                  alt={product.title}
                  width={50}
                  height={50}
                  className="object-cover rounded"
                />
                <div className="flex flex-col justify-center gap-[10px]">
                  <h1 className="font-Heebo-15-med text-[#1E1E1E]">{product.title}</h1>
                  <p className="font-Heebo-med-14 text-[#5D5D5D]">{`$${product.price.toFixed(2)}`}</p>
                </div>
              </div>
            <h2 className="font-Heebo-16-bold mb-4 text-[#1E1E1E]">
              {sectionContent[selectedSection as keyof typeof sectionContent].title}
            </h2>
            <p className={`font-Heebo-regular-16-1 md:font-Heebo-regular-16 text-[#8C8C8C] ${selectedSection === 'productDetails' ?  'hidden' : ''}`}>
              {sectionContent[selectedSection as keyof typeof sectionContent].description}
            </p>

              <div>
                <p className={`font-Heebo-regular-16 text-[#8C8C8C] md:block hidden`}>
                  {sectionContent[selectedSection as keyof typeof sectionContent].description}
                </p>
                <p className={`font-Heebo-regular-16-1 text-[#8C8C8C] md:hidden`}>
                  {sectionContent[selectedSection as keyof typeof sectionContent].description}
                </p>
              </div>

        
            
              <div>
                <h2 className="font-Heebo-16-bold text-[#1E1E1E] mt-5 mb-[10px]">
                  {sectionContent[selectedSection as keyof typeof sectionContent].titleBenefits}
                </h2>
                <ul className="font-Heebo-regular-16 text-[#8C8C8C] pl-5 md:block hidden">
                  {sectionContent[selectedSection as keyof typeof sectionContent].benefits?.map((benefit, index) => (
                    <li className="list-disc" key={index}>
                      {benefit}
                    </li>
                  ))}
                </ul>

                <ul className="font-Heebo-15-reg-1 text-[#8C8C8C] pl-5 md:hidden">
                  {sectionContent[selectedSection as keyof typeof sectionContent].benefits?.map((benefit, index) => (
                    <li className="list-disc" key={index}>
                      {benefit}
                    </li>
                  ))}
                </ul>
                <h2 className="font-Heebo-16-bold mt-5 mb-[10px]">
                  {sectionContent[selectedSection as keyof typeof sectionContent].productDetails}
                </h2>
                <ul className="font-Heebo-regular-16 text-[#8C8C8C] pl-5 md:block hidden">
                  {sectionContent[selectedSection as keyof typeof sectionContent].details?.map((details, index) => (
                    <li className="list-disc" key={index}>
                      {details}
                    </li>
                  ))}
                </ul>

                <ul className="font-Heebo-15-reg-1 text-[#8C8C8C] pl-5 md:hidden">
                  {sectionContent[selectedSection as keyof typeof sectionContent].details?.map((details, index) => (
                    <li className="list-disc" key={index}>
                      {details}
                    </li>
                  ))}
                </ul>
              </div>
          </div>
        </div>
    )
}