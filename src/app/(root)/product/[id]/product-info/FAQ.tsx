import Image from 'next/image';
import { FC, useState, useEffect } from 'react';
import { sectionContent } from './constants/sectionContent';
import { ReviewsSection } from './components/ReviewsModal';
import SectionSizeTables from './components/SizeModal';
import SizeModalMobile from './components/SizeModalMobile';
import './Production.css'

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

export const SectionList: FC<SectionListProps> = ({ product }) => {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState(false);
  const sections = Object.keys(sectionContent);


  useEffect(() => {
    const updateIsMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };

    updateIsMobile();
    window.addEventListener("resize", updateIsMobile);
    return () => window.removeEventListener("resize", updateIsMobile);
  }, []);

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

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isModalOpen]);



  return (
    <div
      className={`w-full bg-[#F9F9F9] ${
        selectedSection === 'reviews' ? 'border-t' : 'border-y'
      } border-gray-200 md:mt-10`}
    >
      {sections.map((sectionKey, index) => {
        const section = sectionContent[sectionKey as keyof typeof sectionContent];

        return (
          <div
            key={sectionKey}
            className={`${
              sectionKey === 'reviews' && selectedSection === 'reviews'
                ? ''
                : index !== sections.length - 1
                ? 'border-b border-gray-200'
                : ''
            }`}
          >
            <div
              className="flex items-center justify-between py-4 hover:bg-white cursor-pointer"
              onClick={() => toggleSection(sectionKey)}
            >
              <div className="flex items-center gap-[10px]">
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
                  {sectionKey === 'reviews' && sectionContent.reviews.totalReviews && (
                    <span className="text-gray-500 ml-2">
                      ({sectionContent.reviews.totalReviews})
                    </span>
                  )}
                </span>
              </div>
              {sectionKey === 'reviews' ? (
                <div className="flex items-center gap-[5px]">
                  {[...Array(5)].map((_, i) => (
                    <Image
                      key={i}
                      src={
                        i < Math.floor(section.rating || 0)
                          ? '/images/black-star.svg'
                          : '/images/gray-star.svg'
                      }
                      alt="star"
                      width={12}
                      height={12}
                      className="object-contain"
                    />
                  ))}
                  <Image
                    src="/images/arr.svg"
                    alt="arrow"
                    width={11}
                    height={11}
                    className={`transform transition-transform duration-300 ${
                      selectedSection === sectionKey ? 'rotate-180' : ''
                    }`}
                  />
                </div>
              ) : (
                <div>
                  <Image
                    src="/images/Plus.svg"
                    alt="arrow"
                    height={11}
                    width={11}
                    className="text-[#1E1E1E]"
                  />
                </div>
              )}
            </div>

            {selectedSection === sectionKey && sectionKey === 'reviews' && (
              <div>
                <ReviewsSection product={product} />
              </div>
            )}
          </div>
        );
      })}

      {isModalOpen && selectedSection && selectedSection !== 'reviews' && (
        
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black bg-opacity-50" onClick={closeModal}>
          <div className="bg-white rounded-t-lg md:rounded-lg w-full md:max-w-[663px] h-[75vh] md:max-h-[712px] md:h-full overflow-y-auto p-6 md:p-10 relative" onClick={e => e.stopPropagation()}>
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
            
            {selectedSection === 'productDetails' && (
              <div>
                <div>
                  <h2 className="font-Heebo-16-bold mb-4 text-[#1E1E1E]">
                    {sectionContent[selectedSection as keyof typeof sectionContent].subtitle}
                  </h2>
                  <p className={`font-Heebo-regular-16-1 md:font-Heebo-regular-16 text-[#8C8C8C] ${selectedSection === 'productDetails' ?  'hidden' : ''}`}>
                    {sectionContent[selectedSection as keyof typeof sectionContent].description}
                  </p>
                  <p className={`font-Heebo-regular-16 text-[#8C8C8C] md:block hidden`}>
                    {sectionContent[selectedSection as keyof typeof sectionContent].description}
                  </p>
                  <p className={`font-Heebo-regular-16-1 text-[#8C8C8C] md:hidden`}>
                    {sectionContent[selectedSection as keyof typeof sectionContent].description}
                  </p>
                </div>
                <h2 className="font-Heebo-16-bold text-[#1E1E1E] mt-5 mb-[10px]">
                  {sectionContent[selectedSection as keyof typeof sectionContent].titleBenefits}
                </h2>
                <ul className="font-Heebo-regular-16 text-[#8C8C8C] pl-5 md:block hidden">
                  {sectionContent[selectedSection].benefits?.map((benefit, index) => (
                    <li className="list-disc" key={index}>
                      {benefit}
                    </li>
                  ))}
                </ul>

                <ul className="font-Heebo-15-reg-1 text-[#8C8C8C] pl-5 md:hidden">
                  {sectionContent[selectedSection].benefits?.map((benefit, index) => (
                    <li className="list-disc" key={index}>
                      {benefit}
                    </li>
                  ))}
                </ul>
                <h2 className="font-Heebo-16-bold mt-5 mb-[10px]">
                  {sectionContent[selectedSection as keyof typeof sectionContent].productDetails}
                </h2>
                <ul className="font-Heebo-regular-16 text-[#8C8C8C] pl-5 md:block hidden">
                  {sectionContent[selectedSection].details?.map((details, index) => (
                    <li className="list-disc" key={index}>
                      {details}
                    </li>
                  ))}
                </ul>

                <ul className="font-Heebo-15-reg-1 text-[#8C8C8C] pl-5 md:hidden">
                  {sectionContent[selectedSection].details?.map((details, index) => (
                    <li className="list-disc" key={index}>
                      {details}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {selectedSection === 'sizeAndFit' && (
              isMobile ? <SizeModalMobile/> : <SectionSizeTables/>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
