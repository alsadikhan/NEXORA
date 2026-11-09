'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CheckoutState, CardInfo, PaymentMethod, ValidationError } from '@/types/checkout';
import { paymentProviders } from '@/data/checkout';
import { AlertCircle, ArrowLeft, CreditCard, Calendar, User, Lock } from 'lucide-react';
import Image from 'next/image';

interface PaymentStepProps {
  checkout: CheckoutState;
  onChange: (updatedValues: Partial<CheckoutState>) => void;
  onContinue: () => void;
  onBack: () => void;
  validationErrors: ValidationError[];
  setValidationErrors: (errors: ValidationError[]) => void;
}

export default function PaymentStep({
  checkout,
  onChange,
  onContinue,
  onBack,
  validationErrors,
  setValidationErrors
}: PaymentStepProps) {
  const [cardInfo, setCardInfo] = useState<CardInfo>(checkout.cardInfo || {
    cardNumber: '',
    cardholderName: '',
    expiryDate: '',
    cvv: ''
  });
  
  const handleCardInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Format card number with spaces
    if (name === 'cardNumber') {
      const formattedValue = value
        .replace(/\s/g, '')
        .replace(/\D/g, '')
        .replace(/(.{4})/g, '$1 ')
        .trim()
        .slice(0, 19);
        
      setCardInfo(prev => ({
        ...prev,
        [name]: formattedValue
      }));
      return;
    }
    
    // Format expiry date with slash
    if (name === 'expiryDate') {
      const cleaned = value.replace(/\D/g, '');
      let formattedValue = cleaned;
      
      if (cleaned.length > 2) {
        formattedValue = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
      }
      
      setCardInfo(prev => ({
        ...prev,
        [name]: formattedValue
      }));
      return;
    }
    
    // Format CVV (numbers only, max 4 digits)
    if (name === 'cvv') {
      const formattedValue = value.replace(/\D/g, '').slice(0, 4);
      
      setCardInfo(prev => ({
        ...prev,
        [name]: formattedValue
      }));
      return;
    }
    
    setCardInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSelectPaymentMethod = (method: PaymentMethod) => {
    onChange({ paymentMethod: method });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate payment method and card info if credit card
    const errors: ValidationError[] = [];
    
    if (checkout.paymentMethod === 'credit_card' || checkout.paymentMethod === 'debit_card') {
      if (!cardInfo.cardNumber || cardInfo.cardNumber.replace(/\s/g, '').length < 16) {
        errors.push({ field: 'cardNumber', message: 'Please enter a valid card number' });
      }
      
      if (!cardInfo.cardholderName) {
        errors.push({ field: 'cardholderName', message: 'Please enter the cardholder name' });
      }
      
      if (!cardInfo.expiryDate || cardInfo.expiryDate.length < 5) {
        errors.push({ field: 'expiryDate', message: 'Please enter a valid expiry date' });
      } else {
        // Validate expiry date format and value
        const [month, year] = cardInfo.expiryDate.split('/');
        const currentYear = new Date().getFullYear() % 100;
        const currentMonth = new Date().getMonth() + 1;
        
        if (
          !month || 
          !year || 
          parseInt(month) < 1 || 
          parseInt(month) > 12 || 
          (parseInt(year) < currentYear || 
            (parseInt(year) === currentYear && parseInt(month) < currentMonth))
        ) {
          errors.push({ field: 'expiryDate', message: 'Please enter a valid future date' });
        }
      }
      
      if (!cardInfo.cvv || cardInfo.cvv.length < 3) {
        errors.push({ field: 'cvv', message: 'Please enter a valid security code' });
      }
    }
    
    if (errors.length > 0) {
      setValidationErrors(errors);
      
      // Scroll to the first error
      const firstErrorField = document.querySelector(`[name="${errors[0].field}"]`);
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      
      return;
    }
    
    // Clear validation errors
    setValidationErrors([]);
    
    // Update checkout state with card info
    if (checkout.paymentMethod === 'credit_card' || checkout.paymentMethod === 'debit_card') {
      onChange({ cardInfo });
    }
    
    // Continue to next step
    onContinue();
  };
  
  const getErrorMessage = (field: string): string | undefined => {
    const error = validationErrors.find(err => err.field === field);
    return error?.message;
  };
  
  // Show all payment methods
  const availablePaymentProviders = paymentProviders;
  
  // Helper to get placeholder image for payment methods without proper icons
  const getPaymentMethodIcon = (methodId: PaymentMethod) => {
    const iconMap: Record<PaymentMethod, string> = {
      credit_card: '/credit-card-icon.svg',
      debit_card: '/debit-card-icon.svg',
      bkash: 'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748995000/bkash_mj7xio.png',
      nagad: 'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748995000/nagad_jngxpr.png',
      cash_on_delivery: '/cod-icon.svg',
      paypal: '/paypal-icon.svg',
      apple_pay: '/apple-pay-icon.svg',
      google_pay: '/google-pay-icon.svg',
      sslcommerz: '/images/payment/sslcommerz.svg',
    };
    
    return iconMap[methodId] || '/credit-card-icon.svg';
  };
  
  return (
    <div className="p-4 sm:p-6 md:p-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment Method</h2>
      
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
          {/* Payment methods */}
          <h3 className="text-sm font-medium text-gray-900 mb-3">Select payment method</h3>
          <div className="space-y-3">
            {availablePaymentProviders.map((provider) => (
              <label
                key={provider.id}
                className={`flex items-start p-4 border rounded-lg cursor-pointer transition-colors ${
                  checkout.paymentMethod === provider.id
                    ? 'border-black bg-gray-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value={provider.id}
                  checked={checkout.paymentMethod === provider.id}
                  onChange={() => onChange({ paymentMethod: provider.id })}
                  className="h-4 w-4 mt-1 text-black focus:ring-black border-gray-300"
                />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-12 relative flex items-center justify-center bg-gray-100 rounded overflow-hidden">
                      <img src={provider.icon} alt={provider.name} width={48} height={32} className="object-contain" />
                    </div>
                    <span className="font-medium text-gray-900">{provider.name}</span>
                  </div>
                </div>
                <div className="mt-1 text-sm text-gray-600">
                  <p>{provider.description}</p>
                </div>
              </label>
            ))}
          </div>
          
          {/* Billing Address Review */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-900">Billing Address</h3>
            </div>
            
            <div className="text-sm text-gray-700">
              {checkout.sameAsShipping ? (
                <>
                  <p className="mb-2">Same as shipping address</p>
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
                </>
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
          
          {/* Navigation buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              className="order-2 sm:order-1 flex-1 border-gray-300 hover:bg-gray-50 hover:text-black"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Shipping
            </Button>
            
            <Button
              type="submit"
              className="order-1 sm:order-2 flex-1 bg-black hover:bg-gray-800 text-white"
            >
              Review Order
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
} 