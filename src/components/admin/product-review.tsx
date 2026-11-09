import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";

interface ProductReviewProps {
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
    stock: string;
    lowStockThreshold: string;
    mainImage: string;
    additionalImages: string[];
    hasColorOptions: boolean;
    colorVariants: {
      color: string;
      name: string;
      image: string;
    }[];
    sizes: string[];
    tags: string[];
    specifications: { label: string; value: string }[];
  };
}

export function ProductReview({ product }: ProductReviewProps) {
  const formatPrice = (price: string) => {
    return `৳${Number(price).toLocaleString()}`;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Product Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Basic Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Basic Information</h3>
              <div className="space-y-2">
                <div className="grid grid-cols-3 gap-2">
                  <span className="text-gray-500">Name:</span>
                  <span className="col-span-2 font-medium">{product.name}</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <span className="text-gray-500">SKU:</span>
                  <span className="col-span-2">{product.sku}</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <span className="text-gray-500">Price:</span>
                  <span className="col-span-2 font-medium">{formatPrice(product.price)}</span>
                </div>
                {product.costPrice && (
                  <div className="grid grid-cols-3 gap-2">
                    <span className="text-gray-500">Cost Price:</span>
                    <span className="col-span-2">{formatPrice(product.costPrice)}</span>
                  </div>
                )}
                <div className="grid grid-cols-3 gap-2">
                  <span className="text-gray-500">Category:</span>
                  <span className="col-span-2">{product.category}</span>
                </div>
                {product.subCategory && (
                  <div className="grid grid-cols-3 gap-2">
                    <span className="text-gray-500">Subcategory:</span>
                    <span className="col-span-2">{product.subCategory}</span>
                  </div>
                )}
                <div className="grid grid-cols-3 gap-2">
                  <span className="text-gray-500">New Arrival:</span>
                  <span className="col-span-2">
                    {product.isNew ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <X className="h-4 w-4 text-gray-400" />
                    )}
                  </span>
                </div>
              </div>
            </div>

            {/* Inventory Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Inventory</h3>
              <div className="space-y-2">
                <div className="grid grid-cols-3 gap-2">
                  <span className="text-gray-500">Status:</span>
                  <span className="col-span-2">
                    {product.inStock ? (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        In Stock
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                        Out of Stock
                      </Badge>
                    )}
                  </span>
                </div>
                {product.inStock && (
                  <>
                    <div className="grid grid-cols-3 gap-2">
                      <span className="text-gray-500">Stock:</span>
                      <span className="col-span-2">{product.stock} units</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <span className="text-gray-500">Low Stock Alert:</span>
                      <span className="col-span-2">
                        {product.lowStockThreshold} units
                      </span>
                    </div>
                  </>
                )}
              </div>

              {/* Variants */}
              <h3 className="text-lg font-medium mt-6">Variants</h3>
              <div className="space-y-2">
                {product.sizes.length > 0 && (
                  <div className="grid grid-cols-3 gap-2">
                    <span className="text-gray-500">Sizes:</span>
                    <div className="col-span-2 flex flex-wrap gap-1">
                      {product.sizes.map((size) => (
                        <Badge key={size} variant="outline">
                          {size}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {product.hasColorOptions && (
                  <div className="grid grid-cols-3 gap-2">
                    <span className="text-gray-500">Colors:</span>
                    <div className="col-span-2 flex flex-wrap gap-2">
                      {product.colorVariants.map((variant, index) => (
                        <div key={index} className="flex items-center gap-1">
                          <div 
                            className="w-4 h-4 rounded-full border" 
                            style={{ backgroundColor: variant.color }} 
                          />
                          <span className="text-sm">{variant.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Image Preview */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Images</h3>
              <div className="space-y-2">
                <div className="h-40 w-40 rounded-md overflow-hidden bg-gray-100">
                  <Image
                    src={product.mainImage}
                    alt="Main product image"
                    width={400}
                    height={400}
                    className="h-full w-full object-cover"
                  />
                </div>
                
                {product.additionalImages.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {product.additionalImages.slice(0, 3).map((image, index) => (
                      <div key={index} className="h-16 w-16 rounded-md overflow-hidden bg-gray-100">
                        <Image
                          src={image}
                          alt={`Additional product image ${index + 1}`}
                          width={400}
                          height={400}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ))}
                    {product.additionalImages.length > 3 && (
                      <div className="h-16 w-16 rounded-md bg-gray-100 flex items-center justify-center">
                        <span className="text-sm text-gray-500">+{product.additionalImages.length - 3}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          {product.description && (
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Description</h3>
              <p className="text-gray-700 whitespace-pre-line">{product.description}</p>
            </div>
          )}

          {/* Tags */}
          {product.tags.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Tags</h3>
              <div className="flex flex-wrap gap-1">
                {product.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Specifications */}
          {product.specifications.some(spec => spec.label && spec.value) && (
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Specifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                {product.specifications
                  .filter(spec => spec.label && spec.value)
                  .map((spec, index) => (
                    <div key={index} className="grid grid-cols-2 gap-2">
                      <span className="text-gray-500">{spec.label}:</span>
                      <span>{spec.value}</span>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 