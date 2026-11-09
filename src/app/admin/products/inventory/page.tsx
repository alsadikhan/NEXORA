'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Search, 
  MoreHorizontal, 
  Edit, 
  AlertTriangle,
  Check,
  History,
  Truck
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
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

// Use the product data from our mock data
import { dummyProducts } from '@/data/products';

export default function InventoryPage() {
  const [products, setProducts] = useState<ProductInventory[]>(
    dummyProducts.map(product => ({
      ...product,
      sku: `SKU-${product.id.toString().padStart(4, '0')}`,
      stock: Math.floor(Math.random() * 100) + 10,
      reserved: Math.floor(Math.random() * 5),
      get available() { return this.stock - this.reserved; },
      lowStockThreshold: 15,
      costPrice: Math.round(product.price * 0.6),
      profit: Math.round(product.price * 0.4),
      get profitMargin() { return Math.round((this.profit / this.price) * 100); }
    }))
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('stock-asc');
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<ProductInventory | null>(null);
  const [stockUpdateAmount, setStockUpdateAmount] = useState<number>(0);
  const [stockUpdateReason, setStockUpdateReason] = useState<string>('');

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
      case 'sku-asc':
        return a.sku.localeCompare(b.sku);
      case 'sku-desc':
        return b.sku.localeCompare(a.sku);
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
      return <Badge variant="destructive" className="flex items-center gap-1">
        <AlertTriangle className="h-3 w-3" />
        <span>Out of Stock</span>
      </Badge>;
    }
    if (product.available <= product.lowStockThreshold) {
      return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200 flex items-center gap-1">
        <AlertTriangle className="h-3 w-3" />
        <span>Low Stock</span>
      </Badge>;
    }
    return <Badge variant="outline" className="bg-green-100 text-green-800 flex items-center gap-1">
      <Check className="h-3 w-3" />
      <span>In Stock</span>
    </Badge>;
  };

  // Handle stock update
  const handleStockUpdate = () => {
    if (!currentProduct) return;
    
    const updatedProducts = products.map(product => {
      if (product.id === currentProduct.id) {
        const newStock = product.stock + stockUpdateAmount;
        const newAvailable = newStock - product.reserved;
        
        return {
          ...product,
          stock: newStock,
          available: newAvailable,
          inStock: newAvailable > 0
        };
      }
      return product;
    });
    
    setProducts(updatedProducts);
    setIsUpdateDialogOpen(false);
    setCurrentProduct(null);
    setStockUpdateAmount(0);
    setStockUpdateReason('');
    
    toast.success(`Stock updated successfully for ${currentProduct.name}`);
  };

  // Handle bulk stock update
  const handleBulkStockUpdate = (action: 'increment' | 'decrement', amount: number) => {
    const updatedProducts = products.map(product => {
      if (selectedProducts.includes(product.id)) {
        const stockChange = action === 'increment' ? amount : -amount;
        const newStock = product.stock + stockChange;
        const newAvailable = Math.max(0, newStock - product.reserved);
        
        return {
          ...product,
          stock: Math.max(0, newStock),
          available: newAvailable,
          inStock: newAvailable > 0
        };
      }
      return product;
    });
    
    setProducts(updatedProducts);
    setSelectedProducts([]);
    
    toast.success(`Stock updated for ${selectedProducts.length} products`);
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return `৳${amount.toLocaleString()}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/admin/products">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Inventory Management</h1>
            <p className="text-gray-500">Manage your product stock levels</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/admin/products/new">
              <Truck className="mr-2 h-4 w-4" />
              Record Shipment
            </Link>
          </Button>
          <Button asChild>
            <Link href="/admin/products/new">
              <History className="mr-2 h-4 w-4" />
              Stock History
            </Link>
          </Button>
        </div>
      </div>

      {/* Inventory Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {products.filter(p => p.inStock && p.available <= p.lowStockThreshold).length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Out of Stock Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {products.filter(p => !p.inStock).length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Inventory</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search by product name or SKU..."
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
                  <SelectItem value="stock-asc">Stock (Low to High)</SelectItem>
                  <SelectItem value="stock-desc">Stock (High to Low)</SelectItem>
                  <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                  <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                  <SelectItem value="sku-asc">SKU (A-Z)</SelectItem>
                  <SelectItem value="sku-desc">SKU (Z-A)</SelectItem>
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
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleBulkStockUpdate('increment', 5)}
                >
                  +5 Stock
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleBulkStockUpdate('increment', 10)}
                >
                  +10 Stock
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleBulkStockUpdate('decrement', 5)}
                >
                  -5 Stock
                </Button>
              </div>
            </div>
          )}

          {/* Inventory table */}
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
                  <TableHead>Product</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-center">Stock</TableHead>
                  <TableHead className="text-center">Reserved</TableHead>
                  <TableHead className="text-center">Available</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="w-[80px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={10} className="text-center py-8 text-gray-500">
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
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-md overflow-hidden bg-gray-100">
                            <Image
                              src={product.image}
                              alt={product.name}
                              width={40}
                              height={40}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="font-medium">{product.name}</div>
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
                      <TableCell className="text-center font-medium">{product.stock}</TableCell>
                      <TableCell className="text-center">
                        {product.reserved > 0 ? (
                          <span className="text-amber-600 font-medium">{product.reserved}</span>
                        ) : (
                          <span>0</span>
                        )}
                      </TableCell>
                      <TableCell className="text-center font-medium">
                        {product.available}
                        {product.available <= product.lowStockThreshold && product.available > 0 && (
                          <span className="ml-2 text-yellow-500">
                            <AlertTriangle className="h-4 w-4 inline" />
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        {getStockStatusBadge(product)}
                      </TableCell>
                      <TableCell>
                        <Dialog open={isUpdateDialogOpen && currentProduct?.id === product.id} onOpenChange={(open) => {
                          if (!open) setCurrentProduct(null);
                          setIsUpdateDialogOpen(open);
                        }}>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem 
                                onClick={() => {
                                  setCurrentProduct(product);
                                  setIsUpdateDialogOpen(true);
                                }}
                              >
                                <Edit className="mr-2 h-4 w-4" />
                                Update Stock
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link href={`/admin/products/${product.id}`}>
                                  View Product
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => {
                                  const updatedProducts = products.map(p => 
                                    p.id === product.id 
                                      ? { ...p, stock: p.stock + 5, available: p.available + 5, inStock: true } 
                                      : p
                                  );
                                  setProducts(updatedProducts);
                                  toast.success(`Added 5 stock to ${product.name}`);
                                }}
                              >
                                +5 Stock
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  const updatedProducts = products.map(p => 
                                    p.id === product.id 
                                      ? { ...p, stock: p.stock + 10, available: p.available + 10, inStock: true } 
                                      : p
                                  );
                                  setProducts(updatedProducts);
                                  toast.success(`Added 10 stock to ${product.name}`);
                                }}
                              >
                                +10 Stock
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                          
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Update Stock</DialogTitle>
                              <DialogDescription>
                                Update stock quantity for {product.name}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="current-stock" className="text-right">
                                  Current Stock
                                </Label>
                                <Input
                                  id="current-stock"
                                  value={product.stock}
                                  className="col-span-3"
                                  disabled
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="stock-change" className="text-right">
                                  Add/Remove
                                </Label>
                                <Input
                                  id="stock-change"
                                  type="number"
                                  value={stockUpdateAmount}
                                  onChange={(e) => setStockUpdateAmount(parseInt(e.target.value) || 0)}
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="new-stock" className="text-right">
                                  New Stock
                                </Label>
                                <Input
                                  id="new-stock"
                                  value={product.stock + stockUpdateAmount}
                                  className="col-span-3"
                                  disabled
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="reason" className="text-right">
                                  Reason
                                </Label>
                                <Input
                                  id="reason"
                                  value={stockUpdateReason}
                                  onChange={(e) => setStockUpdateReason(e.target.value)}
                                  className="col-span-3"
                                  placeholder="e.g., New shipment, Inventory count"
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button type="button" variant="outline" onClick={() => {
                                setIsUpdateDialogOpen(false);
                                setCurrentProduct(null);
                                setStockUpdateAmount(0);
                                setStockUpdateReason('');
                              }}>
                                Cancel
                              </Button>
                              <Button type="button" onClick={handleStockUpdate}>
                                Update Stock
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
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