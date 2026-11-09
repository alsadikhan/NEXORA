import { CartState, ShippingOption } from './cart';

export type PaymentMethod = 'credit_card' | 'debit_card' | 'paypal' | 'apple_pay' | 'google_pay' | 'cash_on_delivery' | 'bkash' | 'nagad' | 'sslcommerz';

export interface CardInfo {
  cardNumber: string;
  cardholderName: string;
  expiryDate: string;
  cvv: string;
}

export interface AddressInfo {
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  email: string;
  isDefault?: boolean;
  isBilling?: boolean;
  isShipping?: boolean;
}

export interface CheckoutState {
  cart: CartState;
  selectedShipping: ShippingOption;
  billingAddress: AddressInfo;
  shippingAddress: AddressInfo;
  sameAsShipping: boolean;
  paymentMethod: PaymentMethod;
  cardInfo?: CardInfo;
  notes?: string;
  agreeToTerms: boolean;
  step: CheckoutStep;
}

export type CheckoutStep = 'information' | 'shipping' | 'payment' | 'review';

export interface OrderSummary {
  orderId: string;
  orderDate: string;
  items: CartState['items'];
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  shippingAddress: AddressInfo;
  billingAddress: AddressInfo;
  paymentMethod: PaymentMethod;
  estimatedDelivery: string;
}

export interface PaymentProvider {
  id: PaymentMethod;
  name: string;
  icon: string;
  description?: string;
}

export interface ValidationError {
  field: string;
  message: string;
} 