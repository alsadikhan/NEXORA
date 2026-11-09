'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, ArrowRight, ShoppingCart, ArrowLeft, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ui/product-card';
import { dummyProducts } from '@/data/products';

export default function EmptyCart() {
  // Format suggested products for ProductCard component
  const suggestedProducts = [1, 3, 2, 6].map(id => {
    const product = dummyProducts.find(p => p.id === id) || dummyProducts[0];
    return {
      ...product,
      rating: product.rating || 4.5,
      category: product.category || 'T-Shirt',
      link: `/shop/product/${product.id}`,
      hasColorOptions: Boolean(product.colorVariants && product.colorVariants.length > 0),
      colorVariants: product.colorVariants || []
    };
  });

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-6 sm:py-8">
        {/* Basic navigation */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Link href="/shop" className="p-2 hover:bg-gray-50 rounded-full transition-colors" aria-label="Back to shop">
              <ArrowLeft className="h-5 w-5 text-gray-700" />
            </Link>
            <Link href="/" className="p-2 hover:bg-gray-50 rounded-full transition-colors" aria-label="Home">
              <Home className="h-5 w-5 text-gray-700" />
            </Link>
          </div>
          <Link href="/" className="font-heading text-xl font-bold tracking-tighter">
            NEXORA
          </Link>
          <div className="w-14"></div> {/* Empty div to balance the layout */}
        </div>
    
        <div className="flex flex-col items-center justify-center py-10 sm:py-16 px-4 text-center">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gray-50 flex items-center justify-center mb-6 sm:mb-8 border border-gray-100 shadow-sm">
            <ShoppingCart className="h-10 w-10 sm:h-12 sm:w-12 text-gray-400" />
          </div>
          
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900 mb-2 sm:mb-3">Your cart is empty</h2>
          <p className="text-gray-600 max-w-md mb-8 sm:mb-10 text-sm sm:text-base">
            Looks like you haven't added anything to your cart yet. Browse our collection to find something you'll love.
          </p>
          
          {/* Product suggestions */}
          <div className="w-full max-w-5xl mb-8 sm:mb-10">
            <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-4 sm:mb-6 text-left sm:text-center">You might like</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
              {suggestedProducts.map((product) => (
                <div key={product.id} className="min-w-full">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
          
          <Button asChild className="bg-black hover:bg-gray-800 px-6 sm:px-8 py-5 sm:py-6 rounded-lg text-sm sm:text-base font-medium">
            <Link href="/shop" className="inline-flex items-center">
              Continue Shopping
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Link>
          </Button>
        </div>
        
        {/* Simple navigation links */}
        <div className="mt-8 pt-6 border-t border-gray-100 mb-8">
          <div className="flex justify-between items-center">
            <Link href="/shop" className="flex items-center text-sm text-gray-600 hover:text-black transition-colors">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Shop
            </Link>
            <Link href="/" className="flex items-center text-sm text-gray-600 hover:text-black transition-colors">
              Back to Home
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 