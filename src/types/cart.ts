import { Product } from './product';

export interface CartItem {
  id: number;
  productId: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  color?: string;
  colorName?: string;
  size?: string;
  maxQuantity?: number; // Based on available stock
}

export interface CartState {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  couponCode?: string;
  estimatedDelivery?: string;
}

export interface ShippingOption {
  id: string;
  name: string;
  price: number;
  estimatedDelivery: string;
  description?: string;
}

export interface CouponInfo {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderValue?: number;
  expiryDate?: Date;
  isValid: boolean;
  errorMessage?: string;
}

// Utility type to add an item to cart from a product
export interface AddToCartPayload {
  product: Product;
  quantity: number;
  color?: string;
  colorName?: string;
  size?: string;
} 