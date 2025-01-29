"use client";

import React, { useState } from "react";
import { Download } from "lucide-react";
import Button from "@/components/common/Button";
import RequirementsStep from "./RequirementStep";
import PaymentInfoStep from "./PaymentInfoStep";
import { useGetSingleOfferQuery } from "@/redux/Api/offerApi";
import { useParams } from "next/navigation";
import { toast } from "sonner";

interface Step {
    id: number;
    title: string;
}

export default function ProjectDetails() {
    const offerId = useParams()
    // console.log('my offer', offerId);
    const { data: getSingleOffer } = useGetSingleOfferQuery(offerId.id)
    // console.log(getSingleOffer?.data?.orderAgreementPDF);

    console.log(getSingleOffer)
    const handleDownloadPdf = () => {
        const pdfUrl = getSingleOffer?.data?.offer?.orderAgreementPDF; // Fetch the PDF URL
        if (pdfUrl) {
            // Open the PDF in a new tab
            window.open(pdfUrl, '_blank');
        } else {
            toast.error("PDF file not available");
        }
    };
    const [steps] = useState<Step[]>([
        { id: 1, title: "Review Requirements" },
        { id: 2, title: "Add further Requirements" },
        { id: 3, title: "Payment Information" },
    ]);

    const [currentStepId, setCurrentStepId] = useState(1);

    // const 




    // Handler for navigation
    const goToNextStep = () => {
        if (currentStepId < steps.length) {
            setCurrentStepId(currentStepId + 1);
        }
    };

    console.log(steps);

    const goToPreviousStep = () => {
        if (currentStepId > 1) {
            setCurrentStepId(currentStepId - 1);
        }
    };



    const [requirementdata, setRequirementdata] = useState()

    return (
        <div className="max-w-[1300px] mx-auto py-6">
            {/* Stepper */}
            <div className="lg:flex items-center  mb-12">
                {steps.map((step, index) => (
                    <React.Fragment key={step.id}>
                        <div className="flex flex-col items-center flex-1 lg:gap-y-0 gap-y-24 lg:gap-x-0 justify-start">
                            <div className="flex items-center">
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center border-2 
                                        ${step.id < currentStepId
                                            ? "bg-[#DDD6F6] border-[#DDD6F6] text-white"
                                            : step.id === currentStepId
                                                ? "border-[#DDD6F6] bg-[#DDD6F6]"
                                                : "border-gray-300 bg-white"
                                        }`}
                                >
                                    {step.id < currentStepId ? (
                                        <svg
                                            className="w-5 h-5 text-primary"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                    ) : step.id === currentStepId ? (
                                        <div className="w-2 h-2 bg-primary rounded-full" />
                                    ) : (
                                        <div className="w-2 h-2 bg-gray-300 rounded-full" />
                                    )}
                                </div>
                                {index < steps.length - 1 && (
                                    <div className="lg:w-[385px] w-[2px] h-[2px] bg-gray-200 relative">
                                        <div
                                            className={`transition-all lg:w-[385px] w-[3px] lg:h-full h-[90px] lg:static absolute top-4 left-[-16px]  ${step.id < currentStepId
                                                ? "bg-[#7C3AED]"
                                                : step.id === currentStepId
                                                    ? "bg-gray-300 w-1/2"
                                                    : ""
                                                }`}
                                        />
                                    </div>
                                )}
                            </div>
                            <div className="mt-2 text-sm">
                                <span className={`font-medium ${step.id === currentStepId ? "text-black" : "text-gray-500"}`}>
                                    {String(step.id).padStart(2, "0")}. {step.title}
                                </span>
                            </div>
                        </div>
                    </React.Fragment>
                ))}
            </div>

            {/* Content */}
            <div className="border lg:p-[32px] p-[10px] rounded-[20px]">

                {/* <form> */}
                {currentStepId === 1 && (
                    <div className="space-y-4 ">
                        <h2 className="text-xl font-semibold">Review Requirements</h2>
                        <p className="text-sm text-gray-600">
                            Download Review requirements in PDF
                        </p>
                        <button
                            className="inline-flex items-center px-6 py-4 bg-primary text-white rounded-[8px] hover:bg-[#6D28D9] transition-colors"
                            onClick={handleDownloadPdf}
                        >
                            <Download className="w-4 h-4 mr-2" />
                            Download PDF
                        </button>
                    </div>
                )}
                {currentStepId === 2 && (
                    <div className="space-y-4 ">
                        <RequirementsStep goToPreviousStep={goToPreviousStep} goToNextStep={goToNextStep} setRequirementdata={setRequirementdata} />
                    </div>
                )}
                {currentStepId === 3 && (
                    <div className="space-y-4">
                        <PaymentInfoStep getSingleOffer={getSingleOffer} requirementdata={requirementdata} />
                    </div>
                )}
                {/* </form> */}



                {
                    currentStepId === 1 ? (
                        <div className="flex justify-end gap-4 mt-8">
                            {/* <button
                                className="px-4 py-2 bg-[#E9E9EA] text-black rounded-[10px] hover:bg-[#eeeeee] transition-colors"
                                onClick={goToPreviousStep}
                                disabled={currentStepId === 1}
                            >
                                Back
                            </button> */}
                            <Button
                                className="px-4 py-2 bg-primary text-white rounded-[10px] hover:bg-[#6D28D9] transition-colors"
                                onClick={goToNextStep}
                                disabled={currentStepId === steps.length}
                            >
                                Next
                            </Button>
                        </div>
                    ) : currentStepId === 2 ? ("") : ("")
                }

            </div>

        </div>
    );
}
