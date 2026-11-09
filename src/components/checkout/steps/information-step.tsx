'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CheckoutState, AddressInfo, ValidationError } from '@/types/checkout';
import { countries, validateEmail, validatePhone } from '@/data/checkout';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { AlertCircle } from 'lucide-react';

interface InformationStepProps {
  checkout: CheckoutState;
  onChange: (updatedValues: Partial<CheckoutState>) => void;
  onContinue: () => void;
  validationErrors: ValidationError[];
  setValidationErrors: (errors: ValidationError[]) => void;
}

export default function InformationStep({ 
  checkout,
  onChange,
  onContinue,
  validationErrors,
  setValidationErrors
}: InformationStepProps) {
  const [formData, setFormData] = useState<AddressInfo>(checkout.shippingAddress);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const errors: ValidationError[] = [];
    
    if (!formData.firstName) {
      errors.push({ field: 'firstName', message: 'First name is required' });
    }
    
    if (!formData.lastName) {
      errors.push({ field: 'lastName', message: 'Last name is required' });
    }
    
    if (!formData.email) {
      errors.push({ field: 'email', message: 'Email is required' });
    } else if (!validateEmail(formData.email)) {
      errors.push({ field: 'email', message: 'Please enter a valid email address' });
    }
    
    if (!formData.phone) {
      errors.push({ field: 'phone', message: 'Phone number is required' });
    } else if (!validatePhone(formData.phone)) {
      errors.push({ field: 'phone', message: 'Please enter a valid phone number' });
    }
    
    if (!formData.addressLine1) {
      errors.push({ field: 'addressLine1', message: 'Address is required' });
    }
    
    if (!formData.city) {
      errors.push({ field: 'city', message: 'City is required' });
    }
    
    if (!formData.state) {
      errors.push({ field: 'state', message: 'State/Province is required' });
    }
    
    if (!formData.postalCode) {
      errors.push({ field: 'postalCode', message: 'Postal code is required' });
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
    
    // Update checkout state
    onChange({ 
      shippingAddress: formData,
      billingAddress: checkout.sameAsShipping ? formData : checkout.billingAddress
    });
    
    // Continue to next step
    onContinue();
  };
  
  const getErrorMessage = (field: string): string | undefined => {
    const error = validationErrors.find(err => err.field === field);
    return error?.message;
  };
  
  return (
    <div className="p-4 sm:p-6 md:p-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Shipping Information</h2>
      
      {/* Form */}
      <form onSubmit={handleSubmit}>
        {/* System-level error */}
        {validationErrors.some(err => err.field === 'system') && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center gap-2 text-red-600">
              <AlertCircle className="h-5 w-5" />
              <p className="text-sm font-medium">{getErrorMessage('system')}</p>
            </div>
          </div>
        )}
        
        <div className="space-y-6">
          {/* Name fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                First Name *
              </label>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                className={`bg-white border ${
                  getErrorMessage('firstName') ? 'border-red-300' : 'border-gray-200'
                } focus:ring-black focus:border-black`}
                placeholder="First Name"
                autoComplete="given-name"
              />
              {getErrorMessage('firstName') && (
                <p className="mt-1 text-xs text-red-500">{getErrorMessage('firstName')}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                Last Name *
              </label>
              <Input
                id="lastName"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                className={`bg-white border ${
                  getErrorMessage('lastName') ? 'border-red-300' : 'border-gray-200'
                } focus:ring-black focus:border-black`}
                placeholder="Last Name"
                autoComplete="family-name"
              />
              {getErrorMessage('lastName') && (
                <p className="mt-1 text-xs text-red-500">{getErrorMessage('lastName')}</p>
              )}
            </div>
          </div>
          
          {/* Contact information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address *
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={`bg-white border ${
                  getErrorMessage('email') ? 'border-red-300' : 'border-gray-200'
                } focus:ring-black focus:border-black`}
                placeholder="Email Address"
                autoComplete="email"
              />
              {getErrorMessage('email') && (
                <p className="mt-1 text-xs text-red-500">{getErrorMessage('email')}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number *
              </label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                className={`bg-white border ${
                  getErrorMessage('phone') ? 'border-red-300' : 'border-gray-200'
                } focus:ring-black focus:border-black`}
                placeholder="Phone Number"
                autoComplete="tel"
              />
              {getErrorMessage('phone') && (
                <p className="mt-1 text-xs text-red-500">{getErrorMessage('phone')}</p>
              )}
            </div>
          </div>
          
          {/* Address */}
          <div>
            <label htmlFor="addressLine1" className="block text-sm font-medium text-gray-700 mb-1">
              Address *
            </label>
            <Input
              id="addressLine1"
              name="addressLine1"
              type="text"
              value={formData.addressLine1}
              onChange={handleChange}
              className={`bg-white border ${
                getErrorMessage('addressLine1') ? 'border-red-300' : 'border-gray-200'
              } focus:ring-black focus:border-black`}
              placeholder="Street address, house number"
              autoComplete="address-line1"
            />
            {getErrorMessage('addressLine1') && (
              <p className="mt-1 text-xs text-red-500">{getErrorMessage('addressLine1')}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="addressLine2" className="block text-sm font-medium text-gray-700 mb-1">
              Apartment, suite, etc. <span className="text-gray-500 font-normal">(optional)</span>
            </label>
            <Input
              id="addressLine2"
              name="addressLine2"
              type="text"
              value={formData.addressLine2 || ''}
              onChange={handleChange}
              className="bg-white border border-gray-200 focus:ring-black focus:border-black"
              placeholder="Apartment, suite, unit, etc."
              autoComplete="address-line2"
            />
          </div>
          
          {/* City, State, Postal Code */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                City *
              </label>
              <Input
                id="city"
                name="city"
                type="text"
                value={formData.city}
                onChange={handleChange}
                className={`bg-white border ${
                  getErrorMessage('city') ? 'border-red-300' : 'border-gray-200'
                } focus:ring-black focus:border-black`}
                placeholder="City"
                autoComplete="address-level2"
              />
              {getErrorMessage('city') && (
                <p className="mt-1 text-xs text-red-500">{getErrorMessage('city')}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                State/Province *
              </label>
              <Input
                id="state"
                name="state"
                type="text"
                value={formData.state}
                onChange={handleChange}
                className={`bg-white border ${
                  getErrorMessage('state') ? 'border-red-300' : 'border-gray-200'
                } focus:ring-black focus:border-black`}
                placeholder="State/Province"
                autoComplete="address-level1"
              />
              {getErrorMessage('state') && (
                <p className="mt-1 text-xs text-red-500">{getErrorMessage('state')}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
                Postal Code *
              </label>
              <Input
                id="postalCode"
                name="postalCode"
                type="text"
                value={formData.postalCode}
                onChange={handleChange}
                className={`bg-white border ${
                  getErrorMessage('postalCode') ? 'border-red-300' : 'border-gray-200'
                } focus:ring-black focus:border-black`}
                placeholder="Postal Code"
                autoComplete="postal-code"
              />
              {getErrorMessage('postalCode') && (
                <p className="mt-1 text-xs text-red-500">{getErrorMessage('postalCode')}</p>
              )}
            </div>
          </div>
          
          {/* Country */}
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
              Country *
            </label>
            <Select value={formData.country}>
              <SelectTrigger id="country" name="country" className="bg-white border border-gray-200 focus:ring-black focus:border-black">
                <SelectValue placeholder="Select a country" />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country.value} value={country.value} onClick={() => {
                    setFormData(prev => ({
                      ...prev,
                      country: country.value
                    }));
                  }}>
                    {country.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Special instructions */}
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
              Special instructions <span className="text-gray-500 font-normal">(optional)</span>
            </label>
            <textarea
              id="notes"
              name="notes"
              value={checkout.notes || ''}
              onChange={(e) => onChange({ notes: e.target.value })}
              className="w-full min-h-[100px] rounded-md border border-gray-200 focus:ring-black focus:border-black bg-white"
              placeholder="Any special instructions for delivery"
            ></textarea>
          </div>
          
          {/* Same as billing checkbox */}
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="sameAsBilling"
                name="sameAsBilling"
                type="checkbox"
                checked={checkout.sameAsShipping}
                onChange={(e) => onChange({ sameAsShipping: e.target.checked })}
                className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="sameAsBilling" className="text-gray-700">
                Billing address is the same as shipping address
              </label>
            </div>
          </div>
          
          {/* Continue button */}
          <div>
            <Button
              type="submit"
              className="w-full bg-black hover:bg-gray-800 text-white py-5 sm:py-6 rounded-lg text-sm sm:text-base font-medium"
            >
              Continue to Shipping
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
} 