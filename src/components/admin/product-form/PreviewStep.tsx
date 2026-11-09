import React from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductFormLayout } from './index';
import { ProductFormStep, ProductFormState } from '@/hooks/use-product-form';
import ProductLivePreview from './ProductLivePreview';

interface PreviewStepProps {
  formState: ProductFormState;
  updateFormField: <K extends keyof ProductFormState>(field: K, value: ProductFormState[K]) => void;
  currentStep: ProductFormStep;
  isSubmitting: boolean;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  handleAddTag: () => void;
  handleRemoveTag: (tag: string) => void;
}

const PreviewStep = ({
  formState,
  currentStep,
  isSubmitting,
  goToNextStep,
  goToPreviousStep,
}: PreviewStepProps) => {
  return (
    <div className="space-y-8">
      <ProductFormLayout
        title="Product Preview"
        currentStep={currentStep}
        isSubmitting={isSubmitting}
        goToNextStep={goToNextStep}
        goToPreviousStep={goToPreviousStep}
        isLastStep={true}
      >
        <ProductLivePreview product={formState} />
      </ProductFormLayout>
      
      <div className="flex justify-between">
        <Button 
          type="button" 
          variant="outline" 
          onClick={goToPreviousStep}
          disabled={isSubmitting}
        >
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

export default PreviewStep; 