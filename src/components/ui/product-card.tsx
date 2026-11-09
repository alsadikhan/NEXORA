'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, ShoppingBag, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAddToCart } from '@/lib/hooks/useAddToCart';
import { ProductQuickAddModal } from '@/components/ui/product-quick-add-modal';
import { Product } from '@/types/product';

// Define product interface
interface ProductCardProps {
  product: Product;
  onColorSelect?: (productId: number, color: string) => void;
  onToggleWishlist?: (productId: number) => void;
  activeColor?: string;
  displayImage?: string;
  isWishlisted?: boolean;
}

export function ProductCard({
  product,
  onColorSelect,
  onToggleWishlist,
  activeColor,
  displayImage,
  isWishlisted = false
}: ProductCardProps) {
  const [localActiveColor, setLocalActiveColor] = useState<string>(
    activeColor || (product.hasColorOptions && product.colorVariants ? product.colorVariants[0].color : '')
  );
  const [localDisplayImage, setLocalDisplayImage] = useState<string>(
    displayImage || product.image
  );
  const [isQuickAddModalOpen, setIsQuickAddModalOpen] = useState(false);
  const { handleAddToCart, isLoading } = useAddToCart();

  // Handle color selection locally if no external handler is provided
  const handleColorSelect = (color: string) => {
    if (onColorSelect) {
      onColorSelect(product.id, color);
    } else {
      setLocalActiveColor(color);
      // Update image based on selected color
      if (product.hasColorOptions && product.colorVariants) {
        const variant = product.colorVariants.find(v => v.color === color);
        if (variant) {
          setLocalDisplayImage(variant.image);
        }
      }
    }
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onToggleWishlist) {
      onToggleWishlist(product.id);
    }
  };

  // Use either external or local state
  const currentColor = activeColor || localActiveColor;
  const currentImage = displayImage || localDisplayImage;
  
  // Generate product link
  const productLink = product.link || `/shop/product/${product.id}`;

  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // If product has size options or color options, open the modal
    if ((product.sizes && product.sizes.length > 0) || (product.hasColorOptions && product.colorVariants)) {
      setIsQuickAddModalOpen(true);
    } else {
      // If no options, directly add to cart
      handleAddToCart({
        id: product.id.toString(),
        name: product.name,
        price: product.price,
        image: currentImage,
        color: currentColor,
        quantity: 1
      });
    }
  };

  return (
    <>
    <Link href={productLink} className="block group transition-transform duration-300 hover:scale-[1.01]">
      <div className="relative overflow-hidden rounded-lg sm:rounded-xl h-full flex flex-col backdrop-blur-sm bg-white/90 shadow-md border border-gray-100 group-hover:shadow-lg group-hover:border-gray-200 transition-all duration-300">
        {/* Image container with gradient overlay */}
        <div className="aspect-[4/5] relative overflow-hidden">
          <div 
            className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
          
          <Image
            src={currentImage || ''}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 25vw"
            unoptimized
          />

          {/* Floating Actions */}
          <div className="absolute top-1.5 sm:top-2 md:top-3 right-1.5 sm:right-2 md:right-3 z-20 flex flex-col gap-1.5 sm:gap-2">
            <Button
              variant={isWishlisted ? "default" : "outline"}
              size="icon"
              className={`w-6 h-6 sm:w-7 sm:h-7 md:w-9 md:h-9 rounded-full backdrop-blur-sm shadow-md transition-all duration-300 ${
                isWishlisted ? 'bg-black text-white' : 'bg-white/90 text-gray-700'
              }`}
              onClick={handleToggleWishlist}
              aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
              style={{ transitionDelay: '100ms' }}
            >
              <Heart className={`w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 ${isWishlisted ? 'fill-white' : ''}`} />
            </Button>
          </div>
          
          {/* Category Tag */}
          <div className="absolute top-1 md:top-3 left-1.5 sm:left-2 md:left-3 z-20">
            <span className="inline-block px-1.5 sm:px-2 md:px-2.5 py-0.5 md:py-1 bg-white/90 backdrop-blur-sm rounded-full text-[7px] md:text-xs font-medium text-gray-800 shadow-sm">
              {product.category}
            </span>
          </div>
          
          {/* New Tag */}
          {product.isNew && (
            <div className="absolute bottom-1.5 sm:bottom-2 md:bottom-3 left-1.5 sm:left-2 md:left-3 z-20">
              <span className="inline-block px-1.5 sm:px-2 md:px-2.5 py-0.5 md:py-1 bg-black text-white rounded-full text-[8px] sm:text-[10px] md:text-xs font-medium shadow-sm">
                New
              </span>
            </div>
          )}

          {/* Color Options - Bottom Right Corner */}
          {product.hasColorOptions && product.colorVariants && (
            <div className="absolute bottom-1.5 sm:bottom-2 md:bottom-3 right-1.5 sm:right-2 md:right-3 z-20">
              <div className="flex items-center gap-1 sm:gap-1 md:gap-1.5">
                {product.colorVariants.map((variant) => (
                  <button
                    key={variant.color}
                    className={`w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 rounded-full transition-all border border-gray-200 backdrop-blur-sm shadow-md ${
                      currentColor === variant.color 
                        ? 'ring-1 ring-offset-1 ring-white scale-110' 
                        : 'hover:scale-110 hover:shadow-sm'
                    }`}
                    style={{ backgroundColor: variant.color }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleColorSelect(variant.color);
                    }}
                    aria-label={`Select ${variant.name} color`}
                    title={variant.name}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Product Information */}
        <div className="p-1.5 sm:p-2 md:p-4 flex flex-col flex-grow">
          <div className="flex items-center justify-between mb-0.5 sm:mb-1 md:mb-1.5">
            <div className="group/link max-w-[75%]">
              <h3 className="font-medium text-[9px] md:text-xs lg:text-sm group-hover/link:underline decoration-1 underline-offset-2 truncate">
                {product.name}
              </h3>
            </div>
            <div className="flex items-center bg-gray-50 px-1 py-0.5 rounded">
              <Star className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 fill-current text-yellow-400 mr-0.5" />
              <span className="text-[8px] sm:text-[10px] md:text-xs font-medium">{product.rating}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-auto pt-1.5 sm:pt-2 md:pt-3 border-t border-gray-100">
            <div className="flex items-center gap-1 sm:gap-2">
              {product.comparePrice && product.comparePrice > product.price && (
                <p className="text-[8px] sm:text-[10px] md:text-sm text-gray-500 line-through">
                  ৳{product.comparePrice.toLocaleString()}
                </p>
              )}
              <p className="font-semibold text-[10px] sm:text-xs md:text-base">
                ৳{product.price.toLocaleString()}
              </p>
            </div>
            
            {/* Buy Now button */}
            <Button
              variant="outline"
              size="sm" 
              className="flex items-center gap-0.5 rounded-full hover:bg-black hover:text-white border-gray-200 h-6 sm:h-7 md:h-8 px-1.5 sm:px-2 md:px-3 text-[8px] sm:text-[10px] md:text-xs"
              aria-label="Buy now"
              onClick={handleAddToCartClick}
              disabled={isLoading}
            >
              <ShoppingBag className="w-2 h-2 md:w-3.5 md:h-3.5 mr-0.5" />
              <span className="font-medium">{isLoading ? 'Adding...' : 'Buy Now'}</span>
            </Button>
          </div>
        </div>
      </div>
    </Link>
      
      {/* Quick Add Modal */}
      <ProductQuickAddModal 
        product={product}
        isOpen={isQuickAddModalOpen}
        onClose={() => setIsQuickAddModalOpen(false)}
        initialColor={currentColor}
        initialImage={currentImage}
      />
    </>
  );
} 