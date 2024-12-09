"use client"

import * as React from "react"
import {  Clock, DollarSign, Milestone } from 'lucide-react'
import { cn } from "@/lib/utils"



interface PaymentOption {
    id: string
    title: string
    description: string
    icon: React.ElementType
}

export function PaymentModal() {
    const [selectedOption, setSelectedOption] = React.useState<string | null>(null)

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


    return (
        
                
                <div className="space-y-6 p-4">
                    <p className="text-gray-600">
                        You can choose full payment at project completion or opt for milestone
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
                                onClick={() => setSelectedOption(option.id)}
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

