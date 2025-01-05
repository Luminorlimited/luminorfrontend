import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { useState } from "react";
import {  FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";

export default function Password({ register, handleBack }: any) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);


  const [errors, setErrors] = useState<{ password?: string; confirmPassword?: string }>({});

  const validatePassword = () => {
    const newErrors: { password?: string; confirmPassword?: string } = {};

    if (!password) {
      newErrors.password = "Password is required.";
    } else if (!/(?=.*[A-Z])(?=.*\d).{8,}/.test(password)) {
      newErrors.password =
        "Password must include at least 8 characters, one uppercase letter, and one number.";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required.";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);

    // Return true if no errors
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validatePassword()) {
      console.log("Form submitted successfully", { password, confirmPassword });
    }
  };
  
  


  return (
      <div>
        <div className="space-y-2 text-center lg:mt-0 mt-6 mb-7">
          <h1 className="text-[32px] font-semibold tracking-tight md:text-4xl text-[#1D1F2C]">
            Join Luminor Today
          </h1>
          <h2 className="mb-1 font-medium text-[16px] text-gray-600">Sign up as a Client</h2>

          <p className="text-sm text-muted-foreground text-[#777980]">Empower Your Journey</p>
        </div>

        {/* <form className="space-y-6" onSubmit={handleSubmit}> */}


        <div className="flex flex-col gap-y-3">
          <div>
            <label
              htmlFor="password"
              className="block text-[17px] font-medium text-[#1A1A1A] mb-2"
            >
              Password *
            </label>
            <div className="relative">
              <input
                id="password"
                {...register("password")}
                type={showPassword ? "text" : "password"}
                required
                className="appearance-none relative block w-full px-4 py-4 border border-[#E5E7EB] rounded-xl placeholder-[#666666] text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-4 flex items-center text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
          </div>
          {errors.password && (
            <p className="text-sm text-red-500 mt-1">{errors.password}</p>
          )}
          </div>

          <div>
            <label
              htmlFor="confirm-password"
              className="block text-[17px] font-medium text-[#1A1A1A] mb-2"
            >
              Confirm Password *
            </label>
            <div className="relative">
              <input
                id="confirm-password"
                {...register("confirmPassword")}
                type={showPassword ? "text" : "password"}
                required
                className="appearance-none relative block w-full px-4 py-4 border border-[#E5E7EB] rounded-xl placeholder-[#666666] text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-4 flex items-center text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-sm text-red-500 mt-1">{errors.confirmPassword}</p>
          )}
          </div>
       </div>

         
          <div className="py-4">
            <div className="flex items-center space-x-2 pb-2">
              <Checkbox
              id="terms"
              required
                className="border-[#6C3CE1] data-[state=checked]:bg-[#6C3CE1] data-[state=checked]:text-white"
              />
              <label
                htmlFor="terms"
                className="text-sm text-gray-600 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I agree to terms and condition
              </label>
            </div>

            <div className="flex items-center space-x-2">
            <Checkbox
              required
                id="marketing"
                className="border-[#6C3CE1] data-[state=checked]:bg-[#6C3CE1] data-[state=checked]:text-white"
              />
            <label
              
                htmlFor="marketing"
                className="text-sm text-gray-600 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I agree to email marketing
              </label>
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
          onClick={handleSubmit}
          className="h-12 rounded-xl bg-primary text-white hover:bg-[#6D28D9] px-[50px]"
          type="submit"
        >
          Done
        </Button>
      </div>

         
      </div>
   
  );
}
