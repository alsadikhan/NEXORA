'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Plus, 
  Search, 
  Filter, 
  ArrowUpDown, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Copy, 
  Eye, 
  Check, 
  X 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { ProductInventory } from '@/types/admin';
import { Checkbox } from '@/components/ui/checkbox';

// Mock product data
const mockProducts: ProductInventory[] = [
  {
    id: 1,
    name: 'Premium Cotton T-Shirt',
    price: 499,
    rating: 4.9,
    category: 'T-Shirts',
    subCategory: 'Casual',
    link: '/products/premium-cotton-tshirt',
    isNew: true,
    inStock: true,
    hasColorOptions: true,
    colorVariants: [
      { 
        color: '#000000',
        name: 'Black',
        image: 'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748995330/blank-tshirt-19_mhmvoh.jpg'
      },
      {
        color: '#FFFFFF',
        name: 'White',
        image: 'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748995325/blank-tshirt-15_sm6qa8.jpg'
      },
      {
        color: '#D5D8DC',
        name: 'Gray',
        image: 'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748995337/blank-tshirt-6_sjbzub.jpg'
      }
    ],
    image: 'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748995324/blank-tshirt-14_cfsydj.jpg',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    sku: 'TSH-PREM-001',
    stock: 150,
    reserved: 5,
    available: 145,
    lowStockThreshold: 20,
    costPrice: 250,
    profit: 249,
    profitMargin: 49.9
  },
  {
    id: 2,
    name: 'Slim Fit Polo Shirt',
    price: 699,
    rating: 4.7,
    category: 'Polo Shirts',
    subCategory: 'Casual',
    link: '/products/slim-fit-polo',
    isNew: false,
    inStock: true,
    hasColorOptions: true,
    colorVariants: [
      {
        color: '#1C2833',
        name: 'Navy',
        image: 'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748995428/image-5_shfwmg.jpg'
      },
      {
        color: '#5D6D7E',
        name: 'Blue',
        image: 'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748995421/image-119_cnolq1.jpg'
      }
    ],
    image: 'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748995427/image-157_xsbuoe.jpg',
    sizes: ['M', 'L', 'XL'],
    sku: 'POL-SLIM-001',
    stock: 85,
    reserved: 3,
    available: 82,
    lowStockThreshold: 15,
    costPrice: 350,
    profit: 349,
    profitMargin: 49.9
  },
  {
    id: 3,
    name: 'Signature Collection Tee',
    price: 599,
    rating: 4.8,
    category: 'T-Shirts',
    subCategory: 'Premium',
    link: '/products/signature-collection-tee',
    isNew: true,
    inStock: true,
    hasColorOptions: false,
    image: 'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748817871/tshirt-6_dzfego.jpg',
    sizes: ['S', 'M', 'L'],
    sku: 'TSH-SIG-001',
    stock: 65,
    reserved: 2,
    available: 63,
    lowStockThreshold: 15,
    costPrice: 320,
    profit: 279,
    profitMargin: 46.6
  },
  {
    id: 4,
    name: 'Essential Performance Tee',
    price: 545,
    rating: 4.6,
    category: 'Performance',
    subCategory: 'Athletic',
    link: '/products/essential-performance-tee',
    isNew: false,
    inStock: false,
    hasColorOptions: false,
    image: 'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748817883/tshirt-75_utfpmc.jpg',
    sizes: ['S', 'M'],
    sku: 'TSH-PERF-001',
    stock: 0,
    reserved: 0,
    available: 0,
    lowStockThreshold: 10,
    costPrice: 280,
    profit: 265,
    profitMargin: 48.6
  },
  {
    id: 5,
    name: 'Lightweight Merino Tee',
    price: 445,
    rating: 4.9,
    category: 'Premium',
    subCategory: 'Casual',
    link: '/products/lightweight-merino-tee',
    isNew: true,
    inStock: true,
    hasColorOptions: true,
    colorVariants: [
      {
        color: '#283747',
        name: 'Charcoal',
        image: 'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748817862/tshirt-31_pksbeu.jpg'
      },
      {
        color: '#FBFCFC',
        name: 'Light Gray',
        image: 'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748817883/tshirt-78_me3l07.jpg'
      }
    ],
    image: 'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748817863/tshirt-38_jwjr9w.jpg',
    sizes: ['S', 'M', 'L', 'XL'],
    sku: 'TSH-MERINO-001',
    stock: 12,
    reserved: 0,
    available: 12,
    lowStockThreshold: 15,
    costPrice: 220,
    profit: 225,
    profitMargin: 50.6
  },
  {
    id: 6,
    name: 'Heritage Embroidered Polo',
    price: 799,
    rating: 4.7,
    category: 'Polo Shirts',
    subCategory: 'Premium',
    link: '/products/heritage-embroidered-polo',
    isNew: true,
    inStock: true,
    hasColorOptions: false,
    image: 'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748995415/66cd75ad24196-square_gly7is.png',
    sizes: ['M', 'L', 'XL', 'XXL'],
    sku: 'POL-HRTG-001',
    stock: 45,
    reserved: 2,
    available: 43,
    lowStockThreshold: 10,
    costPrice: 420,
    profit: 379,
    profitMargin: 47.4
  },
];

