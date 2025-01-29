'use client'
import Image from "next/image";
import Logo from "@/utils/Logo";
import usertypeshape from '@/assets/shapes/usertypeshape.png'
import circleshape from '@/assets/shapes/circleshape.png'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import ImageCarousel from "./ImageCarousel/ImageCarousel";
import { useLoginUserMutation } from "@/redux/Api/userApi";
import { useRouter } from "next/navigation";
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FaArrowRightLong } from "react-icons/fa6";
import { toast } from "sonner";
// import { signIn } from "next-auth/react"


export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false);

    const router = useRouter()


    const [LogInUser, { isLoading }] = useLoginUserMutation()
    // const dispatch = useDispatch();




    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevent default form submission
        const data = { email, password }; // Gather email and password
        console.log(email, password); // Debugging: Log email and password


        try {
            const res: any = await LogInUser(data);
            console.log("Login Response:", res);
            if (res?.data?.success) {
                localStorage.setItem("email", email);
                toast.success("Check your email for verification")
                router.push("/user/verification");
            } else {
                toast.error(res?.data?.message || "Wrong email or password")
            }
        } catch (error) {
            if (error instanceof Error) {
                toast.error("Login Failed")
                console.error("Login Error:", error);
            } else {
                toast.error("An unknown error occurred" )
                console.error("Unexpected Error:", error);
            }
        }
    };



    // const handlegooglelogin = async () => {
    //     try {
    //         const res = await signIn("google", {
    //            callbackUrl: "/"
    //         })
    //         if (res) {
    //             console.log('login succssfully');
                
    //         }
    //     } catch (e) {
    //         console.log('error login', e);
            
    //     }
    // }

    return (
        <div className="  relative">
            <Image src={usertypeshape} width={558} height={766} alt="imgshape1" className="absolute top-0 right-0 lg:w-[558px] w-48 z-[-60]" />
            <Image src={usertypeshape} width={558} height={766} alt="imgshape2" className="absolute left-0 bottom-0 rotate-180 lg:w-[558px] w-48 z-[-60]" />
            <Image src={circleshape} width={173} height={167} alt="imgshape2" className="absolute left-[700px] top-0  lg:flex hidden z-[-60]" />

            <div className="absolute top-0 left-0 mt-7 ml-28 lg:block hidden">
                <Logo />
            </div>

            <div className="mx-auto min-h-screen flex justify-center items-center">
                <div className=" lg:flex gap-[188px]  items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
                    <div className="lg:max-w-[500px] w-full space-y-8 lg:mt-0 mt-[100px]">
                        <div className="text-center">
                            <h1 className="text-[40px] font-semibold text-[#1A1A1A] mb-4">
                                Welcome to Luminor!
                            </h1>
                            <p className="text-[#666666] text-xl">
                                Please Enter your details
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                            <div className="space-y-6">
                                <div>
                                    <label htmlFor="email" className="block text-lg font-medium text-[#1A1A1A] mb-2">
                                        Enter Email address
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        className="appearance-none relative block w-full px-4 py-4 border border-[#E5E7EB] rounded-xl placeholder-[#666666] text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Email address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="password" className="block text-lg font-medium text-[#1A1A1A] mb-2">
                                        Enter your Password
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
                            </div>

                            <button
                                type="submit"
                                className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-sm text-xl font-medium text-white bg-primary hover:shadow-lg hover:bg-[#5B32D9] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6C3BFF]"
                                disabled={isLoading}
                            >
                                {isLoading ? "Logging in..." : "Log in"}
                            </button>

                            <div className="flex items-center gap-2 justify-center">
                                <div className="h-[1px]  w-[85px]  bg-[#1D1F2C]" />
                                <span className="text-[16px] font-medium text-[#1D1F2C]">Or</span>
                                <div className="h-[1px]  w-[85px]  bg-[#1D1F2C]" />
                            </div>

                            <div className="grid gap-4">
                                <Button variant="outline" className="w-full py-[23px] rounded-[10px] text-lg">
                                    <svg
                                        className="mr-2  "
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            fill="#1877F2"
                                            d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                                        />
                                    </svg>
                                    Log In with Facebook
                                </Button>

                                <Button  variant="outline" className="w-full py-[23px] rounded-[10px] text-lg">
                                    <svg
                                        className="mr-2 h-5 w-5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 48 48"
                                    >
                                        <path
                                            fill="#FFC107"
                                            d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
                                        />
                                        <path
                                            fill="#FF3D00"
                                            d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
                                        />
                                        <path
                                            fill="#4CAF50"
                                            d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
                                        />
                                        <path
                                            fill="#1976D2"
                                            d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
                                        />
                                    </svg>
                                    Log in with Google
                                </Button>
                            </div>

                            <div className="flex items-center gap-2 justify-center">
                                <div className="h-[1px]  w-[85px]  bg-[#1D1F2C]" />
                                <span className="text-[16px] font-medium text-[#1D1F2C]">Or</span>
                                <div className="h-[1px]  w-[85px]  bg-[#1D1F2C]" />
                            </div>

                            <div className="text-center text-lg flex mx-auto justify-center gap-2">
                                Don&apos;t have an account?
                                <Link href="/usertype" className="flex items-center gap-2 text-primary font-semibold hover:underline">
                                    Create Account <FaArrowRightLong />

                                </Link>
                            </div>
                        </form>

                    </div>
                    <div className="relative  lg:block  hidden w-[650px]  ">
                        <ImageCarousel />
                        {/* <Image src={loginimg} width={650} height={932} alt="titl" className="z-10" /> */}
                    </div>
                </div>
            </div>



        </div>
    );
}