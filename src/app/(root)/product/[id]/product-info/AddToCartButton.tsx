import { Button } from "@/components/ui/Button";
import { useActions } from "@/hooks/useActions";
import { useCart } from "@/hooks/useCart";
import { IProduct } from "@/shared/types/product.interface";
import { useState } from "react";
import { CartWindow } from "@/components/layouts/main-layout/header/header-menu/header-cart/cart-item/components/CartWindow";
import { CartWindowDesktop } from "@/components/layouts/main-layout/header/header-menu/header-cart/cart-item/components/CartWindowDesktop";

interface AddToCartButtonProps {
  product: IProduct;
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addToCart, removeFromCart } = useActions();
  const { items } = useCart();
  const [isCartVisible, setIsCartVisible] = useState(false); // State to control visibility of cart
  const [recentlyAddedProduct, setRecentlyAddedProduct] = useState<IProduct | null>(null);

  const currentElement = items.find(
    (cartItem) => cartItem.product.id === product.id
  );

  const handleAddToCart = () => {
    if (currentElement) {
      removeFromCart({ id: currentElement.id });
    } else {
      addToCart({
        product,
        quantity: 1,
        price: product.price,
      });
      setRecentlyAddedProduct(product); // Set the recently added product
      setIsCartVisible(true); // Show the cart window
    }
  };

  const handleCloseCartWindow = () => {
    setIsCartVisible(false); // Close the cart window
  };

  return (
    <>
      <button
        className="bg-transparent text-[#1E1E1E] border-[#1E1E1E] border rounded-[10px] max-w-[393px] h-[48px] w-full font-Heebo-16"
        onClick={handleAddToCart}
      >
        {currentElement ? "Remove from Bag" : "Add to Bag"}
      </button>

      {isCartVisible && recentlyAddedProduct && (
        <>
          {/* Mobile Version */}
          <div className="md:hidden">
            <CartWindow
              product={{
                title: recentlyAddedProduct.title,
                price: recentlyAddedProduct.price,
                images: recentlyAddedProduct.images,
                color: recentlyAddedProduct.color.name, // Assuming color is available
              }}
              onClose={handleCloseCartWindow}
            />
          </div>

          {/* Desktop Version */}
          <div className="hidden md:block">
            <CartWindowDesktop
              product={{
                title: recentlyAddedProduct.title,
                price: recentlyAddedProduct.price,
                images: recentlyAddedProduct.images,
                color: recentlyAddedProduct.color.name, // Assuming color is available
              }}
              onClose={handleCloseCartWindow}
            />
          </div>
        </>
      )}
    </>
  );
}
