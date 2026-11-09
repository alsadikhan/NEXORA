import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Plus, ExternalLink, Search, Trash2 } from 'lucide-react';
import { ProductFormLayout } from './index';
import { ProductFormStep, ProductFormState } from '@/hooks/use-product-form';

interface SEOStepProps {
  formState: ProductFormState;
  updateFormField: <K extends keyof ProductFormState>(field: K, value: ProductFormState[K]) => void;
  currentStep: ProductFormStep;
  isSubmitting: boolean;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  handleAddTag: () => void;
  handleRemoveTag: (tag: string) => void;
  handleAddSpecification: () => void;
  handleRemoveSpecification: (index: number) => void;
  handleSpecificationChange: (index: number, field: 'label' | 'value', value: string) => void;
}

const SEOStep = ({
  formState,
  updateFormField,
  currentStep,
  isSubmitting,
  goToNextStep,
  goToPreviousStep,
  handleAddTag,
  handleRemoveTag,
  handleAddSpecification,
  handleRemoveSpecification,
  handleSpecificationChange,
}: SEOStepProps) => {
  // Auto-generate URL slug from product name
  const generateSlug = () => {
    if (formState.name) {
      const slug = formState.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      updateFormField('urlSlug', slug);
    }
  };

  // Auto-generate meta title from product name
  const generateMetaTitle = () => {
    if (formState.name) {
      updateFormField('metaTitle', `${formState.name} - NEXORA`);
    }
  };

  // Auto-generate meta description from description
  const generateMetaDescription = () => {
    if (formState.description) {
      const metaDesc = formState.description.length > 160 
        ? formState.description.substring(0, 157) + '...'
        : formState.description;
      updateFormField('metaDescription', metaDesc);
    }
  };

  return (
    <ProductFormLayout
      title="SEO & Marketing"
      currentStep={currentStep}
      isSubmitting={isSubmitting}
      goToNextStep={goToNextStep}
      goToPreviousStep={goToPreviousStep}
    >
      {/* URL Slug */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="urlSlug">URL Slug <span className="text-red-500">*</span></Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={generateSlug}
            disabled={!formState.name}
          >
            Generate from name
          </Button>
        </div>
        <div className="flex items-center">
          <span className="text-sm text-gray-500 mr-2">nahda.com/shop/product/</span>
          <Input 
            id="urlSlug" 
            value={formState.urlSlug}
            onChange={(e) => updateFormField('urlSlug', e.target.value)}
            placeholder="product-url-slug" 
            className="flex-1"
          />
        </div>
        <p className="text-xs text-gray-500">
          This will be the URL for your product page. Use only lowercase letters, numbers, and hyphens.
        </p>
      </div>

      {/* Meta Title */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="metaTitle">Meta Title <span className="text-red-500">*</span></Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={generateMetaTitle}
            disabled={!formState.name}
          >
            Generate from name
          </Button>
        </div>
        <Input 
          id="metaTitle" 
          value={formState.metaTitle}
          onChange={(e) => updateFormField('metaTitle', e.target.value)}
          placeholder="Product Name - Brand Name" 
          maxLength={60}
        />
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-500">Appears in search results and browser tabs</span>
          <span className={formState.metaTitle.length > 60 ? 'text-red-500' : 'text-gray-500'}>
            {formState.metaTitle.length}/60
          </span>
        </div>
      </div>

      {/* Meta Description */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="metaDescription">Meta Description <span className="text-red-500">*</span></Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={generateMetaDescription}
            disabled={!formState.description}
          >
            Generate from description
          </Button>
        </div>
        <Textarea 
          id="metaDescription" 
          value={formState.metaDescription}
          onChange={(e) => updateFormField('metaDescription', e.target.value)}
          placeholder="Brief description of your product for search engines..." 
          className="min-h-[80px]" 
          maxLength={160}
        />
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-500">Appears in search results below the title</span>
          <span className={formState.metaDescription.length > 160 ? 'text-red-500' : 'text-gray-500'}>
            {formState.metaDescription.length}/160
          </span>
        </div>
      </div>

      {/* Product Tags */}
      <div className="space-y-4">
        <Label>Product Tags</Label>
        <div className="flex gap-2">
          <Input
            value={formState.currentTag}
            onChange={(e) => updateFormField('currentTag', e.target.value)}
            placeholder="Add a tag and press Enter"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddTag();
              }
            }}
            className="flex-1"
          />
          <Button
            type="button"
            variant="outline"
            onClick={handleAddTag}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        {formState.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {formState.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="flex items-center gap-1 px-3 py-1">
                {tag}
                <button
                  type="button"
                  className="ml-1 rounded-full hover:bg-gray-200 p-0.5"
                  onClick={() => handleRemoveTag(tag)}
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
        <p className="text-xs text-gray-500">
          Tags help customers find your product and improve search visibility
        </p>
      </div>

      {/* Product Specifications */}
      <div className="space-y-4 border-t pt-6">
        <div className="flex items-center justify-between">
          <Label>Product Specifications</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAddSpecification}
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Specification
          </Button>
        </div>
        {formState.specifications.map((spec, index) => (
          <div key={index} className="grid grid-cols-5 gap-2 items-center">
            <Input
              placeholder="Label (e.g., Material)"
              value={spec.label}
              onChange={(e) => handleSpecificationChange(index, 'label', e.target.value)}
              className="col-span-2"
            />
            <Input
              placeholder="Value (e.g., Cotton)"
              value={spec.value}
              onChange={(e) => handleSpecificationChange(index, 'value', e.target.value)}
              className="col-span-2"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => handleRemoveSpecification(index)}
              disabled={formState.specifications.length === 1 && !spec.label && !spec.value}
            >
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
          </div>
        ))}
        <p className="text-xs text-gray-500">
          Specifications help customers understand product details and features
        </p>
      </div>

      {/* SEO Preview */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-medium mb-4">Search Result Preview</h3>
        <div className="border rounded-lg p-4 bg-white">
          <div className="space-y-2">
            <div className="text-blue-600 text-sm truncate">
              {formState.urlSlug ? `nahda.com/shop/product/${formState.urlSlug}` : 'nahda.com/shop/product/...'}
            </div>
            <div className="text-lg text-blue-800 font-medium truncate">
              {formState.metaTitle || 'Your product title will appear here'}
            </div>
            <div className="text-sm text-gray-600 line-clamp-2">
              {formState.metaDescription || 'Your meta description will appear here in search results...'}
            </div>
          </div>
        </div>
      </div>

      {/* SEO Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2">SEO Tips</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Include relevant keywords in your title and description</li>
          <li>• Keep titles under 60 characters for optimal display</li>
          <li>• Write compelling descriptions that encourage clicks</li>
          <li>• Use descriptive, keyword-rich URL slugs</li>
          <li>• Add relevant tags to improve discoverability</li>
        </ul>
      </div>
    </ProductFormLayout>
  );
};

export default SEOStep; 