'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { dummyProducts } from '@/data/products';
import { Product } from '@/types/product';
import { ProductCard } from '@/components/ui/product-card';

interface RelatedProductsProps {
  currentCartItems: number[]; // Array of product IDs currently in cart
}

export default function RelatedProducts({ currentCartItems }: RelatedProductsProps) {
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    // Filter out products already in cart
    const filteredProducts = dummyProducts
      .filter(product => !currentCartItems.includes(product.id))
      .filter(product => product.inStock)
      .slice(0, 8);
    
    // Format products to match ProductCard component's requirements
    const formattedProducts = filteredProducts.map(product => ({
      ...product,
      rating: product.rating || 4.5,
      category: product.category || 'T-Shirt',
      link: `/shop/product/${product.id}`,
      hasColorOptions: Boolean(product.colorVariants && product.colorVariants.length > 0),
      colorVariants: product.colorVariants || []
    }));
    
    setRelatedProducts(formattedProducts);
  }, [currentCartItems]);
  
  // Handle scrolling for the product carousel
  const scrollContainer = (direction: 'left' | 'right') => {
    const container = document.getElementById('related-products-container');
    if (container) {
      const scrollAmount = direction === 'left' ? -280 : 280;
      container.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };
  
  if (relatedProducts.length === 0) return null;
  
  return (
    <section className="mt-12 sm:mt-16 md:mt-20 mb-6 sm:mb-10">
      <div className="flex items-center justify-between mb-5 sm:mb-8">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">You May Also Like</h2>
        
        <div className="flex space-x-2">
          <button
            onClick={() => scrollContainer('left')}
            className="p-1.5 sm:p-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
          </button>
          <button
            onClick={() => scrollContainer('right')}
            className="p-1.5 sm:p-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
          </button>
        </div>
      </div>
      
      <div 
        id="related-products-container"
        className="flex overflow-x-auto pb-4 sm:pb-6 gap-4 sm:gap-6 hide-scrollbar snap-x snap-mandatory"
      >
        {relatedProducts.map(product => (
          <div key={product.id} className="min-w-[160px] max-w-[160px] sm:min-w-[200px] sm:max-w-[200px] md:min-w-[220px] md:max-w-[220px] snap-start">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
      
      <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
} 