import { AddressInfo, CheckoutState, PaymentProvider } from '@/types/checkout';
import { initialCartState, shippingOptions } from './cart';

// Default empty address
export const emptyAddress: AddressInfo = {
  firstName: '',
  lastName: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  state: '',
  postalCode: '',
  country: 'Bangladesh',
  phone: '',
  email: '',
  isDefault: false
};

// Sample saved addresses
export const savedAddresses: AddressInfo[] = [
  {
    firstName: 'Rahul',
    lastName: 'Ahmed',
    addressLine1: '123 Main Street',
    addressLine2: 'Apt 4B',
    city: 'Dhaka',
    state: 'Dhaka Division',
    postalCode: '1000',
    country: 'Bangladesh',
    phone: '+880 1712345678',
    email: 'rahul.ahmed@example.com',
    isDefault: true,
    isShipping: true
  },
  {
    firstName: 'Rahul',
    lastName: 'Ahmed',
    addressLine1: '456 Business Avenue',
    addressLine2: 'Suite 300',
    city: 'Dhaka',
    state: 'Dhaka Division',
    postalCode: '1200',
    country: 'Bangladesh',
    phone: '+880 1712345678',
    email: 'rahul.ahmed@example.com',
    isBilling: true
  }
];

// Initial checkout state
export const initialCheckoutState: CheckoutState = {
  cart: initialCartState,
  selectedShipping: shippingOptions[0],
  billingAddress: savedAddresses[1],
  shippingAddress: savedAddresses[0],
  sameAsShipping: true,
  paymentMethod: 'credit_card',
  agreeToTerms: false,
  step: 'information'
};

// Available payment methods
export const paymentProviders: PaymentProvider[] = [
  {
    id: 'credit_card',
    name: 'Credit Card',
    icon: '/images/payment/credit-card.svg',
    description: 'Secure payment with credit card'
  },
  {
    id: 'debit_card',
    name: 'Debit Card',
    icon: '/images/payment/debit-card.svg',
    description: 'Pay directly from your bank account'
  },
  {
    id: 'bkash',
    name: 'bKash',
    icon: '/images/payment/bkash.svg',
    description: 'Pay with your bKash account'
  },
  {
    id: 'nagad',
    name: 'Nagad',
    icon: '/images/payment/nagad.svg',
    description: 'Pay with your Nagad account'
  },
  {
    id: 'cash_on_delivery',
    name: 'Cash on Delivery',
    icon: '/images/payment/cod.svg',
    description: 'Pay when you receive your order'
  },
  {
    id: 'sslcommerz',
    name: 'SSLCommerz',
    icon: '/images/payment/sslcommerz.svg',
    description: 'Secure online payment gateway'
  }
];

// Countries list for dropdown
export const countries = [
  { value: 'Bangladesh', label: 'Bangladesh' },
  { value: 'India', label: 'India' },
  { value: 'Pakistan', label: 'Pakistan' },
  { value: 'Nepal', label: 'Nepal' },
  { value: 'Bhutan', label: 'Bhutan' },
  { value: 'Sri Lanka', label: 'Sri Lanka' },
  { value: 'Maldives', label: 'Maldives' },
  { value: 'Myanmar', label: 'Myanmar' }
];

// Validation helpers
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^(\+?\d{1,3}[\s-]?)?\d{10,14}$/;
  return phoneRegex.test(phone);
};

export const validatePostalCode = (postalCode: string): boolean => {
  return postalCode.length >= 4 && postalCode.length <= 10;
};

// Mock API function to place an order
export const placeOrder = async (checkoutState: CheckoutState): Promise<{ success: boolean; orderId?: string; error?: string }> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      if (Math.random() > 0.1) { // 90% success rate
        resolve({
          success: true,
          orderId: `ORD-${Math.floor(100000 + Math.random() * 900000)}`
        });
      } else {
        resolve({
          success: false,
          error: 'Payment processing failed. Please try again.'
        });
      }
    }, 1500);
  });
}; 