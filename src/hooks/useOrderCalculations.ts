import { useMemo } from 'react';

interface ICartItem {
  product: {
    price: number;
  };
  quantity: number;
}

interface OrderCalculations {
  subtotal: number;
  estimatedTax: number;
  total: number;
}

const TAX_RATE = 0.2;

export const useOrderCalculations = (items: ICartItem[]): OrderCalculations => {
  const calculations = useMemo(() => {
    const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const estimatedTax = subtotal * TAX_RATE;
    const total = subtotal + estimatedTax;

    return { subtotal, estimatedTax, total };
  }, [items]);

  return calculations;
};
