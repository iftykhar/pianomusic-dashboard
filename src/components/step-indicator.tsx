"use client";

import { Check } from "lucide-react";

interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
}

export default function StepIndicator({
  steps,
  currentStep,
}: StepIndicatorProps) {
  return (
    <div className="w-full py-8 px-4 bg-white border-b border-gray-200">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const isCompleted = index < currentStep;
            const isCurrent = index === currentStep;

            return (
              <div key={index} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                      isCompleted
                        ? "bg-orange-500 border-orange-500 text-white"
                        : isCurrent
                          ? "border-orange-500 text-orange-500 bg-white"
                          : "border-gray-300 text-gray-400 bg-white"
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <span className="text-sm font-semibold">{index + 1}</span>
                    )}
                  </div>
                  <span
                    className={`mt-2 text-xs font-medium text-center max-w-[80px] ${
                      isCompleted || isCurrent
                        ? "text-orange-500"
                        : "text-gray-400"
                    }`}
                  >
                    {step}
                  </span>
                </div>

                {index < steps.length - 1 && (
                  <div
                    className={`h-0.5 w-12 md:w-24 mx-2 transition-colors ${
                      index < currentStep ? "bg-orange-500" : "bg-gray-300"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
