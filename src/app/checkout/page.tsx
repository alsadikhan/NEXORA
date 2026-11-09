'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Home, ShoppingBag, Shield, CreditCard, ChevronRight } from 'lucide-react';
import { CheckoutState, CheckoutStep, ValidationError } from '@/types/checkout';
import { initialCheckoutState, placeOrder } from '@/data/checkout';
import { Breadcrumb } from '@/components/shop/breadcrumb';
import CheckoutProgress from '@/components/checkout/checkout-progress';
import CheckoutSummary from '@/components/checkout/checkout-summary';
import InformationStep from '@/components/checkout/steps/information-step';
import ShippingStep from '@/components/checkout/steps/shipping-step';
import PaymentStep from '@/components/checkout/steps/payment-step';
import ReviewStep from '@/components/checkout/steps/review-step';
import OrderSuccess from '@/components/checkout/order-success';
import axios from 'axios';

export default function CheckoutPage() {
  const [checkout, setCheckout] = useState<CheckoutState>(initialCheckoutState);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
  const [orderId, setOrderId] = useState<string | null>(null);
  
  // Simulate loading data from cart
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Handle step navigation
  const handleNextStep = () => {
    const currentStepIndex = checkoutSteps.indexOf(checkout.step);
    
    if (currentStepIndex < checkoutSteps.length - 1) {
      setCheckout(prev => ({
        ...prev,
        step: checkoutSteps[currentStepIndex + 1]
      }));
      
      // Clear validation errors when advancing to next step
      setValidationErrors([]);
      
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  const handlePreviousStep = () => {
    const currentStepIndex = checkoutSteps.indexOf(checkout.step);
    
    if (currentStepIndex > 0) {
      setCheckout(prev => ({
        ...prev,
        step: checkoutSteps[currentStepIndex - 1]
      }));
      
      // Clear validation errors when going back
      setValidationErrors([]);
      
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  // Handle field updates
  const handleCheckoutChange = (updatedValues: Partial<CheckoutState>) => {
    setCheckout(prev => ({
      ...prev,
      ...updatedValues
    }));
  };
  
  // Go to a specific step directly
  const goToStep = (step: CheckoutStep) => {
    setCheckout(prev => ({
      ...prev,
      step
    }));
    
    // Clear validation errors when changing steps
    setValidationErrors([]);
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Place order
  const handlePlaceOrder = async () => {
    setIsProcessingOrder(true);

    if (checkout.paymentMethod === 'sslcommerz') {
      try {
        // Validate that all required address fields are filled
        const requiredFields = [
          checkout.shippingAddress.firstName,
          checkout.shippingAddress.lastName,
          checkout.shippingAddress.addressLine1,
          checkout.shippingAddress.city,
          checkout.shippingAddress.postalCode,
          checkout.shippingAddress.country,
          checkout.shippingAddress.phone,
          checkout.shippingAddress.email || checkout.billingAddress.email
        ];

        const missingFields = requiredFields.filter(field => !field || field.trim() === '');
        
        if (missingFields.length > 0) {
          setValidationErrors([
            { field: 'address', message: 'Please fill in all required address information before proceeding with SSLCommerz payment.' }
          ]);
          setIsProcessingOrder(false);
          return;
        }

        // Prepare SSLCommerz payment data
        const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
        const success_url = `${baseUrl}/checkout/sslcommerz-success`;
        const fail_url = `${baseUrl}/checkout/sslcommerz-fail`;
        const cancel_url = `${baseUrl}/checkout/sslcommerz-cancel`;

        const paymentData = {
          total_amount: checkout.cart.total,
          currency: 'BDT',
          cus_name: `${checkout.shippingAddress.firstName} ${checkout.shippingAddress.lastName}`,
          cus_email: checkout.shippingAddress.email || checkout.billingAddress.email || '',
          cus_phone: checkout.shippingAddress.phone || '',
          cus_add1: checkout.shippingAddress.addressLine1,
          cus_add2: checkout.shippingAddress.addressLine2 || '',
          cus_city: checkout.shippingAddress.city,
          cus_state: checkout.shippingAddress.state,
          cus_postcode: checkout.shippingAddress.postalCode,
          cus_country: checkout.shippingAddress.country,
          shipping_method: checkout.selectedShipping.name,
          num_of_item: checkout.cart.items.length,
          product_name: checkout.cart.items.map(item => item.name).join(', '),
          product_category: 'Fashion',
          product_profile: 'general',
          success_url,
          fail_url,
          cancel_url,
        };

        console.log('Payment Data being sent:', paymentData);

        const response = await axios.post('/api/sslcommerz/initiate', paymentData, {
          baseURL: typeof window !== 'undefined' ? window.location.origin : '',
        });

        if (response.data.success && response.data.gatewayPageURL) {
          // Redirect to SSLCommerz payment gateway
          window.location.href = response.data.gatewayPageURL;
          return;
        } else {
          setValidationErrors([
            { field: 'payment', message: response.data.message || 'Failed to initiate payment with SSLCommerz.' }
          ]);
        }
      } catch (error: any) {
        setValidationErrors([
          { field: 'system', message: error?.response?.data?.message || error?.message || 'Failed to connect to SSLCommerz.' }
        ]);
      } finally {
        setIsProcessingOrder(false);
      }
      return;
    }

    // Fallback for other payment methods
    try {
      const result = await placeOrder(checkout);
      if (result.success && result.orderId) {
        setOrderId(result.orderId);
      } else {
        setValidationErrors([
          { field: 'payment', message: result.error || 'An error occurred while processing your order' }
        ]);
      }
    } catch (error) {
      setValidationErrors([
        { field: 'system', message: 'An unexpected error occurred. Please try again.' }
      ]);
    } finally {
      setIsProcessingOrder(false);
    }
  };
  
  // Order of checkout steps
  const checkoutSteps: CheckoutStep[] = ['information', 'shipping', 'payment', 'review'];
  
  // If loading
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-pulse flex flex-col items-center">
          <ShoppingBag className="h-12 w-12 text-gray-300 mb-4" />
          <div className="h-4 w-32 bg-gray-200 rounded mb-2"></div>
          <div className="h-3 w-24 bg-gray-100 rounded"></div>
        </div>
      </div>
    );
  }
  
  // If order completed successfully
  if (orderId) {
    return (
      <OrderSuccess 
        orderId={orderId}
        orderDetails={checkout}
      />
    );
  }
  
  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-6 sm:py-8">
        {/* Basic navigation */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Link href="/cart" className="p-2 hover:bg-gray-50 rounded-full transition-colors" aria-label="Back to cart">
              <ArrowLeft className="h-5 w-5 text-gray-700" />
            </Link>
            <Link href="/" className="p-2 hover:bg-gray-50 rounded-full transition-colors" aria-label="Home">
              <Home className="h-5 w-5 text-gray-700" />
            </Link>
          </div>
          <Link href="/" className="font-heading text-xl font-bold tracking-tighter">
            NEXORA
          </Link>
          <div className="w-14"></div> {/* Empty div to balance the layout */}
        </div>
        
        {/* Breadcrumb navigation */}
        <div className="mb-6">
          <Breadcrumb 
            items={[
              { label: 'Home', href: '/' },
              { label: 'Shop', href: '/shop' },
              { label: 'Cart', href: '/cart' },
              { label: 'Checkout', href: '/checkout' },
            ]} 
          />
        </div>
        
        {/* Page Title */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
          <p className="text-gray-600">Complete your purchase securely</p>
        </div>
        
        {/* Checkout Progress Tracker */}
        <div className="mb-8">
          <CheckoutProgress 
            currentStep={checkout.step} 
            steps={checkoutSteps}
            onStepClick={goToStep}
          />
        </div>
        
        {/* Main Content */}
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 xl:gap-10">
          {/* Left Column - Form Steps */}
          <div className="lg:col-span-8 mb-8 lg:mb-0">
            <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
              {/* Information Step */}
              {checkout.step === 'information' && (
                <InformationStep
                  checkout={checkout}
                  onChange={handleCheckoutChange}
                  onContinue={handleNextStep}
                  validationErrors={validationErrors}
                  setValidationErrors={setValidationErrors}
                />
              )}
              
              {/* Shipping Step */}
              {checkout.step === 'shipping' && (
                <ShippingStep
                  checkout={checkout}
                  onChange={handleCheckoutChange}
                  onContinue={handleNextStep}
                  onBack={handlePreviousStep}
                  validationErrors={validationErrors}
                  setValidationErrors={setValidationErrors}
                />
              )}
              
              {/* Payment Step */}
              {checkout.step === 'payment' && (
                <PaymentStep
                  checkout={checkout}
                  onChange={handleCheckoutChange}
                  onContinue={handleNextStep}
                  onBack={handlePreviousStep}
                  validationErrors={validationErrors}
                  setValidationErrors={setValidationErrors}
                />
              )}
              
              {/* Review Step */}
              {checkout.step === 'review' && (
                <ReviewStep
                  checkout={checkout}
                  onChange={handleCheckoutChange}
                  onPlaceOrder={handlePlaceOrder}
                  onBack={handlePreviousStep}
                  isProcessing={isProcessingOrder}
                  validationErrors={validationErrors}
                  setValidationErrors={setValidationErrors}
                />
              )}
            </div>
          </div>
          
          {/* Right Column - Order Summary */}
          <div className="lg:col-span-4">
            <CheckoutSummary 
              checkout={checkout}
            />
            
            {/* Security badges */}
            <div className="mt-6 bg-white rounded-2xl shadow-md p-4 sm:p-6 border border-gray-100">
              <div className="flex items-center gap-4 mb-4">
                <Shield className="h-6 w-6 text-emerald-600" />
                <div>
                  <h3 className="font-medium text-gray-900">Secure Checkout</h3>
                  <p className="text-xs text-gray-600">Your data is protected with industry-standard encryption</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <CreditCard className="h-6 w-6 text-blue-600" />
                <div>
                  <h3 className="font-medium text-gray-900">Payment Options</h3>
                  <p className="text-xs text-gray-600">We accept all major credit cards and mobile payment methods</p>
                </div>
              </div>
            </div>
            
            {/* Help section */}
            <div className="mt-6">
              <div className="text-sm text-gray-600">
                <p className="mb-2">Need help with your order?</p>
                <Link href="/contact" className="text-black font-medium hover:underline flex items-center">
                  Contact support
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 