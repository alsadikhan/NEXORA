import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { ProductFormLayout } from './index';
import { ProductFormStep, ProductFormState } from '@/hooks/use-product-form';

interface InventoryStepProps {
  formState: ProductFormState;
  updateFormField: <K extends keyof ProductFormState>(field: K, value: ProductFormState[K]) => void;
  currentStep: ProductFormStep;
  isSubmitting: boolean;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

const InventoryStep = ({
  formState,
  updateFormField,
  currentStep,
  isSubmitting,
  goToNextStep,
  goToPreviousStep,
}: InventoryStepProps) => {
  // Calculate available stock
  const availableStock = Number(formState.stock) - Number(formState.reservedStock);
  const isLowStock = availableStock <= Number(formState.lowStockThreshold);

  return (
    <ProductFormLayout
      title="Inventory Management"
      currentStep={currentStep}
      isSubmitting={isSubmitting}
      goToNextStep={goToNextStep}
      goToPreviousStep={goToPreviousStep}
    >
      {/* Stock Status */}
      <div className="space-y-6">
        <h3 className="text-lg font-medium">Stock Status</h3>
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="inStock">Product Status</Label>
            <div className="text-gray-500 text-sm">Is this product available for purchase?</div>
          </div>
          <Switch 
            id="inStock" 
            checked={formState.inStock}
            onCheckedChange={(checked) => updateFormField('inStock', checked)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="stock">Total Stock Quantity</Label>
            <Input 
              id="stock" 
              value={formState.stock}
              onChange={(e) => updateFormField('stock', e.target.value)}
              type="number" 
              min="0" 
              step="1" 
              placeholder="0" 
              disabled={!formState.inStock}
            />
            <p className="text-xs text-gray-500">Total quantity in inventory</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reservedStock">Reserved Stock</Label>
            <Input 
              id="reservedStock" 
              value={formState.reservedStock}
              onChange={(e) => updateFormField('reservedStock', e.target.value)}
              type="number" 
              min="0" 
              step="1" 
              placeholder="0" 
            />
            <p className="text-xs text-gray-500">Stock reserved for pending orders</p>
          </div>
        </div>

        {/* Available Stock Display */}
        {formState.stock && (
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium mb-3">Stock Summary</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Stock:</span>
                <span className="font-medium">{formState.stock}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Reserved Stock:</span>
                <span className="font-medium">{formState.reservedStock}</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span className="text-gray-600">Available Stock:</span>
                <span className={`font-medium ${isLowStock ? 'text-red-600' : 'text-green-600'}`}>
                  {availableStock}
                </span>
              </div>
              {isLowStock && (
                <div className="text-red-600 text-xs">
                  ⚠️ Low stock alert - Consider reordering
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Stock Alerts */}
      <div className="space-y-6 border-t pt-6">
        <h3 className="text-lg font-medium">Stock Alerts</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="lowStockThreshold">Low Stock Threshold</Label>
            <Input 
              id="lowStockThreshold" 
              value={formState.lowStockThreshold}
              onChange={(e) => updateFormField('lowStockThreshold', e.target.value)}
              type="number" 
              min="0" 
              step="1" 
              placeholder="10" 
            />
            <p className="text-xs text-gray-500">Alert when stock falls below this level</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reorderPoint">Reorder Point</Label>
            <Input 
              id="reorderPoint" 
              value={formState.reorderPoint}
              onChange={(e) => updateFormField('reorderPoint', e.target.value)}
              type="number" 
              min="0" 
              step="1" 
              placeholder="5" 
            />
            <p className="text-xs text-gray-500">When to place new orders</p>
          </div>
        </div>
      </div>

      {/* Inventory Notes */}
      <div className="space-y-2">
        <Label>Inventory Management Notes</Label>
        <div className="text-sm text-gray-600 space-y-1">
          <p>• Available stock = Total stock - Reserved stock</p>
          <p>• Low stock alerts are sent when available stock ≤ threshold</p>
          <p>• Reserved stock includes items in customer carts and pending orders</p>
          <p>• Set reorder point below low stock threshold for timely reordering</p>
        </div>
      </div>
    </ProductFormLayout>
  );
};

export default InventoryStep; 