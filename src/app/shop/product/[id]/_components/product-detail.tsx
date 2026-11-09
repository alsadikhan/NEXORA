'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Minus, Plus, Heart, Share2, ShoppingBag, ArrowLeft, X } from 'lucide-react';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import { Breadcrumb } from '@/components/shop/breadcrumb';
import RelatedProducts from './related-products';
import { useAddToCart } from '@/lib/hooks/useAddToCart';

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [activeImage, setActiveImage] = useState<string>(product.image);
  const [activeColor, setActiveColor] = useState<string>(
    product.hasColorOptions && product.colorVariants ? product.colorVariants[0].color : ''
  );
  const [activeSize, setActiveSize] = useState<string>(product.sizes ? product.sizes[1] : '');
  const [quantity, setQuantity] = useState<number>(1);
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false);
  const [showSizeGuide, setShowSizeGuide] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('description');
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

  // Handle wishlist toggle
  const handleToggleWishlist = () => {
    setIsWishlisted(prev => !prev);
  };

  // Toggle size guide modal
  const toggleSizeGuide = () => {
    setShowSizeGuide(prev => !prev);
  };

  // Generate breadcrumb items
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/shop' },
    { label: product.category, href: `/shop?category=${product.category}` },
    { label: product.name, href: `/shop/product/${product.id}` }
  ];

  // Size guide data - could be fetched from API based on product category
  const sizeGuideData = {
    clothing: [
      { size: 'XS', chest: '32-34', waist: '26-28', hips: '34-36' },
      { size: 'S', chest: '36-38', waist: '30-32', hips: '38-40' },
      { size: 'M', chest: '40-42', waist: '34-36', hips: '42-44' },
      { size: 'L', chest: '44-46', waist: '38-40', hips: '46-48' },
      { size: 'XL', chest: '48-50', waist: '42-44', hips: '50-52' },
    ],
    shoes: [
      { size: 'EU 38', us: '6', uk: '5', cm: '24' },
      { size: 'EU 39', us: '7', uk: '6', cm: '24.6' },
      { size: 'EU 40', us: '8', uk: '7', cm: '25.4' },
      { size: 'EU 41', us: '9', uk: '8', cm: '26' },
      { size: 'EU 42', us: '10', uk: '9', cm: '26.7' },
      { size: 'EU 43', us: '11', uk: '10', cm: '27.3' },
    ]
  };

  // Determine which size guide to show based on product category
  const sizeGuideType = product.category.toLowerCase().includes('shoe')
    ? 'shoes'
    : 'clothing';

  const handleAddToCartClick = () => {
    handleAddToCart({
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      image: activeImage,
      quantity,
      size: activeSize,
      color: activeColor
    });
  };

  return (
    <>
      <div className="bg-white">
        {/* Back button and breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 lg:pt-8">
          <div className="mb-3 sm:mb-4 md:flex md:items-center md:justify-between">
            <span><Breadcrumb items={breadcrumbItems} /></span>
            <Link href="/shop" className="flex items-center text-sm mt-4 text-gray-600 hover:text-black transition-colors">
              <ArrowLeft className="h-4 w-4 mr-1" />
              <span>Back to Shop</span>
            </Link>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 my-6 md:my-20">
            {/* Product Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative w-full pt-[100%] rounded-xl overflow-hidden border border-gray-100 shadow-sm">
                <Image
                  src={activeImage}
                  alt={product.name}
                  fill
                  className="object-cover absolute top-0 left-0 w-full h-full"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                  priority
                  unoptimized
                />
              </div>

              {/* Thumbnail Images */}
              {(product.additionalImages && product.additionalImages.length > 0) && (
                <div className="grid grid-cols-5 gap-2 sm:gap-3">
                  <button
                    onClick={() => setActiveImage(product.image)}
                    className={`relative pt-[100%] rounded-lg overflow-hidden border ${activeImage === product.image ? 'border-black ring-1 ring-black' : 'border-gray-200'
                      }`}
                  >
                    <Image
                      src={product.image}
                      alt={`${product.name} thumbnail`}
                      fill
                      className="object-cover absolute top-0 left-0 w-full h-full"
                      sizes="(max-width: 640px) 20vw, 10vw"
                      unoptimized
                    />
                  </button>

                  {product.additionalImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImage(image)}
                      className={`relative pt-[100%] rounded-lg overflow-hidden border ${activeImage === image ? 'border-black ring-1 ring-black' : 'border-gray-200'
                        }`}
                    >
                      <Image
                        src={image}
                        alt={`${product.name} thumbnail ${index + 1}`}
                        fill
                        className="object-cover absolute top-0 left-0 w-full h-full"
                        sizes="(max-width: 640px) 20vw, 10vw"
                        unoptimized
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              <div className="mb-2">
                {product.isNew && (
                  <span className="inline-block px-2.5 py-1 bg-black text-white text-xs font-medium rounded-full mb-2">
                    New
                  </span>
                )}
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1">{product.name}</h1>

                <div className="flex items-center gap-4 mb-2">
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="ml-1 text-sm text-gray-500">{product.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>

                <div className="mb-4">
                  {product.comparePrice && product.comparePrice > product.price && (
                    <p className="text-lg text-gray-500 line-through mb-1">
                      ৳{product.comparePrice.toLocaleString()}
                    </p>
                  )}
                  <p className="text-3xl font-bold text-gray-900">৳{product.price.toLocaleString()}</p>
                </div>

                {/* Low Stock Notice */}
                {product.stock !== undefined && product.stock < 10 && product.stock > 0 && (
                  <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-yellow-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                      <span className="text-sm font-medium text-yellow-800">
                        Low Stock - Only a few items left!
                      </span>
                    </div>
                  </div>
                )}

                <div className="prose prose-sm text-gray-600 mb-6">
                  <p>{product.description}</p>
                </div>
              </div>

              {/* Color Options */}
              {product.hasColorOptions && product.colorVariants && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Color</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.colorVariants.map((variant) => (
                      <button
                        key={variant.color}
                        className={`w-8 h-8 rounded-full transition-all border ${activeColor === variant.color
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
              {product.sizes && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-900">Size</h3>
                    <button
                      className="text-xs text-gray-500 underline hover:text-black transition-colors flex items-center gap-1"
                      onClick={toggleSizeGuide}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                      </svg>
                      Size Guide
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        className={`min-w-[3rem] h-10 px-3 rounded-md transition-all ${activeSize === size
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

              {/* Quantity and Add to Cart */}
              <div className="flex flex-row gap-2 md:gap-4 mb-6">
                <div className='flex gap-2 md:gap-4'>
                  <div className="flex items-center h-10 md:h-12 border border-gray-300 rounded-md">
                    <button
                      className="flex-1 h-full flex items-center justify-center px-3 md:px-4 hover:bg-gray-100 transition-colors"
                      onClick={handleDecreaseQuantity}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="flex-1 h-full flex items-center justify-center px-3 md:px-4 text-center font-medium">
                      {quantity}
                    </span>
                    <button
                      className="flex-1 h-full flex items-center justify-center px-3 md:px-4 hover:bg-gray-100 transition-colors"
                      onClick={handleIncreaseQuantity}
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  <Button
                    className="w-full bg-black hover:bg-gray-900 text-white py-6 rounded-lg text-sm sm:text-base font-medium transition-colors"
                    onClick={handleAddToCartClick}
                    disabled={isLoading}
                  >
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    {isLoading ? 'Adding to Cart...' : 'Add to Cart'}
                  </Button>
                </div>

                <div className='flex gap-2 md:gap-4 justify-between'>
                  <Button
                    variant={isWishlisted ? "default" : "outline"}
                    size="icon"
                    className={`h-10 md:h-12 w-10 md:w-12 rounded-md ${isWishlisted ? 'bg-black text-white' : 'border-gray-300'
                      }`}
                    onClick={handleToggleWishlist}
                    aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                  >
                    <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-white' : ''}`} />
                  </Button>

                  <Button
                    variant="outline"
                    size="icon"
                    className="h-10 md:h-12 w-10 md:w-12 rounded-md border-gray-300"
                    aria-label="Share product"
                  >
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Specifications */}
              {product.specifications && (
                <div className="mt-6 border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Specifications</h3>
                  <ul className="space-y-3">
                    {product.specifications.map((spec, index) => (
                      <li key={index} className="flex items-start">
                        <ChevronRight className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="font-medium text-gray-900">{spec.label}:</span>{' '}
                          <span className="text-gray-600">{spec.value}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tags */}
              {product.tags && product.tags.length > 0 && (
                <div className="mt-6 border-t border-gray-200 pt-6">
                  <div className="flex items-center">
                    <span className="text-sm text-gray-500 mr-2">Tags:</span>
                    <div className="flex flex-wrap gap-2">
                      {product.tags.map((tag) => (
                        <Link
                          key={tag}
                          href={`/shop?tag=${tag}`}
                          className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-md hover:bg-gray-200 transition-colors"
                        >
                          {tag}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Product Tabs */}
          <div className="mt-12 border-t border-gray-200 pt-6">
            <div className="mx-auto">
              {/* Tab Navigation */}
              <div className="flex justify-between border-b border-gray-200">
                <button
                  onClick={() => setActiveTab('description')}
                  className={`py-4 px-2 md:px-6 font-medium text-xs md:text-sm transition-colors relative ${activeTab === 'description'
                    ? 'text-black'
                    : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                  Description
                  {activeTab === 'description' && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black"></span>
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('order')}
                  className={`py-4 px-2 md:px-6 font-medium text-xs md:text-sm transition-colors relative ${activeTab === 'order'
                    ? 'text-black'
                    : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                  Order & Delivery
                  {activeTab === 'order' && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black"></span>
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('return')}
                  className={`py-4 px-2 md:px-6 font-medium text-xs md:text-sm transition-colors relative ${activeTab === 'return'
                    ? 'text-black'
                    : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                  Return & Refund
                  {activeTab === 'return' && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black"></span>
                  )}
                </button>
              </div>

              {/* Tab Content */}
              <div className="py-6">
                {/* Description Tab */}
                {activeTab === 'description' && (
                  <div className="prose prose-sm sm:prose max-w-none">
                    <h3 className="text-lg font-medium mb-4">Product Details</h3>
                    <p className="mb-4">{product.description}</p>

                    {/* Long Description Sections */}
                    {product.longDescription && product.longDescription.length > 0 && (
                      <div className="space-y-6 mb-6">
                        {product.longDescription.map((section, index) => (
                          <div key={index}>
                            <h4 className="font-medium mb-2">{section.title}</h4>
                            <p className="text-gray-600">{section.content}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Product Features */}
                    {product.features && product.features.length > 0 && (
                      <div className="mb-6">
                        <h4 className="font-medium mb-2">Key Features:</h4>
                        <ul className="list-disc pl-5 space-y-2">
                          {product.features.map((feature, index) => (
                            <li key={index}>{feature}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Care Instructions */}
                    {product.careInstructions && product.careInstructions.length > 0 && (
                      <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-100">
                        <h4 className="font-medium mb-2">Care Instructions:</h4>
                        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                          {product.careInstructions.map((instruction, index) => (
                            <li key={index}>{instruction}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {/* Order & Delivery Tab */}
                {activeTab === 'order' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Ordering Information</h3>
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <div className="flex-shrink-0 h-6 w-6 rounded-full bg-black text-white flex items-center justify-center mr-3 mt-0.5">
                            <span className="text-xs font-medium">1</span>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">Select Your Options</h4>
                            <p className="text-gray-600 mt-1">
                              Choose your preferred color, size, and quantity. Make sure to check the size guide for the perfect fit.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <div className="flex-shrink-0 h-6 w-6 rounded-full bg-black text-white flex items-center justify-center mr-3 mt-0.5">
                            <span className="text-xs font-medium">2</span>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">Add to Cart & Checkout</h4>
                            <p className="text-gray-600 mt-1">
                              Add your selected items to cart and proceed to checkout. We accept various payment methods for your convenience.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <div className="flex-shrink-0 h-6 w-6 rounded-full bg-black text-white flex items-center justify-center mr-3 mt-0.5">
                            <span className="text-xs font-medium">3</span>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">Order Confirmation</h4>
                            <p className="text-gray-600 mt-1">
                              You&apos;ll receive an order confirmation email with your order details and tracking information once your order is processed.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="text-lg font-medium mb-4">Delivery Information</h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                          <h4 className="font-medium text-gray-900 mb-2">Standard Delivery</h4>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-center">
                              <span className="font-medium mr-2">Timeframe:</span> 3-5 business days
                            </li>
                            <li className="flex items-center">
                              <span className="font-medium mr-2">Cost:</span> ৳120 (Free for orders over ৳2000)
                            </li>
                          </ul>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                          <h4 className="font-medium text-gray-900 mb-2">Express Delivery</h4>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-center">
                              <span className="font-medium mr-2">Timeframe:</span> 1-2 business days
                            </li>
                            <li className="flex items-center">
                              <span className="font-medium mr-2">Cost:</span> ৳250
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="mt-4 text-sm text-gray-600">
                        <p className="mb-2">
                          <strong>Note:</strong> Delivery times may vary based on your location and product availability.
                          All orders are processed within 24 hours during business days.
                        </p>
                        <p>
                          For more information about our delivery options or to track your order,
                          please visit our <Link href="/help/delivery" className="text-black underline">Delivery Help Center</Link>.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Return & Refund Tab */}
                {activeTab === 'return' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Return Policy</h3>
                      <p className="mb-4">
                        We want you to be completely satisfied with your purchase. If for any reason you&apos;re not happy with your order,
                        we offer a hassle-free return and refund policy.
                      </p>

                      <div className="space-y-4 mb-6">
                        <div className="flex items-start">
                          <div className="flex-shrink-0 mt-1">
                            <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <div className="ml-3">
                            <h4 className="font-medium text-gray-900">30-Day Return Window</h4>
                            <p className="text-gray-600 mt-1">
                              You have 30 days from the delivery date to return your item(s).
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <div className="flex-shrink-0 mt-1">
                            <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <div className="ml-3">
                            <h4 className="font-medium text-gray-900">Unused Condition</h4>
                            <p className="text-gray-600 mt-1">
                              Items must be unused, unworn, and in their original packaging with all tags attached.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <div className="flex-shrink-0 mt-1">
                            <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <div className="ml-3">
                            <h4 className="font-medium text-gray-900">Free Returns</h4>
                            <p className="text-gray-600 mt-1">
                              We cover the return shipping cost for all eligible returns.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100 mb-6">
                        <h4 className="font-medium text-yellow-800 mb-2">Exceptions</h4>
                        <ul className="list-disc pl-5 space-y-1 text-sm text-yellow-700">
                          <li>Personalized or custom-made items cannot be returned unless defective</li>
                          <li>Items marked as &quot;Final Sale&quot; or &quot;Non-Returnable&quot; are not eligible for return</li>
                          <li>Hygiene products, underwear, and swimwear cannot be returned for hygiene reasons</li>
                        </ul>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="text-lg font-medium mb-4">Refund Process</h3>

                      <ol className="space-y-4">
                        <li className="flex">
                          <span className="flex-shrink-0 h-6 w-6 rounded-full bg-black text-white flex items-center justify-center mr-3">
                            <span className="text-xs font-medium">1</span>
                          </span>
                          <div>
                            <h4 className="font-medium text-gray-900">Initiate Return</h4>
                            <p className="text-gray-600 mt-1">
                              Contact our customer service or visit your account page to initiate a return request.
                            </p>
                          </div>
                        </li>

                        <li className="flex">
                          <span className="flex-shrink-0 h-6 w-6 rounded-full bg-black text-white flex items-center justify-center mr-3">
                            <span className="text-xs font-medium">2</span>
                          </span>
                          <div>
                            <h4 className="font-medium text-gray-900">Return Shipping</h4>
                            <p className="text-gray-600 mt-1">
                              Pack the item securely and use the provided return label to send it back to our warehouse.
                            </p>
                          </div>
                        </li>

                        <li className="flex">
                          <span className="flex-shrink-0 h-6 w-6 rounded-full bg-black text-white flex items-center justify-center mr-3">
                            <span className="text-xs font-medium">3</span>
                          </span>
                          <div>
                            <h4 className="font-medium text-gray-900">Quality Check</h4>
                            <p className="text-gray-600 mt-1">
                              Once received, we&apos;ll inspect the item to ensure it meets our return policy requirements.
                            </p>
                          </div>
                        </li>

                        <li className="flex">
                          <span className="flex-shrink-0 h-6 w-6 rounded-full bg-black text-white flex items-center justify-center mr-3">
                            <span className="text-xs font-medium">4</span>
                          </span>
                          <div>
                            <h4 className="font-medium text-gray-900">Refund Issued</h4>
                            <p className="text-gray-600 mt-1">
                              After approval, your refund will be processed to your original payment method within 5-7 business days.
                            </p>
                          </div>
                        </li>
                      </ol>

                      <div className="mt-6 text-sm text-gray-600">
                        <p>
                          For more information about our return and refund policy, visit
                          <Link href="/help/returns" className="text-black underline ml-2">Our Returns Help Center</Link>
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Size Guide Modal */}
      {showSizeGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-auto">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-lg font-semibold">Size Guide</h3>
              <button
                onClick={toggleSizeGuide}
                className="p-1 rounded-full hover:bg-gray-100"
                aria-label="Close size guide"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4">
              {sizeGuideType === 'shoes' ? (
                <>
                  <p className="mb-4 text-sm text-gray-600">Find your perfect shoe size using the chart below. Measurements are in centimeters.</p>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">EU Size</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">US Size</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">UK Size</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Foot Length (cm)</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {sizeGuideData.shoes.map((row, index) => (
                          <tr key={index} className={activeSize === row.size ? 'bg-gray-50' : ''}>
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{row.size}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{row.us}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{row.uk}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{row.cm}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              ) : (
                <>
                  <p className="mb-4 text-sm text-gray-600">Find your perfect fit using the measurements below. All measurements are in inches.</p>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chest</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Waist</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hips</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {sizeGuideData.clothing.map((row, index) => (
                          <tr key={index} className={activeSize === row.size ? 'bg-gray-50' : ''}>
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{row.size}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{row.chest}&quot;</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{row.waist}&quot;</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{row.hips}&quot;</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}

              <div className="mt-6 space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">How to Measure</h4>
                  <p className="text-sm text-gray-600">
                    {sizeGuideType === 'shoes'
                      ? 'Measure your foot length from the heel to the longest toe while standing.'
                      : 'Use a soft measuring tape. For chest, measure at the fullest point. For waist, measure at the narrowest point. For hips, measure at the widest point.'}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-200 text-center">
                  <button
                    className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
                    onClick={toggleSizeGuide}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Related Products */}
      <RelatedProducts
        currentProductId={product.id}
        category={product.category}
        tags={product.tags}
      />
    </>
  );
} 