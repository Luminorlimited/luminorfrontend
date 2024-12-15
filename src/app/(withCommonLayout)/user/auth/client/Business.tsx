"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { FaCheck } from "react-icons/fa";


export default function Business({register, handleNext}: any) {

  
  return (
    <div className="flex justify-center items-center min-h-screen z-10 relative">
      <div className="max-w-[870px] w-full px-4 py-8 md:px-6 flex-shrink-0">
        <div className="space-y-2 text-center lg:mt-0 mt-6">
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Join Luminor Today
          </h1>
          <h2 className="text-xl text-muted-foreground md:text-2xl">
            Sign up as a Client
          </h2>
          <p className="text-lg text-muted-foreground">Empower Your Journey</p>
        </div>
        {/* <form className="mt-8 space-y-6" onSubmit={handleFormSubmit}> */}
          <div className="space-y-4">
            <div className="flex lg:flex-row flex-col md:flex-row gap-4">
              <div className="space-y-2 w-full">
                <Label htmlFor="business-type">
                  Business type <span className="text-red-500">*</span>
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
                Job Title <span className="text-red-500">*</span>
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
              <Label htmlFor="linkedin">LinkedIn Profile (Optional)</Label>
              <Input
                id="linkedin"
                {...register("linkedIn")}
                placeholder="Share LinkedIn profile link"
                className="h-12 rounded-xl border-[#E5E7EB]"
              />
            </div>
          </div>
        <div className="py-2">
          <Button
            className="h-12 w-full rounded-xl bg-[#7C3AED] text-white hover:bg-[#6D28D9]"
            type="button"
            onClick={handleNext}
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
          <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#1877F2] text-[#1877F2]">
            2
          </div>
          <div className="h-[2px] w-12 bg-gray-200" />
          <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-200 text-gray-400">
            3
          </div>
        </div>
      </div>
    </div>
  );
}