// Helper function to format currency
const formatCurrency = (amount: number) => {
  return `৳${amount.toLocaleString()}`;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductInventory[]>(mockProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('name-asc');
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);

  // Filter and sort products
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         product.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || 
                         (selectedStatus === 'in-stock' && product.inStock) ||
                         (selectedStatus === 'out-of-stock' && !product.inStock) ||
                         (selectedStatus === 'low-stock' && product.available <= product.lowStockThreshold);
    
    return matchesSearch && matchesCategory && matchesStatus;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'stock-asc':
        return a.available - b.available;
      case 'stock-desc':
        return b.available - a.available;
      default:
        return 0;
    }
  });

  // Get unique categories
  const categories = ['all', ...new Set(products.map((product) => product.category))];

  // Handle bulk selection
  const handleSelectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(filteredProducts.map(product => product.id));
    }
  };

  const handleSelectProduct = (id: number) => {
    setSelectedProducts(prev => 
      prev.includes(id) 
        ? prev.filter(productId => productId !== id)
        : [...prev, id]
    );
  };

  // Get stock status badge
  const getStockStatusBadge = (product: ProductInventory) => {
    if (!product.inStock) {
      return <Badge variant="outline" className="bg-red-100 text-red-800">Out of Stock</Badge>;
    }
    if (product.available <= product.lowStockThreshold) {
      return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Low Stock</Badge>;
    }
    return <Badge variant="outline" className="bg-green-100 text-green-800">In Stock</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="text-gray-500">Manage your product catalog</p>
        </div>
        <Button asChild>
          <Link href="/admin/products/new">
            <Plus className="mr-2 h-4 w-4" />
            Add New Product
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Product Catalog</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search products..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="in-stock">In Stock</SelectItem>
                  <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                  <SelectItem value="low-stock">Low Stock</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                  <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                  <SelectItem value="price-asc">Price (Low to High)</SelectItem>
                  <SelectItem value="price-desc">Price (High to Low)</SelectItem>
                  <SelectItem value="stock-asc">Stock (Low to High)</SelectItem>
                  <SelectItem value="stock-desc">Stock (High to Low)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Bulk actions */}
          {selectedProducts.length > 0 && (
            <div className="bg-blue-50 p-3 rounded-md mb-4 flex items-center justify-between">
              <span className="text-sm font-medium">
                {selectedProducts.length} {selectedProducts.length === 1 ? 'product' : 'products'} selected
              </span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Copy className="mr-2 h-4 w-4" />
                  Duplicate
                </Button>
                <Button variant="destructive" size="sm">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </div>
            </div>
          )}

          {/* Products table */}
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40px]">
                    <Checkbox 
                      checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                      onCheckedChange={handleSelectAll}
                      aria-label="Select all products"
                    />
                  </TableHead>
                  <TableHead className="w-[80px]">Image</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-center">Stock</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="w-[100px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-8 text-gray-500">
                      No products found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <Checkbox 
                          checked={selectedProducts.includes(product.id)}
                          onCheckedChange={() => handleSelectProduct(product.id)}
                          aria-label={`Select ${product.name}`}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="h-10 w-10 rounded-md overflow-hidden bg-gray-100">
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          {product.hasColorOptions && product.colorVariants ? 
                            `${product.colorVariants.length} colors` : 'No color options'}
                          {product.sizes && ` • ${product.sizes.length} sizes`}
                        </div>
                      </TableCell>
                      <TableCell>{product.sku}</TableCell>
                      <TableCell>
                        <div>{product.category}</div>
                        {product.subCategory && (
                          <div className="text-xs text-gray-500">{product.subCategory}</div>
                        )}
                      </TableCell>
                      <TableCell className="text-right font-medium">{formatCurrency(product.price)}</TableCell>
                      <TableCell className="text-center">
                        {product.inStock ? product.available : '0'}
                        <div className="text-xs text-gray-500">
                          {product.reserved > 0 && `(${product.reserved} reserved)`}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        {getStockStatusBadge(product)}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/shop/product/${product.id}`}>
                                <Eye className="mr-2 h-4 w-4" />
                                View
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/admin/products/${product.id}`}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Copy className="mr-2 h-4 w-4" />
                              Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 