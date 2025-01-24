"use client"

import { AiOutlinePaperClip } from "react-icons/ai";
import React, { useState } from 'react'
import { Plus } from 'lucide-react'
import Button from "../common/Button";
import { useFieldArray, useForm } from "react-hook-form";
import Image from "next/image";

interface FileUpload {
    id?: number;
    file?: File;
    preview?: string;
}

interface FormData {
    clientRequirement: FileUpload[];
    captions: string[]; // Captions as a string array
    additionalMessage: string;
}

interface StepsProps {
    goToPreviousStep: () => void;
    goToNextStep: () => void;
    setRequirementdata: any;
}

const RequirementsStep: React.FC<StepsProps> = ({ goToPreviousStep, goToNextStep, setRequirementdata }) => {
    const { register, control, handleSubmit, watch, setValue } = useForm<FormData>({
        defaultValues: {
            clientRequirement: [],
            captions: [""], // Start with one empty caption
            additionalMessage: "",
        },
    });

    // Field array setup for client requirements (file uploads)
    const {  append: appendFile } = useFieldArray({
        control,
        name: "clientRequirement",
    });

    // Watchers to track form data changes
    const watchFileUploads = watch("clientRequirement");
    const watchCaptions = watch("captions");

    // Local state to track selected images
    const [selectedImages, setSelectedImages] = useState<File[]>([]);

    // Handler for image file input change
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        const validImages = files.filter((file) => file.type.startsWith("image/"));

        // Check for invalid files
        if (validImages.length !== files.length) {
            alert("Please select only valid image files.");
            return;
        }
        console.log(validImages);
        // Set selected images in state and append them to the form
        setSelectedImages(validImages);
        validImages.forEach((file) =>
            appendFile({
                file,
            })
        );
    };

    // Function to add a new empty caption
    const addCaption = () => {
        const currentCaptions = watchCaptions || [];
        setValue("captions", [...currentCaptions, ""]); // Add a new empty caption
    };

    // Function to handle changes to captions
    const handleCaptionChange = (index: number, value: string) => {
        const updatedCaptions = [...(watchCaptions || [])];
        updatedCaptions[index] = value; // Update caption at the specified index
        setValue("captions", updatedCaptions);
    };

    // Form submission handler
    const onSubmit = (data: FormData) => {
        console.log("Submitted Data:", data);
        console.log(selectedImages, "check sselected image from onsubmit formdata")
        const formData = new FormData();

        formData.append("captions", (JSON.stringify(data.captions)));
        formData.append("additionalMessage", data.additionalMessage);

        // Set requirement data and move to the next step
        setRequirementdata(data);
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
                            onChange={handleImageChange}
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
                    {watchCaptions?.map((caption, index) => (
                        <div key={index} className="space-y-2">
                            <input
                                type="text"
                                value={caption} // Use controlled input for captions
                                onChange={(e) => handleCaptionChange(index, e.target.value)}
                                placeholder="Write caption"
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
                        className="px-4 py-2  rounded-[10px] hover:bg-[#6D28D9] transition-colors"
                    >
                        Next
                    </Button>
                </div>
            </div>
        </form>
    );
};

export default RequirementsStep;