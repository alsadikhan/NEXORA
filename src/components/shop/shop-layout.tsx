'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ShopSidebar from './shop-sidebar';
import ProductsGrid from './products-grid';
import ShopHeader from './shop-header';
import { Breadcrumb } from './breadcrumb';
import { useSearchParams, usePathname } from 'next/navigation';
import { dummyProducts } from '@/data/products';
import { ProductFilters } from '@/types/product';
import { ShoppingBag, User, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

export default function ShopLayout() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  
  // Filters state
  const [filters, setFilters] = useState<ProductFilters>({
    category: searchParams?.get('category') || '',
    subCategory: searchParams?.get('subCategory') || '',
    sortBy: (searchParams?.get('sortBy') as ProductFilters['sortBy']) || 'featured',
    minPrice: searchParams?.get('minPrice') ? Number(searchParams?.get('minPrice')) : 0,
    maxPrice: searchParams?.get('maxPrice') ? Number(searchParams?.get('maxPrice')) : 10000,
    inStock: searchParams?.has('inStock') ? searchParams?.get('inStock') === 'true' : false,
    searchQuery: searchParams?.get('q') || '',
  });
  
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(dummyProducts);
  const [searchValue, setSearchValue] = useState(filters.searchQuery);
  
  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (filters.category) params.set('category', filters.category);
    if (filters.subCategory) params.set('subCategory', filters.subCategory);
    if (filters.sortBy !== 'featured') params.set('sortBy', filters.sortBy);
    if (filters.minPrice > 0) params.set('minPrice', filters.minPrice.toString());
    if (filters.maxPrice < 10000) params.set('maxPrice', filters.maxPrice.toString());
    if (filters.inStock) params.set('inStock', 'true');
    if (filters.searchQuery) params.set('q', filters.searchQuery);
    
    const queryString = params.toString();
    const url = pathname + (queryString ? `?${queryString}` : '');
    
    // Update URL without refreshing the page
    window.history.pushState({}, '', url);
  }, [filters, pathname]);
  
  // Apply filters and sort products
  useEffect(() => {
    let result = [...dummyProducts];
    
    // Filter by category
    if (filters.category) {
      result = result.filter(product => product.category === filters.category);
    }
    
    // Filter by subcategory
    if (filters.subCategory) {
      result = result.filter(product => product.subCategory === filters.subCategory);
    }
    
    // Filter by price range
    result = result.filter(product => 
      product.price >= filters.minPrice && 
      product.price <= filters.maxPrice
    );
    
    // Filter by stock availability
    if (filters.inStock) {
      result = result.filter(product => product.inStock);
    }
    
    // Filter by search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.category.toLowerCase().includes(query) ||
        (product.subCategory && product.subCategory.toLowerCase().includes(query))
      );
    }
    
    // Sort products
    switch (filters.sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => (b.isNew === a.isNew) ? 0 : b.isNew ? 1 : -1);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // featured - no sort (default order)
        break;
    }
    
    setFilteredProducts(result);
  }, [filters]);
  
  const handleUpdateFilters = (newFilters: Partial<ProductFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };
  
  const handleClearFilters = () => {
    setFilters({
      category: '',
      subCategory: '',
      sortBy: 'featured',
      minPrice: 0,
      maxPrice: 10000,
      inStock: false,
      searchQuery: '',
    });
    setSearchValue('');
  };
  
  const toggleMobileFilters = () => {
    setIsMobileFiltersOpen(!isMobileFiltersOpen);
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    handleUpdateFilters({ searchQuery: searchValue });
  };
  
  return (
    <div className="bg-white min-h-screen">
      {/* Integrated navigation and breadcrumb */}
      <div className="bg-gray-50 py-3 border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Left: Logo and Breadcrumb */}
            <div className="flex items-center gap-4">
              <Link href="/" className="font-heading text-xl font-bold tracking-tighter">
                NEXORA
              </Link>
              <div className="text-gray-300">|</div>
              <Breadcrumb 
                items={[
                  { label: 'Home', href: '/' },
                  { label: 'Shop', href: '/shop' },
                  ...(filters.category ? [{ label: filters.category, href: `/shop?category=${filters.category}` }] : []),
                  ...(filters.subCategory ? [{ label: filters.subCategory, href: `/shop?category=${filters.category}&subCategory=${filters.subCategory}` }] : []),
                ]} 
              />
            </div>
            
            {/* Right: Navigation and User Actions */}
            <div className="flex items-center justify-between w-full md:w-auto">
              <div className="flex items-center space-x-3 md:space-x-6">
                <Link href="/" className="text-xs md:text-sm font-medium text-gray-600 hover:text-black transition-colors">
                  Home
                </Link>
                <Link href="/about" className="text-xs md:text-sm font-medium text-gray-600 hover:text-black transition-colors">
                  About
                </Link>
                <Link href="/contact" className="text-xs md:text-sm font-medium text-gray-600 hover:text-black transition-colors">
                  Contact
                </Link>
              </div>
              
              <div className="h-5 w-px bg-gray-200 mx-3 md:mx-4"></div>
              
              <div className="flex items-center gap-3 md:gap-5">
                <Link href="/account" className="text-gray-700 hover:text-black transition-colors" aria-label="Account">
                  <User className="w-4 h-4 md:w-5 md:h-5" />
                </Link>
                
                <Link href="/wishlist" className="text-gray-700 hover:text-black transition-colors" aria-label="Wishlist">
                  <Heart className="w-4 h-4 md:w-5 md:h-5" />
                </Link>
                
                <Link href="/cart" className="text-gray-700 hover:text-black transition-colors relative" aria-label="Cart">
                  <ShoppingBag className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="absolute -top-2 -right-2 flex items-center justify-center w-3.5 h-3.5 md:w-4 md:h-4 text-[8px] md:text-[10px] font-medium rounded-full bg-black text-white">
                    0
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Shop header with sort dropdown and mobile filter button */}
      <ShopHeader 
        filters={filters}
        onUpdateFilters={handleUpdateFilters}
        toggleMobileFilters={toggleMobileFilters}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        handleSearch={handleSearch}
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col lg:flex-row">
          {/* Sidebar - fixed position on desktop */}
          <div className="lg:w-64 lg:flex-shrink-0 lg:sticky lg:top-[4.5rem] lg:self-start lg:overflow-visible hidden lg:block">
            <ShopSidebar
              filters={filters}
              onUpdateFilters={handleUpdateFilters}
              onClearFilters={handleClearFilters}
            />
          </div>
          
          {/* Drawer for mobile sidebar */}
          <Drawer open={isMobileFiltersOpen} onOpenChange={setIsMobileFiltersOpen}>
            <DrawerContent className="max-h-[85vh]">
              <DrawerHeader className="border-b border-gray-100 px-4">
                <DrawerTitle>Filters</DrawerTitle>
                <DrawerDescription>Refine your product search</DrawerDescription>
              </DrawerHeader>
              <div className="px-4 py-2 overflow-y-auto">
                <ShopSidebar
                  filters={filters}
                  onUpdateFilters={handleUpdateFilters}
                  onClearFilters={handleClearFilters}
                />
              </div>
              <DrawerFooter className="border-t border-gray-100 px-4">
                <DrawerClose asChild>
                  <Button variant="outline">Close</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
          
          {/* Products grid */}
          <div className="flex-grow lg:pl-8 pb-8 py-0 md:py-8">
            <ProductsGrid products={filteredProducts} />
          </div>
        </div>
      </div>
    </div>
  );
} 