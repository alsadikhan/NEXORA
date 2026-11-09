'use client';

import dynamic from 'next/dynamic';

// Use dynamic import with no SSR to avoid hydration issues
const ShopLayout = dynamic(() => import('@/components/shop/shop-layout'), { ssr: false });

export default function ShopPage() {
  return <ShopLayout />;
}
