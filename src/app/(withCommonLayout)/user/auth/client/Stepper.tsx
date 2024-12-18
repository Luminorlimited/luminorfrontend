import React from "react";

interface StepperProps {
    currentStep: number;
    setStep: (step: number) => void;
}

const Stepper: React.FC<StepperProps> = ({ currentStep, setStep }) => {
    const steps = [1, 2, 3]; // Define the steps

    return (
        <div className="flex items-center justify-center gap-2 pt-8">
            {steps.map((step, index) => (
                <React.Fragment key={step}>
                    <div
                        onClick={() => {
                            // Allow the user to go to the previous step only
                            if (step < currentStep) {
                                setStep(step);
                            }
                        }}
                        className={`flex h-8 w-8 items-center justify-center rounded-full border-2 cursor-pointer transition-all duration-200 ${currentStep > step
                                ? "text-white bg-[#34DC48] border-[#34DC48]" // Completed step
                                : currentStep === step
                                    ? "text-[#1877F2] border-[#1877F2]" // Active step
                                    : "text-gray-400 border-gray-200" // Inactive step
                            }`}
                    >
                        {currentStep > step ? "✔" : step}
                    </div>
                    {index < steps.length - 1 && (
                        <div
                            className={`h-[2px] w-12 transition-all duration-200 ${currentStep > step ? "bg-[#34DC48]" : "bg-gray-200"
                                }`}
                        />
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};

export default Stepper;
