'use client';

import Image from 'next/image';
import Link from 'next/link';
import { 
  ShoppingBag, 
  Sparkles, 
  Watch, 
  Glasses, 
  Crown, 
  Shirt,
  Footprints,
} from 'lucide-react';

const categoryData = [
  {
    id: 1,
    name: 'T-Shirts',
    icon: <Shirt className="w-6 h-6" />,
    image: 'https://images.pexels.com/photos/6347888/pexels-photo-6347888.jpeg?auto=compress&cs=tinysrgb&w=600',
    link: '/categories/t-shirts'
  },
  {
    id: 2,
    name: 'Atars',
    icon: <Sparkles className="w-6 h-6" />,
    image: 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=600',
    link: '/categories/atars'
  },
  {
    id: 3,
    name: 'Accessories',
    icon: <Crown className="w-6 h-6" />,
    image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=600',
    link: '/categories/accessories'
  },
  {
    id: 4,
    name: 'Eyewear',
    icon: <Glasses className="w-6 h-6" />,
    image: 'https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&cs=tinysrgb&w=600',
    link: '/categories/eyewear'
  },
  {
    id: 5,
    name: 'Footwear',
    icon: <Footprints className="w-6 h-6" />,
    image: 'https://images.pexels.com/photos/267320/pexels-photo-267320.jpeg?auto=compress&cs=tinysrgb&w=600',
    link: '/categories/footwear'
  },
  {
    id: 6,
    name: 'Watches',
    icon: <Watch className="w-6 h-6" />,
    image: 'https://images.pexels.com/photos/2783873/pexels-photo-2783873.jpeg?auto=compress&cs=tinysrgb&w=600',
    link: '/categories/watches'
  },
];

export default function Categories() {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categoryData.map((category) => (
            <Link 
              key={category.id}
              href={category.link} 
              className="group relative h-[120px] rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg"
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/10 group-hover:from-black/60" />
              </div>
              
              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-3">
                <div className="bg-white/20 backdrop-blur-sm p-2 rounded-full mb-2 transform transition-transform duration-300 group-hover:scale-110">
                  {category.icon}
                </div>
                <h3 className="font-medium text-center text-base tracking-wide">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
} 