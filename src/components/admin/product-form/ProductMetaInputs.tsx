import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Plus, Trash2 } from 'lucide-react';
import { ProductFormState } from '@/hooks/use-product-form';

interface ProductMetaInputsProps {
  formState: ProductFormState;
  updateFormField: <K extends keyof ProductFormState>(field: K, value: ProductFormState[K]) => void;
  handleAddTag: () => void;
  handleRemoveTag: (tag: string) => void;
  handleAddSpecification: () => void;
  handleRemoveSpecification: (index: number) => void;
  handleSpecificationChange: (index: number, field: 'label' | 'value', value: string) => void;
}

const ProductMetaInputs = ({
  formState,
  updateFormField,
  handleAddTag,
  handleRemoveTag,
  handleAddSpecification,
  handleRemoveSpecification,
  handleSpecificationChange,
}: ProductMetaInputsProps) => (
  <>
    {/* Tags */}
    <div className="space-y-2">
      <Label htmlFor="tags">Product Tags</Label>
      <div className="flex gap-2">
        <Input
          id="tags"
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
        <div className="flex flex-wrap gap-2 mt-2">
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
    </div>
    {/* Specifications */}
    <div className="space-y-4 mt-6">
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
    </div>
  </>
);

export default ProductMetaInputs; 