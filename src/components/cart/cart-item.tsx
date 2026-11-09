'use client';

import { CartItem as CartItemType } from '@/lib/features/cartSlice';
import { useRemoveFromCart } from '@/lib/hooks/useAddToCart';
import { Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { handleRemoveFromCart, isLoading } = useRemoveFromCart();
  
  const handleRemove = () => {
    handleRemoveFromCart(item.id, item.name, item.size, item.color);
  };
  
  return (
    <div className="flex items-center gap-4 py-4 border-b border-gray-200">
      <Link href={`/shop/product/${item.id}`} className="flex-shrink-0">
        <div className="relative w-20 h-20">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover rounded-md"
          />
        </div>
      </Link>
      <div className="flex-grow">
        <Link href={`/shop/product/${item.id}`} className="block">
          <h3 className="text-sm font-medium text-gray-900 hover:text-primary">
            {item.name}
          </h3>
          </Link>
            {item.size && (
          <p className="text-sm text-gray-500 mt-1">Size: {item.size}</p>
            )}
                  {item.color && (
          <p className="text-sm text-gray-500 mt-1">Color: {item.color}</p>
            )}
        <div className="mt-1 flex items-center justify-between">
          <p className="text-sm font-medium text-gray-900">
            ৳{item.price.toLocaleString()}
          </p>
          <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
        </div>
      </div>
      <button
        onClick={handleRemove}
        disabled={isLoading}
        className="flex-shrink-0 p-2 text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50"
        aria-label="Remove item"
      >
        <Trash2 className="h-5 w-5" />
      </button>
    </div>
  );
} 