"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import mainlogo from '@/assets/images/mainlogo.png'
import { toast } from "sonner";
import { Controller } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import { useGetClientQuery, useGetProfessionalQuery } from "@/redux/Api/dashboard/userapi";

export default function Signup({ register, handleNext, getValues, control }: any) {

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

  const { data: getclientUser } = useGetClientQuery(undefined)
  const { data: getprofessionalUser } = useGetProfessionalQuery(undefined)

  const professionalUser = getprofessionalUser?.data || {};
  const clientUser = getclientUser?.data || {};
  const allProfessionalUsers = Object.values(professionalUser).flat();
  const allClientUsers = Object.values(clientUser).flat();

  const emailExists = (email: string) =>
    allProfessionalUsers.some((user: any) => user.retireProfessional.email === email) ||
    allClientUsers.some((user: any) => user.client.email === email);

  // Handle Next button click
  const handleButtonClick = () => {
    if (validateFields()) {
      const values = getValues();
      const { email } = values;

      if (emailExists(email)) {
        toast.error("Email already exists. Please use a different email.");
      } else {
        handleNext(); // Only proceed to next step if validation passes and email doesn't exist
      }
    }
  };

  console.log("professional", getprofessionalUser?.data?.retireProfessional);
  console.log("client", getclientUser?.data?.client);

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
      <div className="flex flex-col gap-y-4">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="firstName">
              First Name
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
              Last Name
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
            Date of Birth
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
            Email Address
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
          <Controller
            name="phone"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <PhoneInput
                {...field}
                country={"us"}
                inputProps={{ id: "phoneNumber" }}
                containerClass="!w-full"
                inputClass="!w-full !h-10 !text-base !rounded-[8px] !pl-12 hover:!border-primary focus:!border-primary focus:!ring-0 !outline-none"
                buttonClass="!h-10 !rounded-l-[8px] !border-r-0 hover:!border-primary focus:!border-primary"
                placeholder="Phone number"
              />
            )}
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
    </div>
  );
}