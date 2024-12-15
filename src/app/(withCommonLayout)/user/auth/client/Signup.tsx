"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


export default function Signup({ register, handleNext, getValues }: any) {
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const data = {
      firstName: getValues("firstName"),
      lastName: getValues("lastName"),
      dob: getValues("dob"),
      email: getValues("email"),
      phone: getValues("phone")
    }
    handleNext(data)
  }
  return (
    <div className="flex justify-center items-center min-h-screen z-10 relative">
      <div className="max-w-[870px] w-full px-4 py-8 md:px-6 flex-shrink-0">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-semibold tracking-tight">
            Join Luminor Today as client
          </h1>
          <h2 className="mb-1 text-xl text-gray-600">Sign up as a Client</h2>
          <p className="text-gray-600">Empower Your Journey</p>
        </div>
        <form onSubmit={handleFormSubmit} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">
                First Name <span className="text-gray-500">*</span>
              </Label>
              <Input
                id="firstName"
                {...register("firstName")}
                placeholder="Write First Name"
                
                className="w-full border focus:border-0 outline-none focus:outline-none focus:border-primary rounded-[10px] p-3"
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
                className="w-full border focus:border-0 outline-none focus:outline-none focus:border-primary rounded-[10px] p-3"
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
              className="w-full border focus:border-0 outline-none focus:outline-none focus:border-primary rounded-[10px] p-3"
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
              className="w-full border focus:border-0 outline-none focus:outline-none focus:border-primary rounded-[10px] p-3"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phoneNumber">
              Phone Number <span className="text-gray-500">*</span>
            </Label>
            <Input
              id="phoneNumber"
              type="tel"
              {...register('phone')}
              placeholder="Phone number"
              required
              className="w-full border focus:border-0 outline-none focus:outline-none focus:border-primary rounded-[10px] p-3"
            />
          </div>
          <div className="space-y-6">
            <Button
              type="submit"
              className="w-full rounded-lg bg-[#6938EF] px-8 py-6 text-lg font-medium text-white hover:bg-[#5F32D6]"
            >
              Next
            </Button>
          </div>
        </form>
        <div className="flex items-center justify-center gap-2 pt-8">
          <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#1877F2]  text-[#1877F2]">
            1
          </div>
          <div className="h-[2px] w-12 bg-gray-200" />
          <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-200 text-gray-400">
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
