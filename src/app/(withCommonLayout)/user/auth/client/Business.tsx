"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import mainlogo from '@/assets/images/mainlogo.png'

import { toast } from "sonner";

export default function Business({ register, handleNext, handleBack, getValues }: any) {

  const validateFields = () => {
    const values = getValues(); // Get all field values
    const { businessType, jobTitle } = values; // Destructure the required fields

    // Check if any required field is empty
    if (!businessType || !jobTitle) {
      toast.error("Please fill in all required fields.")
      return false; // Return false if validation fails
    }

    return true; // Return true if all fields are valid
  };

  // Handle "Next" button click
  const handleNextClick = () => {
    if (validateFields()) {
      handleNext(); // Proceed to the next step if validation passes
    }
  };

  return (
    <div>
      <div className="space-y-2 text-center lg:mt-0 mt-6 mb-7">
        <div className="flex gap-3 py-2 items-center justify-center">
          <h1 className="text-[32px] font-semibold tracking-tight md:text-4xl text-[#1D1F2C]">
            Join
          </h1>
          <Image src={mainlogo} width={150} height={200} alt="logo" />
          <h1 className="text-[32px] font-semibold tracking-tight md:text-4xl text-[#1D1F2C]">
            Today
          </h1>
        </div>
        <h2 className="mb-1 font-medium text-[16px] text-gray-600">Sign up as a Client</h2>
        <p className="text-sm text-muted-foreground text-[#777980]">Empower Your Journey</p>
      </div>

      <div className="space-y-4">
        <div className="flex lg:flex-row flex-col md:flex-row gap-4">
          <div className="space-y-2 w-full">
            <Label htmlFor="business-type">
              Business type 
            </Label>
            <Input
              id="business-type"
              placeholder="Business type"
              required
              {...register("businessType")}
              className="h-12 rounded-xl border-[#E5E7EB]"
            />
          </div>
          <div className="space-y-2 w-full">
            <Label htmlFor="company-name">Company Name (Optional)</Label>
            <Input
              id="company-name"
              placeholder="Company Name"
              {...register("companyName")}
              className="h-12 rounded-xl border-[#E5E7EB]"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="job-title">
            Job Title 
          </Label>
          <Input
            id="job-title"
            placeholder="Job title"
            required
            {...register("jobTitle")}
            className="h-12 rounded-xl border-[#E5E7EB]"
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
          onClick={handleNextClick}
          className="h-12 rounded-xl bg-primary text-white hover:bg-[#6D28D9] px-[50px]"
          type="button"
        >
          Next
        </Button>
      </div>

    </div>
  );
}
