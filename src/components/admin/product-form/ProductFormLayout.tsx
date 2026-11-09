import React, { ReactNode } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ProductFormStep } from '@/hooks/use-product-form';

interface ProductFormLayoutProps {
  children: ReactNode;
  title: string;
  currentStep: ProductFormStep;
  isSubmitting: boolean;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  isFirstStep?: boolean;
  isLastStep?: boolean;
}

const ProductFormLayout = ({
  children,
  title,
  currentStep,
  isSubmitting,
  goToNextStep,
  goToPreviousStep,
  isFirstStep = false,
  isLastStep = false,
}: ProductFormLayoutProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {children}
      </CardContent>
      <CardFooter className={`flex ${isFirstStep ? 'justify-end' : 'justify-between'} gap-3`}>
        {!isFirstStep && (
          <Button 
            type="button" 
            variant="outline" 
            onClick={goToPreviousStep}
            disabled={isSubmitting}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        )}
        {!isLastStep && (
          <Button 
            type="button" 
            onClick={goToNextStep}
            disabled={isSubmitting}
          >
            Next
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProductFormLayout; 