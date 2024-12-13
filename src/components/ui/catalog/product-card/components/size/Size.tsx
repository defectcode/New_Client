import { useState } from 'react';
import './style/Size.module.css'

const Size = () => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const handleSizeClick = (size: string) => {
    setSelectedSize(size);
  };

  return (
    <div className="hidden group-hover:flex flex-col absolute bottom-0 left-0 w-full h-[100px] backdrop-blur-sm  justify-center items-center gap-2 rounded-b-[10px]">
      <h3 className="text-center font-Heebo-14-regular text-[#1E1E1E] md:block hidden">
        Quick Add
      </h3>
      {/* <AddToCartButton product={}/> */}
      <div className="flex gap-2 font-Heebo-15-semibold font-semibold">
        {['XS', 'S', 'M', 'L', 'XL', '2XL'].map((size) => (
          <button
            key={size}
            onClick={() => handleSizeClick(size)}
            className={`h-10 w-10 text-[#1E1E1E] border border-transparent rounded-[10px] hover:bg-[#000000] hover:text-[#FFFFFF] ${
              selectedSize === size ? 'bg-[#000000] text-[#FFFFFF]' : 'bg-[#FFFFFF]'
            }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Size;
