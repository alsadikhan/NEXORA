'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/types/product';
import { ProductCard } from '@/components/ui/product-card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

interface ProductsGridProps {
  products: Product[];
}

export default function ProductsGrid({ products }: ProductsGridProps) {
  const [activeColorMap, setActiveColorMap] = useState<Record<number, string>>({});
  const [activeImageMap, setActiveImageMap] = useState<Record<number, string>>({});
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  
  // Extract unique categories from products to create popular category tabs
  const popularCategories = ['all', ...Array.from(new Set(products.map(p => p.category)))].slice(0, 6);
  
  // Initialize default images
  useEffect(() => {
    const defaultImages: Record<number, string> = {};
    const initialColorMap: Record<number, string> = {};
    
    products.forEach(product => {
      if (product.hasColorOptions && product.colorVariants && product.colorVariants.length > 0) {
        defaultImages[product.id] = product.colorVariants[0].image;
        initialColorMap[product.id] = product.colorVariants[0].color;
      } else {
        defaultImages[product.id] = product.image;
      }
    });
    
    setActiveImageMap(defaultImages);
    setActiveColorMap(initialColorMap);
  }, [products]);
  
  // Apply category filter
  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.category === activeCategory));
    }
  }, [activeCategory, products]);
  
  const handleColorSelect = (productId: number, color: string) => {
    setActiveColorMap(prev => ({
      ...prev,
      [productId]: color
    }));
    
    // Update image based on selected color
    const product = products.find(p => p.id === productId);
    if (product?.hasColorOptions && product.colorVariants) {
      const variant = product.colorVariants.find(v => v.color === color);
      if (variant) {
        setActiveImageMap(prev => ({
          ...prev,
          [productId]: variant.image
        }));
      }
    }
  };
  
  const toggleWishlist = (productId: number) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };
  
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };
  
  // Show empty state if no products match filters
  if (filteredProducts.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center justify-center text-center p-8 max-w-md">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium mb-2">No products found</h3>
          <p className="text-gray-500">
            We couldn&apos;t find any products matching your current filters. 
            Try adjusting your search criteria or browse our other collections.
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div>
      {/* Popular Categories Tabs */}
      <div className="mb-6 md:mb-8">
        <ScrollArea className="w-full whitespace-nowrap" type="scroll">
          <div className="border-b border-gray-200 pb-2">
            <div className="flex space-x-1.5 md:space-x-2">
              {popularCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`
                    inline-flex shrink-0 px-2.5 md:px-4 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-all
                    ${activeCategory === category 
                      ? 'bg-black text-white shadow-sm' 
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }
                  `}
                >
                  {category === 'all' ? 'All Products' : category}
                </button>
              ))}
            </div>
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
      
      {/* Category results summary */}
      <div className="mb-4 text-xs sm:text-sm text-gray-600">
        Showing {filteredProducts.length} {activeCategory !== 'all' ? activeCategory : ''} products
      </div>
      
      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
        {filteredProducts.map((product) => {
          const activeColor = activeColorMap[product.id] || '';
          const displayImage = activeImageMap[product.id] || product.image;
          const isWishlisted = wishlist.includes(product.id);
          
          return (
            <div key={product.id} className="relative">
              <ProductCard
                product={product}
                onColorSelect={handleColorSelect}
                onToggleWishlist={toggleWishlist}
                activeColor={activeColor}
                displayImage={displayImage}
                isWishlisted={isWishlisted}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
} 