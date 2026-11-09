'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Check, ChevronRight, Gift, Loader2 } from 'lucide-react';
import { CouponInfo } from '@/types/cart';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface CartSummaryProps {
  totalAmount: number;
  totalQuantity: number;
  onApplyCoupon: (code: string) => void;
  couponInfo?: CouponInfo;
  isProcessingCoupon?: boolean;
}

export default function CartSummary({
  totalAmount,
  totalQuantity,
  onApplyCoupon,
  couponInfo,
  isProcessingCoupon = false,
}: CartSummaryProps) {
  const [couponCode, setCouponCode] = useState('');
  const [isSubmittingCoupon, setIsSubmittingCoupon] = useState(false);
  
  // Format currency in English numbers
  const formatCurrency = (amount: number) => {
    return `৳${amount.toLocaleString('en-US')}`;
  };
  
  const handleCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    
    setIsSubmittingCoupon(true);
    
    // Simulate network request
    setTimeout(() => {
      onApplyCoupon(couponCode.trim());
      setIsSubmittingCoupon(false);
    }, 500);
  };

  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-md overflow-hidden">
      <div className="p-4 sm:p-6 md:p-8">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1 sm:mb-2">Order Summary</h2>
        
        {/* Order details */}
        <div className="mt-4 sm:mt-6 space-y-4 sm:space-y-5">
          <div className="flex justify-between text-sm">
            <p className="text-gray-600">Subtotal ({totalQuantity} items)</p>
            <p className="font-medium text-gray-900">{formatCurrency(totalAmount)}</p>
          </div>
          
          {/* Coupon code */}
          <div className="border-t border-gray-200 pt-4 sm:pt-5">
            <p className="text-sm text-gray-600 mb-2 sm:mb-3">Discount</p>
            
            {/* Coupon form */}
            <form onSubmit={handleCouponSubmit} className="flex space-x-2">
              <div className="relative flex-1">
                <Gift className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter coupon code"
                  className="pl-10 h-10 sm:h-11 text-sm rounded-lg border-gray-200 focus:border-gray-300 focus:ring-0 focus:ring-offset-0"
                  disabled={isSubmittingCoupon || isProcessingCoupon}
                />
              </div>
              <Button 
                type="submit"
                variant="outline"
                disabled={!couponCode.trim() || isSubmittingCoupon || isProcessingCoupon}
                className="h-10 sm:h-11 px-3 sm:px-4 rounded-lg border-gray-200 hover:bg-gray-50 hover:text-black"
              >
                {isSubmittingCoupon || isProcessingCoupon ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  'Apply'
                )}
              </Button>
            </form>
            
            {/* Coupon feedback */}
            {couponInfo && (
              <div className={`mt-2 text-xs ${couponInfo.isValid ? 'text-green-600' : 'text-red-500'}`}>
                {couponInfo.isValid ? (
                  <p className="flex items-center">
                    <Check className="h-3 w-3 mr-1" />
                    {couponInfo.discountType === 'percentage' 
                      ? `${couponInfo.discountValue}% discount applied`
                      : `${formatCurrency(couponInfo.discountValue)} discount applied`
                    }
                  </p>
                ) : (
                  <p>{couponInfo.errorMessage}</p>
                )}
              </div>
            )}
          </div>
          
          {/* Total */}
          <div className="flex justify-between border-t border-gray-200 pt-4 sm:pt-5">
            <p className="text-base font-semibold text-gray-900">Total</p>
            <p className="text-base font-semibold text-gray-900">{formatCurrency(totalAmount)}</p>
          </div>
        </div>
        
        {/* Checkout button */}
        <div className="mt-6 sm:mt-8">
          <Button
            className="w-full bg-black hover:bg-gray-800 text-white py-5 sm:py-6 rounded-lg text-sm sm:text-base font-medium"
            disabled={totalQuantity === 0}
            asChild
          >
            <Link href="/checkout" className="inline-flex items-center justify-center">
              Proceed to Checkout
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        {/* Info */}
        <p className="mt-4 text-xs text-gray-500 text-center">
          Free shipping on orders over ৳2000
        </p>
      </div>
    </div>
  );
} 