"use client"

import { AiOutlinePaperClip } from "react-icons/ai";
import React from 'react'
import { Plus } from 'lucide-react'
import Button from "../common/Button";
import { useFieldArray, useForm } from "react-hook-form";
import Image from "next/image";

interface FileUpload {
    id: number;
    file?: File;
    preview?: string;
}

interface FormData {
    clientRequirement: FileUpload[];
    captions: { value: string }[]; // Captions as an array of objects
    additionalMessage: string;
}

interface StepsProps {
    goToPreviousStep: () => void;
    goToNextStep: () => void;
    setRequirementdata: any;
}

const RequirementsStep: React.FC<StepsProps> = ({ goToPreviousStep, goToNextStep, setRequirementdata }) => {
    const { register, control, handleSubmit, watch } = useForm<FormData>({
        defaultValues: {
            clientRequirement: [],
            captions: [],
            additionalMessage: "",
        },
    });

    const { fields: fileFields, append: appendFile } = useFieldArray({
        control,
        name: "clientRequirement",
    });

    const { fields: captionFields, append: appendCaption } = useFieldArray({
        control,
        name: "captions",
    });

    const watchFileUploads = watch("clientRequirement");
    // const watchCaptions = watch("captions");

    const handleFileChange = (files: FileList | null) => {
        if (files) {
            Array.from(files).forEach((file) => {
                const newId = fileFields.length + 1;
                const reader = new FileReader();

                reader.onloadend = () => {
                    appendFile({
                        id: newId,
                        file,
                        preview: reader.result as string,
                    });
                };

                reader.readAsDataURL(file);
            });
        }
    };

    const addCaption = () => {
        appendCaption({value: ""});
    };

    const onSubmit = (data: FormData) => {
        console.log("Submitted Data:", data);
        setRequirementdata(data)
        goToNextStep();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
                <h2 className="text-xl font-semibold mb-4">Add Further Requirements</h2>
                <p className="text-sm text-gray-600 mb-4">
                    Please upload the relevant documents for review (if applicable).
                </p>

                {/* Image Upload Section */}
                <div className="space-y-4">
                    <label className="inline-flex gap-2 items-center px-4 py-2 bg-primary text-white rounded-[20px] hover:bg-[#6D28D9] transition-colors cursor-pointer">
                        Upload Images
                        <AiOutlinePaperClip className="text-[15px] bg-white rounded-full text-[#25314C] transition-all cursor-pointer w-7 h-7 p-1" />
                        <input
                            type="file"
                            className="hidden"
                            multiple
                            onChange={(e) => handleFileChange(e.target.files)}
                        />
                    </label>

                    {/* Display Uploaded Images */}
                    {watchFileUploads.map((upload, index) => (
                        <div key={index} className="space-y-2">
                            {upload.preview && (
                                <Image
                                    src={upload.preview}
                                    width={600}
                                    height={300}
                                    alt={`Preview ${index + 1}`}
                                    className="mt-2 max-w-full h-auto max-h-40 object-contain"
                                />
                            )}
                        </div>
                    ))}
                </div>

                {/* Captions Section */}
                <div className="space-y-4 mt-6">
                    <h3 className="text-lg font-medium">Add Captions</h3>
                    {captionFields.map((field, index) => (
                        <div key={index} className="space-y-2">
                            <input
                                type="text"
                                placeholder="Write caption"
                                {...register(`captions.${index}.value`)}
                                className="w-full px-4 py-2 border border-gray-300 focus:border-primary rounded-[8px] outline-none"
                            />
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addCaption}
                        className="inline-flex gap-2 rounded-[20px] items-center px-3 py-1.5 bg-[#E9E9EA] text-[#030304] hover:bg-gray-200 transition-colors text-sm"
                    >
                        Add Caption
                        <Plus className="text-[15px] bg-white rounded-full text-[#25314C] transition-all cursor-pointer w-7 h-7 p-1" />
                    </button>
                </div>

                {/* Additional Message Section */}
                <div className="space-y-2 mt-6">
                    <label className="block text-sm text-gray-700">Additional Message...</label>
                    <textarea
                        {...register("additionalMessage")}
                        placeholder="Write your message"
                        className="w-full px-4 py-2 text-sm border border-gray-300 focus:border-primary rounded-[8px] outline-none"
                    />
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-end gap-4 mt-8">
                    <button
                        type="button"
                        className="px-4 py-2 bg-[#E9E9EA] text-black rounded-[10px] hover:bg-[#eeeeee] transition-colors"
                        onClick={goToPreviousStep}
                    >
                        Back
                    </button>
                    <Button
                        type="submit"
                        className="px-4 py-2 bg-primary text-white rounded-[10px] hover:bg-[#6D28D9] transition-colors"
                    >
                        Next
                    </Button>
                </div>
            </div>
        </form>
    );
};

export default RequirementsStep;