import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { ProductFormLayout } from './index';
import { ProductFormStep, ProductFormState } from '@/hooks/use-product-form';

interface PricingStepProps {
  formState: ProductFormState;
  updateFormField: <K extends keyof ProductFormState>(field: K, value: ProductFormState[K]) => void;
  currentStep: ProductFormStep;
  isSubmitting: boolean;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

const PricingStep = ({
  formState,
  updateFormField,
  currentStep,
  isSubmitting,
  goToNextStep,
  goToPreviousStep,
}: PricingStepProps) => {
  return (
    <ProductFormLayout
      title="Pricing & Status"
      currentStep={currentStep}
      isSubmitting={isSubmitting}
      goToNextStep={goToNextStep}
      goToPreviousStep={goToPreviousStep}
    >
      {/* Pricing Information */}
      <div className="space-y-6">
        <h3 className="text-lg font-medium">Pricing Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="price">Selling Price (৳) <span className="text-red-500">*</span></Label>
            <Input 
              id="price" 
              value={formState.price}
              onChange={(e) => updateFormField('price', e.target.value)}
              type="number" 
              min="0" 
              step="0.01" 
              placeholder="0.00" 
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="comparePrice">Compare Price (৳)</Label>
            <Input 
              id="comparePrice" 
              value={formState.comparePrice}
              onChange={(e) => updateFormField('comparePrice', e.target.value)}
              type="number" 
              min="0" 
              step="0.01" 
              placeholder="0.00" 
            />
            <p className="text-xs text-gray-500">Original price to show discount</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="costPrice">Cost Price (৳)</Label>
            <Input 
              id="costPrice" 
              value={formState.costPrice}
              onChange={(e) => updateFormField('costPrice', e.target.value)}
              type="number" 
              min="0" 
              step="0.01" 
              placeholder="0.00" 
            />
            <p className="text-xs text-gray-500">For profit calculation</p>
          </div>
        </div>
      </div>

      {/* Product Status */}
      <div className="space-y-6 border-t pt-6">
        <h3 className="text-lg font-medium">Product Status</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="isActive">Active Product</Label>
                <div className="text-gray-500 text-sm">Product is visible to customers</div>
              </div>
              <Switch 
                id="isActive" 
                checked={formState.isActive}
                onCheckedChange={(checked) => updateFormField('isActive', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="isNew">New Arrival</Label>
                <div className="text-gray-500 text-sm">Mark as new product</div>
              </div>
              <Switch 
                id="isNew" 
                checked={formState.isNew}
                onCheckedChange={(checked) => updateFormField('isNew', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="isFeatured">Featured Product</Label>
                <div className="text-gray-500 text-sm">Highlight on homepage</div>
              </div>
              <Switch 
                id="isFeatured" 
                checked={formState.isFeatured}
                onCheckedChange={(checked) => updateFormField('isFeatured', checked)}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="isBestSeller">Best Seller</Label>
                <div className="text-gray-500 text-sm">Mark as best selling</div>
              </div>
              <Switch 
                id="isBestSeller" 
                checked={formState.isBestSeller}
                onCheckedChange={(checked) => updateFormField('isBestSeller', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="isOnSale">On Sale</Label>
                <div className="text-gray-500 text-sm">Product is on sale</div>
              </div>
              <Switch 
                id="isOnSale" 
                checked={formState.isOnSale}
                onCheckedChange={(checked) => updateFormField('isOnSale', checked)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Profit Calculation Preview */}
      {formState.price && formState.costPrice && (
        <div className="border-t pt-6">
          <h3 className="text-lg font-medium mb-4">Profit Preview</h3>
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Selling Price:</span>
              <span className="font-medium">৳{Number(formState.price).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Cost Price:</span>
              <span className="font-medium">৳{Number(formState.costPrice).toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-t pt-2">
              <span className="text-gray-600">Gross Profit:</span>
              <span className="font-medium text-green-600">
                ৳{(Number(formState.price) - Number(formState.costPrice)).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Profit Margin:</span>
              <span className="font-medium text-green-600">
                {((Number(formState.price) - Number(formState.costPrice)) / Number(formState.price) * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      )}
    </ProductFormLayout>
  );
};

export default PricingStep; 