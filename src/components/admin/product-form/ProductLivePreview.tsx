import React from 'react';
import { ProductFormState } from '@/hooks/use-product-form';
import { Product } from '@/types/product';
import ProductDetail from '@/app/shop/product/[id]/_components/product-detail';

interface ProductLivePreviewProps {
  product: ProductFormState;
}

const ProductLivePreview = ({ product }: ProductLivePreviewProps) => {
  // Convert ProductFormState to Product type for the preview
  const previewProduct: Product = {
    id: 1, // Temporary ID for preview
    name: product.name || 'Product Name',
    price: Number(product.price) || 0,
    comparePrice: Number(product.comparePrice) || 0,
    costPrice: Number(product.costPrice) || 0,
    sku: product.sku || '',
    description: product.description || '',
    longDescription: product.longDescription || [],
    category: product.category || '',
    subCategory: product.subCategory || '',
    careInstructions: product.careInstructions || [],
    features: product.features || [],
    isNew: product.isNew || false,
    isFeatured: product.isFeatured || false,
    isBestSeller: product.isBestSeller || false,
    isOnSale: product.isOnSale || false,
    isActive: product.isActive || false,
    inStock: product.inStock || false,
    stock: Number(product.stock) || 0,
    reservedStock: Number(product.reservedStock) || 0,
    lowStockThreshold: Number(product.lowStockThreshold) || 10,
    reorderPoint: Number(product.reorderPoint) || 5,
    image: product.mainImage || '',
    additionalImages: product.additionalImages || [],
    hasColorOptions: product.hasColorOptions || false,
    colorVariants: product.colorVariants || [],
    sizes: product.sizes || [],
    tags: product.tags || [],
    specifications: product.specifications.filter(spec => spec.label && spec.value) || [],
    metaTitle: product.metaTitle || '',
    metaDescription: product.metaDescription || '',
    urlSlug: product.urlSlug || '',
    bulkPricing: product.bulkPricing.map(item => ({
      minQuantity: Number(item.minQuantity) || 0,
      maxQuantity: Number(item.maxQuantity) || 0,
      price: Number(item.price) || 0
    })) || [],
    rating: 4.5, // Default rating for preview
    link: '#', // Preview link
  };

  return (
    <div className="mt-8 border-t pt-6">
      <h3 className="text-lg font-medium mb-6">Product Details Page Preview</h3>
      
      {/* Use the actual ProductDetail component for 100% consistency */}
      <div className="border rounded-lg overflow-hidden">
        <ProductDetail product={previewProduct} />
      </div>
    </div>
  );
};

export default ProductLivePreview; 