'use client';

import { Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ProductFilters } from '@/types/product';
import { Dispatch, SetStateAction, FormEvent } from 'react';

interface ShopHeaderProps {
  filters: ProductFilters;
  onUpdateFilters: (filters: Partial<ProductFilters>) => void;
  toggleMobileFilters: () => void;
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
  handleSearch: (e: FormEvent) => void;
}

export default function ShopHeader({ 
  filters, 
  onUpdateFilters,
  toggleMobileFilters,
  searchValue,
  setSearchValue,
  handleSearch
}: ShopHeaderProps) {
  
  const handleSortChange = (value: string) => {
    onUpdateFilters({ 
      sortBy: value as ProductFilters['sortBy'] 
    });
  };
  
  return (
    <div className="bg-white pb-3 py-1 md:py-3 border-b border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Top row: Filter Button, Search Bar, and Sort */}
        <div className="flex items-center justify-between flex-wrap gap-0 md:gap-4">
          {/* Left: Mobile Filter Button */}
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 lg:hidden border-gray-200 px-2 h-8"
              onClick={toggleMobileFilters}
            >
              <Filter className="h-4 w-4" />
              <span className='text-[10px]'>Filters</span>
            </Button>
          </div>
          
          {/* Search Bar */}
          <div className="w-full sm:w-auto order-3 sm:order-2 sm:flex-1 max-w-sm mx-auto mt-3 sm:mt-0">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Search products..."
                className="w-full pr-10 border-gray-200 placeholder:text-xs md:placeholder:text-sm "
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <Button 
                type="submit" 
                variant="ghost" 
                size="icon" 
                className="absolute right-0 top-0 h-full"
              >
                <Search className="h-4 w-4" />
              </Button>
            </form>
          </div>
          
          {/* Right: Sort */}
          <div className="order-2 sm:order-3">
            <Select 
              value={filters.sortBy} 
              onValueChange={handleSortChange}
            >
              <SelectTrigger className="w-[100px] h-8 md:h-auto md:w-[180px] text-[10px] md:text-sm border-gray-200 focus:ring-gray-500">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Active Filter Pills */}
        {(filters.category || filters.subCategory || filters.inStock || filters.searchQuery) && (
          <div className="flex flex-wrap items-center gap-2 mt-3">
            <span className="text-xs text-gray-500">Active filters:</span>
            
            {filters.searchQuery && (
              <span className="inline-flex items-center text-xs bg-gray-100 rounded-full px-3 py-1">
                Search: {filters.searchQuery}
                <button 
                  onClick={() => onUpdateFilters({ searchQuery: '' })}
                  className="ml-1.5 text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </span>
            )}
            
            {filters.category && (
              <span className="inline-flex items-center text-xs bg-gray-100 rounded-full px-3 py-1">
                {filters.category}
                <button 
                  onClick={() => onUpdateFilters({ category: '', subCategory: '' })}
                  className="ml-1.5 text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </span>
            )}
            
            {filters.subCategory && (
              <span className="inline-flex items-center text-xs bg-gray-100 rounded-full px-3 py-1">
                {filters.subCategory}
                <button 
                  onClick={() => onUpdateFilters({ subCategory: '' })}
                  className="ml-1.5 text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </span>
            )}
            
            {filters.inStock && (
              <span className="inline-flex items-center text-xs bg-gray-100 rounded-full px-3 py-1">
                In Stock Only
                <button 
                  onClick={() => onUpdateFilters({ inStock: false })}
                  className="ml-1.5 text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </span>
            )}
            
            <Button 
              variant="link" 
              size="sm" 
              className="text-xs text-gray-500 h-auto p-0 hover:no-underline"
              onClick={() => onUpdateFilters({
                category: '',
                subCategory: '',
                sortBy: 'featured',
                minPrice: 0,
                maxPrice: 10000,
                inStock: false,
                searchQuery: '',
              })}
            >
              Clear all
            </Button>
          </div>
        )}
      </div>
    </div>
  );
} 