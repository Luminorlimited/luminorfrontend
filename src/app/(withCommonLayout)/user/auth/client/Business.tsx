"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";



export default function Business({register, handleNext}: any) {

  
  return (
      <div>
        <div className="space-y-2 text-center lg:mt-0 mt-6 mb-7">
          <h1 className="text-[32px] font-semibold tracking-tight md:text-4xl text-[#1D1F2C]">
            Join Luminor Today
          </h1>
          <h2 className="mb-1 font-medium text-[16px] text-gray-600">Sign up as a Client</h2>

          <p className="text-sm text-muted-foreground text-[#777980]">Empower Your Journey</p>
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
     
      </div>
   
  );
}
