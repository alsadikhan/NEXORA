'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ui/product-card';
import { FadeIn, StaggerItem } from '@/components/ui/animations/animations';
import { Product } from '@/types/product';

// Import Swiper components
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { FreeMode, Navigation, Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';

const featuredProducts: Product[] = [
  {
    id: 1,
    name: 'Premium Cotton T-Shirt',
    price: 499,
    rating: 4.9,
    category: 'T-Shirts',
    link: '/products/premium-cotton-tshirt',
    isNew: true,
    inStock: true,
    hasColorOptions: true,
    colorVariants: [
      { 
        color: '#000000',
        name: 'Black',
        image: 'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748995330/blank-tshirt-19_mhmvoh.jpg'
      },
      {
        color: '#FFFFFF',
        name: 'White',
        image: 'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748995325/blank-tshirt-15_sm6qa8.jpg'
      },
      {
        color: '#D5D8DC',
        name: 'Gray',
        image: 'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748995337/blank-tshirt-6_sjbzub.jpg'
      }
    ],
    image: 'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748995324/blank-tshirt-14_cfsydj.jpg',
    sizes: ['S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: 2,
    name: 'Slim Fit Polo Shirt',
    price: 699,
    rating: 4.7,
    category: 'Polo Shirts',
    link: '/products/slim-fit-polo',
    isNew: false,
    inStock: true,
    hasColorOptions: true,
    colorVariants: [
      {
        color: '#1C2833',
        name: 'Navy',
        image: 'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748995428/image-5_shfwmg.jpg'
      },
      {
        color: '#5D6D7E',
        name: 'Blue',
        image: 'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748995421/image-119_cnolq1.jpg'
      }
    ],
    image: 'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748995427/image-157_xsbuoe.jpg',
    sizes: ['M', 'L', 'XL']
  },
  {
    id: 3,
    name: 'Signature Collection Tee',
    price: 599,
    rating: 4.8,
    category: 'T-Shirts',
    link: '/products/signature-collection-tee',
    isNew: true,
    inStock: true,
    hasColorOptions: false,
    image: 'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748817871/tshirt-6_dzfego.jpg',
    sizes: ['S', 'M', 'L']
  },
  {
    id: 4,
    name: 'Essential Performance Tee',
    price: 545,
    rating: 4.6,
    category: 'Performance',
    link: '/products/essential-performance-tee',
    isNew: false,
    inStock: false,
    hasColorOptions: false,
    image: 'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748817883/tshirt-75_utfpmc.jpg',
    sizes: ['S', 'M']
  },
  {
    id: 5,
    name: 'Lightweight Merino Tee',
    price: 445,
    rating: 4.9,
    category: 'Premium',
    link: '/products/lightweight-merino-tee',
    isNew: true,
    inStock: true,
    hasColorOptions: true,
    colorVariants: [
      {
        color: '#283747',
        name: 'Charcoal',
        image: 'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748817862/tshirt-31_pksbeu.jpg'
      },
      {
        color: '#FBFCFC',
        name: 'Light Gray',
        image: 'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748817883/tshirt-78_me3l07.jpg'
      }
    ],
    image: 'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748817863/tshirt-38_jwjr9w.jpg',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 6,
    name: 'Heritage Embroidered Polo',
    price: 799,
    rating: 4.7,
    category: 'Polo Shirts',
    link: '/products/heritage-embroidered-polo',
    isNew: true,
    inStock: true,
    hasColorOptions: false,
    image: 'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748995415/66cd75ad24196-square_gly7is.png',
    sizes: ['M', 'L', 'XL', 'XXL']
  },
];

export default function FeaturedProducts() {
  const [activeColorMap, setActiveColorMap] = useState<Record<number, string>>({});
  const [activeImageMap, setActiveImageMap] = useState<Record<number, string>>({});
  const [wishlist, setWishlist] = useState<number[]>([]);
  const swiperRef = useRef<SwiperType | null>(null);
  
  // Initialize default images
  useEffect(() => {
    const defaultImages: Record<number, string> = {};
    featuredProducts.forEach(product => {
      if (product.hasColorOptions && product.colorVariants && product.colorVariants.length > 0) {
        defaultImages[product.id] = product.colorVariants[0].image;
        setActiveColorMap(prev => ({ 
          ...prev, 
          [product.id]: product.colorVariants?.[0]?.color ?? '' 
        }));
      } else {
        defaultImages[product.id] = product.image;
      }
    });
    setActiveImageMap(defaultImages);
  }, []);
  
  const handleColorSelect = (productId: number, color: string) => {
    setActiveColorMap(prev => ({
      ...prev,
      [productId]: color
    }));
    
    // Update image based on selected color
    const product = featuredProducts.find(p => p.id === productId);
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
  
  return ( 
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <FadeIn>
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold">Featured Products</h2>
              <p className="text-gray-600 mt-2 max-w-2xl">
                Discover our latest premium collection crafted with exceptional quality and contemporary design
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => swiperRef.current?.slidePrev()} 
                className="w-12 h-12 rounded-full border border-gray-200 hover:bg-black hover:text-white hover:border-black"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => swiperRef.current?.slideNext()} 
                className="w-12 h-12 rounded-full border border-gray-200 hover:bg-black hover:text-white hover:border-black"
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
              <Button
                variant="default"
                asChild
                className="bg-black text-white hover:bg-gray-800 ml-2"
              >
                <Link href="/shop">
                  <span>Shop All</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </FadeIn>
        
            <Swiper
          modules={[Navigation, Pagination, FreeMode, Autoplay]}
          slidesPerView={1}
          spaceBetween={24}
          freeMode={true}
          loop={true}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
              }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
                1280: {
                  slidesPerView: 4,
                },
              }}
          className="!overflow-visible"
            >
          {featuredProducts.map((product) => (
            <SwiperSlide key={product.id} className="!h-auto">
                      <StaggerItem>
                        <ProductCard
                          product={product}
                          onColorSelect={handleColorSelect}
                          onToggleWishlist={toggleWishlist}
                  activeColor={activeColorMap[product.id]}
                  displayImage={activeImageMap[product.id]}
                  isWishlisted={wishlist.includes(product.id)}
                        />
                      </StaggerItem>
                    </SwiperSlide>
          ))}
            </Swiper>
      </div>

      <style jsx global>{`
        .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: #d1d5db;
          opacity: 0.5;
          transition: all 0.3s ease;
        }
        
        .swiper-pagination-bullet-active {
          width: 24px;
          border-radius: 4px;
          background: #000;
          opacity: 1;
        }
        
        .featured-products-slider {
          width: 100%;
          max-width: 100%;
          overflow: hidden !important;
        }
        
        .swiper {
          overflow: hidden !important;
          padding-bottom: 30px;
          width: 100%;
          max-width: 100%;
        }
        
        .swiper-wrapper {
          width: 100%;
          max-width: 100%;
          overflow: visible !important;
        }
        
        .swiper-slide {
          height: auto;
          overflow: visible !important;
        }
      `}</style>
    </section>
  );
}