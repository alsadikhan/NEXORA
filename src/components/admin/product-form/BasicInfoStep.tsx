import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { productCategories } from '@/data/products';
import { ProductFormLayout } from './index';
import { ProductFormStep, ProductFormState } from '@/hooks/use-product-form';

interface BasicInfoStepProps {
  formState: ProductFormState;
  updateFormField: <K extends keyof ProductFormState>(field: K, value: ProductFormState[K]) => void;
  currentStep: ProductFormStep;
  isSubmitting: boolean;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

const BasicInfoStep = ({
  formState,
  updateFormField,
  currentStep,
  isSubmitting,
  goToNextStep,
  goToPreviousStep,
}: BasicInfoStepProps) => {
  // Get subcategories for selected category
  const subcategories = formState.category 
    ? productCategories.find(cat => cat.name === formState.category)?.subcategories || []
    : [];

  return (
    <ProductFormLayout
      title="Basic Information"
      currentStep={currentStep}
      isSubmitting={isSubmitting}
      goToNextStep={goToNextStep}
      goToPreviousStep={goToPreviousStep}
      isFirstStep={true}
    >
      {/* Product Name and SKU */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Product Name <span className="text-red-500">*</span></Label>
          <Input 
            id="name" 
            value={formState.name}
            onChange={(e) => updateFormField('name', e.target.value)}
            placeholder="Enter product name" 
          />
          <p className="text-xs text-gray-500">Clear, descriptive product name</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="sku">SKU <span className="text-red-500">*</span></Label>
          <Input 
            id="sku" 
            value={formState.sku}
            onChange={(e) => updateFormField('sku', e.target.value)}
            placeholder="e.g., TSH-PREM-001" 
          />
          <p className="text-xs text-gray-500">Unique stock keeping unit</p>
        </div>
      </div>

      {/* Category and Subcategory */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="category">Category <span className="text-red-500">*</span></Label>
          <Select 
            value={formState.category} 
            onValueChange={(value) => updateFormField('category', value)}
          >
            <SelectTrigger id="category">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {productCategories.map((category) => (
                <SelectItem key={category.name} value={category.name}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="subCategory">Subcategory</Label>
          <Select 
            disabled={!formState.category || subcategories.length === 0} 
            value={formState.subCategory}
            onValueChange={(value) => updateFormField('subCategory', value)}
          >
            <SelectTrigger id="subCategory">
              <SelectValue placeholder="Select subcategory" />
            </SelectTrigger>
            <SelectContent>
              {subcategories.map((subCategory) => (
                <SelectItem key={subCategory} value={subCategory}>
                  {subCategory}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Short Description <span className="text-red-500">*</span></Label>
        <Textarea 
          id="description" 
          value={formState.description}
          onChange={(e) => updateFormField('description', e.target.value)}
          placeholder="Brief product description for product listings..." 
          className="min-h-[100px]" 
        />
        <p className="text-xs text-gray-500">
          This will appear in product cards and search results
        </p>
      </div>

      {/* Product Status */}
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label htmlFor="isNew">Mark as New</Label>
          <div className="text-gray-500 text-sm">Feature this product as new arrival</div>
        </div>
        <Switch 
          id="isNew" 
          checked={formState.isNew}
          onCheckedChange={(checked) => updateFormField('isNew', checked)}
        />
      </div>

      {/* Form Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2">Tips for Better Product Listings</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Use clear, descriptive product names</li>
          <li>• Create unique SKUs for easy inventory management</li>
          <li>• Choose the most specific category and subcategory</li>
          <li>• Write compelling descriptions that highlight key features</li>
          <li>• Mark new products to increase visibility</li>
        </ul>
      </div>
    </ProductFormLayout>
  );
};

export default BasicInfoStep; 