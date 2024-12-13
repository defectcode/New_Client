import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { useActions } from '@/hooks/useActions';
import { useCart } from '@/hooks/useCart';
import { ICartItem } from '@/shared/types/cart.interface';
import { ConfirmDeleteModal } from './components/ConfirmDeleteModal';
import { Minus, Plus } from 'lucide-react';

interface CartActionsProps {
  item: ICartItem;
}

export function CartActions({ item }: CartActionsProps) {
  const { changeQuantity, removeFromCart } = useActions();
  const { items } = useCart();
  const [showConfirm, setShowConfirm] = useState(false);
  const quantity = items.find(cartItem => cartItem.id === item.id)?.quantity;

  const handleMinusClick = () => {
    if (quantity === 1) {
      setShowConfirm(true);
    } else {
      changeQuantity({ id: item.id, type: 'minus' });
    }
  };

  const handleConfirmDelete = () => {
    removeFromCart({ id: item.id });
    setShowConfirm(false);
  };

  const handleCancelDelete = () => {
    setShowConfirm(false);
  };

  return (
    <div className="flex items-center space-x-1 mt-1">
      <Button
        onClick={handleMinusClick}
        variant="ghost"
        size="icon"
        className="p-0 bg-transparent hover:bg-transparent"
        disabled={quantity === 0}
      >
        <Minus width={11} height={11} />
      </Button>

      <input
        disabled
        readOnly
        value={quantity}
        className="w-8 text-center text-sm px-0 bg-transparent"
      />

      <Button
        onClick={() => changeQuantity({ id: item.id, type: 'plus' })}
        variant="ghost"
        size="icon"
        className="p-0 bg-transparent hover:bg-transparent"
      >
        <Plus width={11} height={11} />
      </Button>

      {showConfirm && (
        <ConfirmDeleteModal
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
}
