import React from "react";
import {Plus} from "lucide-react";

interface Milestone {
    name: string;
    revisions: string;
    delivery: string;
    price: string;
    description: string;
}

interface MilestoneListProps {
    milestones: Milestone[] | undefined;  // Receiving the data
    setStep: (step: number) => void// Corrected this line

}


export function MilestoneList({ milestones, setStep }: MilestoneListProps) {
    const totalDays = milestones?.reduce((sum, m) => sum + parseInt(m.revisions), 0);
    const totalPrice = milestones?.reduce((sum, m) => sum + parseInt(m.price), 0);

    // console.log(milestones);
    return (
        <div className="space-y-6">
            <div className="space-y-1">
                <h3 className="text-lg font-medium">Your Milestones</h3>
                <p className="text-sm text-gray-500">
                    Here are the milestones you’ve set.
                </p>
            </div>

            <div className="rounded-lg bg-gray-50/75 p-4 space-y-4">
                {milestones?.map((milestone, index) => (
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
                            <span className="text-sm">{milestone.delivery} days</span>
                            <span className="text-sm font-medium w-16">£ {milestone.price}</span>
                        </div>
                    </div>
                ))}

                <div className="flex items-center justify-between pt-2">
                    <div>
                    <button
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-900 transition-colors" onClick={() => setStep(5)}>
                        <span>Add a milestone</span>
                        <div className="bg-white p-1 rounded-full">
                            <Plus className="h-4 w-4"/>
                        </div>
                    </button>

                    </div>


                    <div className="flex items-center gap-8">
                        <span className="text-sm">Total: {totalDays} days</span>
                        <span className="text-sm font-medium w-16">£ {totalPrice}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
