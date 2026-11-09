import React from 'react';
import Image from 'next/image';
import { X, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ProductFormLayout } from './index';
import { ProductFormStep, ProductFormState } from '@/hooks/use-product-form';

interface ImagesStepProps {
  formState: ProductFormState;
  updateFormField: <K extends keyof ProductFormState>(field: K, value: ProductFormState[K]) => void;
  currentStep: ProductFormStep;
  isSubmitting: boolean;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  handleAddAdditionalImage: (url: string) => void;
  handleRemoveAdditionalImage: (index: number) => void;
}

const ImagesStep = ({
  formState,
  updateFormField,
  currentStep,
  isSubmitting,
  goToNextStep,
  goToPreviousStep,
  handleAddAdditionalImage,
  handleRemoveAdditionalImage
}: ImagesStepProps) => {
  return (
    <ProductFormLayout
      title="Product Images"
      currentStep={currentStep}
      isSubmitting={isSubmitting}
      goToNextStep={goToNextStep}
      goToPreviousStep={goToPreviousStep}
    >
      <div className="space-y-2">
        <Label htmlFor="mainImage">Main Image URL <span className="text-red-500">*</span></Label>
        <div className="flex gap-2">
          <Input 
            id="mainImage" 
            value={formState.mainImage}
            onChange={(e) => updateFormField('mainImage', e.target.value)}
            placeholder="https://example.com/image.jpg" 
            className="flex-1"
          />
          <Button 
            type="button" 
            variant="outline"
            onClick={() => updateFormField('mainImage', '')}
            disabled={!formState.mainImage}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {formState.mainImage && (
        <div className="border rounded-md p-4 mt-2">
          <div className="text-sm font-medium mb-2">Preview:</div>
          <div className="aspect-square w-40 h-40 rounded-md overflow-hidden bg-gray-100">
            <Image
              src={formState.mainImage}
              alt="Main product image"
              width={400}
              height={400}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      )}

      <div className="space-y-2 mt-6">
        <Label>Additional Images</Label>
        <div className="flex gap-2">
          <Input 
            id="additionalImage" 
            placeholder="https://example.com/image.jpg" 
            className="flex-1"
          />
          <Button 
            type="button" 
            variant="outline"
            onClick={() => {
              const input = document.getElementById('additionalImage') as HTMLInputElement;
              if (input.value) {
                handleAddAdditionalImage(input.value);
                input.value = '';
              }
            }}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {formState.additionalImages.length > 0 && (
        <div className="border rounded-md p-4 mt-2">
          <div className="text-sm font-medium mb-2">Additional Images:</div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {formState.additionalImages.map((image: string, index: number) => (
              <div key={index} className="relative group">
                <div className="aspect-square w-24 h-24 rounded-md overflow-hidden bg-gray-100">
                  <Image
                    src={image}
                    alt={`Additional product image ${index + 1}`}
                    width={400}
                    height={400}
                    className="h-full w-full object-cover"
                  />
                </div>
                <button
                  type="button"
                  className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleRemoveAdditionalImage(index)}
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </ProductFormLayout>
  );
};

export default ImagesStep; 