import React from "react";
import { cn } from "@/lib/utils";
import { Check, CircleDashed } from "lucide-react";

export interface StepperProps {
  steps: {
    id: string;
    label: string;
    description?: string;
  }[];
  activeStep: string;
  onStepChange?: (stepId: string) => void;
  orientation?: "horizontal" | "vertical";
  className?: string;
  allowClickNavigation?: boolean;
  completedSteps?: string[];
}

export function Stepper({
  steps,
  activeStep,
  onStepChange,
  orientation = "horizontal",
  className,
  allowClickNavigation = true,
  completedSteps = [],
}: StepperProps) {
  void orientation;

  const isStepComplete = (stepId: string) => completedSteps.includes(stepId);
  const isStepActive = (stepId: string) => stepId === activeStep;
  const isStepAccessible = (index: number) => {
    return allowClickNavigation && (
      completedSteps.includes(steps[index].id) || 
      (index > 0 && completedSteps.includes(steps[index - 1].id))
    );
  };

  const handleStepClick = (stepId: string, index: number) => {
    if (onStepChange && isStepAccessible(index)) {
      onStepChange(stepId);
    }
  };

  // For small screens, we'll use a simpler progress indicator
  const currentStepIndex = steps.findIndex(step => step.id === activeStep);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  return (
    <div className={cn("w-full", className)}>
      {/* Mobile Progress Bar */}
      <div className="md:hidden space-y-2">
        <div className="flex justify-between text-sm">
          <span className="font-medium">{steps[currentStepIndex]?.label || 'Step'}</span>
          <span className="text-gray-500">{currentStepIndex + 1}/{steps.length}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300 ease-in-out" 
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      
      {/* Desktop Stepper */}
      <ol className="hidden md:flex items-center w-full">
        {steps.map((step, index) => {
          const isComplete = isStepComplete(step.id);
          const isActive = isStepActive(step.id);
          const isClickable = isStepAccessible(index);
          const isLast = index === steps.length - 1;

          return (
            <li 
              key={step.id}
              className={cn(
                "flex items-center",
                isLast ? "flex-1" : "flex-1 after:content-[''] after:w-full after:h-0.5 after:border-b-2 after:border-gray-200 after:border-solid after:inline-block after:mx-4",
                isComplete && !isLast && "after:border-primary"
              )}
            >
              <div 
                className={cn(
                  "flex flex-col items-center justify-center",
                  isClickable && "cursor-pointer"
                )}
                onClick={() => handleStepClick(step.id, index)}
              >
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors",
                    isComplete
                      ? "border-primary bg-primary text-primary-foreground"
                      : isActive
                      ? "border-primary text-primary"
                      : "border-gray-300 text-gray-400"
                  )}
                >
                  {isComplete ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <CircleDashed className="h-5 w-5" />
                  )}
                </div>
                <div className="mt-2 text-center">
                  <div
                    className={cn(
                      "text-sm font-medium",
                      isActive || isComplete ? "text-primary" : "text-gray-500"
                    )}
                  >
                    {step.label}
                  </div>
                  {step.description && (
                    <div className="text-xs text-gray-500">{step.description}</div>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
} 