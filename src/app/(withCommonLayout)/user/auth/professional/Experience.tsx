"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";


export default function Experience({ register, handleNext, handleBack, getValues }: any) {

  const validateFields = () => {
    const values = getValues(); // Get all field values
    const { industry, prevPos1, prevPos2, prevPos3, refName1, refcontact1, refName2, refcontact2 } = values;

    // Check if any required field is empty
    if (
      !industry ||
      !prevPos1 ||
      !prevPos2 ||
      !prevPos3 ||
      !refName1 ||
      !refcontact1 ||
      !refName2 ||
      !refcontact2
    ) {
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
    <div >
      <div className="space-y-2 text-center lg:mt-0 mt-6">
        <h1 className="text-[32px] font-semibold tracking-tight md:text-4xl text-[#1D1F2C]">
          Join Luminor Today
        </h1>
        <h2 className="mb-1 font-medium text-[16px] text-gray-600">Sign up as a professional</h2>

        <p className="text-sm text-muted-foreground text-[#777980]">Empower Your Journey</p>
      </div>
      <div className="flex flex-col space-y-3">

        <div className="space-y-2">
          <Label htmlFor="industry">Industry</Label>
          <select
            id="industry"
            {...register("industry")}
            className="h-12 rounded-xl border cursor-pointer w-full px-3 pr-3"
          >
            <option disabled selected>
              Select Previous Position
            </option>
            {/* <option value="tech">Tech</option> */}
            {/* <option value="marketing">Marketing</option> */}
            {/* <option value="finance">Finance</option> */}
            <option value="education">Education and E-learning</option>
            <option value="ecommerce">E-commerce and Retail</option>
            <option value="realestate">Real Estate</option>
            <option value="entertainment">Entertainment and Media</option>
            <option value="travel">Travel and Tourism</option>
            <option value="automotive">Automotive</option>
            <option value="manufacturing">Manufacturing and Industrial</option>
            <option value="food">Food and Beverage</option>
            <option value="fashion">Fashion and Lifestyle</option>

          </select>
        </div>

        <div className="flex flex-col gap-y-[12px]">
          <Label htmlFor="prevPosistion">
            Previous Positions (at least last 3) *
          </Label>
          <Input
            // id="prevPosistion"
            placeholder="Previous Position 1"
            required
            {...register("prevPos1")}
            className="h-12 rounded-xl border-[#E5E7EB]"
          />
          <Input
            // id="prevPosistion"
            placeholder="Previous Position 2"
            required
            {...register("prevPos2")}
            className="h-12 rounded-xl my-2 border-[#E5E7EB]"
          />
          <Input
            // id="prevPosistion"
            placeholder="Previous Position 3"
            required
            {...register("prevPos3")}
            className="h-12 rounded-xl border-[#E5E7EB]"
          />
        </div>
        <div className="space-y-4">
          <div className="flex lg:flex-row md:flex-row flex-col gap-4">
            <div className="space-y-2 w-full">
              <Label htmlFor="reference-name">Reference name 1</Label>
              <Input
                id="reference-name"

                placeholder="Reference name 1"
                required
                {...register("refName1")}
                className="h-12 rounded-xl border-[#E5E7EB]"
              />
            </div>
            <div className="space-y-2 w-full">
              <Label htmlFor="refcontact1">
                Reference Email/Phone Number
              </Label>
              <Input
                id="refcontact1"
                type="text"
                placeholder="Reference Email/Phone Number"
                {...register("refcontact1")}
                className="h-12 rounded-xl border-[#E5E7EB]"
              />
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex lg:flex-row md:flex-row flex-col gap-4">
            <div className="space-y-2 w-full">
              <Label htmlFor="reference-name">Reference name 2</Label>
              <Input
                id="reference-name"
                placeholder="Reference name 2"
                required
                {...register("refName2")}
                className="h-12 rounded-xl border-[#E5E7EB]"
              />
            </div>
            <div className="space-y-2 w-full">
              <Label htmlFor="refcontact2">
                Reference Email/Phone Number
              </Label>
              <Input
                id="refcontact2"
                type="text"
                placeholder="Reference Email/Phone Number"
                {...register("refcontact2")}
                className="h-12 rounded-xl border-[#E5E7EB]"
              />
            </div>
          </div>
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
