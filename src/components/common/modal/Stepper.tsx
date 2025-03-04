'use client'
import { useState } from "react";

export default function Stepper() {
    const [step, setStep] = useState<number>(1);
    const totalSteps = 6;
    const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

    return (
        <div>
            <div className="flex items-center justify-center gap-2 pt-4">
                {steps.map((stepNumber) => (
                    <div key={stepNumber} className="flex items-center">
                        <div
                            className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium ${stepNumber < step
                                ? "bg-[#6938EF] text-white"
                                : stepNumber === step
                                    ? "border-2 border-[#6938EF] text-[#6938EF]"
                                    : "border-2 border-gray-200 text-gray-400"
                                }`}
                        >
                            {stepNumber < step ? "✓" : stepNumber}
                        </div>
                        {stepNumber < totalSteps && (
                            <div
                                className={`w-12 h-0.5 ${stepNumber < step ? "bg-[#6938EF]" : "bg-gray-200"
                                    }`}
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}