import { AddToCartButton } from '@/app/(root)/product/[id]/product-info/AddToCartButton';
import { IProduct } from '@/shared/types/product.interface'; 
import Image from 'next/image';
import { useState } from 'react';

interface MobileSizeButtonProps {
  product: IProduct; 
}

const MobileSizeButton: React.FC<MobileSizeButtonProps> = ({ product }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const sizes = ["XS", "S", "M", "L", "XL", "2XL"];

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="flex items-center gap-2">
        <Image src="/images/shoping.svg" alt="shopping" height={20} width={14} />
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-50"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="fixed bottom-0 w-full h-[70vh] bg-white rounded-t-lg p-5"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-Heebo-16-regular">Select Size</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 text-lg"
              >
                <Image src="/images/close.svg" alt="close" width={14} height={14} />
              </button>
            </div>

            <div className="flex flex-col border-b-[1px]">
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

            <div className="absolute bottom-0 left-0 w-full p-5 mb-5 flex items-center justify-between bg-white">
              <button
                onClick={() => setSelectedSize(null)}
                className="border border-black text-black w-[185px] h-[48px] py-2 px-5 rounded-lg"
              >
                Clear {selectedSize ? "(1)" : ""}
              </button>
              <div className='bg-black w-[185px] rounded-[10px] text-white font-Heebo-16-regular'>
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
