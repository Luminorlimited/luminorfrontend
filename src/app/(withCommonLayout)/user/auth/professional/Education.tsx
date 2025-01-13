"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { AiOutlinePlus, AiOutlineUpload } from "react-icons/ai";
import { toast } from "sonner";



export default function Education({ register, handleNext, setValue, handleBack }: any) {
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



  const [tags, setTags] = useState<string[]>([]); // State to store tags
  const [inputValue, setInputValue] = useState(""); // State for input value

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      if (!tags.includes(inputValue.trim())) {
        const updatedTags = [...tags, inputValue.trim()];
        setTags(updatedTags); // Update state
        setValue("skills", updatedTags); // Update form value
      }
      setInputValue(""); // Clear input
    }
  };

  // Remove a skill
  const removeTag = (tag: string) => {
    const updatedTags = tags.filter((t) => t !== tag);
    setTags(updatedTags); // Update state
    setValue("skills", updatedTags); // Update form value
  };


  const validateFields = () => {
    const requiredFields = [
      { field: "edubackground", label: "Educational Background" },
      { field: "skills", label: "Technical and Soft Skills" },
      { field: "eduqualification", label: "Educational Quality" },
    ];

    for (const { field, label } of requiredFields) {
      const value = (document.getElementsByName(field)[0] as HTMLInputElement)?.value;
      if (!value || (field === "skills" && tags.length === 0)) {
        toast.error(`Please fill in the ${label} field.`)
        return false;
      }
    }

    return true;
  };

  const handleNextStep = () => {
    if (validateFields()) {
      handleNext();
    }
  };

  return (

    <div >
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
            <select
                id="edu"
                {...register("edubackground")}
                required
                className="h-12 rounded-xl border-[#E5E7EB] w-full px-3 border"
            >
              <option value="" disabled selected>
                Select your educational background
              </option>
              <option value="high_school">High School Diploma or Equivalent</option>
              <option value="vocational_certificate">Vocational Certificate or Credential</option>
              <option value="some_college">Some College</option>
              <option value="associates_degree">Associate&apos;s Degree</option>
              <option value="bachelors_degree">Bachelor&apos;s Degree</option>
              <option value="masters_degree">Master&apos;s Degree</option>
              <option value="phd">PhD</option>
              <option value="md_od">MD, OD or Related</option>
              <option value="dds_dmd">DDS, DMD or Related</option>
              <option value="jd">JD</option>
              <option value="other_professional_degree">Other Professional Degree</option>
            </select>
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
          <div className="flex flex-wrap items-center gap-2 p-2 border rounded-xl border-[#E5E7EB]">
            {/* Render Tags */}
            {tags.map((tag, index) => (
                <div
                    key={index}
                    className="flex items-center bg-blue-800 text-white px-3 py-1 rounded-[12px]"
                >
                  {tag}
                  <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-2 text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                </div>
            ))}
            {/* Input Field */}
            <input
                id="techskill"
                placeholder="Enter skills and press Enter"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
              className="h-10 border-none outline-none flex-grow"
            />
          </div>

          {/* Hidden Input to Register Skills */}
          <input
            type="hidden"
            {...register("skills")} // Register skills as a form field
            value={JSON.stringify(tags)} // Store as a stringified array
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
      <div className="py-2 flex justify-between">
        <Button
          onClick={handleBack}
          className="h-12 rounded-xl bg-gray-200 text-black hover:bg-gray-300 border  px-[50px]"
          type="button"
        >
          Back
        </Button>
        <Button
          onClick={handleNextStep}
          className="h-12 rounded-xl bg-primary text-white hover:bg-[#6D28D9] px-[50px]"
          type="button"
        >
          Next
        </Button>
      </div>
    
    </div>

  );
}
