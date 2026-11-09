'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Stepper } from '@/components/ui/stepper';
import { 
  BasicInfoStep,
  ProductDetailsStep,
  PricingStep,
  ImagesStep,
  InventoryStep,
  VariantsStep,
  SEOStep,
  PreviewStep,
} from '@/components/admin/product-form';
import { useProductForm, ProductFormStep } from '@/hooks/use-product-form';

export default function AddNewProductPage() {
  const {
    formState,
    updateFormField,
    currentStep,
    completedSteps,
    isSubmitting,
    goToNextStep,
    goToPreviousStep,
    goToStep,
    handleAddColorVariant,
    handleRemoveColorVariant,
    handleAddSpecification,
    handleRemoveSpecification,
    handleSpecificationChange,
    handleSizeToggle,
    handleAddTag,
    handleRemoveTag,
    handleAddFeature,
    handleRemoveFeature,
    handleAddAdditionalImage,
    handleRemoveAdditionalImage,
    handleSubmit,
    handleAddCareInstruction,
    handleRemoveCareInstruction,
    handleAddLongDescription,
    handleRemoveLongDescription,
  } = useProductForm();

  const steps = [
    { id: 'basic', label: 'Basic Info' },
    { id: 'details', label: 'Product Details' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'images', label: 'Images' },
    { id: 'inventory', label: 'Inventory' },
    { id: 'variants', label: 'Variants' },
    { id: 'seo', label: 'SEO & Marketing' },
    { id: 'preview', label: 'Preview' },
  ];
  
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'basic':
        return (
          <BasicInfoStep
            formState={formState}
            updateFormField={updateFormField}
            currentStep={currentStep}
            isSubmitting={isSubmitting}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
          />
        );
      case 'details':
        return (
          <ProductDetailsStep
            formState={formState}
            updateFormField={updateFormField}
            currentStep={currentStep}
            isSubmitting={isSubmitting}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
            handleAddFeature={handleAddFeature}
            handleRemoveFeature={handleRemoveFeature}
            handleAddCareInstruction={handleAddCareInstruction}
            handleRemoveCareInstruction={handleRemoveCareInstruction}
            handleAddLongDescription={handleAddLongDescription}
            handleRemoveLongDescription={handleRemoveLongDescription}
          />
        );
      case 'pricing':
        return (
          <PricingStep
            formState={formState}
            updateFormField={updateFormField}
            currentStep={currentStep}
            isSubmitting={isSubmitting}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
          />
        );
      case 'images':
        return (
          <ImagesStep
            formState={formState}
            updateFormField={updateFormField}
            currentStep={currentStep}
            isSubmitting={isSubmitting}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
            handleAddAdditionalImage={handleAddAdditionalImage}
            handleRemoveAdditionalImage={handleRemoveAdditionalImage}
          />
        );
      case 'inventory':
        return (
          <InventoryStep
            formState={formState}
            updateFormField={updateFormField}
            currentStep={currentStep}
            isSubmitting={isSubmitting}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
          />
        );
      case 'variants':
        return (
          <VariantsStep
            formState={formState}
            updateFormField={updateFormField}
            currentStep={currentStep}
            isSubmitting={isSubmitting}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
            handleAddColorVariant={handleAddColorVariant}
            handleRemoveColorVariant={handleRemoveColorVariant}
            handleSizeToggle={handleSizeToggle}
          />
        );
      case 'seo':
        return (
          <SEOStep
            formState={formState}
            updateFormField={updateFormField}
            currentStep={currentStep}
            isSubmitting={isSubmitting}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
            handleAddTag={handleAddTag}
            handleRemoveTag={handleRemoveTag}
            handleAddSpecification={handleAddSpecification}
            handleRemoveSpecification={handleRemoveSpecification}
            handleSpecificationChange={handleSpecificationChange}
          />
        );
      case 'preview':
        return (
          <PreviewStep
            formState={formState}
            updateFormField={updateFormField}
            currentStep={currentStep}
            isSubmitting={isSubmitting}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
            handleAddTag={handleAddTag}
            handleRemoveTag={handleRemoveTag}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8 pb-16">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/admin/products">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Add New Product</h1>
            <p className="text-gray-500">Create a comprehensive product listing with all necessary details</p>
          </div>
        </div>
      </div>

      <Stepper 
        steps={steps} 
        activeStep={currentStep} 
        onStepChange={(step) => goToStep(step as ProductFormStep)}
        completedSteps={completedSteps}
        className="mb-8"
      />

      <form id="product-form" onSubmit={handleSubmit} className="space-y-8">
        {renderCurrentStep()}
      </form>
    </div>
  );
} 