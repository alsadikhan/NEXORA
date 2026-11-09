'use client';

import { usePathname } from 'next/navigation';

export default function ShopHeaderManager({
  children
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isShopPage = pathname === '/shop' || pathname?.startsWith('/shop/');
  const isAuthPage = 
    pathname === '/login' || 
    pathname === '/signup' || 
    pathname === '/forgot-password' ||
    pathname?.startsWith('/(auth)') || // For the auth route group
    pathname?.startsWith('/login/') || 
    pathname?.startsWith('/signup/') || 
    pathname?.startsWith('/forgot-password/');
  
  // If we're on a shop page or auth page, hide the children (header/footer)
  if (isShopPage || isAuthPage) {
    return null;
  }
  
  return <>{children}</>;
} 