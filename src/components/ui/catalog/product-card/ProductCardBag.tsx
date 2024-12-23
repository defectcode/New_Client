import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PUBLIC_URL } from '@/config/url.config';
import { IProduct } from '@/shared/types/product.interface';
import { FavoriteButton } from '@/app/(root)/product/[id]/product-info/FavoriteButton';
import './ProductCard.css';
import { ColorSelector } from './components/ColorSelector';
import { CartActions } from '@/components/layouts/main-layout/header/header-menu/header-cart/cart-item/CartActions';
import { ICartItem } from '@/shared/types/cart.interface';
import { COLORS } from '@/app/(root)/product/[id]/product-info/constants/Colors';

interface ProductCardProps {
  item: ICartItem;
  product: IProduct;
  isLast: boolean;
}

export function ProductCardBag({ item, product, isLast }: ProductCardProps) {
  const availableColors = COLORS.map((color) => color.name);
  const [quantity, setQuantity] = useState(1);


  const [selectedColor, setSelectedColor] = useState(() => {
    const savedColor = localStorage.getItem(`selectedColor-${product.id}`);
    return savedColor || availableColors[0];
  });

  useEffect(() => {
    localStorage.setItem(`selectedColor-${product.id}`, selectedColor);
  }, [selectedColor, product.id]);

  return (
    <div className={`bg-transparent py-5 ${!isLast ? 'border-b border-[#7C788A]/20' : ''}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center justify-center h-[140px] min-w-[140px] max-w-[140px] bg-[#FFFFFF] rounded-[10px]">
            <Link
              href={PUBLIC_URL.product(product.id)}
              className="relative h-[126px] w-[126px] rounded-[10px] overflow-hidden"
            >
              <Image
                src={product.images[0]}
                alt={product.title}
                fill
                className="object-cover"
              />
            </Link>
          </div>

          <div className="ml-[10px] space-y-6 w-full">
            <div className="flex items-center justify-between">
              <h2 className="font-Heebo-18 text-[#1E1E1E] truncate-2-lines">
                {product.title}
              </h2>
              <FavoriteButton product={product} />
            </div>

            <ColorSelector
              colors={availableColors}
              selectedColor={selectedColor}
              onColorSelect={(color) => setSelectedColor(color)}
            />

            <div className="flex items-center justify-between">
              <p className="font-Heebo-16-med text-[#5D5D5D]">
                ${ (product.price * quantity).toFixed(2) }
              </p>
              <div className="flex items-center space-x-[30px]">
                <CartActions item={item} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
