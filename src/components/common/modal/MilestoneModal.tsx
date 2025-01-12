import React, { Dispatch } from "react";
import { UseFormRegister } from "react-hook-form"; // Assuming react-hook-form is used
import { Plus } from 'lucide-react'

interface Milestone {
    name: string;
    revisions: string;
    delivery: string;
    price: string;
    description: string;
}

export default function MilestoneModal({
    register,
    // handleNext,
    // handleBack,
    setMileStones,
    milestones,
}: {
    register: UseFormRegister<any>;
    handleNext: () => void;
    handleBack: () => void;
    setMileStones: Dispatch<React.SetStateAction<Milestone[] | undefined>>;
    milestones: Milestone[] | undefined;
}) {
    const addMilestone = () => {
        if (milestones !== undefined) {
            setMileStones([
                ...milestones,
                {
                    name: "",
                    revisions: "3",
                    delivery: "2",
                    price: "",
                    description: "",
                },
            ]);
        }
    };

    const updateMilestone = (
        index: number,
        field: keyof Milestone,
        value: string
    ) => {
        const updatedMilestones = milestones?.map((milestone, i) => {
            if (i === index) {
                return { ...milestone, [field]: value };
            }
            return milestone;
        });
        if (milestones !== undefined) setMileStones(updatedMilestones);
    };

    const totalDays = milestones?.reduce(
        (sum, milestone) => sum + Number(milestone.delivery),
        0
    );
    const totalPrice = milestones?.reduce(
        (sum, milestone) => sum + Number(milestone.price || 0),
        0
    );


    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold">Set your offer</h3>
                <p className="text-sm text-gray-500">
                    Specify the terms of your offer and what it covers.
                </p>
            </div>

            {milestones?.map((milestone, index) => (
                <div key={index} className="space-y-4">
                    <div className="grid grid-cols-4 gap-4">
                        <div className="col-span-1">
                            <label
                                htmlFor={`milestone-${index}`}
                                className="block text-sm font-medium text-gray-700"
                            >
                                {index === 0 ? "1st Milestone" : index === 1 ? `${index + 1}nd Milestone` : index === 2 ? `${index + 1}rd Milestone` : `${index + 1}th Milestone`}
                            </label>
                            <input
                                id={`milestone-${index}`}
                                {...register(`milestones.${index}.name`)}
                                value={milestone.name}
                                onChange={(e) => updateMilestone(index, "name", e.target.value)}
                                placeholder="Milestone name"
                                className="mt-1 p-2 border border-gray-300 focus:border-primary rounded-[8px] outline-none w-full"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor={`revisions-${index}`}
                                className="block text-sm font-medium text-gray-700"
                            >
                                Revisions
                            </label>
                            <select
                                id={`revisions-${index}`}
                                {...register(`milestones.${index}.revisions`)}
                                value={milestone.revisions}
                                onChange={(e) => updateMilestone(index, "revisions", e.target.value)}
                                className="mt-1 p-2 border border-gray-300 focus:border-primary rounded-[8px] outline-none cursor-pointer w-full"
                            >
                                {[1, 2, 3, 4, 5].map((num) => (
                                    <option key={num} value={num.toString()}>
                                        {num}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label
                                htmlFor={`delivery-${index}`}
                                className="block text-sm font-medium text-gray-700"
                            >
                                Delivery
                            </label>
                            <select
                                id={`delivery-${index}`}
                                {...register(`milestones.${index}.delivery`)}
                                value={milestone.delivery}
                                onChange={(e) => updateMilestone(index, "delivery", e.target.value)}
                                className="mt-1 p-2 border border-gray-300 focus:border-primary rounded-[8px] outline-none cursor-pointer w-full"
                            >
                                {[1, 2, 3, 5, 7, 14].map((days) => (
                                    <option key={days} value={days.toString()}>
                                        {days} days
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label
                                htmlFor={`price-${index}`}
                                className="block text-sm font-medium text-gray-700"
                            >
                                Price
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                                    £
                                </span>
                                <input
                                    id={`price-${index}`}
                                    type="number"
                                    {...register(`milestones.${index}.price`)}
                                    value={milestone.price}
                                    onChange={(e) => updateMilestone(index, "price", e.target.value)}
                                    className="pl-7 mt-1 p-2 border border-gray-300 focus:border-primary rounded-[8px] outline-none w-full"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label
                            htmlFor={`description-${index}`}
                            className="block text-sm font-medium text-gray-700"
                        >
                            Description
                        </label>
                        <textarea
                            id={`description-${index}`}
                            {...register(`milestones.${index}.description`)}
                            value={milestone.description}
                            onChange={(e) => updateMilestone(index, "description", e.target.value)}
                            placeholder="Describe your offer..."
                            className="h-32 resize-none mt-1 p-2 border border-gray-300 focus:border-primary rounded-[8px] outline-none w-full"
                            maxLength={1500}
                        />
                        <div className="flex justify-between text-sm text-gray-500">
                            <span>Adding a description helps set expectations with buyers.</span>
                            <span>{milestone.description.length}/1500</span>
                        </div>
                    </div>
                </div>
            ))}

            <button type="button" className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-900 transition-colors" onClick={addMilestone}>
                <span>Add a milestone</span>
                <div className="bg-white p-1 rounded-full">
                    <Plus className="h-4 w-4" />
                </div>
            </button>



            <div className="flex items-center justify-between border-t pt-4">
                <div className="text-sm">
                    <span className="text-gray-500">Total: {totalDays} days</span>
                    <span className="ml-4 font-medium">£{totalPrice}</span>
                </div>
            </div>
        </div>
    );
}
