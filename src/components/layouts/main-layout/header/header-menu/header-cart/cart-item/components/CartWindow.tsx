import { useEffect, useState } from 'react';
import Image from 'next/image';
import { formatPrice } from '@/utils/string/format-price';
import Link from 'next/link';
import { CheckoutCartHome } from '../../CheckoutCartHome';
import { CheckoutCartHom } from '../../CheckoutCartHom';
import { useCart } from '@/hooks/useCart';

interface CartWindowProps {
  product: {
    title: string;
    price: number;
    images: string[];
    quantity?: number;
    color: string;
  };
  onClose: () => void;
}

export function CartWindow({ product, onClose }: CartWindowProps) {

  const [isCartVisible, setIsCartVisible] = useState(false);
  const { items, total } = useCart();

  const totalItemsCount = items.reduce((accumulator, item) => accumulator + item.quantity, 0);
  const itemText = totalItemsCount === 1 ? 'item' : 'items';

  const estimatedTax = total * 0.2;
  const finalTotal = total + estimatedTax;

  const toggleCartVisibility = () => {
    setIsCartVisible(!isCartVisible);
  };
  // Disable scroll when the component is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => {
      document.body.style.overflow = '';
      clearTimeout(timer); 
    };
  }, [onClose]);

  return (
    <>
      {/* Overlay for darkened background */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      ></div>

      {/* Cart Window */}
      <div className="md:hidden fixed inset-x-0 bottom-0 bg-[#F9F9F9] shadow-lg rounded-t-2xl z-50">
        <div className="py-5">
          <div className="flex items-center justify-between px-5">
            <div className="flex gap-[10px]">
              <Image src="/images/bif.svg" alt="bif" width={20} height={20} />
              <h2 className="text-[16px] font-medium text-[#1E1E1E]">1 Item Added To Bag</h2>
            </div>
            <button
              className="text-[16px] text-black"
              onClick={onClose} // Close the component on click
            >
              <Image src="/images/close.svg" alt="close" width={14} height={14} />
            </button>
          </div>

          {/* Product Details */}
          <div className="px-5 mt-4 relative ">
            <div className="absolute top-0 left-0 right-0 h-5 bg-gradient-to-b from-black/10 to-transparent z-10"></div>

            <div className="flex items-center gap-4 py-5 relative z-20">
              {/* z-20 ensures content is above the gradient */}
              <div className="w-[90px] h-[90px]">
                <Image
                  src={product.images[0]}
                  alt={product.title}
                  width={90}
                  height={90}
                  className="object-cover rounded"
                />
              </div>
              <div className='flex flex-col items-start justify-center'>
                <h3 className="text-[16px] font-medium text-[#1E1E1E]">{product.title}</h3>
                <h3 className="text-[16px] font-medium text-[#8C8C8C]">{product.color}</h3>
                <p className="text-[#1E1E1E] text-[14px]">{formatPrice(product.price)}</p>
              </div>
            </div>

            {/* Bottom Gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-5 bg-gradient-to-t from-black/10 to-transparent z-10"></div>
          </div>

          <div className="pt-5 px-5">
            <div className="flex items-center justify-between text-[16px] pb-5 border-b">
              <div className="flex gap-1">
                <p className="font-Heebo-18 text-[#1E1E1E]">Total</p>
                <p className="font-Heebo-16 text-[#8C8C8C]">{`(${totalItemsCount} ${itemText})`}</p>
              </div>
              <span className="font-Heebo-18 text-[#1E1E1E]">{formatPrice(total)}</span>
            </div>
            <div className="flex items-center justify-center space-x-4 mt-5">
            <Link href="/bag" className="flex-1 max-w-[185px]">
              <button
                className="font-bold border border-black/50 rounded-[10px] w-full h-[48px] flex items-center justify-center bg-white text-[#424242]"
                >
                  View Bag
                </button>
              </Link>

              <Link href="/checkout" className="flex-1 max-w-[185px]">
                <button className="font-bold border border-black/50 rounded-[10px] w-full h-[48px] flex items-center justify-center bg-black text-white">
                  Checkout
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
