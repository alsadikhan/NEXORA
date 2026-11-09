'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useAddToCart } from '@/lib/hooks/useAddToCart';
import Image from 'next/image';
import { Minus, Plus, ShoppingBag, X } from 'lucide-react';
import { Product } from '@/types/product';

interface ProductQuickAddModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  initialColor?: string;
  initialImage?: string;
}

export function ProductQuickAddModal({
  product,
  isOpen,
  onClose,
  initialColor,
  initialImage
}: ProductQuickAddModalProps) {
  const [activeColor, setActiveColor] = useState<string>(
    initialColor || (product.hasColorOptions && product.colorVariants ? product.colorVariants[0].color : '')
  );
  const [activeSize, setActiveSize] = useState<string>(
    product.sizes && product.sizes.length > 0 ? product.sizes[0] : ''
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [activeImage, setActiveImage] = useState<string>(
    initialImage || product.image
  );

  const { handleAddToCart, isLoading } = useAddToCart();

  // Handle color selection
  const handleColorSelect = (color: string) => {
    setActiveColor(color);
    if (product.hasColorOptions && product.colorVariants) {
      const variant = product.colorVariants.find(v => v.color === color);
      if (variant) {
        setActiveImage(variant.image);
      }
    }
  };

  // Handle size selection
  const handleSizeSelect = (size: string) => {
    setActiveSize(size);
  };

  // Handle quantity change
  const handleIncreaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCartClick = () => {
    handleAddToCart({
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      image: activeImage,
      quantity,
      size: activeSize || undefined,
      color: activeColor || undefined
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md md:max-w-lg">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-lg">Quick Add to Cart</DialogTitle>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
          {/* Product Image */}
          <div className="relative h-64 rounded-md overflow-hidden">
            <Image
              src={activeImage}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          
          {/* Product Details */}
          <div className="flex flex-col">
            <h3 className="text-lg font-medium">{product.name}</h3>
            <p className="text-xl font-bold mt-1">৳{product.price.toLocaleString()}</p>
            
            {/* Color Options */}
            {product.hasColorOptions && product.colorVariants && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Color</h4>
                <div className="flex flex-wrap gap-2">
                  {product.colorVariants.map((variant) => (
                    <button
                      key={variant.color}
                      className={`w-8 h-8 rounded-full transition-all border ${
                        activeColor === variant.color 
                          ? 'ring-2 ring-offset-2 ring-black scale-110' 
                          : 'ring-1 ring-gray-200 hover:scale-110'
                      }`}
                      style={{ backgroundColor: variant.color }}
                      onClick={() => handleColorSelect(variant.color)}
                      aria-label={`Select ${variant.name} color`}
                      title={variant.name}
                    />
                  ))}
                </div>
              </div>
            )}
            
            {/* Size Options */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Size</h4>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      className={`min-w-[3rem] h-10 px-3 rounded-md transition-all ${
                        activeSize === size 
                          ? 'bg-gray-900 text-white' 
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                      onClick={() => handleSizeSelect(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Quantity */}
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Quantity</h4>
              <div className="flex items-center h-10 border border-gray-300 rounded-md w-fit">
                <button
                  className="flex-1 h-full flex items-center justify-center px-3 hover:bg-gray-100 transition-colors"
                  onClick={handleDecreaseQuantity}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="flex-1 h-full flex items-center justify-center px-3 text-center font-medium min-w-[3rem]">
                  {quantity}
                </span>
                <button
                  className="flex-1 h-full flex items-center justify-center px-3 hover:bg-gray-100 transition-colors"
                  onClick={handleIncreaseQuantity}
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Add to Cart Button */}
        <div className="flex justify-end">
          <Button 
            onClick={handleAddToCartClick} 
            disabled={isLoading || (!activeSize && product.sizes && product.sizes.length > 0)}
            className="bg-black hover:bg-gray-800 text-white"
          >
            <ShoppingBag className="h-4 w-4 mr-2" />
            {isLoading ? 'Adding...' : 'Add to Cart'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 