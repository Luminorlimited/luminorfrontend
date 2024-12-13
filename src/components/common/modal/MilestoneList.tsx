"use client"

import * as React from "react"
import { Plus } from 'lucide-react'

interface Milestone {
    name: string
    days: number
    price: number
}

export function MilestoneList() {
    const [milestones, setMilestones] = React.useState<Milestone[]>([
        { name: "Milestone name", days: 2, price: 100 },
        { name: "Milestone name", days: 2, price: 100 },
    ])

    const addMilestone = () => {
        setMilestones([...milestones, { name: "Milestone name", days: 2, price: 100 }])
    }

    const totalDays = milestones.reduce((sum, m) => sum + m.days, 0)
    const totalPrice = milestones.reduce((sum, m) => sum + m.price, 0)

    return (
        <div className="space-y-6">
            <div className="space-y-1">
                <h3 className="text-lg font-medium">Set your offer</h3>
                <p className="text-sm text-gray-500">
                    Specify the terms of your offer and what it covers.
                </p>
            </div>

            <div className="rounded-lg bg-gray-50/75 p-4 space-y-4">
                {milestones.map((milestone, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-between py-2 border-b border-gray-200 last:border-0"
                    >
                        <div className="text-sm">
                            {index + 1}
                            {index === 0 ? "st" : index === 1 ? "nd" : index === 2 ? "rd" : "th"}{" "}
                            Milestone: {milestone.name}
                        </div>
                        <div className="flex items-center gap-8">
                            <span className="text-sm">{milestone.days} days</span>
                            <span className="text-sm font-medium w-16">£ {milestone.price}</span>
                        </div>
                    </div>
                ))}

                <div className="flex items-center justify-between pt-2">
                    <div>
                        <button
                            type="button"
                            className="px-4 py-2 flex justify-center items-center gap-2 bg-[#E9E9EA] rounded-[20px] mt-4 hover:bg-gray-100"
                            onClick={addMilestone}
                        >
                            Add a milestone
                            <Plus className="mr-2 h-4 w-4" />
                        </button>
                    </div>

                    <div className="flex items-center gap-8">
                        <span className="text-sm">Total: {totalDays} days</span>
                        <span className="text-sm font-medium w-16">£ {totalPrice}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
