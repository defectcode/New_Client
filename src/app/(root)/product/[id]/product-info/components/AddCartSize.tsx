import { useActions } from "@/hooks/useActions";
import { useCart } from "@/hooks/useCart";
import { IProduct } from "@/shared/types/product.interface";
import { useState } from "react";
import { CartWindow } from "@/components/layouts/main-layout/header/header-menu/header-cart/cart-item/components/CartWindow";
import "./style/CartSize.css";
import Size from "@/components/ui/catalog/product-card/components/size/Size";
import { CartWindowDesktop } from "@/components/layouts/main-layout/header/header-menu/header-cart/cart-item/components/CartWindowDesktop";

interface AddToCartButtonProps {
  product: IProduct;
}

export function AddCartSize({ product }: AddToCartButtonProps) {
  const { addToCart, removeFromCart } = useActions();
  const { items } = useCart();
  const [isCartVisible, setIsCartVisible] = useState(false);
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
      setRecentlyAddedProduct(product);
      setIsCartVisible(true);
    }
  };

  const handleCloseCartWindow = () => {
    setIsCartVisible(false);
  };

  return (
    <>
      <button
        className="bg-transparent font-Heebo-14-reg text-[#1E1E1E] border border-transparent w-full"
        onClick={handleAddToCart}
      >
        <Size/>
      </button>

      {isCartVisible && recentlyAddedProduct && (
        <>
          <div className="md:hidden">
            <CartWindow
              product={{
                title: recentlyAddedProduct.title,
                price: recentlyAddedProduct.price,
                images: recentlyAddedProduct.images,
                color: recentlyAddedProduct.color?.name || "N/A", 
              }}
              onClose={handleCloseCartWindow}
            />
          </div>

          <div className="hidden md:block">
            <CartWindowDesktop
              product={{
                title: recentlyAddedProduct.title,
                price: recentlyAddedProduct.price,
                images: recentlyAddedProduct.images,
                color: recentlyAddedProduct.color?.name || "N/A",
              }}
              onClose={handleCloseCartWindow}
            />
          </div>
        </>
      )}
    </>
  );
}
