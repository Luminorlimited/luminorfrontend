"use client"

import * as React from "react"
import { Clock, DollarSign, Milestone } from 'lucide-react'
import Button from "../Button"

interface AgreementType {
    id: string
    title: string
    description: string
    icon: React.ElementType
}

interface PaymentModalProps {
    register: (name: string) => void;
    setValue: (name: string, value: any) => void;
    getValues: (name: string) => any;
    setagreementType: (optionId: string) => void;
    handleNextStep: (nextStep: number) => void;
    setStep: (step: number) => void// Corrected this line
}


export function PaymentModal({
    setValue,
    getValues,
    setagreementType,
    handleNextStep,
    setStep,// Correctly receive handleNextStep prop
}: PaymentModalProps) {
    const [selectedOption, setSelectedOption] = React.useState<string | null>(
        getValues("paymentOption") || null
    );

    const agreementTypes: AgreementType[] = [
        {
            id: "Flat_Fee",
            title: "Flat Fee",
            description: "One set price for the entire project.",
            icon: DollarSign,
        },
        {
            id: "Hourly_Fee",
            title: "Hourly Fee",
            description: "Payment based on hours worked.",
            icon: Clock,
        },
        {
            id: "Milestone",
            title: "Milestone",
            description: "Payments released as project stages are completed.",
            icon: Milestone,
        },
    ];

    const handleOptionClick = (optionId: string) => {
        setSelectedOption(optionId);
        setValue("agreementType", optionId);
        setagreementType(optionId);
        console.log(`Selected payment option in PaymentModal: ${optionId}`);
    };

    const handleNext = () => {

        if (!selectedOption) {
            alert("Please select a payment option before proceeding.");
            return;
        }

        if (selectedOption === "Flat_Fee") {
            handleNextStep(3);
        } else if (selectedOption === "Hourly_Fee") {
            handleNextStep(4); // Proceed to step 4 for hourly fee
        } else if (selectedOption === "Milestone") {
            handleNextStep(5); // Proceed to step 5 for milestone payment
        }
    };

    return (
        <div className="space-y-6 p-4">
            <p className="text-gray-600">
                You can choose full payment at project completion or opt for milestone
                payments throughout. Payment options include a flat fee, hourly rate, or
                milestone-based setup to fit your preference.
            </p>
            <div className="space-y-4">
                {agreementTypes.map((option) => (
                    <div
                        key={option.id}
                        className={`cursor-pointer rounded-lg border p-4 transition-colors ${selectedOption === option.id ? "border-primary bg-primary/5" : "hover:border-gray-300"
                            }`}
                        onClick={() => handleOptionClick(option.id)}
                    >
                        <div className="flex items-start gap-4">
                            <div className="rounded-full border p-2">
                                <option.icon className="h-6 w-6" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold">{option.title}</h3>
                                <p className="text-sm text-gray-500">{option.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>


            <div className="flex gap-4 justify-between w-full">
                <button
                    className="bg-[#eeeeee] text-black px-6 py-4 font-medium rounded-[12px]"
                    onClick={() => setStep(1)}
                >
                    Back
                </button>
                <Button
                    type="button"
                    className="w-[100px] rounded-[15px] bg-[#6938EF] text-white py-2 hover:bg-[#6938EF]/90"
                    onClick={handleNext} // Attach the handler here
                >
                    Next
                </Button>
            </div>
        </div>
    );
}


