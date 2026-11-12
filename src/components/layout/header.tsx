'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Search, ShoppingCart, Menu, User, Heart, X, LogOut, Settings } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { AnimatePresence, motion } from 'framer-motion';
import { FadeIn } from '@/components/ui/animations/animations';
import { usePathname } from 'next/navigation';
import { logout } from '@/lib/auth';
import { useSession } from 'next-auth/react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

// Client-only wrapper component
const ClientOnly = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <header className="fixed top-0 left-0 right-0 z-[100] bg-transparent"></header>;
  }

  return <>{children}</>;
};

const NavLink = ({ href, label, icon, isScrolled, hasMounted = true }: { 
  href: string, 
  label: string, 
  icon?: React.ReactNode, 
  isScrolled: boolean,
  hasMounted?: boolean 
}) => (
  <Link 
    href={href} 
    className={`
      group flex items-center gap-1.5 text-sm font-medium transition-all duration-200 relative
      ${!hasMounted ? 'text-primary' : isScrolled ? 'text-gray-700 hover:text-primary' : 'text-white/90 hover:text-white'}
    `}
  >
    {icon}
    <span>{label}</span>
    <span className={`absolute -bottom-1 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-300 ${!hasMounted ? 'bg-black' : isScrolled ? 'bg-black' : 'bg-white'}`}></span>
  </Link>
);

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [hasMounted, setHasMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { status: sessionStatus } = useSession();

  useEffect(() => {
    setHasMounted(true);
    
    // Check if user is logged in (this would typically use your auth system)
    // For demo purposes, we're just checking localStorage
    const token = localStorage.getItem('user-token');
    setIsLoggedIn(!!token || sessionStatus === 'authenticated');
  }, [sessionStatus]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    handleScroll(); // Set initial value
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const categories = [
    { name: "Men", href: "/shop/men" },
    { name: "Women", href: "/shop/women" },
    { name: "Accessories", href: "/shop/accessories" },
    { name: "New Collection", href: "/shop/new" },
  ];

  // Authentication and account links
  const authLinks = [
    { name: "Sign In", href: "/login", icon: <User className="w-4 h-4 mr-2" />, authRequired: false },
    { name: "Create Account", href: "/signup", icon: <User className="w-4 h-4 mr-2" />, authRequired: false },
  ];

  const accountLinks = [
    { name: "My Account", href: "/account", icon: <User className="w-4 h-4 mr-2" />, authRequired: true },
    { name: "Settings", href: "/account/settings", icon: <Settings className="w-4 h-4 mr-2" />, authRequired: true },
    { name: "Sign Out", href: "#", icon: <LogOut className="w-4 h-4 mr-2" />, authRequired: true, onClick: handleSignOut },
  ];

  function handleSignOut(e: React.MouseEvent) {
    e.preventDefault();
    // Use the logout utility
    logout();
  }

  return (
    <ClientOnly>
      <header 
        suppressHydrationWarning
        data-qb-installed="true"
        data-cz-shortcut-listen="true"
        className={`
          fixed top-0 left-0 right-0 z-[100] transition-all duration-300
          ${!hasMounted ? 'bg-transparent' : isScrolled 
            ? 'bg-[#e0f2fe]/90 backdrop-blur-md shadow-sm border-b border-[#bae6fd]'
            : isMobileMenuOpen 
              ? 'transition-all duration-300 bg-[#e0f2fe]/80 backdrop-blur-xl'
              : 'bg-transparent'
          }
        `}
      >
        {/* Top bar with announcement */}
        <div 
          className={`
            text-center py-1.5 text-xs font-medium bg-primary/80 backdrop-blur-md text-white
            transform transition-all duration-700 ease-in-out overflow-hidden
            ${!hasMounted ? 'max-h-0 opacity-0 py-0' : isScrolled ? 'max-h-0 opacity-0 py-0' : 'max-h-10 opacity-100'}
          `}
        >
          Free shipping on all orders over bdt 1000
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex items-center justify-between h-16 sm:h-18 md:h-20">
            {/* Left section - Logo */}
            <div className="flex items-center">
              <Link 
                href="/" 
                className={`
                  font-heading text-2xl md:text-3xl font-bold tracking-tighter transition-colors
                  ${!hasMounted ? 'text-primary' : isScrolled ? 'text-primary' : 'text-white'}
                `}
              >
                NEXORA
              </Link>
            </div>

            {/* Center section - Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {categories.map((category) => (
                <NavLink 
                  key={category.name}
                  href={category.href}
                  label={category.name}
                  isScrolled={isScrolled}
                  hasMounted={hasMounted}
                />
              ))}
            </nav>

            {/* Right section - Actions */}
            <div className="hidden md:flex items-center gap-6">
              {/* Search button */}
              <button 
                onClick={() => setIsSearchOpen(true)}
                className={`
                  flex items-center gap-1 text-sm font-medium transition-colors
                  ${!hasMounted ? 'text-gray-700' : isScrolled ? 'text-gray-700 hover:text-primary' : 'text-white/90 hover:text-white'}
                `}
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
              
              {/* Wishlist */}
              <Link 
                href="/wishlist" 
                className={`
                  flex items-center gap-1 text-sm font-medium transition-colors
                  ${!hasMounted ? 'text-gray-700' : isScrolled ? 'text-gray-700 hover:text-primary' : 'text-white/90 hover:text-white'}
                `}
              >
                <Heart className="w-5 h-5" />
              </Link>
              
              {/* Account */}
              <div className="relative group" ref={profileRef}>
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className={`
                    flex items-center gap-1 text-sm font-medium transition-colors
                    ${!hasMounted ? 'text-gray-700' : isScrolled ? 'text-gray-700 hover:text-primary' : 'text-white/90 hover:text-white'}
                  `}
                  aria-label="Account"
                >
                  <User className="w-5 h-5" />
                </button>
                
                {/* Profile dropdown menu */}
                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg py-2 z-20"
                    >
                      {isLoggedIn ? (
                        <>
                          <div className="px-4 py-3 border-b border-gray-100">
                            <p className="text-sm font-medium text-gray-900">Welcome back</p>
                            <p className="text-xs text-gray-500 truncate">user@example.com</p>
                          </div>
                          {accountLinks.map((link) => (
                            link.onClick ? (
                              <button
                                key={link.name}
                                onClick={link.onClick}
                                className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                              >
                                {link.icon}
                                {link.name}
                              </button>
                            ) : (
                              <Link
                                key={link.name}
                                href={link.href}
                                className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                              >
                                {link.icon}
                                {link.name}
                              </Link>
                            )
                          ))}
                        </>
                      ) : (
                        <>
                          {authLinks.map((link) => (
                            <Link
                              key={link.name}
                              href={link.href}
                              className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                            >
                              {link.icon}
                              {link.name}
                            </Link>
                          ))}
                        </>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {/* Cart */}
              <Link 
                href="/cart" 
                className={`
                  flex items-center gap-1 text-sm font-medium transition-colors relative
                  ${!hasMounted ? 'text-gray-700' : isScrolled ? 'text-gray-700 hover:text-black' : 'text-white/90 hover:text-white'}
                `}
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute -top-2 -right-2 flex items-center justify-center w-4 h-4 text-[10px] font-medium rounded-full bg-primary text-white">
                  0
                </span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-4 md:hidden">
              <button 
                onClick={() => setIsSearchOpen(true)}
                className={`
                  p-2 transition-colors
                  ${!hasMounted ? 'text-gray-700' : isScrolled ? 'text-gray-700 hover:text-primary' : 'text-white/90 hover:text-white'}
                `}
                aria-label="Search"
              >
                <Search className="w-6 h-6" />
              </button>
              
              <Link 
                href="/cart" 
                className={`
                  p-2 transition-colors relative
                  ${!hasMounted ? 'text-gray-700' : isScrolled ? 'text-gray-700 hover:text-primary' : 'text-white/90 hover:text-white'}
                `}
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 text-[10px] font-medium rounded-full bg-primary text-white">
                  0
                </span>
              </Link>
              
              {/* Drawer for mobile menu */}
              <Drawer>
                <DrawerTrigger asChild>
                  <button
                    className={`
                      p-2 transition-colors
                      ${!hasMounted ? 'text-gray-700' : isScrolled 
                        ? 'text-gray-700 hover:text-primary' 
                        : 'text-white/90 hover:text-white'
                      }
                    `}
                    aria-label="Open menu"
                  >
                    <Menu className="w-6 h-6" />
                  </button>
                </DrawerTrigger>
                <DrawerContent className="h-[85vh] rounded-t-xl">
                  <DrawerHeader className="border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <DrawerTitle className="font-heading text-2xl font-bold tracking-tighter">
                        NEXORA
                      </DrawerTitle>
                      <DrawerClose className="p-2 text-gray-400 hover:text-gray-500 focus:outline-none">
                        <X className="h-6 w-6" />
                      </DrawerClose>
                    </div>
                  </DrawerHeader>
                  
                  <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                    <div className="space-y-6">
                      {/* Search bar */}
                      <div className="relative">
                        <Input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Search for products..."
                          className="w-full py-3 pl-10 pr-4 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary"
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      </div>

                      {/* Categories */}
                      <div className="space-y-2">
                        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                          Categories
                        </h3>
                        <div className="space-y-1">
                          {categories.map((category) => (
                            <Link 
                              key={category.name}
                              href={category.href} 
                              className="block py-2.5 font-medium transition-colors hover:text-primary"
                            >
                              {category.name}
                            </Link>
                          ))}
                        </div>
                      </div>

                      {/* Quick Links */}
                      <div className="space-y-2">
                        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                          Quick Links
                        </h3>
                        <div className="space-y-1">
                          <Link href="/shop" className="block py-2.5 font-medium transition-colors hover:text-primary">
                            All Products
                          </Link>
                          <Link href="/wishlist" className="block py-2.5 font-medium transition-colors hover:text-primary flex items-center">
                            <Heart className="w-4 h-4 mr-2" />
                            Wishlist
                          </Link>
                        </div>
                      </div>

                      {/* Account */}
                      <div className="space-y-2">
                        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                          Account
                        </h3>
                        <div className="space-y-1">
                          {isLoggedIn ? (
                            // Logged in user account options
                            <>
                              {accountLinks.map((link) => (
                                link.onClick ? (
                                  <button
                                    key={link.name}
                                    onClick={link.onClick}
                                    className="block w-full text-left py-2.5 font-medium transition-colors hover:text-primary flex items-center"
                                  >
                                    {link.icon}
                                    {link.name}
                                  </button>
                                ) : (
                                  <Link 
                                    key={link.name}
                                    href={link.href} 
                                    className="block py-2.5 font-medium transition-colors hover:text-primary flex items-center"
                                  >
                                    {link.icon}
                                    {link.name}
                                  </Link>
                                )
                              ))}
                            </>
                          ) : (
                            // Auth links for non-logged in users
                            <>
                              {authLinks.map((link) => (
                                <Link 
                                  key={link.name}
                                  href={link.href} 
                                  className="block py-2.5 font-medium transition-colors hover:text-primary flex items-center"
                                >
                                  {link.icon}
                                  {link.name}
                                </Link>
                              ))}
                            </>
                          )}
                        </div>
                      </div>

                      {/* Help & Support */}
                      <div className="space-y-2">
                        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                          Help & Support
                        </h3>
                        <div className="space-y-1">
                          <Link href="/contact" className="block py-2.5 font-medium transition-colors hover:text-black">
                            Contact Us
                          </Link>
                          <Link href="/about" className="block py-2.5 font-medium transition-colors hover:text-black">
                            About Us
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <DrawerFooter className="border-t border-gray-100 pt-4">
                    <div className="flex items-center justify-center space-x-6">
                      <a href="#" className="text-gray-400 hover:text-gray-900 transition-colors">
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                        </svg>
                      </a>
                      <a href="#" className="text-gray-400 hover:text-gray-900 transition-colors">
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                        </svg>
                      </a>
                      <a href="#" className="text-gray-400 hover:text-gray-900 transition-colors">
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                      </a>
                    </div>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            </div>
          </div>
        </div>

        {/* Full-screen search */}
        {hasMounted && (
          <AnimatePresence>
            {isSearchOpen && (
              <div ref={searchRef} className="absolute inset-0 top-0 z-50">
                <FadeIn 
                  direction="down" 
                  duration={0.2} 
                  delay={0}
                  className="bg-white/95 backdrop-blur-md p-4 flex items-start justify-center pt-24 h-full w-full"
                >
                  <div className="w-full max-w-2xl">
                    <div className="relative">
                      <Input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search for products..."
                        className="w-full py-3 px-4 pr-12 rounded-lg border border-gray-300 focus:border-black focus:ring-1 focus:ring-black text-lg"
                        autoFocus
                      />
                      <button 
                        className="absolute right-4 top-1/2 -translate-y-1/2"
                        aria-label="Search"
                      >
                        <Search className="w-5 h-5 text-gray-500" />
                      </button>
                    </div>
                    <button 
                      onClick={() => setIsSearchOpen(false)}
                      className="mt-6 text-sm text-gray-500 hover:text-black flex items-center gap-1 mx-auto"
                    >
                      <X className="w-4 h-4" /> Close
                    </button>
                  </div>
                </FadeIn>
              </div>
            )}
          </AnimatePresence>
        )}
      </header>
    </ClientOnly>
  );
} 