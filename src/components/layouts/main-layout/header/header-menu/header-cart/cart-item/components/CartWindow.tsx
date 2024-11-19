import { useEffect } from 'react';
import Image from 'next/image';
import { formatPrice } from '@/utils/string/format-price';
import Link from 'next/link';

interface CartWindowProps {
  product: {
    title: string;
    price: number;
    images: string[];
    quantity?: number;
    color: string;
  };
  onClose: () => void; // Funcție pentru închiderea componentei
}

export function CartWindow({ product, onClose }: CartWindowProps) {
  // Dezactivează scroll-ul când componenta este deschisă
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const timer = setTimeout(() => {
      onClose(); // Închide automat după 5 secunde
    }, 5000);

    return () => {
      document.body.style.overflow = ''; // Reactivăm scroll-ul când componenta se închide
      clearTimeout(timer); // Curățăm timer-ul pentru a evita erori
    };
  }, [onClose]);

  return (
    <div className="md:hidden fixed inset-x-0 bottom-0 bg-[#F9F9F9] shadow-lg rounded-t-2xl z-50">
      <div className="py-5">
        <div className="flex items-center justify-between px-5">
          <div className="flex gap-[10px]">
            <Image src="/images/bif.svg" alt="bif" width={20} height={20} />
            <h2 className="text-[16px] font-medium text-[#1E1E1E]">1 Item Added To Bag</h2>
          </div>
          <button
            className="text-[16px] text-black"
            onClick={onClose} // Închide componenta la clic
          >
            <Image src="/images/close.svg" alt="close" width={14} height={14} />
          </button>
        </div>

        {/* Detaliile produsului recent adăugat */}
        <div className="px-5 mt-4 relative">
            <div className="absolute top-0 left-0 right-0 h-5 bg-gradient-to-b from-black/10 to-transparent z-10"></div>

            <div className="flex items-start gap-4 py-5 relative z-20"> {/* z-20 pentru a aduce conținutul deasupra gradientului */}
                <div className="w-[90px] h-[90px]">
                <Image
                    src={product.images[0]}
                    alt={product.title}
                    width={90}
                    height={90}
                    className="object-cover rounded"
                />
                </div>
                <div>
                <h3 className="text-[16px] font-medium text-[#1E1E1E]">{product.title}</h3>
                <h3 className="text-[16px] font-medium text-[#8C8C8C]">{product.color}</h3>
                <p className="text-[#1E1E1E] text-[14px]">{formatPrice(product.price)}</p>
                </div>
            </div>

            {/* Gradient de jos */}
            <div className="absolute bottom-0 left-0 right-0 h-5 bg-gradient-to-t from-black/10 to-transparent z-10"></div>
        </div>


        <div className=" pt-5 px-5">
          <div className="flex items-center justify-between text-[16px] pb-5 border-b">
            <div className="flex gap-1">
              <p className="font-Heebo-18 text-[#1E1E1E]">Total</p>
              <p className="font-Heebo-16 text-[#8C8C8C]">(1 item)</p>
            </div>
            <span className="font-Heebo-18 text-[#1E1E1E]">{formatPrice(product.price)}</span>
          </div>
          <div className="flex items-center justify-center space-x-4 mt-5">
            <Link href="/bag" className="flex-1 max-w-[185px]">
              <button className="font-bold border border-black/50 rounded-[10px] w-full h-[48px] flex items-center justify-center bg-white text-[#424242]">
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
  );
}
