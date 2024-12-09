'use client'
import Image from "next/image";
import Logo from "@/utils/Logo";
import usertypeshape from '@/assets/shapes/usertypeshape.png'
import loginimg from '@/assets/images/loginimg1.png'
import circleshape from '@/assets/shapes/circleshape.png'
import Link from "next/link";
import { useState } from "react";

export default function Page() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Handle login logic here
    }
    return (
        <div className="  relative">
            <Image src={usertypeshape} width={558} height={766} alt="imgshape1" className="absolute top-0 right-0 lg:w-[558px] w-48" />
            <Image src={usertypeshape} width={558} height={766} alt="imgshape2" className="absolute left-0 bottom-0 rotate-180 lg:w-[558px] w-48" />
            <Image src={circleshape} width={173} height={167} alt="imgshape2" className="absolute left-[700px] top-0  lg:flex hidden" />

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
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        required
                                        className="appearance-none relative block w-full px-4 py-4 border border-[#E5E7EB] rounded-xl placeholder-[#666666] text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <Link
                                    href="/forgot-password"
                                    className="text-[#0066FF] hover:text-blue-700 text-base font-medium"
                                >
                                    Forgot Password
                                </Link>
                            </div>

                            <button
                                type="submit"
                                className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-sm text-xl font-medium text-white bg-primary hover:shadow-lg hover:bg-[#5B32D9] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6C3BFF]"
                            >
                                Log in
                            </button>

                            <button
                                type="button"
                                className="w-full flex items-center justify-center px-4 py-4 border border-[#E5E7EB] rounded-xl shadow-sm bg-white text-lg font-medium text-gray-700 hover:bg-gray-50 mb-4"
                            >
                                <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="none">
                                    <path d="M24 12.073c0-.814-.073-1.6-.219-2.359H12.25v4.469h6.62a5.657 5.657 0 0 1-2.453 3.71v3.086h3.977c2.326-2.141 3.672-5.297 3.672-8.906Z" fill="#4285F4" />
                                    <path d="M12.25 24c3.318 0 6.104-1.1 8.134-2.978l-3.977-3.086c-1.1.737-2.51 1.172-4.157 1.172-3.197 0-5.904-2.159-6.867-5.063H1.266v3.196A12.001 12.001 0 0 0 12.25 24Z" fill="#34A853" />
                                    <path d="M5.383 14.045A7.17 7.17 0 0 1 5 12c0-.71.139-1.4.383-2.045V6.759H1.266a11.955 11.955 0 0 0 0 10.482l4.117-3.196Z" fill="#FBBC04" />
                                    <path d="M12.25 4.892c1.805 0 3.42.62 4.694 1.84l3.52-3.52C18.331 1.19 15.545 0 12.25 0A11.999 11.999 0 0 0 1.266 6.759l4.117 3.196c.963-2.904 3.67-5.063 6.867-5.063Z" fill="#EA4335" />
                                </svg>
                                Log in with Google
                            </button>

                            <button
                                type="button"
                                className="w-full flex items-center justify-center px-4 py-4 border border-[#E5E7EB] rounded-xl shadow-sm bg-white text-lg font-medium text-gray-700 hover:bg-gray-50"
                            >
                                <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="#1877F2">
                                    <path d="M24 12c0-6.627-5.373-12-12-12S0 5.373 0 12c0 5.99 4.388 10.954 10.125 11.854V15.47H7.078V12h3.047V9.356c0-3.007 1.792-4.668 4.533-4.668 1.312 0 2.686.234 2.686.234v2.953H15.83c-1.491 0-1.956.925-1.956 1.875V12h3.328l-.532 3.47h-2.796v8.385C19.612 22.954 24 17.99 24 12" />
                                </svg>
                                Log In with Facebook
                            </button>

                         

                            <div className="text-center">
                                <p className="text-[#1A1A1A] text-lg">
                                    {"Don't have an account? "}
                                    <Link
                                        href="/usertype"
                                        className="text-[#0066FF] hover:text-blue-700 font-medium inline-flex items-center"
                                    >
                                        Create Account
                                        <svg
                                            className="w-5 h-5 ml-1"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                    <div className="relative  lg:block  hidden">
                        <Image src={loginimg} width={650} height={932} alt="titl" className="z-10" />
                    </div>
                </div>
            </div>



        </div>
    );
}