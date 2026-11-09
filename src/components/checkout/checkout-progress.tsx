'use client';

import { CheckoutStep } from '@/types/checkout';
import { CheckCircle2, Circle } from 'lucide-react';

interface CheckoutProgressProps {
  currentStep: CheckoutStep;
  steps: CheckoutStep[];
  onStepClick?: (step: CheckoutStep) => void;
}

// Helper function to get step name
const getStepName = (step: CheckoutStep): string => {
  const names: Record<CheckoutStep, string> = {
    information: 'Information',
    shipping: 'Shipping',
    payment: 'Payment',
    review: 'Review'
  };
  
  return names[step] || step;
};

export default function CheckoutProgress({ 
  currentStep, 
  steps,
  onStepClick 
}: CheckoutProgressProps) {
  const currentStepIndex = steps.indexOf(currentStep);
  
  return (
    <div className="w-full">
      <div className="hidden md:flex items-center justify-between">
        {steps.map((step, index) => {
          const isActive = index === currentStepIndex;
          const isCompleted = index < currentStepIndex;
          const isClickable = isCompleted && onStepClick;
          
          return (
            <div key={step} className="flex-1 relative">
              {/* Connector line */}
              {index > 0 && (
                <div 
                  className={`absolute top-1/2 left-0 right-0 h-0.5 -translate-y-1/2 -z-10 ${
                    index <= currentStepIndex ? 'bg-black' : 'bg-gray-200'
                  }`}
                  style={{ left: '-50%', right: '50%' }}
                ></div>
              )}
              
              <div className="flex flex-col items-center">
                {/* Step circle */}
                <button
                  type="button"
                  onClick={isClickable ? () => onStepClick(step) : undefined}
                  className={`relative flex items-center justify-center w-10 h-10 rounded-full text-sm font-medium mb-2 ${
                    isActive 
                      ? 'bg-black text-white' 
                      : isCompleted 
                        ? 'bg-black text-white cursor-pointer' 
                        : 'bg-gray-100 text-gray-400 cursor-default'
                  }`}
                  disabled={!isClickable}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </button>
                
                {/* Step name */}
                <span 
                  className={`text-sm ${
                    isActive || isCompleted ? 'text-black font-medium' : 'text-gray-500'
                  }`}
                >
                  {getStepName(step)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Mobile version */}
      <div className="flex items-center justify-between md:hidden">
        <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
          <div 
            className="bg-black h-full rounded-full transition-all duration-300 ease-out"
            style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
          ></div>
        </div>
      </div>
      <div className="mt-2 flex justify-between md:hidden">
        <span className="text-xs font-medium">
          Step {currentStepIndex + 1}: {getStepName(currentStep)}
        </span>
        <span className="text-xs text-gray-500">
          {currentStepIndex + 1} of {steps.length}
        </span>
      </div>
    </div>
  );
} 