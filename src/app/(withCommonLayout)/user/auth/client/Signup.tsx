"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";


export default function Signup({ register, handleNext, getValues }: any) {

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
      <div >
        

        <div className="space-y-2 text-center lg:mt-0 mt-6 mb-7">
          <h1 className="text-[32px] font-semibold tracking-tight md:text-4xl text-[#1D1F2C]">
            Join Luminor Today
          </h1>
          <h2 className="mb-1 font-medium text-[16px] text-gray-600">Sign up as a Client</h2>

          <p className="text-sm text-muted-foreground text-[#777980]">Empower Your Journey</p>
        </div>
        {/* <form onSubmit={handleFormSubmit} className="space-y-6"> */}
        <div className="flex flex-col gap-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">
                First Name <span className="text-gray-500">*</span>
              </Label>
              <Input
                id="firstName"
                {...register("firstName")}
                placeholder="Write First Name"
                required
                className="w-full border focus:border-0 outline-none focus:outline-none py-[21px] focus:border-primary rounded-[10px] p-3"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">
                Last Name <span className="text-gray-500">*</span>
              </Label>
              <Input
                id="lastName"
                {...register("lastName")}
                placeholder="Last Name"
                required
                className="w-full border focus:border-0 outline-none focus:outline-none py-[21px] focus:border-primary rounded-[10px] p-3"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="dateOfBirth">
              Date of Birth <span className="text-gray-500">*</span>
            </Label>
            <Input
              id="dateOfBirth"
              {...register("dob")}
              type="date"
              placeholder="Date of birth"
              required
              className="w-full border focus:border-0 outline-none focus:outline-none py-[21px] focus:border-primary rounded-[10px] p-3"
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
              {...register('email')}
              required
              className="w-full border focus:border-0 outline-none focus:outline-none py-[21px] focus:border-primary rounded-[10px] p-3"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phoneNumber">
              Phone Number <span className="text-gray-500">*</span>
            </Label>
            <Input
              id="phoneNumber"
              type="number"
              {...register('phone')}
              placeholder="Phone number"
              required
              className="w-full border focus:border-0 outline-none focus:outline-none py-[21px] focus:border-primary rounded-[10px] p-3"
            />
          </div>
          <div className="py-6">
            <Button
              type="button"
            onClick={handleButtonClick}
              className="w-full rounded-[12px] bg-[#6938EF] px-8 py-6 text-lg font-medium text-white hover:bg-[#5F32D6]"
            >
              Next
            </Button>
          </div>
        </div>

        {/* </form> */}
      
      </div>
   
  );
}
