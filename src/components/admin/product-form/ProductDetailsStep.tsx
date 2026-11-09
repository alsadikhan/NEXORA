import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Plus } from 'lucide-react';
import { ProductFormLayout } from './index';
import { ProductFormStep, ProductFormState } from '@/hooks/use-product-form';

interface ProductDetailsStepProps {
  formState: ProductFormState;
  updateFormField: <K extends keyof ProductFormState>(field: K, value: ProductFormState[K]) => void;
  currentStep: ProductFormStep;
  isSubmitting: boolean;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  handleAddFeature: () => void;
  handleRemoveFeature: (feature: string) => void;
  handleAddCareInstruction: () => void;
  handleRemoveCareInstruction: (instruction: string) => void;
  handleAddLongDescription: () => void;
  handleRemoveLongDescription: (index: number) => void;
}

const ProductDetailsStep = ({
  formState,
  updateFormField,
  currentStep,
  isSubmitting,
  goToNextStep,
  goToPreviousStep,
  handleAddFeature,
  handleRemoveFeature,
  handleAddCareInstruction,
  handleRemoveCareInstruction,
  handleAddLongDescription,
  handleRemoveLongDescription,
}: ProductDetailsStepProps) => {
  return (
    <ProductFormLayout
      title="Product Details"
      currentStep={currentStep}
      isSubmitting={isSubmitting}
      goToNextStep={goToNextStep}
      goToPreviousStep={goToPreviousStep}
    >
      {/* Product Features */}
      <div className="space-y-4">
        <Label>Product Features <span className="text-red-500">*</span></Label>
        
        <div className="flex gap-2">
          <Input
            value={formState.currentFeature}
            onChange={(e) => updateFormField('currentFeature', e.target.value)}
            placeholder="Add a product feature"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddFeature();
              }
            }}
            className="flex-1"
          />
          <Button
            type="button"
            variant="outline"
            onClick={handleAddFeature}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        
        {formState.features.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {formState.features.map((feature) => (
              <Badge key={feature} variant="outline" className="flex items-center gap-1 px-3 py-1">
                {feature}
                <button
                  type="button"
                  className="ml-1 rounded-full hover:bg-gray-200 p-0.5"
                  onClick={() => handleRemoveFeature(feature)}
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
        <p className="text-xs text-gray-500">
          Add key features that highlight the benefits of your product
        </p>
      </div>

      {/* Long Description */}
      <div className="space-y-4 border-t pt-6">
        <Label>Long Description</Label>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <Input
              value={formState.currentLongDescription.title}
              onChange={(e) => updateFormField('currentLongDescription', {
                ...formState.currentLongDescription,
                title: e.target.value
              })}
              placeholder="Section title (e.g., Product Overview, Key Benefits)"
            />
            <Textarea 
              value={formState.currentLongDescription.content}
              onChange={(e) => updateFormField('currentLongDescription', {
                ...formState.currentLongDescription,
                content: e.target.value
              })}
              placeholder="Detailed description content..." 
              className="min-h-[100px]" 
            />
          </div>
          
          <Button
            type="button"
            variant="outline"
            onClick={handleAddLongDescription}
            disabled={!formState.currentLongDescription.title.trim() || !formState.currentLongDescription.content.trim()}
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Description Section
          </Button>
        </div>
        
        {formState.longDescription.length > 0 && (
          <div className="space-y-3">
            {formState.longDescription.map((desc, index) => (
              <div key={index} className="border rounded-lg p-4 bg-gray-50">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{desc.title}</h4>
                  <button
                    type="button"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleRemoveLongDescription(index)}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-gray-600 text-sm">{desc.content}</p>
              </div>
            ))}
          </div>
        )}
        <p className="text-xs text-gray-500">
          Add detailed descriptions that will be displayed on the product detail page
        </p>
      </div>

      {/* Care Instructions */}
      <div className="space-y-4 border-t pt-6">
        <Label>Care Instructions</Label>
        
        <div className="flex gap-2">
          <Input
            value={formState.currentCareInstruction}
            onChange={(e) => updateFormField('currentCareInstruction', e.target.value)}
            placeholder="Add a care instruction"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddCareInstruction();
              }
            }}
            className="flex-1"
          />
          <Button
            type="button"
            variant="outline"
            onClick={handleAddCareInstruction}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        
        {formState.careInstructions.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {formState.careInstructions.map((instruction) => (
              <Badge key={instruction} variant="outline" className="flex items-center gap-1 px-3 py-1">
                {instruction}
                <button
                  type="button"
                  className="ml-1 rounded-full hover:bg-gray-200 p-0.5"
                  onClick={() => handleRemoveCareInstruction(instruction)}
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
        <p className="text-xs text-gray-500">
          Add care instructions that will be displayed as bullet points on the product detail page
        </p>
      </div>
    </ProductFormLayout>
  );
};

export default ProductDetailsStep; 