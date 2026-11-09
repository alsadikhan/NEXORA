'use client';

import { useState } from 'react';
import { useAppDispatch } from '../hooks';
import { addToCart, removeFromCart } from '../features/cartSlice';
import { toast } from 'sonner';

interface AddToCartParams {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity?: number;
  size?: string;
  color?: string;
}

export const useAddToCart = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async ({
    id,
    name,
    price,
    image,
    quantity = 1,
    size,
    color,
  }: AddToCartParams) => {
    setIsLoading(true);
    try {
      dispatch(
        addToCart({
          id,
          name,
          price,
          image,
          quantity,
          size,
          color,
        })
      );
      toast.success(`${name} added to cart`, {
        description: `${quantity} × ৳${price.toLocaleString()}`,
      });
    } catch {
      toast.error('Failed to add to cart');
    } finally {
      setIsLoading(false);
    }
  };

  return { handleAddToCart, isLoading };
};

export const useRemoveFromCart = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleRemoveFromCart = async (id: string, name: string, size?: string, color?: string) => {
    setIsLoading(true);
    try {
      dispatch(removeFromCart({ id, size, color }));
      toast.success(`${name} removed from cart`, {
        description: "Item successfully removed"
      });
    } catch {
      toast.error('Failed to remove from cart');
    } finally {
      setIsLoading(false);
    }
  };

  return { handleRemoveFromCart, isLoading };
}; 