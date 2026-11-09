import React from 'react';
import { ArrowLeft, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProductPreview } from '@/components/admin/product-preview';
import { ProductFormStep } from '@/hooks/use-product-form';

interface ReviewStepProps {
  formState: any;
  currentStep: ProductFormStep;
  isSubmitting: boolean;
  goToPreviousStep: () => void;
}

const ReviewStep = ({
  formState,
  currentStep,
  isSubmitting,
  goToPreviousStep,
}: ReviewStepProps) => {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Final Review</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Basic Info Summary */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Basic Information</h3>
              <div className="grid grid-cols-2 gap-y-2">
                <div className="font-medium">Name:</div>
                <div>{formState.name}</div>
                
                <div className="font-medium">SKU:</div>
                <div>{formState.sku}</div>
                
                <div className="font-medium">Price:</div>
                <div>৳{Number(formState.price).toLocaleString()}</div>
                
                <div className="font-medium">Category:</div>
                <div>{formState.category} {formState.subCategory ? `/ ${formState.subCategory}` : ''}</div>
              </div>
            </div>
            
            {/* Inventory Summary */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Inventory</h3>
              <div className="grid grid-cols-2 gap-y-2">
                <div className="font-medium">Status:</div>
                <div>{formState.inStock ? 'In Stock' : 'Out of Stock'}</div>
                
                {formState.inStock && (
                  <>
                    <div className="font-medium">Stock Quantity:</div>
                    <div>{formState.stock}</div>
                  </>
                )}
                
                <div className="font-medium">Low Stock Alert:</div>
                <div>Below {formState.lowStockThreshold} items</div>
              </div>
            </div>
          </div>
          
          {/* Variants Summary */}
          <div className="space-y-4 pt-4 border-t">
            <h3 className="text-lg font-medium">Variants</h3>
            
            {formState.hasColorOptions && formState.colorVariants.length > 0 ? (
              <div className="space-y-2">
                <div className="font-medium">Colors:</div>
                <div className="flex flex-wrap gap-2">
                  {formState.colorVariants.map((variant: any, index: number) => (
                    <div 
                      key={index} 
                      className="flex items-center gap-2 border rounded-md px-3 py-1"
                    >
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: variant.color }}
                      />
                      <span>{variant.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div>No color variants</div>
            )}
            
            {formState.sizes.length > 0 ? (
              <div className="space-y-2">
                <div className="font-medium">Sizes:</div>
                <div className="flex flex-wrap gap-2">
                  {formState.sizes.map((size: string) => (
                    <Badge key={size} variant="outline">
                      {size}
                    </Badge>
                  ))}
                </div>
              </div>
            ) : (
              <div>No size options</div>
            )}
          </div>
          
          {/* Preview */}
          <div className="space-y-4 pt-4 border-t">
            <h3 className="text-lg font-medium">Product Preview</h3>
            <div className="w-full max-w-xs mx-auto">
              <ProductPreview product={formState} />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-between">
        <Button 
          type="button" 
          variant="outline" 
          onClick={goToPreviousStep}
          disabled={isSubmitting}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <Button 
          type="submit" 
          form="product-form" 
          disabled={isSubmitting}
          className="bg-green-600 hover:bg-green-700"
        >
          {isSubmitting ? 'Creating...' : (
            <>
              <Check className="h-4 w-4 mr-2" />
              Create Product
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default ReviewStep; 