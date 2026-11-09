'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, ArrowLeft, Home, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SSLCommerzSuccess() {
  const searchParams = useSearchParams();
  const [paymentDetails, setPaymentDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Extract payment details from URL parameters
    const details = {
      tran_id: searchParams?.get('tran_id'),
      status: searchParams?.get('status'),
      val_id: searchParams?.get('val_id'),
      amount: searchParams?.get('amount'),
      currency: searchParams?.get('currency'),
      card_type: searchParams?.get('card_type'),
      card_no: searchParams?.get('card_no'),
      bank_tran_id: searchParams?.get('bank_tran_id'),
      store_amount: searchParams?.get('store_amount'),
      card_issuer: searchParams?.get('card_issuer'),
      card_brand: searchParams?.get('card_brand'),
      card_issuer_country: searchParams?.get('card_issuer_country'),
      card_issuer_country_code: searchParams?.get('card_issuer_country_code'),
      currency_type: searchParams?.get('currency_type'),
      currency_amount: searchParams?.get('currency_amount'),
      currency_rate: searchParams?.get('currency_rate'),
      base_fair: searchParams?.get('base_fair'),
      value_a: searchParams?.get('value_a'),
      value_b: searchParams?.get('value_b'),
      value_c: searchParams?.get('value_c'),
      value_d: searchParams?.get('value_d'),
      risk_title: searchParams?.get('risk_title'),
      risk_level: searchParams?.get('risk_level'),
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    setPaymentDetails(details);
    setIsLoading(false);
  }, [searchParams]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-pulse flex flex-col items-center">
          <CheckCircle className="h-12 w-12 text-gray-300 mb-4" />
          <div className="h-4 w-32 bg-gray-200 rounded mb-2"></div>
          <div className="h-3 w-24 bg-gray-100 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl py-12 sm:py-16 lg:py-20">
        {/* Success Banner */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <CheckCircle className="h-8 w-8 sm:h-10 sm:w-10 text-green-600" />
          </div>
          
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">
            Payment Successful!
          </h1>
          
          <p className="text-gray-600 text-lg">
            Thank you for your payment. Your order has been confirmed.
          </p>
        </div>

        {/* Payment Details */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <span className="text-sm font-medium text-gray-500">Transaction ID</span>
                <p className="text-lg font-semibold text-gray-900">{paymentDetails?.tran_id}</p>
              </div>
              
              <div>
                <span className="text-sm font-medium text-gray-500">Amount</span>
                <p className="text-lg font-semibold text-gray-900">
                  {paymentDetails?.amount} {paymentDetails?.currency}
                </p>
              </div>
              
              <div>
                <span className="text-sm font-medium text-gray-500">Payment Method</span>
                <p className="text-lg font-semibold text-gray-900">
                  {paymentDetails?.card_type || 'SSLCommerz'}
                </p>
              </div>
              
              <div>
                <span className="text-sm font-medium text-gray-500">Date & Time</span>
                <p className="text-lg font-semibold text-gray-900">{paymentDetails?.date}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              {paymentDetails?.card_issuer && (
                <div>
                  <span className="text-sm font-medium text-gray-500">Card Issuer</span>
                  <p className="text-lg font-semibold text-gray-900">{paymentDetails.card_issuer}</p>
                </div>
              )}
              
              {paymentDetails?.bank_tran_id && (
                <div>
                  <span className="text-sm font-medium text-gray-500">Bank Transaction ID</span>
                  <p className="text-lg font-semibold text-gray-900">{paymentDetails.bank_tran_id}</p>
                </div>
              )}
              
              {paymentDetails?.card_brand && (
                <div>
                  <span className="text-sm font-medium text-gray-500">Card Brand</span>
                  <p className="text-lg font-semibold text-gray-900">{paymentDetails.card_brand}</p>
                </div>
              )}
              
              <div>
                <span className="text-sm font-medium text-gray-500">Status</span>
                <p className="text-lg font-semibold text-green-600">Completed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="flex items-center gap-2">
            <Link href="/shop">
              <ShoppingBag className="h-4 w-4" />
              Continue Shopping
            </Link>
          </Button>
          
          <Button variant="outline" asChild className="flex items-center gap-2">
            <Link href="/">
              <Home className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            A confirmation email has been sent to your email address.
          </p>
          <p className="text-sm text-gray-500 mt-1">
            If you have any questions, please contact our support team.
          </p>
        </div>
      </div>
    </div>
  );
} 