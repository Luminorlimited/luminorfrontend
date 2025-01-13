"use client";
import Image from "next/image";
import Logo from "@/utils/Logo";
import usertypeshape from "@/assets/shapes/usertypeshape.png";
import circleshape from "@/assets/shapes/circleshape.png";
import CheckBox from "@/components/common/checkbox/CheckBox";
import ImageCarousel from "../auth/login/ImageCarousel/ImageCarousel";
import { useState } from "react";
// import { setVerify } from "@/redux/ReduxFunction";
import { useRouter } from "next/navigation";
import { useVerifyUserMutation } from "@/redux/api/userApi";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/ReduxFunction";
import Cookies from 'js-cookie';
import { toast } from "sonner";

export default function Page() {
  const [otp, setOtp] = useState("")

  const [setVerify,  { isLoading }] = useVerifyUserMutation()
  const dispatch = useDispatch();

  
 

  const router = useRouter()
  

  // Inside verify.ts after OTP verification
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const email = localStorage.getItem("email");
      const data = { email, otp };

      const res = await setVerify(data).unwrap(); // Verify OTP API call
      console.log(res);

      if (res) {
        toast.success("Verification Complete")
        const { role } = res.data.user; // Destructure role from the response
        const accessToken = res.data.accessToken;

        // Dispatch the correctly structured object
        dispatch(
          setUser({
            user: {
              email: email || "", role,
              id: ""
            }, // Provide a fallback for email
            token: accessToken,
          })
        );
        Cookies.set('token', res.data.accessToken, {
          expires: 7, // Token will expire in 7 days
          secure: true, // Use secure cookies for HTTPS
          sameSite: 'Strict', // Prevent cross-site attacks
          path: '/', // Cookie is available across the entire site
        });

        router.push("/");
      } else {
        toast.error(res.message || "Verification failed")
      }
    } catch (error: any) {
      // Handle API errors or rejected promises
      toast.error("Error Validation. Check your mail.")
      console.error(error);
    }
  };

  return (
    <div className="  relative">
      <Image
        src={usertypeshape}
        width={558}
        height={766}
        alt="imgshape1"
        className="absolute top-0 right-0 lg:w-[558px] w-48 z-[-48]"
      />
      <Image
        src={usertypeshape}
        width={558}
        height={766}
        alt="imgshape2"
        className="absolute left-0 bottom-0 rotate-180 lg:w-[558px] w-48 z-[-48]"
      />
      <Image
        src={circleshape}
        width={173}
        height={167}
        alt="imgshape2"
        className="absolute left-[700px] top-0  lg:flex hidden z-[-48]"
      />

      <div className="absolute top-0 left-0 mt-7 ml-28">
        <Logo />
      </div>

      <div className="mx-auto min-h-screen z-30">
        <div className=" lg:flex gap-[288px]  items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
          <div className="lg:w-[500px] w-full space-y-8 lg:mt-0 mt-[150px]">
            <div className="text-center">
              <h1 className="text-[40px] font-semibold text-[#1A1A1A] mb-4">
                2 Step Verification!
              </h1>
              <p className="text-[#666666] text-xl">
                Get your verification code from your <b>{localStorage.getItem('email')}</b>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6 ">
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="verifycode"
                    className="block text-lg font-medium text-[#1A1A1A] mb-2"
                  >
                    Enter your verification code
                  </label>
                  <input
                    id="verifycode"
                    name="verifycode"
                    type="string"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="appearance-none relative block w-full px-4 py-4 border border-[#E5E7EB] rounded-xl placeholder-[#666666] text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter verification code"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-sm text-xl font-medium text-white bg-primary hover:shadow-lg hover:bg-[#5B32D9] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6C3BFF]"
                disabled={isLoading}
              >
                {isLoading ? "Verifying..." : "Verify"}
              </button>

              <div className="flex items-center gap-3">
                <CheckBox />
                <p>Remember this device.</p>
              </div>
            </form>
          </div>
          <div className="relative  lg:block  hidden w-[650px]  ">
                                 <ImageCarousel/>
                                 {/* <Image src={loginimg} width={650} height={932} alt="titl" className="z-10" /> */}
                             </div>
        </div>
      </div>
    </div>
  );
}
