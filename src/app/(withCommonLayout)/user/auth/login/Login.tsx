'use client'
import Image from "next/image";
import Logo from "@/utils/Logo";
import usertypeshape from '@/assets/shapes/usertypeshape.png'
import circleshape from '@/assets/shapes/circleshape.png'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import ImageCarousel from "./ImageCarousel/ImageCarousel";
import { useLoginUserMutation } from "@/redux/api/userApi";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/ReduxFunction";
// import ShowToastify from "@/utils/ShowToastify";
// import { useRouter } from "next/navigation";

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false);

    // const router = useRouter()

    // const [login] = useLoginUserMutation();
    const [LogInUser, { isLoading }] = useLoginUserMutation()
    const dispatch = useDispatch();




    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = { email, password }
        console.log(email, password)
        const res = await LogInUser(data)
        console.log(res);
        if (res) {
            dispatch(setUser({ name: `${res?.data?.data?.user.name.firstName} ${res?.data?.data?.user.name.lastName}`, role: `${res?.data?.data?.user.role}` }))

        }


        // try {
        //     const response = await LogInUser(data) // Unwraps to handle errors
        //     if (response) {
        //         // Assuming the API returns user info in `response.data`
        //         dispatch(setUser({ name: `${response.data.user.firstName} ${response.data.user.firstName}`, role: response.data.user.role }));
        //         localStorage.setItem("token", response.data.accessToken); // Store token
        //         router.push('/')


        //     } else {
        //         ShowToastify({ error: "Check your email /password again" })
        //         alert("Invalid credentials");
        //     }
        // } catch (err) {
        //     console.error("Login failed", err);
        //     alert("An error occurred during login.");
        // }
    };
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