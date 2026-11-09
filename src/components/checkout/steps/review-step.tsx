'use client';

import { Button } from '@/components/ui/button';
import { CheckoutState, ValidationError } from '@/types/checkout';
import { AlertCircle, ArrowLeft, CreditCard, MapPin, Truck, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useState } from 'react';

interface ReviewStepProps {
  checkout: CheckoutState;
  onChange: (updatedValues: Partial<CheckoutState>) => void;
  onPlaceOrder: () => void;
  onBack: () => void;
  isProcessing: boolean;
  validationErrors: ValidationError[];
  setValidationErrors: (errors: ValidationError[]) => void;
}

export default function ReviewStep({
  checkout,
  onChange,
  onPlaceOrder,
  onBack,
  isProcessing,
  validationErrors,
  setValidationErrors
}: ReviewStepProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  // Format currency in English numbers
  const formatCurrency = (amount: number) => {
    return `BDT ${amount.toLocaleString('en-US')}`;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate terms agreement
    if (!checkout.agreeToTerms) {
      setValidationErrors([
        { field: 'terms', message: 'You must agree to the terms and conditions to place your order' }
      ]);
      return;
    }
    
    // Clear validation errors
    setValidationErrors([]);
    
    // Open confirmation dialog instead of placing order immediately
    setConfirmOpen(true);
  };
  
  const handleConfirm = () => {
    setConfirmOpen(false);
    onPlaceOrder();
  };
  
  // Helper to format payment method display
  const formatPaymentMethod = (method: string) => {
    switch (method) {
      case 'credit_card':
        return 'Credit Card';
      case 'debit_card':
        return 'Debit Card';
      case 'bkash':
        return 'bKash';
      case 'nagad':
        return 'Nagad';
      case 'cash_on_delivery':
        return 'Cash on Delivery';
      default:
        return method.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
    }
  };
  
  // Helper to display masked card number
  const formatCardNumber = (cardNumber: string) => {
    const lastDigits = cardNumber.replace(/\s/g, '').slice(-4);
    return `•••• ${lastDigits}`;
  };
  
  return (
    <div className="p-4 sm:p-6 md:p-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Review</h2>
      
      {/* Form */}
      <form onSubmit={handleSubmit}>
        {/* System-level error */}
        {validationErrors.some(err => err.field === 'system' || err.field === 'payment') && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center gap-2 text-red-600">
              <AlertCircle className="h-5 w-5" />
              <p className="text-sm font-medium">
                {validationErrors.find(err => err.field === 'system' || err.field === 'payment')?.message}
              </p>
            </div>
          </div>
        )}
        
        <div className="space-y-6">
          {/* Delivery Information */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center mb-3">
              <MapPin className="h-5 w-5 text-gray-600 mr-2" />
              <h3 className="text-sm font-semibold text-gray-900">Delivery Information</h3>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600 mb-1">Shipping Address</p>
                <div className="text-gray-800">
                  <p>
                    {checkout.shippingAddress.firstName} {checkout.shippingAddress.lastName}
                  </p>
                  <p>{checkout.shippingAddress.addressLine1}</p>
                  {checkout.shippingAddress.addressLine2 && (
                    <p>{checkout.shippingAddress.addressLine2}</p>
                  )}
                  <p>
                    {checkout.shippingAddress.city}, {checkout.shippingAddress.state} {checkout.shippingAddress.postalCode}
                  </p>
                  <p>{checkout.shippingAddress.country}</p>
                  <p className="mt-1">{checkout.shippingAddress.phone}</p>
                </div>
              </div>
              
              <div>
                <p className="text-gray-600 mb-1">Billing Address</p>
                <div className="text-gray-800">
                  {checkout.sameAsShipping ? (
                    <p className="text-gray-500 italic">Same as shipping address</p>
                  ) : (
                    <>
                      <p>
                        {checkout.billingAddress.firstName} {checkout.billingAddress.lastName}
                      </p>
                      <p>{checkout.billingAddress.addressLine1}</p>
                      {checkout.billingAddress.addressLine2 && (
                        <p>{checkout.billingAddress.addressLine2}</p>
                      )}
                      <p>
                        {checkout.billingAddress.city}, {checkout.billingAddress.state} {checkout.billingAddress.postalCode}
                      </p>
                      <p>{checkout.billingAddress.country}</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Shipping Method */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center mb-3">
              <Truck className="h-5 w-5 text-gray-600 mr-2" />
              <h3 className="text-sm font-semibold text-gray-900">Shipping Method</h3>
            </div>
            
            <div className="text-sm">
              <p className="font-medium text-gray-800">{checkout.selectedShipping.name}</p>
              <p className="text-gray-600">Estimated delivery: {checkout.selectedShipping.estimatedDelivery}</p>
              <p className="text-gray-600 mt-1">
                {checkout.selectedShipping.price === 0 
                  ? 'Free shipping' 
                  : `${formatCurrency(checkout.selectedShipping.price)}`
                }
              </p>
            </div>
          </div>
          
          {/* Payment Method */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center mb-3">
              <CreditCard className="h-5 w-5 text-gray-600 mr-2" />
              <h3 className="text-sm font-semibold text-gray-900">Payment Method</h3>
            </div>
            
            <div className="text-sm">
              <p className="font-medium text-gray-800">{formatPaymentMethod(checkout.paymentMethod)}</p>
              
              {/* Card details if credit/debit card */}
              {(checkout.paymentMethod === 'credit_card' || checkout.paymentMethod === 'debit_card') && checkout.cardInfo && (
                <div className="mt-1 text-gray-600">
                  <p>{formatCardNumber(checkout.cardInfo.cardNumber)}</p>
                  <p>{checkout.cardInfo.cardholderName}</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Order Items */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center mb-4">
              <ShoppingBag className="h-5 w-5 text-gray-600 mr-2" />
              <h3 className="text-sm font-semibold text-gray-900">Order Items ({checkout.cart.items.length})</h3>
            </div>
            
            <div className="divide-y divide-gray-200">
              {checkout.cart.items.map(item => (
                <div key={item.id} className="py-3 flex items-center gap-3">
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
                    <h4 className="text-sm font-medium text-gray-900 truncate">{item.name}</h4>
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
            
            <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
              <div className="flex justify-between text-sm">
                <p className="text-gray-600">Subtotal</p>
                <p className="font-medium text-gray-900">{formatCurrency(checkout.cart.subtotal)}</p>
              </div>
              
              <div className="flex justify-between text-sm">
                <p className="text-gray-600">Shipping</p>
                <p className="font-medium text-gray-900">
                  {checkout.cart.shipping === 0 ? 'Free' : formatCurrency(checkout.cart.shipping)}
                </p>
              </div>
              
              {checkout.cart.discount > 0 && (
                <div className="flex justify-between text-sm">
                  <p className="text-gray-600">Discount</p>
                  <p className="font-medium text-green-600">-{formatCurrency(checkout.cart.discount)}</p>
                </div>
              )}
              
              <div className="flex justify-between pt-2 border-t border-gray-200 mt-2">
                <p className="font-semibold text-gray-900">Total</p>
                <p className="font-semibold text-gray-900">{formatCurrency(checkout.cart.total)}</p>
              </div>
            </div>
          </div>
          
          {/* Terms and conditions */}
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                checked={checkout.agreeToTerms}
                onChange={(e) => onChange({ agreeToTerms: e.target.checked })}
                className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="terms" className="text-gray-700">
                I agree to the{' '}
                <a href="/terms" className="font-medium text-black hover:underline">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="/privacy" className="font-medium text-black hover:underline">
                  Privacy Policy
                </a>
              </label>
              
              {validationErrors.some(err => err.field === 'terms') && (
                <p className="mt-1 text-xs text-red-500">
                  {validationErrors.find(err => err.field === 'terms')?.message}
                </p>
              )}
            </div>
          </div>
          
          {/* Navigation buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              disabled={isProcessing}
              className="order-2 sm:order-1 flex-1 border-gray-300 hover:bg-gray-50 hover:text-black"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Payment
            </Button>
            
            <Button
              type="submit"
              disabled={isProcessing}
              className="order-1 sm:order-2 flex-1 bg-black hover:bg-gray-800 text-white h-12"
            >
              {isProcessing ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </div>
              ) : (
                'Place Order'
              )}
            </Button>
          </div>
        </div>
      </form>
      {/* Confirmation Dialog */}
      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Your Order</DialogTitle>
            <DialogDescription>
              Are you sure you want to place this order and proceed to payment with Uddokta Pay?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirm} className="bg-black text-white">
              Yes, Place Order
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 