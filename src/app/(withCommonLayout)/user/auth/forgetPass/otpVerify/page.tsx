"use client";
import Image from "next/image";
// import { Checkbox } from "@/components/ui/checkbox";

import Logo from "@/utils/Logo";
import usertypeshape from "@/assets/shapes/usertypeshape.png";
import circleshape from "@/assets/shapes/circleshape.png";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import ImageCarousel from "../../login/ImageCarousel/ImageCarousel";
import { useVerifyOtpMutation } from "@/redux/Api/userApi";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/ReduxFunction";

export default function Page() {
  const [otp, setOtp] = useState("");
  const router = useRouter();
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();

  // const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = localStorage.getItem("email");

    try {
      // setIsLoading(true); // Set loading state to true
      const payload = {
        email: email,
        otp: otp,
      };
      const res: any = await verifyOtp(payload);
      if (res?.data?.success) {
        // console.log("data", res);
        // localStorage.setItem("email", otp);
        toast.success(res?.data?.message);
        dispatch(
          setUser({
            token: res?.data?.data,
            user: res?.data?.user, // Make sure this is a valid UserInterface object
          })
        );
        router.push("/user/auth/forgetPass/otpVerify/resetPassword");

        // router.push("/user/verification");
      } else {
        // // console.log();
        toast.error(`${res?.error?.data?.message}. Please Login`);
      }
    } catch (error) {
      toast.error("Login Failed");
      console.error("Login Error:", error);
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
                Verify your OTP
              </h1>
              <p className="text-[#666666] text-xl">
                Please enter your OTP to reset your password
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div className="space-y-6">
                <label
                  htmlFor="otp"
                  className="block text-lg font-medium text-[#1A1A1A] mb-2"
                >
                  Enter your OTP
                </label>
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  required
                  className="appearance-none relative block w-full px-4 py-4 border border-[#E5E7EB] rounded-xl placeholder-[#666666] text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
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
                {isLoading ? "Verifyin OTP..." : "Verify OTP"}
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
