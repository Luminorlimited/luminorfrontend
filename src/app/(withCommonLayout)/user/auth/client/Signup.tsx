"use client";
import Image from "next/image";
import Logo from "@/utils/Logo";
import usertypeshape from "@/assets/shapes/usertypeshape.png";
import circleshape from "@/assets/shapes/circleshape.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import Business from "./Business";
import Password from "./Password";
import SuccessPage from "./Success";

export default function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    email: "",
    phoneNumber: "",
  });

  const [step, setStep] = useState(1); // Step control: 1 = Signup, 2 = Business, 3 = Password

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    handleNext();
  };

  return (
    <div className="relative">
      {/* Background Shapes */}
      <Image
        src={usertypeshape}
        width={558}
        height={766}
        alt="imgshape1"
        className="absolute top-0 right-0 lg:w-[558px] w-48"
      />
      <Image
        src={usertypeshape}
        width={558}
        height={766}
        alt="imgshape2"
        className="absolute left-0 bottom-0 rotate-180 lg:w-[558px] w-48"
      />
      <Image
        src={circleshape}
        width={173}
        height={167}
        alt="imgshape2"
        className="absolute left-[700px] top-0 lg:flex hidden"
      />

      {/* Logo */}
      <div className="absolute top-0 left-0 mt-7 ml-28">
        <Logo />
      </div>

      {/* Step 1: Signup Form */}
      {step === 1 && (
        <div className="flex justify-center items-center min-h-screen">
          <div className="max-w-[870px] w-full px-4 py-8 md:px-6 flex-shrink-0">
            <div className="mb-8 text-center">
              <h1 className="mb-2 text-4xl font-semibold tracking-tight">
                Join Luminor Today as client
              </h1>
              <h2 className="mb-1 text-xl text-gray-600">
                Sign up as a Client
              </h2>
              <p className="text-gray-600">Empower Your Journey</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">
                    First Name <span className="text-gray-500">*</span>
                  </Label>
                  <Input
                    id="firstName"
                    placeholder="First Name"
                    required
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    className="rounded-lg border-gray-200"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">
                    Last Name <span className="text-gray-500">*</span>
                  </Label>
                  <Input
                    id="lastName"
                    placeholder="Last Name"
                    required
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    className="rounded-lg border-gray-200"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">
                  Date of Birth <span className="text-gray-500">*</span>
                </Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  placeholder="Date of birth"
                  required
                  value={formData.dateOfBirth}
                  onChange={(e) =>
                    setFormData({ ...formData, dateOfBirth: e.target.value })
                  }
                  className="rounded-lg border-gray-200"
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
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="rounded-lg border-gray-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">
                  Phone Number <span className="text-gray-500">*</span>
                </Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  placeholder="Phone number"
                  required
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, phoneNumber: e.target.value })
                  }
                  className="rounded-lg border-gray-200"
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
              <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#6938EF] bg-[#6938EF] text-white">
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
      )}

      {/* Step 2: Business Component */}
      {step === 2 && (
        <Business handleNext={handleNext} handleSubmit={handleSubmit} />
      )}

      {/* Step 3: Password Component */}
      {step === 3 && (
        <Password handleNext={handleNext} handleSubmit={handleSubmit} />
      )}
      {step === 4 && (
        <SuccessPage  />
      )}
    </div>
  );
}
