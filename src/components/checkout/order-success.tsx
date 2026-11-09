'use client';

import Link from 'next/link';
import { CheckCircle, Download, Home, ShoppingBag, Truck, ArrowRight, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CheckoutState } from '@/types/checkout';
import Image from 'next/image';

interface OrderSuccessProps {
  orderId: string;
  orderDetails: CheckoutState;
}

export default function OrderSuccess({ orderId, orderDetails }: OrderSuccessProps) {
  // Format currency in English numbers
  const formatCurrency = (amount: number) => {
    return `BDT ${amount.toLocaleString('en-US')}`;
  };
  
  // Get current date and estimate delivery date
  const getCurrentDate = () => {
    const date = new Date();
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl py-12 sm:py-16 lg:py-20">
        {/* Success Banner */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <CheckCircle className="h-8 w-8 sm:h-10 sm:w-10 text-green-600" />
          </div>
          
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">
            Order Confirmed!
          </h1>
          
          <p className="text-gray-600 text-lg">
            Thank you for your purchase. Your order has been received.
          </p>
        </div>
        
        {/* Order Information */}
        <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 border border-gray-100 mb-8 sm:mb-10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1">
                Order #{orderId}
              </h2>
              <p className="text-gray-600 text-sm">
                Placed on {getCurrentDate()}
              </p>
            </div>
            
            <div className="flex gap-3">
              <Button asChild variant="outline" size="sm" className="h-9 border-gray-200 text-gray-700 hover:bg-gray-50">
                <Link href="#" className="flex items-center">
                  <Download className="mr-1.5 h-4 w-4" />
                  Receipt
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="sm" className="h-9 border-gray-200 text-gray-700 hover:bg-gray-50">
                <Link href="#" className="flex items-center">
                  <Download className="mr-1.5 h-4 w-4" />
                  Invoice
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="space-y-6">
            {/* Order Status */}
            <div className="rounded-lg bg-white p-4 border border-gray-100">
              <div className="flex items-center mb-4">
                <Truck className="h-5 w-5 text-gray-700 mr-2" />
                <h3 className="font-medium text-gray-900">Order Status</h3>
              </div>
              
              <div className="relative">
                <div className="flex items-center relative z-10">
                  <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center shrink-0">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-gray-900">Order Confirmed</p>
                    <p className="text-sm text-gray-600">{getCurrentDate()}</p>
                  </div>
                </div>
                
                <div className="absolute top-4 left-4 bottom-0 w-0.5 bg-gray-200 ml-3 z-0"></div>
                
                <div className="flex items-center mt-6 relative z-10">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                    <Calendar className="h-4 w-4 text-gray-600" />
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-gray-900">Estimated Delivery</p>
                    <p className="text-sm text-gray-600">{orderDetails.selectedShipping.estimatedDelivery}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Order Items */}
            <div>
              <h3 className="font-medium text-gray-900 mb-4">Order Items</h3>
              
              <div className="space-y-4">
                {orderDetails.cart.items.map(item => (
                  <div key={item.id} className="flex items-start gap-4 py-3">
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
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                      <div className="flex flex-wrap gap-x-3 mt-1 text-xs text-gray-500">
                        {item.size && <p>Size: {item.size}</p>}
                        {item.colorName && <p>Color: {item.colorName}</p>}
                        <p>Qty: {item.quantity}</p>
                      </div>
                    </div>
                    
                    <div className="text-sm font-medium text-gray-900">
                      {formatCurrency(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="border-t border-gray-100 pt-6">
              <h3 className="font-medium text-gray-900 mb-4">Order Summary</h3>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <p className="text-gray-600">Subtotal</p>
                  <p className="font-medium text-gray-900">{formatCurrency(orderDetails.cart.subtotal)}</p>
                </div>
                
                <div className="flex justify-between text-sm">
                  <p className="text-gray-600">Shipping ({orderDetails.selectedShipping.name})</p>
                  <p className="font-medium text-gray-900">
                    {orderDetails.cart.shipping === 0 ? 'Free' : formatCurrency(orderDetails.cart.shipping)}
                  </p>
                </div>
                
                {orderDetails.cart.discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <p className="text-gray-600">Discount</p>
                    <p className="font-medium text-green-600">-{formatCurrency(orderDetails.cart.discount)}</p>
                  </div>
                )}
                
                <div className="flex justify-between pt-2 border-t border-gray-100 mt-2">
                  <p className="font-semibold text-gray-900">Total</p>
                  <p className="font-semibold text-gray-900">{formatCurrency(orderDetails.cart.total)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Shipping & Payment Info */}
        <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
          <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
            <h3 className="font-medium text-gray-900 mb-3">Shipping Information</h3>
            <div className="text-sm text-gray-700">
              <p className="font-medium">
                {orderDetails.shippingAddress.firstName} {orderDetails.shippingAddress.lastName}
              </p>
              <p>{orderDetails.shippingAddress.addressLine1}</p>
              {orderDetails.shippingAddress.addressLine2 && (
                <p>{orderDetails.shippingAddress.addressLine2}</p>
              )}
              <p>
                {orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.state} {orderDetails.shippingAddress.postalCode}
              </p>
              <p>{orderDetails.shippingAddress.country}</p>
              <p className="mt-1">{orderDetails.shippingAddress.phone}</p>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
            <h3 className="font-medium text-gray-900 mb-3">Payment Information</h3>
            <div className="text-sm text-gray-700">
              <p className="font-medium">
                {orderDetails.paymentMethod === 'credit_card' ? 'Credit Card' : 
                 orderDetails.paymentMethod === 'debit_card' ? 'Debit Card' : 
                 orderDetails.paymentMethod === 'cash_on_delivery' ? 'Cash on Delivery' : 
                 orderDetails.paymentMethod}
              </p>
              
              {/* Card details if credit/debit card */}
              {(orderDetails.paymentMethod === 'credit_card' || orderDetails.paymentMethod === 'debit_card') && orderDetails.cardInfo && (
                <div className="mt-1">
                  <p>
                    Card ending in {orderDetails.cardInfo.cardNumber.replace(/\s/g, '').slice(-4)}
                  </p>
                  <p>{orderDetails.cardInfo.cardholderName}</p>
                </div>
              )}
              
              {/* Billing address */}
              {!orderDetails.sameAsShipping && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <p className="font-medium mb-1">Billing Address</p>
                  <p>
                    {orderDetails.billingAddress.firstName} {orderDetails.billingAddress.lastName}
                  </p>
                  <p>{orderDetails.billingAddress.addressLine1}</p>
                  {orderDetails.billingAddress.addressLine2 && (
                    <p>{orderDetails.billingAddress.addressLine2}</p>
                  )}
                  <p>
                    {orderDetails.billingAddress.city}, {orderDetails.billingAddress.state} {orderDetails.billingAddress.postalCode}
                  </p>
                  <p>{orderDetails.billingAddress.country}</p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Call to action */}
        <div className="mt-10 sm:mt-14">
          <p className="text-center text-gray-600 mb-6">
            Have questions about your order? Visit our <Link href="/help" className="text-black font-medium hover:underline">Help Center</Link> or <Link href="/contact" className="text-black font-medium hover:underline">Contact Us</Link>.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="outline" className="border-gray-300 hover:bg-gray-50 hover:text-black">
              <Link href="/account/orders" className="flex items-center">
                <ShoppingBag className="mr-2 h-5 w-5" />
                View All Orders
              </Link>
            </Button>
            
            <Button asChild className="bg-black hover:bg-gray-800 text-white">
              <Link href="/shop" className="flex items-center">
                Continue Shopping
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 