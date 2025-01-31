import Image from 'next/image';
import Link from 'next/link';
import { PUBLIC_URL } from '@/config/url.config';
import { IProduct } from '@/shared/types/product.interface';
import { formatPrice } from '@/utils/string/format-price';
import './style/PreOrderProducts.css';
import { Color } from '@/components/ui/catalog/product-card/components/Color';
import { useEffect, useState } from 'react';

interface PreOrderProductsProps {
  product: IProduct;
  isBlurred: boolean;
  isBestSeller?: boolean;
}

export function PreOrderProducts({ product, isBlurred, isBestSeller }: PreOrderProductsProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="bg-transparent relative w-full sm:w-[350px] rounded-[10px] font-heebo">
      <div className={`product-image-container relative group mb-5 rounded-[10px] ${isBlurred ? 'blur-effect' : ''}`}>
        {!isBlurred ? (
          <Link href={PUBLIC_URL.product(product.id)} className="block">
            <Image
              src={product.images[0]}
              alt={product.title}
              width={350}
              height={500}
              className="product-image rounded-[16px] bg-transparent object-cover sm:w-[350px] sm:h-[500px] w-[190px] h-[270px] transition-opacity duration-500"
            />
          </Link>
        ) : (
          <div className="block">
            <Image
              src={product.images[0]}
              alt={product.title}
              width={350}
              height={500}
              className="product-image rounded-[16px] bg-transparent object-cover sm:w-[350px] sm:h-[500px] w-[190px] h-[270px] transition-opacity duration-500"
            />
          </div>
        )}

        <div className="button-center">
          {isBlurred ? (
            <button className="bg-[#FFFFFF] text-[#1E1E1E] flex items-center justify-center h-[40px] md:w-[160px] p-5 rounded-[10px] font-semibold">
              Coming soon
            </button>
          ) : isMobile ? (
            <div className="">
              <button className="button-blur">Pre-order</button>
            </div>
          ) : (
            <div className="button-blur-container">
              <button className="button-content md:w-[160px] h-[40px] text-[15px] font-semibold rounded-[10px]">
                Pre-order
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between mt-[10px]">
        <h3 className="font-Heebo-16-semi text-[#000000]">{product.title}</h3>
        <div className="font-Heebo-15-reg text-[#424242] flex items-center justify-between gap-5 md:block hidden">
          <span>{formatPrice(product.price)}</span>
        </div>
      </div>

      <Color product={product} />
    </div>
  );
}
