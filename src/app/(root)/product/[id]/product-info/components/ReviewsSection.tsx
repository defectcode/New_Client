import Image from 'next/image';
import { FC, useState } from 'react';
import { sectionContent } from '../constants/sectionContent';
import Modal from './Modal';
import '../Production.css';

interface ReviewProduct {
  product: {
    id: string;
    title: string;
    price: number;
    images: string[];
    color: string | { name: string };
    description: string;
  };
}

export const ReviewsSection: FC<ReviewProduct> = ({ product }) => {
  const reviews = sectionContent.reviews;
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div>
      {/* Rating general */}
      {reviews.rating && (
        <div className="md:flex items-center justify-between mb-10">
          <div className="flex items-center gap-[10px]">
            <div className="flex items-center gap-1">
              {[...Array(Math.floor(reviews.rating))].map((_, i) => (
                <Image
                  key={i}
                  src="/images/black-star.svg"
                  alt="star"
                  width={10}
                  height={10}
                />
              ))}
            </div>
            <span className="text-[15px] text-[#8C8C8C]">
              {reviews.rating.toFixed(1)} stars
            </span>
          </div>
          <div>
            <span className="text-[#424242] font-Heebo-r-16 underline md:mt-0 mt-5">
              Write a review
            </span>
          </div>
        </div>
      )}

      {/* Comments Preview */}
      <div className="grid grid-cols-2 gap-x-20 md:gap-y-[80px] gap-y-5 w-full max-md:flex max-md:flex-col">
        {reviews.comments?.slice(0, 2).map((comment, i) => (
          <div
            key={i}
            className={`pb-4 max-w-[400px] w-full border-b ${
              i === 1 ? 'max-md:border-none' : ''
            }`}
          >
            <h3 className="font-Heebo-16-semi text-[#1E1E1E]">{comment.title}</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 my-5">
                {[...Array(comment.rating)].map((_, j) => (
                  <Image
                    key={j}
                    src="/images/black-star.svg"
                    alt="star"
                    width={10}
                    height={10}
                  />
                ))}
              </div>
              <p className="font-Heebo-15-reg text-[#8C8C8C]">{comment.user}</p>
            </div>
            <p className="font-Heebo-15-regular text-[#8C8C8C]">{comment.text}</p>
          </div>
        ))}
      </div>

      {/* More Reviews Button */}
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          openModal();
        }}
        className="text-[#424242] mt-4 block underline md:mb-0"
      >
        More Reviews
      </a>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        reviews={reviews.comments ?? []}
        product={product}
      />


    </div>
  );
};
