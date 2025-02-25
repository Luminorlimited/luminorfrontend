"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useState } from "react";
import { AiOutlinePlus, AiOutlineUpload } from "react-icons/ai";
import { toast } from "sonner";
import mainlogo from '@/assets/images/mainlogo.png'



export default function Education({ register, handleNext, setValue, handleBack, getValues }: any) {
  const [isDragging, setIsDragging] = useState(false);
  const [workSample, setWorkSample] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);



  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const removeFile = () => {
    setWorkSample(null);
    setPreviewUrl(null);
    setValue("workSample", null);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };







  const validateFields = () => {
 
    const values = getValues();
    const { edubackground, technicalSkill, eduqualification } = values;

    if (!edubackground) {
      toast.error(`Please fill  Educational Background fields.`)
      return false; 
    }
    if (!technicalSkill) {
      toast.error(`Please fill  Technical fields.`)
      return false; 
    }
    if (!eduqualification) {
      toast.error(`Please fill  Educational qualification fields.`)
      return false; 
    }

    const skills = technicalSkill
      .split(",")
    setValue("technicalSkill", skills);
    console.log(skills);


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
        <div className="flex gap-3 py-2 items-center justify-center">
          <h1 className="text-[32px] font-semibold tracking-tight md:text-4xl text-[#1D1F2C]">
            Join
          </h1>
          <Image src={mainlogo} width={150} height={200} alt="logo" />
          <h1 className="text-[32px] font-semibold tracking-tight md:text-4xl text-[#1D1F2C]">
            Today
          </h1>
        </div>
        <h2 className="mb-1 font-medium text-[16px] text-gray-600">Sign up as a professional</h2>

        <p className="text-sm text-muted-foreground text-[#777980]">Empower Your Journey</p>
      </div>
      <div className="pt-8 flex flex-col gap-y-3">
        <div className="flex  lg:flex-row md:flex-row flex-col gap-4">
          <div className="space-y-2 w-full">
            <Label htmlFor="edu">
              Educational Background
            </Label>
            <select
              id="edu"
              {...register("edubackground")}
              required
              className="h-12 rounded-xl border-[#E5E7EB] w-full px-3 border"
              defaultValue={''}
            >
              <option value="" disabled >
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
            Technical and soft skills
          </Label><br />
          <input
            id="techskill"
            placeholder="Enter skills and press Enter"
            {...register("technicalSkill")}
            className="h-12 rounded-xl border-[#E5E7EB] w-full border px-3"
          />

        </div>
        <div className="space-y-2">
          <Label htmlFor="linkedin">LinkedIn Profile (Optional, Provide valid Linkedin url)</Label>
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
                Img (Preferred), jpeg, jpg, png
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
            accept=".png,.jpeg,.jpg"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                // Create a preview URL
                const filePreviewUrl = URL.createObjectURL(file);

                // Update states
                setWorkSample(file);
                setPreviewUrl(filePreviewUrl);

                const fileName = file.name;
                const filePath = file.webkitRelativePath || file.name;
                const fileType = file.type;

                if (!fileName || !filePath || !fileType) {
                  console.error("Missing required file properties");
                } else {

                  setValue("workSample", { fileName, filePath, fileType });
                }
              }
            }}


          />
        </div>
        <div>
          {workSample && previewUrl && (
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-700">Selected file: {workSample.name}</p>
              <Image
                src={previewUrl}
                width={150}
                height={100}
                alt="Preview"
                className="mt-2 max-w-full h-auto rounded-lg border border-gray-300"
              />
              <button
                onClick={removeFile}
                className="mt-2 px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600"
              >
                Remove File
              </button>
            </div>
          )}
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
