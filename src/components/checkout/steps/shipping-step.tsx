'use client';

import { Button } from '@/components/ui/button';
import { CheckoutState, ValidationError } from '@/types/checkout';
import { shippingOptions } from '@/data/cart';
import { AlertCircle, Truck, Package, Clock, ArrowLeft } from 'lucide-react';

interface ShippingStepProps {
  checkout: CheckoutState;
  onChange: (updatedValues: Partial<CheckoutState>) => void;
  onContinue: () => void;
  onBack: () => void;
  validationErrors: ValidationError[];
  setValidationErrors: (errors: ValidationError[]) => void;
}

export default function ShippingStep({
  checkout,
  onChange,
  onContinue,
  onBack,
  validationErrors,
  setValidationErrors
}: ShippingStepProps) {
  // Filter out express shipping option
  const filteredShippingOptions = shippingOptions.filter(
    option => option.id !== 'express'
  );
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate selected shipping method
    if (!checkout.selectedShipping) {
      setValidationErrors([
        { field: 'shipping', message: 'Please select a shipping method' }
      ]);
      return;
    }
    
    // Clear validation errors
    setValidationErrors([]);
    
    // Continue to next step
    onContinue();
  };
  
  // Select shipping option
  const handleSelectShipping = (shippingId: string) => {
    const selected = filteredShippingOptions.find(option => option.id === shippingId);
    
    if (selected) {
      // Update the selectedShipping and cart total
      const updatedCart = {
        ...checkout.cart,
        shipping: selected.price,
        total: checkout.cart.subtotal - checkout.cart.discount + selected.price
      };
      
      onChange({
        selectedShipping: selected,
        cart: updatedCart
      });
    }
  };
  
  // Format currency in English numbers
  const formatCurrency = (amount: number) => {
    return `BDT ${amount.toLocaleString('en-US')}`;
  };
  
  // Get shipping icon based on shipping method
  const getShippingIcon = (shippingId: string) => {
    switch (shippingId) {
      case 'free':
        return <Truck className="h-5 w-5 text-gray-600" />;
      case 'nextday':
        return <Clock className="h-5 w-5 text-gray-600" />;
      default:
        return <Package className="h-5 w-5 text-gray-600" />;
    }
  };
  
  return (
    <div className="p-4 sm:p-6 md:p-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Shipping Method</h2>
      
      {/* Form */}
      <form onSubmit={handleSubmit}>
        {/* System-level error */}
        {validationErrors.some(err => err.field === 'system' || err.field === 'shipping') && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center gap-2 text-red-600">
              <AlertCircle className="h-5 w-5" />
              <p className="text-sm font-medium">
                {validationErrors.find(err => err.field === 'system' || err.field === 'shipping')?.message}
              </p>
            </div>
          </div>
        )}
        
        <div className="space-y-6">
          {/* Shipping address review */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-900">Shipping to</h3>
              <button
                type="button"
                onClick={onBack}
                className="text-xs text-black hover:underline"
              >
                Edit
              </button>
            </div>
            
            <div className="text-sm text-gray-700">
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
              <p className="mt-1 text-gray-600">{checkout.shippingAddress.phone}</p>
            </div>
          </div>
          
          {/* Shipping methods */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Select shipping method</h3>
            <div className="space-y-3">
              {filteredShippingOptions.map((option) => (
                <label
                  key={option.id}
                  className={`flex items-start p-4 border rounded-lg cursor-pointer transition-colors ${
                    checkout.selectedShipping.id === option.id
                      ? 'border-black bg-gray-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="shipping"
                    value={option.id}
                    checked={checkout.selectedShipping.id === option.id}
                    onChange={() => handleSelectShipping(option.id)}
                    className="h-4 w-4 mt-1 text-black focus:ring-black border-gray-300"
                  />
                  <div className="ml-3 flex-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getShippingIcon(option.id)}
                        <span className="font-medium text-gray-900">{option.name}</span>
                      </div>
                      <span className="font-medium text-gray-900">
                        {option.price === 0 ? 'Free' : formatCurrency(option.price)}
                      </span>
                    </div>
                    <div className="mt-1 text-sm text-gray-600">
                      <p>{option.description}</p>
                      <p className="mt-1">Estimated delivery: {option.estimatedDelivery}</p>
                    </div>
                  </div>
                </label>
              ))}
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
              Back to Information
            </Button>
            
            <Button
              type="submit"
              className="order-1 sm:order-2 flex-1 bg-black hover:bg-gray-800 text-white"
            >
              Continue to Payment
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
} 