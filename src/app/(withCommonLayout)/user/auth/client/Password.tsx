import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { useState } from "react";
import { FaCheck, FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";

export default function Password({ register }: any) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  console.log(passwordError, setConfirmPassword, confirmPassword, setPasswordError)
  
  


  return (
    <div className="flex justify-center items-center min-h-screen z-10 relative">
      <div className="max-w-[870px] w-full px-4 py-8 md:px-6 flex-shrink-0">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">
            Join Luminor Today
          </h1>
          <p className="text-gray-500">Sign up as a Client</p>
          <p className="text-gray-500">Empower Your Journey</p>
        </div>

        {/* <form className="space-y-6" onSubmit={handleSubmit}> */}


          <div>
            <label htmlFor="password" className="block text-lg font-medium text-[#1A1A1A] mb-2">
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
          </div>
          <div>
            <label htmlFor="confirm-password" className="block text-lg font-medium text-[#1A1A1A] mb-2">
             Confirm Password *
            </label>
            <div className="relative">
              <input
                id="confirm-password"
                {...register("confirmPassword")}
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
          </div>

         
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
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

        <div className="py-2">
          <Button
            type="submit"
            className="w-28 bg-[#6C3CE1] hover:bg-[#5B32C2] text-white"
          >
            Submit
          </Button>
          </div>

          <div className="flex items-center justify-center gap-2 pt-8">
            <div className="flex h-8 w-8 items-center justify-center rounded-full border-2   text-white bg-[#34DC48] border-[#34DC48]">
              <FaCheck />
            </div>
            <div className="h-[2px] w-12 bg-[#1877F2]" />
            <div className="flex h-8 w-8 items-center justify-center rounded-full border-2   text-white bg-[#34DC48] border-[#34DC48]">
              <FaCheck />
            </div>
            <div className="h-[2px] w-12 bg-[#1877F2]" />

            <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#1877F2]  text-[#1877F2]">
              3
            </div>
          </div>
        {/* </form> */}
      </div>
    </div>
  );
}
