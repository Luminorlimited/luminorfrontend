"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { AiOutlinePlus, AiOutlineUpload } from "react-icons/ai";

import { FaCheck } from "react-icons/fa";


export default function Education({ register, handleNext, setValue }: any) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen z-10 relative">
      <div className="max-w-[870px] w-full px-4 py-8 md:px-6 flex-shrink-0">
        <div className="space-y-2 text-center lg:mt-0 mt-6">
          <h1 className="text-[32px] font-semibold tracking-tight md:text-4xl text-[#1D1F2C]">
            Join Luminor Today
          </h1>
          <h2 className="mb-1 font-medium text-[16px] text-gray-600">Sign up as a professional</h2>

          <p className="text-sm text-muted-foreground text-[#777980]">Empower Your Journey</p>
        </div>
        {/* <form className="mt-8 space-y-6" onSubmit={handleFormSubmit}> */}
        <div className="pt-8 flex flex-col gap-y-3">
          <div className="flex  lg:flex-row md:flex-row flex-col gap-4">
            <div className="space-y-2 w-full">
              <Label htmlFor="edu">
                Educational Background <span className="text-red-500">*</span>
              </Label>
              <Input
                id="edu"
                placeholder="Educational Background"
                required
                {...register("edubackground")}
                className="h-12 rounded-xl border-[#E5E7EB]"
              />
            </div>
            <div className="space-y-2 w-full">
              <Label htmlFor="eduquality">
                Relevant professional qualification
              </Label>
              <Input
                id="eduquality"
                placeholder="Relevant professional qualification"
                {...register("eduqualification")}
                className="h-12 rounded-xl border-[#E5E7EB]"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="techskill">
              Technical and soft skills<span className="text-red-500">*</span>
            </Label>
            <Input
              id="techskill"
              placeholder="Technical and soft skills"
              required
              {...register("skills")}
              className="h-12 rounded-xl border-[#E5E7EB]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="linkedin">LinkedIn Profile (Optional)</Label>
            <Input
              id="linkedin"
              {...register("linkedIn")}
              placeholder="Share LinkedIn profile link"
              className="h-12 rounded-xl border-[#E5E7EB]"
            />
          </div>

          <div
            className={`relative p-8 rounded-[15px] border-2 border-dashed hover:border-slate-700 transition-all ${isDragging ? "border-gray-400 rounded-xl bg-gray-50" : "border-gray-200"
              } transition-colors duration-200`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center gap-4">
              <div className="w-8 h-8 rounded border border-gray-200 flex items-center justify-center">
                <AiOutlinePlus className="w-4 h-4 text-gray-400" />
              </div>

              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-900">
                  Work Sample (Optional)
                </h3>
                <p className="mt-1 text-sm text-gray-500">Upload or drag and drop</p>
                <p className="mt-1 text-sm text-gray-500">
                  PDF (Preferred), Docx, Doc, RTF, Txt
                </p>
              </div>

              <button className="mt-2 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                <AiOutlineUpload className="w-4 h-4" />
                Upload
              </button>
            </div>

            <input
              type="file"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              accept=".pdf,.docx,.doc,.rtf,.txt"
              {...register("file", { required: true })} // Add validation rules
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  // Extract necessary file properties
                  const fileName = file.name;
                  const filePath = file.webkitRelativePath || file.name; // Fallback to name if relative path is unavailable
                  const fileType = file.type;

                  // Check if required fields are present
                  if (!fileName || !filePath || !fileType) {
                    console.error("Missing required file properties");
                  } else {
                    console.log("File Selected:", { fileName, filePath, fileType });

                    // Process the file (e.g., update state or form data)
                    // Example: Save file details in state
                    setValue("fileDetails", { fileName, filePath, fileType });
                  }
                }
              }}
            />
          </div>

        </div>
        <div className="py-2">
          <Button
            onClick={handleNext}
            className="h-12 w-full rounded-xl bg-[#7C3AED] text-white hover:bg-[#6D28D9]"
            type="button"
          >
            Next
          </Button>

        </div>
        {/* </form> */}
        <div className="flex items-center justify-center gap-2 pt-8">
          <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 text-white bg-[#34DC48] border-[#34DC48]">
            <FaCheck />
          </div>
          <div className="h-[2px] w-12 bg-[#1877F2]" />
          <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 text-white bg-[#34DC48] border-[#34DC48]">
            <FaCheck />
          </div>
          <div className="h-[2px] w-12 bg-[#1877F2]" />
          <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#1877F2] text-[#1877F2]">
            3
          </div>
          <div className="h-[2px] w-12 bg-gray-200" />
          <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-200 text-gray-400">
            4
          </div>
        </div>
      </div>
    </div>
  );
}
