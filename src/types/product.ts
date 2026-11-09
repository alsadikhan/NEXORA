export interface ColorVariant {
  color: string;
  name: string;
  image: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  comparePrice?: number;
  costPrice?: number;
  rating: number;
  category: string;
  subCategory?: string; 
  link: string;
  isNew: boolean;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  isOnSale?: boolean;
  isActive?: boolean;
  inStock: boolean;
  hasColorOptions: boolean;
  colorVariants?: ColorVariant[];
  image: string;
  description?: string;
  longDescription?: { title: string; content: string }[];
  careInstructions?: string[];
  features?: string[];
  tags?: string[];
  additionalImages?: string[];
  specifications?: {
    label: string;
    value: string;
  }[];
  sizes?: string[];
  
  // SEO & Marketing
  metaTitle?: string;
  metaDescription?: string;
  urlSlug?: string;
  
  // Inventory
  stock?: number;
  reservedStock?: number;
  lowStockThreshold?: number;
  reorderPoint?: number;
  
  // Bulk Pricing
  bulkPricing?: {
    minQuantity: number;
    maxQuantity: number;
    price: number;
  }[];
  
  // SKU
  sku?: string;
}

export interface ProductFilters {
  category: string;
  subCategory: string;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'newest' | 'rating';
  minPrice: number;
  maxPrice: number;
  inStock: boolean;
  searchQuery: string;
} 