'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';
import { productCategories } from '@/data/products';
import { ProductFilters } from '@/types/product';

interface CategorySectionProps {
  category: { name: string; subcategories: string[] };
  activeCategory: string;
  activeSubCategory: string;
  onChange: (category: string, subCategory?: string) => void;
}

function CategorySection({ 
  category, 
  activeCategory, 
  activeSubCategory, 
  onChange 
}: CategorySectionProps) {
  const [isExpanded, setIsExpanded] = useState(activeCategory === category.name);
  
  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  
  const handleCategoryClick = () => {
    onChange(category.name);
    if (!isExpanded) {
      setIsExpanded(true);
    }
  };
  
  const handleSubCategoryClick = (subCategory: string) => {
    onChange(category.name, subCategory);
  };
  
  return (
    <div className="mb-2.5">
      <div 
        className={`
          flex items-center justify-between p-2 rounded-md cursor-pointer transition-all
          ${activeCategory === category.name 
            ? 'bg-black text-white shadow-md' 
            : 'bg-gray-50 hover:bg-gray-100 text-gray-700'}
        `}
        onClick={() => {
          handleCategoryClick();
          handleToggleExpand();
        }}
      >
        <span className="text-sm font-medium">{category.name}</span>
        
        <button 
          onClick={(e) => {
            e.stopPropagation();
            handleToggleExpand();
          }}
          className={`${activeCategory === category.name ? 'text-white' : 'text-gray-400'}`}
        >
          {isExpanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>
      </div>
      
      {isExpanded && (
        <div className="mt-1 pl-2 space-y-1 animate-fadeIn">
          {category.subcategories.map((subCategory) => (
            <button
              key={subCategory}
              onClick={() => handleSubCategoryClick(subCategory)}
              className={`
                block w-full text-left text-sm p-1.5 rounded transition-all
                ${activeCategory === category.name && activeSubCategory === subCategory
                  ? 'bg-gray-100 text-black font-medium'
                  : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'}
              `}
            >
              {subCategory}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

interface ShopSidebarProps {
  filters: ProductFilters;
  onUpdateFilters: (filters: Partial<ProductFilters>) => void;
  onClearFilters: () => void;
}

export default function ShopSidebar({ 
  filters, 
  onUpdateFilters, 
  onClearFilters
}: ShopSidebarProps) {
  const [priceRange, setPriceRange] = useState<[number, number]>([
    filters.minPrice,
    filters.maxPrice
  ]);
  
  useEffect(() => {
    setPriceRange([filters.minPrice, filters.maxPrice]);
  }, [filters.minPrice, filters.maxPrice]);
  
  const handleCategoryChange = (category: string, subCategory?: string) => {
    if (filters.category === category && !subCategory) {
      // If clicking the same category again, clear the category filter
      onUpdateFilters({ category: '', subCategory: '' });
    } else {
      onUpdateFilters({ 
        category,
        subCategory: subCategory || ''
      });
    }
  };
  
  const handlePriceChange = (value: number[]) => {
    setPriceRange([value[0], value[1]]);
  };
  
  const handlePriceChangeCommitted = () => {
    onUpdateFilters({ 
      minPrice: priceRange[0], 
      maxPrice: priceRange[1] 
    });
  };
  
  const toggleInStock = (checked: boolean) => {
    onUpdateFilters({ inStock: checked });
  };
  
  return (
    <div className="space-y-4 pr-4">
      <div className="space-y-5">
        {/* Categories */}
        <div>
          <h3 className="text-xl font-medium uppercase tracking-wide text-gray-700 my-8">Categories</h3>
          <ScrollArea className="h-[45vh]">
            <div className="space-y-1 pr-3">
              {productCategories.map((category) => (
                <CategorySection
                  key={category.name}
                  category={category}
                  activeCategory={filters.category}
                  activeSubCategory={filters.subCategory}
                  onChange={handleCategoryChange}
                />
              ))}
            </div>
          </ScrollArea>
        </div>
        
        {/* Price Range */}
        <div className="pt-3 border-t border-gray-200">
          <h3 className="text-sm font-medium uppercase tracking-wide text-gray-700 mb-2">Price Range</h3>
          <div className="px-1">
            <Slider
              defaultValue={[filters.minPrice, filters.maxPrice]}
              min={0}
              max={10000}
              step={100}
              value={[priceRange[0], priceRange[1]]}
              onValueChange={(value) => {
                if (Array.isArray(value) && value.length === 2) {
                  handlePriceChange(value);
                }
              }}
              onValueCommit={handlePriceChangeCommitted}
              className="my-4"
            />
            <div className="flex items-center justify-between mt-1">
              <div className="text-sm text-gray-700 font-medium bg-gray-50 px-2 py-1 rounded">৳{priceRange[0]}</div>
              <div className="text-sm text-gray-700 font-medium bg-gray-50 px-2 py-1 rounded">৳{priceRange[1]}</div>
            </div>
          </div>
        </div>
        
        {/* In Stock Only */}
        <div className="pt-3 border-t border-gray-200">
          <div className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
            <h3 className="text-sm font-medium text-gray-700">In Stock Only</h3>
            <Switch 
              checked={filters.inStock} 
              onCheckedChange={toggleInStock}
            />
          </div>
        </div>
        
        {/* Clear Filters */}
        <div className="pt-3 border-t border-gray-200">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onClearFilters}
            className="w-full border-gray-200 hover:bg-black hover:text-white hover:border-black transition-colors"
          >
            Clear All Filters
          </Button>
        </div>
      </div>
    </div>
  );
} 