import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Minus, Plus } from 'lucide-react';
import { ConfirmDeleteModal } from '@/components/layouts/main-layout/header/header-menu/header-cart/cart-item/components/ConfirmDeleteModal';

interface CartQuantityActionsProps {
  item: {
    id: number;
    quantity: number;
  };
  onQuantityChange: (id: number, type: 'plus' | 'minus') => void;
  onRemove: (id: number) => void;
}

export function CartQuantityActions({
  item,
  onQuantityChange,
  onRemove,
}: CartQuantityActionsProps) {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleMinusClick = () => {
    if (item.quantity === 1) {
      setShowConfirm(true); 
    } else {
      onQuantityChange(item.id, 'minus');
    }
  };

  const handleConfirmDelete = () => {
    onRemove(item.id);
    setShowConfirm(false);
  };

  return (
    <div className="flex items-center space-x-2">
      <Button
        onClick={handleMinusClick}
        variant="ghost"
        size="icon"
        className="p-1"
        disabled={item.quantity === 0}
      >
        <Minus width={12} height={12} />
      </Button>

      <input
        readOnly
        value={item.quantity}
        className="w-10 text-center border border-gray-300 rounded"
      />

      <Button
        onClick={() => onQuantityChange(item.id, 'plus')}
        variant="ghost"
        size="icon"
        className="p-1"
      >
        <Plus width={12} height={12} />
      </Button>

      {showConfirm && (
        <ConfirmDeleteModal
          onConfirm={handleConfirmDelete}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
}
