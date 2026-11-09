import { CartItem, CartState, ShippingOption, CouponInfo } from '@/types/cart';
import { dummyProducts } from './products';

// Sample cart items based on products from our catalog
export const dummyCartItems: CartItem[] = [
  {
    id: 1,
    productId: 1,
    name: 'Premium Cotton T-Shirt',
    price: 499,
    quantity: 2,
    image: 'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748995330/blank-tshirt-19_mhmvoh.jpg',
    color: '#000000',
    colorName: 'Black',
    size: 'M',
    maxQuantity: 10
  },
  {
    id: 2,
    productId: 2,
    name: 'Slim Fit Polo Shirt',
    price: 699,
    quantity: 1,
    image: 'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748995428/image-5_shfwmg.jpg',
    color: '#1C2833',
    colorName: 'Navy',
    size: 'L',
    maxQuantity: 5
  },
  {
    id: 3,
    productId: 6,
    name: 'Heritage Embroidered Polo',
    price: 799,
    quantity: 1,
    image: 'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748995415/66cd75ad24196-square_gly7is.png',
    size: 'M',
    maxQuantity: 8
  }
];

// Available shipping options
export const shippingOptions: ShippingOption[] = [
  {
    id: 'free',
    name: 'Standard Shipping',
    price: 0,
    estimatedDelivery: '5-7 business days',
    description: 'Free shipping on orders over ৳2000'
  },
  {
    id: 'express',
    name: 'Express Shipping',
    price: 150,
    estimatedDelivery: '2-3 business days',
    description: 'Get your items faster'
  },
  {
    id: 'nextday',
    name: 'Next Day Delivery',
    price: 250,
    estimatedDelivery: 'Next business day',
    description: 'Order before 2PM for same-day processing'
  }
];

// Sample coupon codes
export const availableCoupons: { [code: string]: CouponInfo } = {
  'WELCOME10': {
    code: 'WELCOME10',
    discountType: 'percentage',
    discountValue: 10,
    minOrderValue: 1000,
    isValid: true
  },
  'SUMMER2023': {
    code: 'SUMMER2023',
    discountType: 'percentage',
    discountValue: 15,
    minOrderValue: 2000,
    isValid: true
  },
  'FLAT100OFF': {
    code: 'FLAT100OFF',
    discountType: 'fixed',
    discountValue: 100,
    minOrderValue: 1500,
    isValid: true
  }
};

// Calculate cart totals
export const calculateCartTotals = (items: CartItem[], shippingCost: number = 0, couponCode?: string): CartState => {
  const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  let discount = 0;
  
  // Apply coupon if provided
  if (couponCode && availableCoupons[couponCode]) {
    const coupon = availableCoupons[couponCode];
    
    if (subtotal >= (coupon.minOrderValue || 0)) {
      if (coupon.discountType === 'percentage') {
        discount = Math.round(subtotal * (coupon.discountValue / 100));
      } else {
        discount = coupon.discountValue;
      }
    }
  }
  
  // Calculate total (no tax)
  const total = subtotal - discount + shippingCost;
  
  // Get estimated delivery based on shipping option
  const selectedShipping = shippingOptions.find(option => option.price === shippingCost);
  const estimatedDelivery = selectedShipping?.estimatedDelivery || '5-7 business days';
  
  return {
    items,
    subtotal,
    shipping: shippingCost,
    tax: 0, // No tax
    discount,
    total,
    couponCode,
    estimatedDelivery
  };
};

// Initial cart state with calculated totals
export const initialCartState: CartState = calculateCartTotals(dummyCartItems);

// Validate a coupon code
export const validateCoupon = (code: string, subtotal: number): CouponInfo => {
  const coupon = availableCoupons[code];
  
  if (!coupon) {
    return {
      code,
      discountType: 'percentage',
      discountValue: 0,
      isValid: false,
      errorMessage: 'Invalid coupon code'
    };
  }
  
  if (coupon.minOrderValue && subtotal < coupon.minOrderValue) {
    return {
      ...coupon,
      isValid: false,
      errorMessage: `Minimum order value of ৳${coupon.minOrderValue} required`
    };
  }
  
  return coupon;
}; 