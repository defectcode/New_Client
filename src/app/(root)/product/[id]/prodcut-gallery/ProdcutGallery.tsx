import Image from 'next/image';
import { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { IProduct } from '@/shared/types/product.interface';
import { cn } from '@/utils/clsx';

import './ProductGallery.css';
import { FavoriteButton } from '../product-info/FavoriteButton';

interface ProductGalleryProps {
  product: IProduct;
}

export function ProductGallery({ product }: ProductGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handlePrevImage = (): void => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : product.images.length - 1
    );
  };

  const handleNextImage = (): void => {
    setCurrentIndex((prevIndex) =>
      prevIndex < product.images.length - 1 ? prevIndex + 1 : 0
    );
  };

  // Swipeable handlers for mobile
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleNextImage(),
    onSwipedRight: () => handlePrevImage(),
    preventScrollOnSwipe: false, // Allow scroll
    trackMouse: false,
  });

  return (
    <div className="flex flex-col lg:flex-row lg:space-x-4">
      {/* Scrollable container for thumbnails (desktop) */}
      <div className="relative hidden lg:block" style={{ maxHeight: '758px' }}>
        <div
          className="flex flex-col gap-3 overflow-y-auto no-scrollbar custom-scrollbar"
          style={{ maxHeight: '758px' }}
        >
          {product.images.map((image: string, index: number) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                'duration-300 border rounded-lg overflow-hidden',
                index === currentIndex ? 'border-black' : 'border-transparent'
              )}
              style={{
                width: '104px',
                height: '104px',
                flexShrink: 0,
              }}
            >
              <Image
                src={image}
                alt={product.title}
                layout="fixed"
                width={104}
                height={104}
              />
            </button>
          ))}
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
      </div>

      {/* Main image - displayed on both desktop and mobile */}
      <div className="relative w-full lg:w-auto" {...swipeHandlers}>
        <Image
          src={product.images[currentIndex]}
          alt={product.title}
          width={758}
          height={758}
          className="md:rounded-lg h-[430px] lg:h-[758px] w-[430px] lg:w-[758px]"
        />

        <div className="absolute top-5 right-5 z-10 md:hidden">
          <FavoriteButton product={product} />
        </div>

        {/* Navigation overlays for mobile */}
        <div className="lg:hidden absolute inset-0 flex">
          {/* Left overlay */}
          <div
            onClick={handlePrevImage}
            className="w-1/2 h-full bg-transparent cursor-pointer"
          ></div>
          {/* Right overlay */}
          <div
            onClick={handleNextImage}
            className="w-1/2 h-full bg-transparent cursor-pointer"
          ></div>
        </div>

        {/* Navigation arrows for desktop */}
        <div className="hidden lg:flex absolute bottom-5 right-10 space-x-[10px] items-center">
          <button
            onClick={handlePrevImage}
            className="bg-[#A1A1A1]/10 shadow-lg rounded-full w-[32px] h-[32px] flex items-center justify-center hover:shadow-md focus:outline-none"
          >
            <Image src="/images/leftArrow.svg" alt="arrow" width={6} height={10} />
          </button>
          <button
            onClick={handleNextImage}
            className="bg-[#A1A1A1]/10 shadow-lg rounded-full w-[32px] h-[32px] flex items-center justify-center hover:shadow-md focus:outline-none"
          >
            <Image src="/images/rightArrow.svg" alt="arrow" width={6} height={10} />
          </button>
        </div>

        {/* Dots indicator for mobile */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 lg:hidden flex space-x-2">
          {product.images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                'w-2 h-2 rounded-full',
                index === currentIndex ? 'bg-black scale-150' : 'bg-gray-400 opacity-70'
              )}
              style={{
                transition: 'transform 0.3s ease, background-color 0.3s ease',
              }}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
}
