"use client";
import Image from "next/image";
// import { Checkbox } from "@/components/ui/checkbox";

import Logo from "@/utils/Logo";
import usertypeshape from "@/assets/shapes/usertypeshape.png";
import circleshape from "@/assets/shapes/circleshape.png";
import { useState } from "react";
import { useResetPassMutation } from "@/redux/Api/userApi";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import ImageCarousel from "../../../login/ImageCarousel/ImageCarousel";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Page() {
  //   const [email, setEmail] = useState("");
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [Confirmpassword, setConfirmPassword] = useState("");
  const [showConfPassword, setShowConfPassword] = useState(false);
  const [resetPass, { isLoading }] = useResetPassMutation();

  // const [isLoading, setIsLoading] = useState(false);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  const data = { password };

  try {
    if (password !== Confirmpassword) {
      toast.error("Passwords must match.");
      return;
    }

    const res: any = await resetPass(data);

    if (res?.data?.success) {
      toast.success("Password reset successfully. Please Login");
      router.push("/user/auth/login");
    } else {
      toast.error(`${res?.error?.data?.message}. Please try again.`);
    }
  } catch (error) {
    toast.error("Password reset failed.");
    console.error("Reset Error:", error);
  }
};


  return (
    <div className="  relative">
      <Image
        src={usertypeshape}
        width={558}
        height={766}
        alt="imgshape1"
        className="absolute top-0 right-0 lg:w-[558px] w-48 z-[-60]"
      />
      <Image
        src={usertypeshape}
        width={558}
        height={766}
        alt="imgshape2"
        className="absolute left-0 bottom-0 rotate-180 lg:w-[558px] w-48 z-[-60]"
      />
      <Image
        src={circleshape}
        width={173}
        height={167}
        alt="imgshape2"
        className="absolute left-[700px] top-0  lg:flex hidden z-[-60]"
      />

      <div className="absolute top-0 left-0 mt-7 ml-28 lg:block hidden">
        <Logo />
      </div>

      <div className="mx-auto min-h-screen flex justify-center items-center">
        <div className=" lg:flex gap-[188px]  items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
          <div className="lg:max-w-[500px] w-full space-y-8 lg:mt-0 mt-[100px]">
            <div className="text-center">
              <h1 className="text-[40px] font-semibold text-[#1A1A1A] mb-4">
                Reset your password!
              </h1>
              <p className="text-[#666666] text-xl">
                Please enter your email address for reset password.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div>
                <label
                  htmlFor="password"
                  className="block text-lg font-medium text-[#1A1A1A] mb-2"
                >
                  Enter your new Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
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
                <label
                  htmlFor="confirmPass"
                  className="block text-lg font-medium text-[#1A1A1A] mb-2"
                >
                  Enter your confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPass"
                    name="confirmPass"
                    type={showConfPassword ? "text" : "password"}
                    required
                    className="appearance-none relative block w-full px-4 py-4 border border-[#E5E7EB] rounded-xl placeholder-[#666666] text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Confirm Password"
                    // value={password}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-4 flex items-center text-gray-500"
                  >
                    {showConfPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className={`w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-sm text-xl font-medium hover:shadow-lg transition-colors hover:bg-[#5B32D9] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6C3BFF] ${
                  isLoading
                    ? "text-white bg-[#181522] hover:bg-[#181522] "
                    : "text-white bg-primary "
                }`}
                disabled={isLoading}
              >
                {isLoading ? "Resetting password..." : "Reset password"}
              </button>

              {/* <div className="text-center text-lg flex mx-auto justify-center gap-2">
                Don&apos;t have an account?
                <Link
                  href="/usertype"
                  className="flex items-center gap-2 text-primary font-semibold hover:underline"
                >
                  Create Account <FaArrowRightLong />
                </Link>
              </div> */}
            </form>
          </div>
          <div className="relative  lg:block  hidden w-[650px]  ">
            <ImageCarousel />
          </div>
        </div>
      </div>
    </div>
  );
}
