'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/types/product';
import { ProductCard } from '@/components/ui/product-card';
import { dummyProducts } from '@/data/products';

interface RelatedProductsProps {
  currentProductId: number;
  category: string;
  tags?: string[];
  maxProducts?: number;
}

export default function RelatedProducts({
  currentProductId,
  category,
  tags = [],
  maxProducts = 4
}: RelatedProductsProps) {
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Find related products based on category and tags
    const related = dummyProducts
      .filter(product => 
        // Exclude current product
        product.id !== currentProductId &&
        // Include same category or matching tags
        (product.category === category || 
         (product.tags && tags.some(tag => product.tags?.includes(tag))))
      )
      .slice(0, maxProducts);

    setRelatedProducts(related);
  }, [currentProductId, category, tags, maxProducts]);

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-12 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">You May Also Like</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {relatedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
} 