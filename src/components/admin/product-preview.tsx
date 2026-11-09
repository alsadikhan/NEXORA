import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ColorVariant, Product } from "@/types/product";
import { StarIcon } from "lucide-react";
import { ProductCard } from "@/components/ui/product-card";

interface ProductPreviewProps {
  product: {
    name: string;
    price: string;
    costPrice?: string;
    sku: string;
    description: string;
    category: string;
    subCategory?: string;
    isNew: boolean;
    inStock: boolean;
    mainImage: string;
    additionalImages: string[];
    hasColorOptions: boolean;
    colorVariants: ColorVariant[];
    sizes: string[];
    tags: string[];
    specifications: { label: string; value: string }[];
  };
}

export function ProductPreview({ product }: ProductPreviewProps) {
  const formatPrice = (price: string) => {
    return `৳${Number(price).toLocaleString()}`;
  };

  // Filter specifications to only include those with both label and value
  const validSpecs = product.specifications.filter(spec => spec.label && spec.value);
  
  // Convert form product to Product type for ProductCard
  const productCardData: Product = {
    id: 0, // Placeholder ID
    name: product.name,
    price: Number(product.price) || 0,
    rating: 5, // Default rating for new product
    category: product.category,
    subCategory: product.subCategory,
    link: '#', // Placeholder link
    isNew: product.isNew,
    inStock: product.inStock,
    hasColorOptions: product.hasColorOptions,
    colorVariants: product.colorVariants.length > 0 ? product.colorVariants : undefined,
    image: product.mainImage,
    description: product.description,
    tags: product.tags.length > 0 ? product.tags : undefined,
    additionalImages: product.additionalImages.length > 0 ? product.additionalImages : undefined,
    specifications: validSpecs.length > 0 ? validSpecs : undefined,
    sizes: product.sizes.length > 0 ? product.sizes : undefined,
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Product Preview</h2>
      <p className="text-gray-500">This is how your product will appear to customers</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Gallery */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg bg-gray-100 border">
            <Image
              src={product.mainImage}
              alt={product.name}
              width={600}
              height={600}
              className="h-full w-full object-cover object-center"
            />
          </div>
          
          {product.additionalImages.length > 0 && (
            <div className="grid grid-cols-4 gap-2">
              {product.additionalImages.map((image, index) => (
                <div key={index} className="aspect-square overflow-hidden rounded-lg bg-gray-100 border">
                  <Image
                    src={image}
                    alt={`${product.name} - Image ${index + 2}`}
                    width={300}
                    height={300}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="bg-gray-100">
                {product.category}
              </Badge>
              {product.isNew && (
                <Badge className="bg-blue-600">New</Badge>
              )}
              {!product.inStock && (
                <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                  Out of Stock
                </Badge>
              )}
            </div>
            
            <h1 className="text-3xl font-bold">{product.name}</h1>
            
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-sm text-gray-500">(0 reviews)</span>
            </div>
            
            <div className="mt-4 flex items-center gap-4">
              <span className="text-2xl font-bold">{formatPrice(product.price)}</span>
              {product.costPrice && Number(product.costPrice) > Number(product.price) && (
                <span className="text-lg text-gray-500 line-through">
                  {formatPrice(product.costPrice)}
                </span>
              )}
            </div>
          </div>
          
          {/* Color Options */}
          {product.hasColorOptions && product.colorVariants.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-medium">Color</h3>
              <div className="flex flex-wrap gap-2">
                {product.colorVariants.map((variant, index) => (
                  <div 
                    key={index} 
                    className="relative h-10 w-10 rounded-full border overflow-hidden cursor-pointer"
                    style={{ borderColor: index === 0 ? 'black' : 'transparent' }}
                  >
                    <div 
                      className="absolute inset-1 rounded-full"
                      style={{ backgroundColor: variant.color }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Size Options */}
          {product.sizes.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-medium">Size</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <div 
                    key={size} 
                    className={`flex h-9 w-12 items-center justify-center rounded-md border text-sm font-medium cursor-pointer ${
                      size === product.sizes[0] ? 'border-black bg-black text-white' : 'border-gray-200 text-gray-900'
                    }`}
                  >
                    {size}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="pt-4">
            <div className="flex gap-3">
              <button className="flex-1 rounded-md bg-black px-4 py-3 text-white font-medium">
                Add to Cart
              </button>
              <button className="rounded-md border border-gray-300 p-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Product Details Tabs */}
      <Tabs defaultValue="description" className="mt-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="specifications">Specifications</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="mt-4 text-gray-700">
          {product.description ? (
            <div className="prose max-w-none">
              <p>{product.description}</p>
            </div>
          ) : (
            <p className="italic text-gray-500">No description provided</p>
          )}
          
          {product.tags.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">Tags:</h4>
              <div className="flex flex-wrap gap-1">
                {product.tags.map(tag => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </TabsContent>
        <TabsContent value="specifications" className="mt-4">
          {validSpecs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6">
              {validSpecs.map((spec, index) => (
                <div key={index} className="grid grid-cols-2 border-b pb-2">
                  <span className="font-medium">{spec.label}</span>
                  <span>{spec.value}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="italic text-gray-500">No specifications provided</p>
          )}
        </TabsContent>
        <TabsContent value="reviews" className="mt-4">
          <div className="text-center py-8">
            <h3 className="text-lg font-medium mb-2">No Reviews Yet</h3>
            <p className="text-gray-500">Be the first to review this product</p>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Product Card Preview using actual ProductCard component */}
      <div className="mt-12 space-y-4">
        <h2 className="text-xl font-bold">Product Card Preview</h2>
        <p className="text-gray-500">How your product will appear in listings</p>
        
        <div className="w-full max-w-xs mx-auto">
          <ProductCard product={productCardData} />
        </div>
      </div>
    </div>
  );
} 