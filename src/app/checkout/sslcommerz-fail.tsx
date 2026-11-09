'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { XCircle, ArrowLeft, Home, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SSLCommerzFail() {
  const searchParams = useSearchParams();
  const [errorDetails, setErrorDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Extract error details from URL parameters
    const details = {
      tran_id: searchParams?.get('tran_id'),
      status: searchParams?.get('status'),
      error: searchParams?.get('error'),
      amount: searchParams?.get('amount'),
      currency: searchParams?.get('currency'),
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    setErrorDetails(details);
    setIsLoading(false);
  }, [searchParams]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-pulse flex flex-col items-center">
          <XCircle className="h-12 w-12 text-gray-300 mb-4" />
          <div className="h-4 w-32 bg-gray-200 rounded mb-2"></div>
          <div className="h-3 w-24 bg-gray-100 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl py-12 sm:py-16 lg:py-20">
        {/* Error Banner */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <XCircle className="h-8 w-8 sm:h-10 sm:w-10 text-red-600" />
          </div>
          
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">
            Payment Failed
          </h1>
          
          <p className="text-gray-600 text-lg">
            We're sorry, but your payment could not be processed. Please try again.
          </p>
        </div>

        {/* Error Details */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Transaction Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <span className="text-sm font-medium text-gray-500">Transaction ID</span>
                <p className="text-lg font-semibold text-gray-900">{errorDetails?.tran_id}</p>
              </div>
              
              <div>
                <span className="text-sm font-medium text-gray-500">Amount</span>
                <p className="text-lg font-semibold text-gray-900">
                  {errorDetails?.amount} {errorDetails?.currency}
                </p>
              </div>
              
              <div>
                <span className="text-sm font-medium text-gray-500">Date & Time</span>
                <p className="text-lg font-semibold text-gray-900">{errorDetails?.date}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <span className="text-sm font-medium text-gray-500">Status</span>
                <p className="text-lg font-semibold text-red-600">Failed</p>
              </div>
              
              {errorDetails?.error && (
                <div>
                  <span className="text-sm font-medium text-gray-500">Error Message</span>
                  <p className="text-lg font-semibold text-red-600">{errorDetails.error}</p>
                </div>
              )}
              
              <div>
                <span className="text-sm font-medium text-gray-500">Payment Method</span>
                <p className="text-lg font-semibold text-gray-900">SSLCommerz</p>
              </div>
            </div>
          </div>
        </div>

        {/* Common Reasons */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-yellow-800 mb-3">Common Reasons for Payment Failure</h3>
          <ul className="space-y-2 text-sm text-yellow-700">
            <li>• Insufficient funds in your account</li>
            <li>• Incorrect card details or expired card</li>
            <li>• Bank declined the transaction for security reasons</li>
            <li>• Network connectivity issues</li>
            <li>• Transaction timeout</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="flex items-center gap-2">
            <Link href="/checkout">
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Link>
          </Button>
          
          <Button variant="outline" asChild className="flex items-center gap-2">
            <Link href="/shop">
              <ArrowLeft className="h-4 w-4" />
              Back to Shop
            </Link>
          </Button>
          
          <Button variant="outline" asChild className="flex items-center gap-2">
            <Link href="/">
              <Home className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>

        {/* Support Info */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            If you continue to experience issues, please contact our support team.
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Email: support@nahda.com | Phone: +880 1234-567890
          </p>
        </div>
      </div>
    </div>
  );
} 