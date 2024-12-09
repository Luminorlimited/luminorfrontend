'use client';

import React, { useState } from 'react';
import Button from '@/components/common/Button';
import { PaymentModal } from './PaymentModal';
import { FeeModal } from './FeeModal';
import MilestoneModal from './MilestoneModal';
import { MilestoneList } from './MilestoneList';

interface projectModalProps {
    onClose: () => void
}

const ProjectModal: React.FC<projectModalProps> = ({ onClose }) => {
    const [open, setOpen] = useState(true);
    console.log(open)
    const [step, setStep] = useState<number>(1);
    const totalSteps = 5;

    const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);



    return (
        <>
            {/* {open && ( */}
            <div
                className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                onClick={() => setOpen(false)} // Close on backdrop click
            >
                <div
                    className="relative  shadow-lg w-full max-w-[670px]  rounded-[20px] overflow-hidden bg-white"
                    onClick={(e) => e.stopPropagation()} // Prevent closing on modal click
                >
                    <div className="flex items-center bg-[#f1f1f1] justify-between border-b p-4 ">
                        <h2 className="text-xl font-semibold">{step === 1 ? "Project Name" : step === 2 ? "Agreed Payment Method" : step === 3 ? "Hourly Fee" : step === 4 ? "Milestoen fee" : step===5?"Mildestone List": ""}</h2>
                        <button
                            className="p-2 text-gray-500 hover:text-gray-700"
                            onClick={onClose}
                        >
                            ✖
                        </button>
                    </div>
                    {/* Header */}

                    {/* Content */}
                    <div className="space-y-6 py-4 px-4 max-h-[550px] overflow-y-scroll ">


                        {step === 1 ?
                            <div className="space-y-4">
                                {/* Project Name Input */}
                                <div>
                                    <label className="text-base font-semibold mb-2 block">
                                        Project Name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="I'm a healthcare and medical specialist |"
                                        className="w-full rounded-[8px] border border-gray-300  p-2 focus:ring-2 focus:ring-primary focus:border-none outline-none"
                                    />
                                </div>

                                {/* Description Textarea */}
                                <div>
                                    <label className="text-base font-semibold mb-2 block">
                                        Description
                                    </label>
                                    <textarea
                                        placeholder="Write your Description"
                                        className="w-full rounded-[8px] min-h-[120px] border border-gray-300  p-2 resize-none focus:ring-2 focus:ring-primary focus:border-none outline-none"
                                    />
                                </div>
                            </div> : step === 2 ?
                                <div><PaymentModal /></div> : step === 3 ? <div><FeeModal /></div> :
                                    step === 4 ?
                                        <div ><MilestoneModal /></div> :
                                        step === 5 ?
                                            <div ><MilestoneList /></div> : ""
                        }

                        {/* Next Button */}
                        <div className="flex justify-end">
                            {step === 1 ? (
                                <Button
                                    className="w-[100px] bg-[#6938EF] text-white py-2 rounded-md hover:bg-[#6938EF]/90"
                                    onClick={() => setStep(step + 1)}
                                >
                                    Next
                                </Button>
                            ) : step === 5 ? (
                                <div className="flex gap-4 justify-between w-full">
                                    <button
                                        className="bg-[#eeeeee] text-black px-6 py-4 font-medium rounded-[12px]"
                                        onClick={() => setStep(step - 1)}
                                    >
                                        Back
                                    </button>
                                    <Button
                                        className="w-[100px] rounded-[15px] bg-[#6938EF] text-white py-2 hover:bg-[#6938EF]/90"
                                        onClick={() => setStep(step + 1)}
                                    >
                                        Submit
                                    </Button>
                                </div>
                            ) : (
                                <div className="flex gap-4 justify-between w-full">
                                    <button
                                        className="bg-[#eeeeee] text-black px-6 py-4 font-medium rounded-[12px]"
                                        onClick={() => setStep(step - 1)}
                                    >
                                        Back
                                    </button>
                                    <Button
                                        className="w-[100px] rounded-[15px] bg-[#6938EF] text-white py-2 hover:bg-[#6938EF]/90"
                                        onClick={() => setStep(step + 1)}
                                    >
                                        Next
                                    </Button>
                                </div>
                            )}

                        </div>

                        {/* Step Indicator */}
                        <div className="flex items-center justify-center gap-2 pt-4">
                            {steps.map((stepNumber) => (
                                <div key={stepNumber} className="flex items-center">
                                    <div
                                        className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium ${stepNumber < step
                                            ? 'bg-[#6938EF] text-white'
                                            : stepNumber === step
                                                ? 'border-2 border-[#6938EF] text-[#6938EF]'
                                                : 'border-2 border-gray-200 text-gray-400'
                                            }`}
                                    >
                                        {stepNumber < step ? '✓' : stepNumber}
                                    </div>
                                    {stepNumber < totalSteps && (
                                        <div
                                            className={`w-12 h-0.5 ${stepNumber < step
                                                ? 'bg-[#6938EF]'
                                                : 'bg-gray-200'
                                                }`}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {/* // )} */}
        </>
    );
}


export default ProjectModal