'use client';

import { usePathname } from "next/navigation";
import Header from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import ShopHeaderManager from "@/components/shop/shop-header-manager";
import { Toaster } from "sonner";

export default function MainLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // Check if we're on an auth page where header/footer are hidden
  const isAuthPage = 
    pathname === '/login' || 
    pathname === '/signup' || 
    pathname === '/forgot-password' ||
    pathname?.startsWith('/(auth)') || 
    pathname?.startsWith('/login/') || 
    pathname?.startsWith('/signup/') || 
    pathname?.startsWith('/forgot-password/');
  
  // Check if we're on a shop page
  const isShopPage = pathname === '/shop' || pathname?.startsWith('/shop/');
  
  // Check if we're on the cart page
  const isCartPage = pathname === '/cart' || pathname?.startsWith('/cart/');
  
  // Check if we're on the admin page
  const isAdminPage = pathname === '/admin' || pathname?.startsWith('/admin/');
  
  // Only apply padding when header is present
  const shouldApplyHeaderPadding = !isAuthPage && !isShopPage && !isCartPage && !isAdminPage;
  
  // Hide header and footer on auth, shop, cart, and admin pages
  const shouldShowHeaderFooter = !isAuthPage && !isShopPage && !isCartPage && !isAdminPage;
  
  // For admin pages, just render the children without the main layout wrapper
  if (isAdminPage) {
    return (
      <>
        <Toaster position="top-right" richColors closeButton />
        {children}
      </>
    );
  }
  
  return (
    <div className="flex min-h-screen flex-col">
      <Toaster position="top-right" richColors closeButton />
      {shouldShowHeaderFooter && (
        <Header />
      )}
      <main className={`flex-grow ${shouldApplyHeaderPadding ? 'pt-16 sm:pt-18 md:pt-20' : ''}`}>
        {children}
      </main>
      {shouldShowHeaderFooter && (
        <Footer />
      )}
    </div>
  );
} 