'use client';

import Link from 'next/link';
import { ICatalog } from './catalog.interface';
import { ProductCardBag } from './product-card/ProductCardBag';
import { useCart } from '@/hooks/useCart';
import { Summary } from './product-card/components/Summary';
import { useState, useEffect } from 'react';
import './product-card/ProductCard.css';
import { Mobile } from './product-card/components/Mobile';

export function CatalogBag({
  title,
  description,
  linkTitle,
  link,
  products
}: ICatalog) {
  const { items } = useCart();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isMobile) {
    return <Mobile />;
  }

  return (
    <div className="md:pt-14 rounded-lg md:min-h-screen max-w-[1000px] w-full mx-auto flex flex-col">
      {items.length ? (
        <div className="flex flex-wrap lg:flex-nowrap items-start justify-between gap-20">
          {/* Product List */}
          <div className="flex-grow w-full lg:max-w-[60%]">
            <h1 className="font-Heebo-24-- mb-5">Bag</h1>
            {items.map((item, index) => (
              <ProductCardBag
                item={item}
                key={item.product.id}
                product={item.product}
                isLast={index === items.length - 1}
              />
            ))}
          </div>

          <div className="flex-shrink-0 w-full lg:max-w-[400px]">
            <Summary />
          </div>
        </div>
      ) : (
        <div className="text-sm text-gray-500 text-center">The cart is empty!</div>
      )}
    </div>
  );
}
