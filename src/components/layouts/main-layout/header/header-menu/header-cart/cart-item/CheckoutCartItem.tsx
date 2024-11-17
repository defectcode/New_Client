import { useDispatch } from 'react-redux';
import { ICartItem } from '@/shared/types/cart.interface';
import { CartItem } from '@/components/layouts/main-layout/header/header-menu/header-cart/cart-item/CartItem'; // Import corectat
import { cartSlice } from '@/store/cart/cart.slice';

interface CheckoutCartItemProps {
  item: ICartItem;
  isLastItem: boolean;
  isSingleItem: boolean;
}

export function CheckoutCartItem({ item, isLastItem, isSingleItem }: CheckoutCartItemProps) {
  const dispatch = useDispatch();

  const handleRemoveItem = () => {
    dispatch(cartSlice.actions.removeFromCart({ id: item.id }));
  };

  return (
    <div className="relative flex flex-col">
      <CartItem item={item} isLastItem={isLastItem} isSingleItem={isSingleItem} />
    </div>
  );
}
