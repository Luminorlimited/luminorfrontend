"use client"

import * as React from "react"
import { Clock, DollarSign, Milestone } from 'lucide-react'
import { cn } from "@/lib/utils"

interface PaymentOption {
    id: string
    title: string
    description: string
    icon: React.ElementType
}

interface PaymentModalProps {
    register: (name: string) => void
    setValue: (name: string, value: any) => void
    getValues: (name: string) => any
}

export function PaymentModal({  setValue, getValues }: PaymentModalProps) {
    const [selectedOption, setSelectedOption] = React.useState<string | null>(getValues("paymentOption") || null)

    const paymentOptions: PaymentOption[] = [
        {
            id: "flat",
            title: "Flat Fee",
            description: "One set price for the entire project.",
            icon: DollarSign,
        },
        {
            id: "hourly",
            title: "Hourly Fee",
            description: "Payment based on hours worked.",
            icon: Clock,
        },
        {
            id: "milestone",
            title: "Milestone",
            description: "Payments released as project stages are completed.",
            icon: Milestone,
        },
    ]

    const handleOptionClick = (optionId: string) => {
        setSelectedOption(optionId)
        setValue("paymentOption", optionId) // Update value in the form
        console.log(`Selected payment option in PaymentModal: ${optionId}`)
    }

    return (
        <div className="space-y-6 p-4">
            <p className="text-gray-600">
                You can choose full payment atdddd project completion or opt for milestone
                payments throughout. Payment options include a flat fee, hourly rate, or
                milestone-based setup to fit your preference.
            </p>
            <div className="space-y-4">
                {paymentOptions.map((option) => (
                    <div
                        key={option.id}
                        className={cn(
                            "cursor-pointer rounded-lg border p-4 transition-colors",
                            selectedOption === option.id
                                ? "border-primary bg-primary/5"
                                : "hover:border-gray-300"
                        )}
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
        </div>
    )
}
