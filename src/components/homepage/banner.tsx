'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

// Banner data
const bannerData = [
  {
    id: 1,
    title: 'Introducing Our Brand',
    subtitle: 'New Lifestyle Brand',
    description:
      'Step into a new era of fashion with our debut collection — where comfort meets sophistication.',
    image:
      'https://res.cloudinary.com/wwgagxnb/image/upload/f_auto,q_auto/Sky_Blue_New_Brand_Launch',
    cta: 'Explore Now',
  },
  {
    id: 2,
    title: 'Menswear Collection',
    subtitle: 'Modern Essentials',
    description:
      "Upgrade your wardrobe with our latest men's t-shirts, tailored for fit and comfort.",
    image:
      'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748991861/mens-collection_zppszp.png',
    cta: 'Shop T-Shirts',
  },
  {
    id: 3,
    title: 'Signature Atars',
    subtitle: 'Timeless Fragrance',
    description:
      'Experience our handcrafted collection of premium Atars, designed for lasting impressions.',
    image:
      'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748991834/perfumes_tczofj.png',
    cta: 'Explore Scents',
  },
];

export default function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === bannerData.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? bannerData.length - 1 : prev - 1));
  }, []);

  // Auto-rotation
  useEffect(() => {
    if (!isPaused) {
      const timer = setTimeout(() => {
        nextSlide();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [currentSlide, isPaused, nextSlide]);

  return (
    <div
      className="absolute top-0 left-0 right-0 w-full h-[500px] md:h-[600px] lg:h-[700px]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides */}
      {bannerData.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={index === 0}
              className="object-cover"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
          </div>

          {/* Content */}
          <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="h-full flex items-center">
              <div className="max-w-xl space-y-4 md:space-y-6 text-white">
                <span className="inline-block text-xs md:text-sm lg:text-base font-medium tracking-wider uppercase bg-white/20 backdrop-blur-sm px-3 py-1.5 md:px-4 md:py-2 rounded-full">
                  {slide.subtitle}
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-heading font-bold leading-tight">
                  {slide.title}
                </h2>
                <p className="text-base md:text-lg lg:text-xl text-gray-200">
                  {slide.description}
                </p>

                <Button
                variant="default"
                asChild
                className="bg-white text-black px-8 py-6  hover:bg-gray-100 "
              >
                <Link href="/shop">
                  <span>{slide.cta}</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation buttons */}
      <Button
        onClick={prevSlide}
        variant="outline"
        size="icon"
        className="absolute left-4 md:left-8 top-[90%] md:top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm transition-all text-white border-none focus:outline-none"
        aria-label="Previous slide"
      >
        <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
      </Button>

      <Button
        onClick={nextSlide}
        variant="outline"
        size="icon"
        className="absolute right-4 md:right-8 top-[90%] md:top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm transition-all text-white border-none focus:outline-none"
        aria-label="Next slide"
      >
        <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
      </Button>

      {/* Indicators */}
      <div className="swiper-pagination absolute bottom-6 left-0 right-0 z-20 flex justify-center gap-2">
        {bannerData.map((_, index) => (
          <Button
            key={index}
            onClick={() => setCurrentSlide(index)}
            variant="ghost"
            size="icon"
            className={`w-2 h-2 md:w-3 md:h-3 min-w-0 min-h-0 p-0 rounded-full transition-all duration-300 ${index === currentSlide
                ? 'opacity-100 bg-white scale-110'
                : 'opacity-50 bg-white/50'
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-20">
        <div
          className="h-full bg-white origin-left"
          style={{
            animation: isPaused ? 'none' : 'progress 5s linear',
            width: isPaused ? '0%' : '100%'
          }}
        />
      </div>

      <style jsx global>{`
        .swiper-pagination {
          bottom: 1.5rem !important;
          z-index: 40;
          position: absolute;
          width: 100%;
          display: flex;
          justify-content: center;
          gap: 6px;
        }
        
        .swiper-pagination-bullet {
          opacity: 0.5;
          margin: 0 4px !important;
        }
        
        .swiper-pagination-bullet-active {
          opacity: 1 !important;
          background: white !important;
          transform: scale(1.2);
        }

        @keyframes progress {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
      `}</style>
    </div>
  );
}

