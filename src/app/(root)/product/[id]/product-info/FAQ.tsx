import Image from 'next/image';
import { FC, useState } from 'react';
import { sectionContent } from './constants/sectionContent';
import { ReviewsSection } from './components/ReviewsSection';

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

  const sections = Object.keys(sectionContent);

  return (
    <div
      className={`w-full bg-white ${
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

            {/* Content for Reviews */}
            {selectedSection === sectionKey && sectionKey === 'reviews' && (
              <div>
                <ReviewsSection product={product}/>
              </div>
            )}
          </div>
        );
      })}

      {/* Modal pentru alte secțiuni */}
      {isModalOpen && selectedSection && selectedSection !== 'reviews' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg max-w-[663px] w-full h-[712px] p-10 relative">
            <button
              className="absolute top-5 right-5 text-gray-500 hover:text-gray-800"
              onClick={closeModal}
            >
              <Image src="/images/close.svg" alt="close" width={12} height={12} />
            </button>
            {selectedSection === 'productDetails' && (
              <div className="flex items-center gap-4 mb-10">
                <Image
                  src={product.images[0]}
                  alt={product.title}
                  width={50}
                  height={50}
                  className="object-cover rounded"
                />
                <div className="flex flex-col justify-center gap-[10px]">
                  <h1 className="font-Heebo-15-med text-[#1E1E1E]">{product.title}</h1>
                  <p className="font-Heebo-med-14 text-[#5D5D5D]">{`$${product.price.toFixed(
                    2
                  )}`}</p>
                </div>
              </div>
            )}
            <h2 className="text-[18px] font-medium font-Heebo-16-bold mb-4 text-[#1E1E1E]">
              {sectionContent[selectedSection as keyof typeof sectionContent].title}
            </h2>
            <p className="font-Heebo-regular-16 text-[#8C8C8C]">
              {sectionContent[selectedSection as keyof typeof sectionContent].description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
