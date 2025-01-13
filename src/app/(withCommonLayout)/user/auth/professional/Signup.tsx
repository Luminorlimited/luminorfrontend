"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function Signup({ register, handleNext, getValues }: any) {
  // Validation function to check if all required fields are filled
const validateFields = () => {
  const values = getValues();
  const { firstName, lastName, dob, email, phone } = values;

  // Regular expression for validating email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Check if any required field is empty
  if (!firstName || !lastName || !dob || !email || !phone) {
    toast.error("Please fill in all required fields.")
    return false; 
  }

  // Validate email format
  if (!emailRegex.test(email)) {
    toast.error("Please enter a valid email address.")
    return false; 
  }

  return true; // Return true if all fields are filled and email is valid
};

  // Handle Next button click
  const handleButtonClick = () => {
    if (validateFields()) {
      handleNext(); // Only proceed to next step if validation passes
    }
  };

  return (
    <div>
      <div className="mb-8 text-center">
        <h1 className="text-[32px] font-semibold tracking-tight md:text-4xl text-[#1D1F2C]">
          Join Luminor Today
        </h1>
        <h2 className="mb-1 font-medium text-[16px] text-gray-600">
          Sign up as a professional
        </h2>
        <p className="text-sm text-muted-foreground text-[#777980]">
          Empower Your Journey
        </p>
      </div>
      <div className="flex flex-col gap-y-4">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="firstName">
              First Name <span className="text-gray-500">*</span>
            </Label>
            <Input
              id="firstName"
              {...register("firstName", { required: true })}
              placeholder="First Name"
              className="rounded-[8px] hover:border hover:outline-none outline-none  hover:border-primary focus:ring-0"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">
              Last Name <span className="text-gray-500">*</span>
            </Label>
            <Input
              id="lastName"
              {...register("lastName", { required: true })}
              placeholder="Last Name"
              className="rounded-[8px] hover:border hover:outline-none outline-none  hover:border-primary focus:ring-0"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="dateOfBirth">
            Date of Birth <span className="text-gray-500">*</span>
          </Label>
          <Input
            id="dateOfBirth"
            {...register("dob", { required: true })}
            type="date"
            placeholder="Date of birth"
            className="rounded-[8px] hover:border hover:outline-none outline-none  hover:border-primary focus:ring-0"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">
            Email Address <span className="text-gray-500">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Email address"
            {...register("email", { required: true })}
            className="rounded-[8px] hover:border hover:outline-none outline-none  hover:border-primary focus:ring-0"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phoneNumber">
            Phone Number <span className="text-gray-500">*</span>
          </Label>
          <Input
            id="phoneNumber"
            type="number"
            {...register("phone", { required: true })}
            placeholder="Phone number"
            className="rounded-[8px] hover:border hover:outline-none outline-none  hover:border-primary focus:ring-0"
          />
        </div>
        <div className="space-y-6 py-3">
          <Button
            onClick={handleButtonClick} // Custom validation before moving to next step
            type="button"
            className="w-full rounded-[10px] bg-primary px-8 py-6 text-lg font-medium text-white hover:bg-[#5F32D6]"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
