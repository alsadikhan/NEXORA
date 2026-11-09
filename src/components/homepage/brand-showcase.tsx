'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Award, Truck, RefreshCcw, Shield, HeadphonesIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import React from 'react';
import { FadeIn, StaggerContainer, StaggerItem, HoverScale } from '@/components/ui/animations/animations';

const brandValues = [
  {
    id: 2,
    title: "Fastest Shipping",
    description: "Enjoy rapid delivery to any location in Bangladesh with our optimized logistics network.",
    icon: <Truck className="w-7 h-7 text-primary" />,
  },
  {
    id: 3,
    title: "Easy Return Policy",
    description: "Not completely satisfied? Our hassle-free return process ensures your complete peace of mind.",
    icon: <RefreshCcw className="w-7 h-7 text-primary" />,
  },
  {
    id: 1,
    title: "Premium Quality ",
    description: "Every item in our collection is crafted with premium materials and meticulous attention to detail.",
    icon: <Award className="w-7 h-7 text-primary" />,
  },
  {
    id: 4,
    title: "Replacement Guarantee",
    description: "We stand behind our quality with a comprehensive replacement guarantee",
    icon: <Shield className="w-7 h-7 text-primary" />,
  },
  {
    id: 5,
    title: "24/7 Support",
    description: "Our dedicated customer service team is available around the clock to assist with any inquiries.",
    icon: <HeadphonesIcon className="w-7 h-7 text-primary" />,
  }
];

export default function BrandShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, 100]);
  
  return (
    <section ref={containerRef} className="py-24 md:pt-32 overflow-hidden relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <FadeIn direction="up" delay={0.2}>
          <div className="relative">
            <div className="absolute -top-10 left-0 w-40 h-40 bg-gray-100 rounded-full opacity-40 blur-3xl"></div>
            <div className="absolute top-40 right-20 w-64 h-64 bg-gray-200 rounded-full opacity-30 blur-3xl"></div>
            
            <div className="text-center max-w-3xl mx-auto relative">
              <h4 className="text-gray-500 uppercase tracking-widest text-sm font-medium mb-4">Our Story</h4>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Crafting Excellence With Passion
              </h2>
              <p className="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed">
                NEXORA began with a vision to redefine premium clothing through thoughtful design and superior craftsmanship. Our journey is one of passion, innovation, and unwavering commitment to quality.
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
      
      {/* Brand Visual Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
        <div className="h-[400px] md:h-[650px] relative">
          <motion.div
            style={{ opacity, y }}
            className="h-full w-full"
          >
            <Image 
              src="https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=1170&auto=format&fit=crop"
              alt="NEXORA clothing craftsmanship"
              fill
              className="object-cover object-center"
            />
          </motion.div>
        </div>
        
        <div className="bg-primary text-white p-8 md:p-16 flex flex-col justify-center items-start relative overflow-hidden">
          {/* Subtle texture overlay for the dark section */}
          <div className="absolute inset-0 z-0">
            <Image
              src="https://res.cloudinary.com/dfijxvhfl/image/upload/v1748619319/samples/cup-on-a-table.jpg"
              alt="Premium fabric texture"
              fill
              className="object-cover opacity-10 mix-blend-overlay"
            />
          </div>
          
          <FadeIn direction="right" delay={0.3} className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-bold mb-6">We believe in premium quality and design</h3>
            <p className="text-gray-300 mb-8 leading-relaxed">
              At NEXORA, we blend artisanal expertise with innovative techniques to create pieces that transcend trends. Each garment tells a story of dedication, from the careful selection of fabrics to the final stitch.
            </p>
            <Button variant="link" className="text-white p-0 hover:no-underline group" asChild>
              <Link href="/about">
                <span className="border-b border-white pb-1 group-hover:mr-1 transition-all">Discover our process</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </FadeIn>
        </div>
      </div>
      
      {/* Brand Values */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-20">
        <FadeIn direction="up" delay={0.1} className="text-center max-w-2xl mx-auto mb-10 md:mb-16">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-5">Why Choose NEXORA</h2>
          <p className="text-base md:text-lg text-gray-600">
            We&apos;re committed to providing exceptional value and service at every step of your shopping journey.
          </p>
        </FadeIn>
        
        <StaggerContainer staggerDelay={0.05} delay={0.2}>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
            {brandValues.map((value) => (
              <StaggerItem key={value.id}>
                <HoverScale scale={1.02}>
                  <div className="bg-card/90 backdrop-blur-sm p-3 md:p-5 rounded-xl border border-border flex flex-col items-center text-center transition-all duration-300 group overflow-hidden relative">
                    <div className="absolute -right-10 -top-10 w-20 h-20 bg-accent rounded-full opacity-30 group-hover:scale-150 transition-transform duration-700"></div>
                    
                    <div className="w-10 h-10 md:w-14 md:h-14 bg-accent rounded-full flex items-center justify-center mb-3 md:mb-4 group-hover:bg-primary group-hover:text-white transition-colors duration-300 relative z-10">
                      {React.cloneElement(value.icon as React.ReactElement, { 
                        className: "w-5 h-5 md:w-6 md:h-6 group-hover:text-white transition-colors duration-300" 
                      })}
                    </div>
                    
                    <h3 className="text-base md:text-lg font-semibold mb-1 md:mb-2 group-hover:text-primary transition-colors relative z-10">{value.title}</h3>
                    <p className="hidden md:block text-gray-600 text-sm line-clamp-4 relative z-10">{value.description}</p>
                    
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary w-0 group-hover:w-full transition-all duration-500"></div>
                  </div>
                </HoverScale>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>

        <div className="mt-8 md:mt-12 text-center">
          <FadeIn delay={0.5}>
            <Button 
              variant="outline" 
              size="sm"
              className="rounded-full border-primary text-primary hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
              asChild
            >
              <Link href="/about">
                <span className="flex items-center gap-1">
                  Learn More About Our Values
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </Button>
          </FadeIn>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-[#132f25] opacity-95"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1601924638867-3a6de6b7a500?q=80&w=1170&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <FadeIn direction="up" className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Experience Premium Quality With NEXORA</h2>
            <p className="text-lg md:text-xl text-gray-300 mb-10">
              Join the discerning community of individuals who demand excellence in every detail. Discover the NEXORA difference today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="default"
                size="lg"
                className="bg-white text-black hover:bg-gray-100"
                asChild
              >
                <Link href="/shop">
                  Explore Collection
                </Link>
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="border-white bg-transparent text-white hover:bg-white hover:text-black"
                asChild
              >
                <Link href="/about">
                  Our Story
                </Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
} 