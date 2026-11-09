'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Plus, 
  Search, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  ChevronRight,
  ImageIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { productCategories } from '@/data/products';
import { Category } from '@/types/admin';
import { toast } from 'sonner';

// Generate mock categories based on the productCategories array
const generateMockCategories = (): Category[] => {
  let id = 1;
  const categories: Category[] = [];
  
  productCategories.forEach(category => {
    const categoryId = `cat-${id++}`;
    categories.push({
      id: categoryId,
      name: category.name,
      slug: category.name.toLowerCase().replace(/\s+/g, '-'),
      description: `Collection of ${category.name.toLowerCase()}`,
      image: category.name === 'T-Shirts' 
        ? 'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748995324/blank-tshirt-14_cfsydj.jpg'
        : '',
      productCount: Math.floor(Math.random() * 50) + 1,
      isActive: true,
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
      updatedAt: new Date().toISOString()
    });
    
    category.subcategories.forEach(subCategory => {
      categories.push({
        id: `cat-${id++}`,
        name: subCategory,
        slug: subCategory.toLowerCase().replace(/\s+/g, '-'),
        description: `${subCategory} ${category.name.toLowerCase()}`,
        parentId: categoryId,
        productCount: Math.floor(Math.random() * 20) + 1,
        isActive: Math.random() > 0.2, // 80% chance of being active
        createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
        updatedAt: new Date().toISOString()
      });
    });
  });
  
  return categories;
};

