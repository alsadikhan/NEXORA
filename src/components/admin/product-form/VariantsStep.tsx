import React from 'react';
import { Trash2, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { ProductFormLayout } from './index';
import { ColorPicker } from './index';
import { ProductFormStep, ProductFormState } from '@/hooks/use-product-form';
import { ColorVariant } from '@/types/product';

interface VariantsStepProps {
  formState: ProductFormState;
  updateFormField: <K extends keyof ProductFormState>(field: K, value: ProductFormState[K]) => void;
  currentStep: ProductFormStep;
  isSubmitting: boolean;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  handleAddColorVariant: () => void;
  handleRemoveColorVariant: (index: number) => void;
  handleSizeToggle: (size: string) => void;
}

const VariantsStep = ({
  formState,
  updateFormField,
  currentStep,
  isSubmitting,
  goToNextStep,
  goToPreviousStep,
  handleAddColorVariant,
  handleRemoveColorVariant,
  handleSizeToggle,
}: VariantsStepProps) => {
  // Common size options for apparel
  const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', 'One Size'];

  return (
    <ProductFormLayout
      title="Product Variants"
      currentStep={currentStep}
      isSubmitting={isSubmitting}
      goToNextStep={goToNextStep}
      goToPreviousStep={goToPreviousStep}
    >
      {/* Color Options */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="hasColorOptions">Color Options</Label>
            <div className="text-gray-500 text-sm">Does this product have color variants?</div>
          </div>
          <Switch 
            id="hasColorOptions" 
            checked={formState.hasColorOptions}
            onCheckedChange={(checked) => updateFormField('hasColorOptions', checked)}
          />
        </div>

        {formState.hasColorOptions && (
          <div className="border rounded-md p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="colorName">Color Name</Label>
                <Input 
                  id="colorName" 
                  value={formState.currentColor.name}
                  onChange={(e) => updateFormField('currentColor', {
                    ...formState.currentColor,
                    name: e.target.value
                  })}
                  placeholder="e.g., Black, Navy, Red" 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="colorValue">Color Value</Label>
                <ColorPicker 
                  value={formState.currentColor.color}
                  onChange={(color) => updateFormField('currentColor', {
                    ...formState.currentColor,
                    color
                  })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="colorImage">Color Image URL</Label>
                <Input 
                  id="colorImage" 
                  value={formState.currentColor.image}
                  onChange={(e) => updateFormField('currentColor', {
                    ...formState.currentColor,
                    image: e.target.value
                  })}
                  placeholder="https://example.com/image.jpg" 
                />
              </div>
            </div>

            <Button 
              type="button" 
              variant="outline" 
              onClick={handleAddColorVariant}
              className="mt-2"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Color Variant
            </Button>

            {formState.colorVariants.length > 0 && (
              <div className="mt-4">
                <Label>Added Color Variants:</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  {formState.colorVariants.map((variant: ColorVariant, index: number) => (
                    <div key={index} className="flex items-center gap-3 border rounded-md p-3">
                      <div 
                        className="w-6 h-6 rounded-full border" 
                        style={{ backgroundColor: variant.color }} 
                      />
                      <div className="flex-1">
                        <div className="font-medium">{variant.name}</div>
                        <div className="text-xs text-gray-500 truncate">{variant.image}</div>
                      </div>
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleRemoveColorVariant(index)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Size Options */}
      <div className="space-y-4">
        <Label>Available Sizes</Label>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3">
          {availableSizes.map((size) => (
            <button
              key={size}
              type="button"
              className={`flex h-12 items-center justify-center rounded-md border-2 text-sm font-medium transition-all ${
                formState.sizes.includes(size) 
                  ? 'border-primary bg-primary/10 text-primary' 
                  : 'border-gray-200 text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => handleSizeToggle(size)}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
    </ProductFormLayout>
  );
};

export default VariantsStep; 