import { FC, useEffect } from 'react';
import Image from 'next/image';
import '../Production.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  reviews: {
    title: string;
    rating: number;
    user: string;
    text: string;
  }[];
  product: {
    id: string;
    title: string;
    price: number;
    images: string[];
    color: string | { name: string };
    description: string;
  };
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, reviews, product }) => {

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto'; 
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose} 
    >
      <div
        className="bg-[#F9F9F9] w-full md:max-w-3xl max-h-[80vh] overflow-y-auto rounded-t-lg md:rounded-lg md:relative fixed bottom-0"
        onClick={(e) => e.stopPropagation()} 
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4 p-5">
          <div className="flex items-center gap-4">
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
          <button
            onClick={onClose}
            className="text-black font-bold text-lg"
          >
            <Image src='/images/close.svg' alt='close' width={14} height={14} />
          </button>
        </div>

        <div className="flex flex-col items-center justify-center mb-10">
          <Image src="/images/stars.svg" alt="stars" width={174} height={28} />
          <h2 className="text-[#1E1E1E] mt-5">REVIEWS (25)</h2>
        </div>

        {/* Reviews */}
        <div className="bg-white divide-y px-5">
            <div className='border-b '>
                <h3 className='pt-10 mb-5 font-Heebo-16-bold text-[#1E1E1E]'>1-2 of 2 Reviews</h3>
                <div className='flex items-center justify-between mb-5'>
                    <div className=''>
                        <h2 className='text-[#1E1E1E]'>Sort</h2>
                        <p className='text-[#8C8C8C]'>Most Recent</p>
                    </div>
                    <Image src='/images/arr.svg' alt='arrow' width={9} height={5}/>
                </div>
                <div className='flex items-center justify-between mb-5'>
                    <div className=''>
                        <h2 className='text-[#1E1E1E]'>Filter</h2>
                        <p className='text-[#8C8C8C]'>Star Rating</p>
                    </div>
                    <Image src='/images/arr.svg' alt='arrow' width={9} height={5}/>
                </div>
            </div>
          {reviews.map((comment, i) => (
            <div key={i} className="py-5">
              <h3 className="font-Heebo-16-semi text-[#1E1E1E]">{comment.title}</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 my-2">
                  {[...Array(comment.rating)].map((_, j) => (
                    <Image
                      key={j}
                      src="/images/black-star.svg"
                      alt="star"
                      width={15}
                      height={15}
                    />
                  ))}
                </div>
                <p className="font-Heebo-15-reg text-[#8C8C8C]">{comment.user}</p>
              </div>
              <p className="font-Heebo-15-regular text-[#8C8C8C]">{comment.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Modal;
