import { IProduct } from '@/shared/types/product.interface'; 
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { AddToCartButton } from './components/AddToCartButton';

interface MobileSizeButtonProps {
  product: IProduct; 
}

const MobileSizeButton: React.FC<MobileSizeButtonProps> = ({ product }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const sizes = ["XS", "S", "M", "L", "XL", "2XL"];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = ""; 
    }

    return () => {
      document.body.style.overflow = ""; 
    };
  }, [isOpen]);

  const handleAddToCart = () => {
    console.log("Added to cart:", product);
    setIsOpen(false); 
  };

  return (
    <>
      <div className="absolute bottom-[10px] left-1/2 transform -translate-x-1/2 flex items-center justify-center">
        <button
          onClick={() => setIsOpen(true)}
          className="text-[#424242] font-heebo h-[30px] w-[110px] max-w-[110px] bg-[#A1A1A1]/10 rounded-[10px] backdrop-blur-sm"
        >
          Add
        </button>
      </div>


      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-50"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="fixed bottom-0 w-full max-h-[66vh] bg-[#F9F9F9] rounded-t-lg p-5 overflow-hidden"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-Heebo-16-regular">Select Size</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 text-lg"
              >
                <Image src="/images/close.svg" alt="close" width={14} height={14} />
              </button>
            </div>

            <div className="flex flex-col border-b-[1px] overflow-y-auto max-h-[45vh] mb-16">
              {sizes.map((size) => (
                <label
                  key={size}
                  className="flex items-center gap-2 cursor-pointer border-t-[1px] py-5"
                >
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5"
                    checked={selectedSize === size}
                    onChange={() =>
                      setSelectedSize((prev) => (prev === size ? null : size))
                    }
                  />
                  <span className="font-Heebo-16-regular">{size}</span>
                </label>
              ))}
            </div>

            <div className="absolute bottom-0 left-0 w-full p-5 flex items-center justify-between bg-[#FFFFFF]">
              <button
                onClick={() => setSelectedSize(null)}
                className="border border-black text-black w-[185px] h-[48px] py-2 px-5 rounded-lg"
              >
                Clear {selectedSize ? "(1)" : ""}
              </button>
              <div className='bg-black w-[185px] rounded-[10px] text-white'>
                <AddToCartButton product={product} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileSizeButton;
