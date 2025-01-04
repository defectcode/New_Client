import { useEffect, useState } from "react";
import Image from "next/image";
import { formatPrice } from "@/utils/string/format-price";
import CheckoutButton from "@/app/checkout/components/ButtonCheckout";
import Link from "next/link";
import { CheckoutCartHom } from "../../CheckoutCartHom";
import { useCart } from "@/hooks/useCart";
import '../PayPal.css'

interface CartWindowDesktopProps {
  product: {
    title: string;
    price: number;
    images: string[];
    quantity?: number;
    color: string;
  };
  onClose: () => void; // Function to close the cart window
}

export function CartWindowDesktop({ product, onClose }: CartWindowDesktopProps) {
    const [isCartVisible, setIsCartVisible] = useState(false);
    const { items, total } = useCart();

    const totalItemsCount = items.reduce((accumulator, item) => accumulator + item.quantity, 0);
    const itemText = totalItemsCount === 1 ? 'item' : 'items';
  
    const estimatedTax = total * 0.2;
    const finalTotal = total + estimatedTax;


  
    const toggleCartVisibility = () => {
      setIsCartVisible(!isCartVisible);
    };
  useEffect(() => {
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => {
      document.body.style.overflow = "";
      clearTimeout(timer);
    };
  }, [onClose]);

  return (
    <>

      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose} // Close the cart when the background is clicked
      ></div>

      <div className="fixed top-5 right-0 bg-[#F9F9F9] shadow-lg rounded-l-[20px] z-50 w-[400px]">
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <Image src="/images/bif.svg" alt="bif" width={20} height={20} />
            <h2 className="text-[16px] font-medium text-[#1E1E1E]">1 Item Added To Bag</h2>
          </div>
          <button
            className="text-[16px] text-black"
            onClick={onClose} 
          >
            <Image src="/images/close.svg" alt="close" width={14} height={14} />
          </button>
        </div>

        <div className="relative p-5">
          <div className="absolute top-0 left-0 right-0 h-5 bg-gradient-to-b from-black/10 to-transparent z-10"></div>

          <div className="flex items-center gap-4 relative z-20">
            <div className="w-[100px] h-[100px] bg-white flex items-center justify-center rounded">
              <Image
                src={product.images[0]}
                alt={product.title}
                width={90}
                height={90}
                className="object-cover rounded"
              />
            </div>
            <div className="space-y-[5px]">
              <h3 className="text-[15px] font-semibold truncate max-w-[300px] text-[#1E1E1E]">{product.title}</h3>
              <h4 className="text-[14px] font-medium text-[#8C8C8C]">{product.color}</h4>
              <p className="text-[#5D5D5D] text-[14px]">{formatPrice(product.price)}</p>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-5 bg-gradient-to-t from-black/10 to-transparent z-10"></div>
        </div>

        <div className="p-5 border-t border-gray-200">
          <div className="flex items-center justify-between text-[16px] border-b pb-5">
            <div className="flex gap-1">
              <p className="font-Heebo-18 text-[#1E1E1E]">Total</p>
              <p className="font-Heebo-semi-15 text-[#8C8C8C]">{`(${totalItemsCount} ${itemText})`}</p>
            </div>
            <span className="font-Heebo-18 text-[#1E1E1E]">{formatPrice(total)}</span>
          </div>
          <div className="flex flex-col items-center justify-center mt-5 space-y-[10px]">
            <Link href="/bag" className="flex-1 w-full">
              <button
                  className="font-Heebo-16 border border-black/50 rounded-[10px] w-full h-[48px] flex items-center justify-center bg-white text-[#424242]"
                >
                  View Bag
                </button>
            </Link>

              <Link href="/checkout" className="flex-1 w-full">
                <button className="font-bold border border-black/50 rounded-[10px] w-full h-[48px] flex items-center justify-center bg-black text-white">
                  Checkout
                </button>
              </Link>
            </div>
        </div>
      </div>
    </>
  );
}
