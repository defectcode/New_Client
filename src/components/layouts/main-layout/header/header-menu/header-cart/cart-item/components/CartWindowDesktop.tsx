import { useEffect } from "react";
import Image from "next/image";
import { formatPrice } from "@/utils/string/format-price";
import CheckoutButton from "@/app/checkout/ButtonCheckout";

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
  // Disable scroll while the cart window is open
  useEffect(() => {
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      onClose(); // Automatically close the cart after 5 seconds
    }, 5000);

    return () => {
      document.body.style.overflow = ""; // Re-enable scrolling when the cart is closed
      clearTimeout(timer); // Clear the timeout to avoid errors
    };
  }, [onClose]);

  return (
    <>
      {/* Overlay for darkened background */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose} // Close the cart when the background is clicked
      ></div>

      {/* Cart Window */}
      <div className="fixed top-5 right-0 bg-white shadow-lg rounded-l-[20px] z-50 w-[400px]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <Image src="/images/bif.svg" alt="bif" width={20} height={20} />
            <h2 className="text-[18px] font-medium text-[#1E1E1E]">1 Item Added To Bag</h2>
          </div>
          <button
            className="text-[16px] text-black"
            onClick={onClose} // Close the cart window
          >
            <Image src="/images/close.svg" alt="close" width={14} height={14} />
          </button>
        </div>

        {/* Product Details */}
        <div className="relative p-5">
          {/* Top Gradient */}
          <div className="absolute top-0 left-0 right-0 h-5 bg-gradient-to-b from-black/10 to-transparent z-10"></div>

          <div className="flex items-start gap-4 py-5 relative z-20">
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
              <h3 className="text-[18px] font-medium text-[#1E1E1E]">{product.title}</h3>
              <h4 className="text-[16px] font-medium text-[#8C8C8C]">{product.color}</h4>
              <p className="text-[#1E1E1E] text-[14px]">{formatPrice(product.price)}</p>
            </div>
          </div>

          {/* Bottom Gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-5 bg-gradient-to-t from-black/10 to-transparent z-10"></div>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-gray-200">
          <div className="flex items-center justify-between text-[16px]">
            <div className="flex gap-1">
              <p className="font-Heebo-18 text-[#1E1E1E]">Total</p>
              <p className="font-Heebo-16 text-[#8C8C8C]">(1 item)</p>
            </div>
            <span className="font-Heebo-18 text-[#1E1E1E]">{formatPrice(product.price)}</span>
          </div>
          <div className="space-y-5 mt-5 border-t pt-5">
            <CheckoutButton />
            <button className="w-full mb-2 bg-[#1E1E1E] flex items-center justify-center h-[48px] rounded-[10px]">
              <Image src="/images/applepayBlack.svg" alt="applepay" width={42} height={16} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
