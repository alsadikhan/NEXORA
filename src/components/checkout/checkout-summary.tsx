'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { CheckoutState } from '@/types/checkout';

interface CheckoutSummaryProps {
  checkout: CheckoutState;
}

export default function CheckoutSummary({ checkout }: CheckoutSummaryProps) {
  const [isCartExpanded, setIsCartExpanded] = useState(false);
  
  // Format currency in English numbers
  const formatCurrency = (amount: number) => {
    return `BDT ${amount.toLocaleString('en-US')}`;
  };
  
  // Toggle cart items visibility on mobile
  const toggleCartExpanded = () => {
    setIsCartExpanded(!isCartExpanded);
  };
  
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
      <div className="p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Order Summary</h2>
          <span className="text-sm text-gray-600">
            {checkout.cart.items.length} {checkout.cart.items.length === 1 ? 'item' : 'items'}
          </span>
        </div>
        
        {/* Mobile toggle for items */}
        <button
          type="button"
          className="md:hidden w-full flex items-center justify-between py-2 border-t border-b border-gray-100 my-2"
          onClick={toggleCartExpanded}
        >
          <span className="text-sm font-medium">
            {isCartExpanded ? 'Hide order details' : 'Show order details'}
          </span>
          {isCartExpanded ? (
            <ChevronUp className="h-4 w-4 text-gray-500" />
          ) : (
            <ChevronDown className="h-4 w-4 text-gray-500" />
          )}
        </button>
        
        {/* Cart items */}
        <div className={`${isCartExpanded ? 'block' : 'hidden'} md:block mb-4`}>
          <div className="max-h-80 overflow-y-auto pr-1 space-y-4">
            {checkout.cart.items.map((item) => (
              <div key={item.id} className="flex items-start gap-3">
                <div className="h-16 w-16 flex-shrink-0 relative rounded overflow-hidden border border-gray-200">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                      <ShoppingBag className="h-6 w-6 text-gray-400" />
                    </div>
                  )}
                  <div className="absolute top-0 right-0 bg-gray-800 text-white text-xs font-medium px-1 rounded-bl">
                    {item.quantity}
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-900 truncate">{item.name}</h4>
                  <div className="flex flex-wrap gap-x-2 mt-1">
                    {item.size && (
                      <p className="text-xs text-gray-500">Size: {item.size}</p>
                    )}
                    {item.colorName && (
                      <p className="text-xs text-gray-500">Color: {item.colorName}</p>
                    )}
                  </div>
                </div>
                
                <div className="text-sm font-medium text-gray-900">
                  {formatCurrency(item.price)}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-100">
            <Link
              href="/cart"
              className="text-sm text-gray-600 hover:text-black hover:underline"
            >
              Edit cart
            </Link>
          </div>
        </div>
        
        {/* Price breakdown */}
        <div className="space-y-3 pt-4 border-t border-gray-100">
          <div className="flex justify-between text-sm">
            <p className="text-gray-600">Subtotal</p>
            <p className="font-medium text-gray-900">{formatCurrency(checkout.cart.subtotal)}</p>
          </div>
          
          <div className="flex justify-between text-sm">
            <p className="text-gray-600">Shipping</p>
            <p className="font-medium text-gray-900">
              {checkout.selectedShipping.price === 0 
                ? 'Free' 
                : formatCurrency(checkout.selectedShipping.price)
              }
            </p>
          </div>
          
          {checkout.cart.discount > 0 && (
            <div className="flex justify-between text-sm">
              <p className="text-gray-600">Discount</p>
              <p className="font-medium text-green-600">
                -{formatCurrency(checkout.cart.discount)}
              </p>
            </div>
          )}
        </div>
        
        {/* Total */}
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
          <p className="text-base font-semibold text-gray-900">Total</p>
          <p className="text-base font-semibold text-gray-900">
            {formatCurrency(checkout.cart.total)}
          </p>
        </div>
        
        {/* Delivery estimate */}
        {checkout.selectedShipping && (
          <div className="mt-4 bg-gray-50 p-3 rounded-lg text-xs text-gray-600">
            <p className="font-medium text-gray-900 mb-1">Estimated Delivery</p>
            <p>{checkout.selectedShipping.estimatedDelivery}</p>
          </div>
        )}
      </div>
    </div>
  );
} 