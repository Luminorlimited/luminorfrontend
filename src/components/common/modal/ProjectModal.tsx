'use client';

import React, { useEffect, useState } from 'react';
import Button from '@/components/common/Button';
import { PaymentModal } from '@/components/common/modal/PaymentModal';
import { HourlyFeeModal } from '@/components/common/modal/HourlyFeeModal';
import MilestoneModal from '@/components/common/modal/MilestoneModal';
import { MilestoneList } from '@/components/common/modal/MilestoneList';
import ProjectDescModal from '@/components/common/modal/ProjectDescModal';
import { FlatFeeModal } from '@/components/common/modal/FlatFeeModal';
import { useForm } from 'react-hook-form';
import io from 'socket.io-client'; // Import the socket.io-client

interface projectModalProps {
    onClose: () => void
}


interface Milestone {
    name: string;
    revisions: string;
    delivery: string;
    price: string;
    description: string;
}

const socket = io('ws://localhost:5001');
const ProjectModal: React.FC<projectModalProps> = ({ onClose }) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [open, setOpen] = useState(true);
    // console.log(open)
    // console.log(open);
    const [step, setStep] = useState<number>(1);
    const totalSteps = 6;
    const [finalStep, setFinalStep] = useState<any>(null);

    const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

    const { register, handleSubmit, getValues, setValue } = useForm();

    const handleNext = () => {
        // console.log("Current Form Values:", getValues());
        if (step < totalSteps) setStep(step + 1);
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
    };

    const [milestones, setMilestones] = React.useState<Milestone[] | undefined>([
        {
            name: "",
            revisions: "",
            delivery: "",
            price: "",
            description: "",
        },
    ]);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [paymentOption, setPaymentOption] = useState<string | null>(null);
    // console.log(paymentOption);


    const onSubmit = (data: any) => {
        setFinalStep(data);
        console.log("Final Form Values:", data);

        const offer = {
            projectDetails: data,
            // milestones: milestones,
        };
        console.log(`My offer is `, offer);
        socket.emit('sendOffer', offer)

        onClose()
    };


    // Create and get offer via Socket io
    useEffect(() => {
        socket.on("connect", () => {
            console.log("Connected to server for create offer");
            socket.on('receiveOffer', (message) => {
                console.log('Offer received response:', message);
            })

        })
    }, []);

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            onClick={() => setOpen(false)} // Close on backdrop click
        >
            <div
                className="relative shadow-lg w-full max-w-[670px] rounded-[20px] overflow-hidden bg-white"
                onClick={(e) => e.stopPropagation()} // Prevent closing on modal click
            >
                <div className="flex items-center bg-[#f1f1f1] justify-between border-b p-4">
                    <h2 className="text-xl font-semibold">
                        {step === 1
                            ? "Project Name"
                            : step === 2
                                ? "Agreed Payment Method"
                                : step === 3
                                    ? "Flat Fee"
                                    : step === 4
                                        ? "Hourly Fee"
                                        : step === 5
                                            ? "Milestone Fee"
                                            : step === 6
                                                ? "Milestone List"
                                                : ""}
                    </h2>
                    <button
                        className="p-2 text-gray-500 hover:text-gray-700"
                        onClick={onClose}
                    >
                        ✖
                    </button>
                </div>

                <div className="space-y-6 py-4 px-4 max-h-[550px] overflow-y-scroll">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {step === 1 ? (
                            <ProjectDescModal
                                register={register}
                                handleNext={handleNext}
                            />
                        ) : step === 2 ? (
                            <PaymentModal
                                register={register}
                                getValues={getValues}
                                setStep={setStep}
                                // step={step}
                                setPaymentOption={setPaymentOption}
                                setValue={setValue}
                                handleNextStep={(nextStep: number) => setStep(nextStep)} // Pass the setter directly
                            />
                        ) : step === 3 ? (
                            <FlatFeeModal
                                register={register}
                                getValues={getValues}
                                setValue={setValue}
                            />
                        ) : step === 4 ? (
                            <HourlyFeeModal
                                register={register}
                                getValues={getValues}
                            />
                        ) : step === 5 ? (
                            <MilestoneModal
                                handleBack={handleBack}
                                register={register}
                                handleNext={handleNext}
                                milestones={milestones}
                                setMileStones={setMilestones}
                            />
                        ) : step === 6 ? (
                            <MilestoneList
                                setStep={setStep}

                                milestones={milestones}
                                finalData={finalStep}
                            />
                        ) : (
                            <div>Thank You</div>
                        )}
                        {/* Add other steps' components here */}

                        <div className="flex justify-end">
                            {step === 1 ? (
                                <Button
                                    type='button'
                                    className="w-[100px] bg-[#6938EF] text-white py-2 rounded-[10px] hover:bg-[#6938EF]/90"
                                    onClick={() => setStep(step + 1)}
                                >
                                    Next
                                </Button>
                            ) : step === 6 ? (
                                <div className="flex gap-4 justify-between w-full">
                                    <button
                                        className="bg-[#eeeeee] text-black px-6 py-4 font-medium rounded-[12px]"
                                        onClick={() => setStep(2)}
                                    >
                                        Back
                                    </button>
                                    <Button
                                        type='submit'
                                        className="w-[100px] rounded-[15px] bg-[#6938EF] text-white py-2 hover:bg-[#6938EF]/90"
                                        onClick={onSubmit}
                                    >
                                        Submit
                                    </Button>
                                </div>
                            ) : step === 2 ? (
                                ""
                            ) : (
                                <div className="flex gap-4 justify-between w-full">
                                    <button
                                        className="bg-[#eeeeee] text-black px-6 py-4 font-medium rounded-[12px]"
                                        onClick={() => setStep(2)}
                                    >
                                        Back
                                    </button>
                                    <button
                                        className="w-[100px] rounded-[15px] bg-[#6938EF] text-white py-2 hover:bg-[#6938EF]/90"
                                        onClick={() => setStep(6)}
                                    >
                                        Next
                                    </button>
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
                                            className={`w-12 h-0.5 ${stepNumber < step ? 'bg-[#6938EF]' : 'bg-gray-200'
                                                }`}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default ProjectModal;


