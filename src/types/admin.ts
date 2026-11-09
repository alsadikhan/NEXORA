import { Product } from './product';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'admin' | 'manager' | 'editor' | 'customer';
  avatar?: string;
  phone?: string;
  createdAt: string;
  lastLogin?: string;
  isActive: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: string;
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  createdAt: string;
  updatedAt: string;
  shippingAddress: ShippingAddress;
  notes?: string;
  trackingNumber?: string;
  estimatedDelivery?: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  color?: string;
  size?: string;
  total: number;
}

export type OrderStatus = 
  | 'pending' 
  | 'processing' 
  | 'shipped' 
  | 'delivered' 
  | 'cancelled' 
  | 'refunded' 
  | 'on_hold';

export type PaymentStatus = 
  | 'pending' 
  | 'paid' 
  | 'failed' 
  | 'refunded' 
  | 'partially_refunded';

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
}

export interface DashboardStats {
  totalSales: number;
  totalOrders: number;
  averageOrderValue: number;
  pendingOrders: number;
  lowStockProducts: number;
  totalCustomers: number;
  revenueByDay: {
    date: string;
    revenue: number;
  }[];
  topSellingProducts: {
    id: string;
    name: string;
    unitsSold: number;
    revenue: number;
    image: string;
  }[];
  recentOrders: Order[];
}

export interface ProductInventory extends Product {
  sku: string;
  stock: number;
  reserved: number;
  available: number;
  lowStockThreshold: number;
  costPrice: number;
  profit: number;
  profitMargin: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentId?: string;
  productCount: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Coupon {
  id: string;
  code: string;
  description?: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderValue?: number;
  maxDiscountAmount?: number;
  startDate: string;
  endDate: string;
  usageLimit?: number;
  usageCount: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AdminNotification {
  id: string;
  type: 'order' | 'inventory' | 'user' | 'system';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  link?: string;
}

export interface AdminSettings {
  storeName: string;
  storeEmail: string;
  storeLogo?: string;
  currency: string;
  currencySymbol: string;
  shippingOptions: {
    id: string;
    name: string;
    price: number;
    estimatedDelivery: string;
    isActive: boolean;
  }[];
  paymentGateways: {
    id: string;
    name: string;
    isActive: boolean;
    credentials?: Record<string, string>;
  }[];
  emailNotifications: {
    newOrder: boolean;
    lowStock: boolean;
    customerRegistration: boolean;
  };
}

export interface AdminActivity {
  id: string;
  userId: string;
  userName: string;
  action: string;
  details: string;
  ipAddress?: string;
  createdAt: string;
} 