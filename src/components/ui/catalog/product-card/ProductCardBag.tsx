import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { PUBLIC_URL } from '@/config/url.config';
import { IProduct } from '@/shared/types/product.interface';
import { FavoriteButton } from '@/app/(root)/product/[id]/product-info/FavoriteButton';
import './ProductCard.css';
import { ColorSelector } from './components/ColorSelector';

interface ProductCardProps {
  product: IProduct;
  isLast: boolean;
}

export function ProductCardBag({ product, isLast }: ProductCardProps) {
  // Lista de culori disponibile
  const availableColors = ['Light gray', 'Blue', 'Red', 'Black', 'Green'];

  // Stări pentru culoare selectată și cantitate
  const [selectedColor, setSelectedColor] = useState(availableColors[0]);
  const [quantity, setQuantity] = useState(1); // Cantitatea inițială

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1); // Crește cantitatea
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1); // Scade cantitatea dacă e mai mare decât 1
    }
  };

  return (
    <div className={`bg-transparent py-5 ${!isLast ? 'border-b border-[#7C788A]/20' : ''}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-center justify-between w-full">
          {/* Imaginea produsului */}
          <div className="flex items-center justify-center h-[140px] min-w-[140px] max-w-[140px] bg-[#FFFFFF]">
            <Link
              href={PUBLIC_URL.product(product.id)}
              className="relative h-[126px] w-[126px] rounded-md overflow-hidden"
            >
              <Image
                src={product.images[0]}
                alt={product.title}
                fill
                className="object-cover"
              />
            </Link>
          </div>

          {/* Detalii produs */}
          <div className="ml-[10px] space-y-6 w-full">
            <div className="flex items-center justify-between">
              <h2 className="font-Heebo-18 text-[#1E1E1E] truncate-2-lines">
                {product.title}
              </h2>
              <FavoriteButton product={product} />
            </div>

            {/* Selectorul de culori */}
            <ColorSelector
              colors={availableColors}
              selectedColor={selectedColor}
              onColorSelect={(color) => setSelectedColor(color)}
            />

            {/* Prețul și acțiunile pentru cantitate */}
            <div className='flex items-center justify-between'>
              <p className="font-Heebo-16-med text-[#5D5D5D]">
			  	${ (product.price * quantity).toFixed(2) } {/* Preț calculat cu două zecimale */}
              </p>
              <div className="flex items-center space-x-[30px]">
                {/* Buton minus */}
                <button
                  onClick={handleDecrement}
                  disabled={quantity === 1}
                  className="px-2 py-1 border-transparent rounded-md text-sm text-[#8C8C8C] disabled:opacity-50 "
                >
                  -
                </button>

                {/* Cantitate */}
                <span className="font-Heebo-15-reg">{quantity}</span>

                {/* Buton plus */}
                <button
                  onClick={handleIncrement}
                  className="px-2 py-1 border-transparent rounded-md text-sm text-[#8C8C8C]"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
