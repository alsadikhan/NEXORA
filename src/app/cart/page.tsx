'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ShoppingCart, Home } from 'lucide-react';
import CartItem from '@/components/cart/cart-item';
import CartSummary from '@/components/cart/cart-summary';
import EmptyCart from '@/components/cart/empty-cart';
import { Breadcrumb } from '@/components/shop/breadcrumb';
import { useAppSelector } from '@/lib/hooks';
import { toast } from 'sonner';
import { CouponInfo } from '@/types/cart';

export default function CartPage() {
  const { items, totalQuantity, totalAmount } = useAppSelector((state) => state.cart);
  const [isLoading, setIsLoading] = useState(true);
  const [couponInfo, setCouponInfo] = useState<CouponInfo | undefined>();
  const [isProcessingCoupon, setIsProcessingCoupon] = useState(false);
  
  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Apply coupon code
  const handleApplyCoupon = (code: string) => {
    setIsProcessingCoupon(true);
    
    // Simulate API call
    setTimeout(() => {
      // Mock coupon validation
      const isValid = code === 'WELCOME10';
      const discountValue = isValid ? 10 : 0;
      
      setCouponInfo({
        code,
        discountType: 'percentage',
        discountValue,
        isValid,
      });
      setIsProcessingCoupon(false);
      
      if (isValid) {
        toast.success('Coupon applied successfully');
      } else {
        toast.error('Invalid coupon code');
      }
    }, 800);
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-pulse flex flex-col items-center">
          <ShoppingCart className="h-12 w-12 text-gray-300 mb-4" />
          <div className="h-4 w-32 bg-gray-200 rounded mb-2"></div>
          <div className="h-3 w-24 bg-gray-100 rounded"></div>
        </div>
      </div>
    );
  }
  
  // Show empty cart if no items
  if (items.length === 0) {
    return <EmptyCart />;
  }
  
  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-6 sm:py-8">
        {/* Basic navigation */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Link href="/shop" className="p-2 hover:bg-gray-50 rounded-full transition-colors" aria-label="Back to shop">
              <ArrowLeft className="h-5 w-5 text-gray-700" />
            </Link>
            <Link href="/" className="p-2 hover:bg-gray-50 rounded-full transition-colors" aria-label="Home">
              <Home className="h-5 w-5 text-gray-700" />
            </Link>
          </div>
          <Link href="/" className="font-heading text-xl font-bold tracking-tighter">
            NEXORA
          </Link>
          <div className="w-14"></div>
        </div>
        
        {/* Breadcrumb navigation */}
        <div className="mb-6">
          <Breadcrumb 
            items={[
              { label: 'Home', href: '/' },
              { label: 'Shop', href: '/shop' },
              { label: 'Cart', href: '/cart' },
            ]} 
          />
        </div>
        
        {/* Page Title with Shopping action */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <Link 
            href="/shop" 
            className="flex items-center text-sm text-gray-600 hover:text-black transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Continue Shopping
          </Link>
        </div>
        
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 xl:gap-10">
          {/* Cart Items */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-6 lg:mb-0 border border-gray-100">
              <div className="p-4 sm:p-6 md:p-8">
                {/* Cart Items */}
                <div className="divide-y divide-gray-200">
                  {items.map(item => (
                    <CartItem
                      key={item.id}
                      item={item}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-4">
            <CartSummary 
              totalAmount={totalAmount}
              totalQuantity={totalQuantity}
              onApplyCoupon={handleApplyCoupon}
              couponInfo={couponInfo}
              isProcessingCoupon={isProcessingCoupon}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 