"use client"

import { AiOutlinePaperClip } from "react-icons/ai";
import React, { FC } from 'react'
import { Plus } from 'lucide-react'
import Button from "../common/Button";
import { useFieldArray, useForm } from "react-hook-form";
import Image from "next/image";

interface FileUpload {
    id: number
    caption: string
    file?: File
    preview?: string
}

interface FormData {
    fileUploads: FileUpload[]
    message: string
}

interface stepsProps {
    goToPreviousStep: () => void,
    goToNextStep: () => void,
}

const RequirementsStep: FC<stepsProps> = ({ goToPreviousStep, goToNextStep }) => {
    const { register, control, handleSubmit, watch, setValue } = useForm<FormData>({
        defaultValues: {
            fileUploads: [{ id: 1, caption: '' }],
            message: ''
        }
    });

    const { fields, append } = useFieldArray({
        control,
        name: "fileUploads"
    });

    const watchFileUploads = watch("fileUploads");

    const addMoreFiles = () => {
        append({ id: fields.length + 1, caption: '' });
    }

    const onSubmit = (data: FormData) => {
        console.log('Submitted:', data);
        goToNextStep()
        // Here you can handle the form submission
    }

    const handleFileChange = (index: number, file: File) => {
        setValue(`fileUploads.${index}.file`, file);

        const reader = new FileReader();
        reader.onloadend = () => {
            setValue(`fileUploads.${index}.preview`, reader.result as string);
        }
        reader.readAsDataURL(file);
    }

    return (
        <div className="mx-auto lg:p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                    <h2 className="text-xl font-semibold mb-4">Add further Requirements</h2>
                    <p className="text-sm text-gray-600 mb-4">
                        Please upload the relevant documents for review (if applicable).
                    </p>

                    <div className="space-y-4">
                        {fields.map((field, index) => (
                            <div key={field.id} className="space-y-2">
                                <input
                                    type="text"
                                    placeholder="Write caption"
                                    {...register(`fileUploads.${index}.caption`)}
                                    className="w-full px-4 py-2 border border-gray-300 focus:border-primary rounded-[8px] outline-none"
                                />
                                {watchFileUploads[index].preview && (
                                    <Image
                                        src={watchFileUploads[index].preview || "/placeholder.svg"}
                                        alt={`Preview ${index + 1}`}
                                        className="mt-2 max-w-full h-auto max-h-40 object-contain"
                                    />
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center gap-3 mt-4">
                        <label className="inline-flex gap-2 items-center px-4 py-2 bg-primary text-white rounded-[20px] hover:bg-[#6D28D9] transition-colors cursor-pointer">
                            Upload
                            <AiOutlinePaperClip
                                className="text-[15px] bg-white rounded-full text-[#25314C] transition-all cursor-pointer w-7 h-7 p-1"
                            />
                            <input
                                type="file"
                                className="hidden"
                                onChange={(e) => {
                                    const file = e.target.files?.[0]
                                    if (file) {
                                        handleFileChange(fields.length - 1, file)
                                    }
                                }}
                            />
                        </label>
                        <button
                            type="button"
                            onClick={addMoreFiles}
                            className="inline-flex gap-2 rounded-[20px] items-center px-3 py-1.5 bg-[#E9E9EA] text-[#030304] hover:bg-gray-200 transition-colors text-sm"
                        >
                            Add more
                            <Plus
                                className="text-[15px] bg-white rounded-full text-[#25314C] transition-all cursor-pointer w-7 h-7 p-1"
                            />
                        </button>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm text-gray-700">
                        Additional Message...
                    </label>
                    <textarea
                        {...register("message")}
                        placeholder="Write your Message"
                        className="w-full px-4 py-2 text-sm border border-gray-300 focus:border-primary rounded-[8px] outline-none"
                    />
                </div>

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
            </form>
        </div>
    )
}

export default RequirementsStep