const mockCategories = generateMockCategories();

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [showSubcategories, setShowSubcategories] = useState<Record<string, boolean>>({});

  // Filter categories based on search query
  const filteredCategories = categories.filter((category) => {
    const matchesSearch = category.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         (category.description && category.description.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesSearch;
  });

  // Get parent categories (those without parentId)
  const parentCategories = filteredCategories.filter(cat => !cat.parentId);

  // Get subcategories for a parent category
  const getSubcategories = (parentId: string) => {
    return filteredCategories.filter(cat => cat.parentId === parentId);
  };

  // Handle bulk selection
  const handleSelectAll = () => {
    if (selectedCategories.length === parentCategories.length) {
      setSelectedCategories([]);
    } else {
      setSelectedCategories(parentCategories.map(category => category.id));
    }
  };

  const handleSelectCategory = (id: string) => {
    setSelectedCategories(prev => 
      prev.includes(id) 
        ? prev.filter(catId => catId !== id)
        : [...prev, id]
    );
  };

  // Toggle subcategories visibility
  const toggleSubcategories = (id: string) => {
    setShowSubcategories(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Handle category form submission
  const handleCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const categoryData = {
      name: formData.get('name') as string,
      slug: (formData.get('slug') as string) || (formData.get('name') as string).toLowerCase().replace(/\s+/g, '-'),
      description: formData.get('description') as string,
      image: formData.get('image') as string,
      isActive: formData.has('isActive'),
      parentId: formData.get('parentId') as string || undefined,
    };
    
    if (currentCategory) {
      // Update existing category
      const updatedCategories = categories.map(cat => 
        cat.id === currentCategory.id 
          ? { 
              ...cat, 
              ...categoryData, 
              updatedAt: new Date().toISOString() 
            } 
          : cat
      );
      setCategories(updatedCategories);
      toast.success('Category updated successfully');
    } else {
      // Add new category
      const newCategory: Category = {
        id: `cat-${Date.now()}`,
        name: categoryData.name,
        slug: categoryData.slug,
        description: categoryData.description,
        image: categoryData.image,
        parentId: categoryData.parentId,
        productCount: 0,
        isActive: categoryData.isActive,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setCategories([...categories, newCategory]);
      toast.success('Category created successfully');
    }
    
    setIsAddDialogOpen(false);
    setIsEditDialogOpen(false);
    setCurrentCategory(null);
  };

  // Handle category deletion
  const handleDeleteCategory = (id: string) => {
    // Find subcategories
    const subCatIds = categories
      .filter(cat => cat.parentId === id)
      .map(cat => cat.id);
    
    // Delete the category and its subcategories
    const updatedCategories = categories.filter(
      cat => cat.id !== id && !subCatIds.includes(cat.id)
    );
    
    setCategories(updatedCategories);
    setSelectedCategories(prev => prev.filter(catId => catId !== id));
    toast.success('Category deleted successfully');
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
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
            <h1 className="text-2xl font-bold">Categories</h1>
            <p className="text-gray-500">Manage your product categories</p>
          </div>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <form onSubmit={handleCategorySubmit}>
              <DialogHeader>
                <DialogTitle>Add New Category</DialogTitle>
                <DialogDescription>
                  Create a new category for your products
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Category Name</Label>
                  <Input id="name" name="name" placeholder="e.g., Shirts" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug (URL)</Label>
                  <Input id="slug" name="slug" placeholder="e.g., shirts" />
                  <p className="text-xs text-gray-500">Leave empty to auto-generate from name</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" name="description" placeholder="Category description" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image">Image URL</Label>
                  <Input id="image" name="image" placeholder="https://example.com/image.jpg" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="parentId">Parent Category (optional)</Label>
                  <select 
                    id="parentId" 
                    name="parentId" 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">None (Top Level Category)</option>
                    {parentCategories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="isActive" name="isActive" defaultChecked />
                  <Label htmlFor="isActive">Active</Label>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Create Category</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Product Categories</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search categories..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Bulk actions */}
          {selectedCategories.length > 0 && (
            <div className="bg-blue-50 p-3 rounded-md mb-4 flex items-center justify-between">
              <span className="text-sm font-medium">
                {selectedCategories.length} {selectedCategories.length === 1 ? 'category' : 'categories'} selected
              </span>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => {
                    // Bulk activate
                    const updatedCategories = categories.map(cat => 
                      selectedCategories.includes(cat.id) 
                        ? { ...cat, isActive: true, updatedAt: new Date().toISOString() } 
                        : cat
                    );
                    setCategories(updatedCategories);
                    toast.success('Categories activated');
                  }}
                >
                  Activate
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    // Bulk deactivate
                    const updatedCategories = categories.map(cat => 
                      selectedCategories.includes(cat.id) 
                        ? { ...cat, isActive: false, updatedAt: new Date().toISOString() } 
                        : cat
                    );
                    setCategories(updatedCategories);
                    toast.success('Categories deactivated');
                  }}
                >
                  Deactivate
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => {
                    // Find all subcategories of selected categories
                    const childIds: string[] = [];
                    selectedCategories.forEach(id => {
                      const subCats = categories.filter(cat => cat.parentId === id);
                      childIds.push(...subCats.map(cat => cat.id));
                    });
                    
                    // Delete selected categories and their subcategories
                    const updatedCategories = categories.filter(
                      cat => !selectedCategories.includes(cat.id) && !childIds.includes(cat.id)
                    );
                    
                    setCategories(updatedCategories);
                    setSelectedCategories([]);
                    toast.success('Categories deleted successfully');
                  }}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </div>
            </div>
          )}

          {/* Categories table */}
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40px]">
                    <Checkbox 
                      checked={selectedCategories.length === parentCategories.length && parentCategories.length > 0}
                      onCheckedChange={handleSelectAll}
                      aria-label="Select all categories"
                    />
                  </TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Products</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="w-[80px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {parentCategories.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                      No categories found
                    </TableCell>
                  </TableRow>
                ) : (
                  parentCategories.map((category) => {
                    const subcategories = getSubcategories(category.id);
                    const hasSubcategories = subcategories.length > 0;
                    const isExpanded = showSubcategories[category.id];
                    
                    return (
                      <>
                        <TableRow key={category.id}>
                          <TableCell>
                            <Checkbox 
                              checked={selectedCategories.includes(category.id)}
                              onCheckedChange={() => handleSelectCategory(category.id)}
                              aria-label={`Select ${category.name}`}
                            />
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              {hasSubcategories && (
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-6 w-6 p-0"
                                  onClick={() => toggleSubcategories(category.id)}
                                >
                                  <ChevronRight className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                                </Button>
                              )}
                              {category.image ? (
                                <div className="h-8 w-8 rounded-md overflow-hidden bg-gray-100">
                                  <Image
                                    src={category.image}
                                    alt={category.name}
                                    width={32}
                                    height={32}
                                    className="h-full w-full object-cover"
                                  />
                                </div>
                              ) : (
                                <div className="h-8 w-8 rounded-md bg-gray-100 flex items-center justify-center">
                                  <ImageIcon className="h-4 w-4 text-gray-400" />
                                </div>
                              )}
                              <div>
                                <div className="font-medium">{category.name}</div>
                                {category.description && (
                                  <div className="text-xs text-gray-500">{category.description}</div>
                                )}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{category.productCount}</TableCell>
                          <TableCell>{formatDate(category.createdAt)}</TableCell>
                          <TableCell className="text-center">
                            <Badge variant={category.isActive ? 'default' : 'secondary'}>
                              {category.isActive ? 'Active' : 'Inactive'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Dialog open={isEditDialogOpen && currentCategory?.id === category.id} onOpenChange={(open) => {
                              if (!open) setCurrentCategory(null);
                              setIsEditDialogOpen(open);
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
                                      setCurrentCategory(category);
                                      setIsEditDialogOpen(true);
                                    }}
                                  >
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => {
                                      const updatedCategories = categories.map(cat => 
                                        cat.id === category.id 
                                          ? { ...cat, isActive: !cat.isActive, updatedAt: new Date().toISOString() } 
                                          : cat
                                      );
                                      setCategories(updatedCategories);
                                      toast.success(`Category ${category.isActive ? 'deactivated' : 'activated'}`);
                                    }}
                                  >
                                    {category.isActive ? 'Deactivate' : 'Activate'}
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem 
                                    className="text-red-600"
                                    onClick={() => handleDeleteCategory(category.id)}
                                  >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                              
                              <DialogContent className="sm:max-w-[500px]">
                                <form onSubmit={handleCategorySubmit}>
                                  <DialogHeader>
                                    <DialogTitle>Edit Category</DialogTitle>
                                    <DialogDescription>
                                      Make changes to the category
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="grid gap-4 py-4">
                                    <div className="space-y-2">
                                      <Label htmlFor="edit-name">Category Name</Label>
                                      <Input 
                                        id="edit-name" 
                                        name="name" 
                                        defaultValue={category.name}
                                        required 
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor="edit-slug">Slug (URL)</Label>
                                      <Input 
                                        id="edit-slug" 
                                        name="slug" 
                                        defaultValue={category.slug} 
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor="edit-description">Description</Label>
                                      <Textarea 
                                        id="edit-description" 
                                        name="description" 
                                        defaultValue={category.description || ''} 
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor="edit-image">Image URL</Label>
                                      <Input 
                                        id="edit-image" 
                                        name="image" 
                                        defaultValue={category.image || ''} 
                                      />
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <Switch 
                                        id="edit-isActive" 
                                        name="isActive"
                                        defaultChecked={category.isActive}
                                      />
                                      <Label htmlFor="edit-isActive">Active</Label>
                                    </div>
                                  </div>
                                  <DialogFooter>
                                    <Button type="button" variant="outline" onClick={() => {
                                      setIsEditDialogOpen(false);
                                      setCurrentCategory(null);
                                    }}>
                                      Cancel
                                    </Button>
                                    <Button type="submit">Save Changes</Button>
                                  </DialogFooter>
                                </form>
                              </DialogContent>
                            </Dialog>
                          </TableCell>
                        </TableRow>
                        
                        {/* Subcategories */}
                        {isExpanded && subcategories.map((subCategory) => (
                          <TableRow key={subCategory.id} className="bg-gray-50">
                            <TableCell></TableCell>
                            <TableCell>
                              <div className="flex items-center gap-3 ml-6">
                                {subCategory.image ? (
                                  <div className="h-7 w-7 rounded-md overflow-hidden bg-gray-100">
                                    <Image
                                      src={subCategory.image}
                                      alt={subCategory.name}
                                      width={28}
                                      height={28}
                                      className="h-full w-full object-cover"
                                    />
                                  </div>
                                ) : (
                                  <div className="h-7 w-7 rounded-md bg-gray-100 flex items-center justify-center">
                                    <ImageIcon className="h-3.5 w-3.5 text-gray-400" />
                                  </div>
                                )}
                                <div>
                                  <div className="font-medium text-sm">{subCategory.name}</div>
                                  {subCategory.description && (
                                    <div className="text-xs text-gray-500">{subCategory.description}</div>
                                  )}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>{subCategory.productCount}</TableCell>
                            <TableCell>{formatDate(subCategory.createdAt)}</TableCell>
                            <TableCell className="text-center">
                              <Badge variant={subCategory.isActive ? 'default' : 'secondary'} className="text-xs">
                                {subCategory.isActive ? 'Active' : 'Inactive'}
                              </Badge>
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
                                  <DropdownMenuItem 
                                    onClick={() => {
                                      setCurrentCategory(subCategory);
                                      setIsEditDialogOpen(true);
                                    }}
                                  >
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => {
                                      const updatedCategories = categories.map(cat => 
                                        cat.id === subCategory.id 
                                          ? { ...cat, isActive: !cat.isActive, updatedAt: new Date().toISOString() } 
                                          : cat
                                      );
                                      setCategories(updatedCategories);
                                      toast.success(`Subcategory ${subCategory.isActive ? 'deactivated' : 'activated'}`);
                                    }}
                                  >
                                    {subCategory.isActive ? 'Deactivate' : 'Activate'}
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem 
                                    className="text-red-600"
                                    onClick={() => handleDeleteCategory(subCategory.id)}
                                  >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 