import React from "react";
import { cn } from "@/lib/utils";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps?: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, totalSteps = 2 }) => {
  return (
    <div className="flex flex-col gap-2 w-full max-w-[150px]">
      <span className="font-geist text-[14px] font-medium text-[#333333] leading-[150%] tracking-[-0.1px]">
        Step {currentStep} of {totalSteps}
      </span>
      <div className="flex items-center gap-2">
        {/* Step 1 Bar - Always Active/Purple */}
        <div className="h-1.5 w-24 rounded-full bg-[#6A59CE]" />
        
        {/* Step 2 Bar - Dot if inactive (step 1), Bar if active (step 2) */}
        {currentStep === 1 ? (
          <div className="h-1.5 w-23 rounded-full bg-[#EF957D] opacity-50 transition-all duration-300" />
        ) : (
          <div className="h-1.5 w-24 rounded-full bg-[#EF957D] transition-all duration-300 animate-in slide-in-from-left-2" />
        )}
      </div>
    </div>
  );
};

export default StepIndicator;