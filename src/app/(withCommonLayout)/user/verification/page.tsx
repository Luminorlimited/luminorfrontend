'use client'
import Image from "next/image";
import Logo from "@/utils/Logo";
import usertypeshape from '@/assets/shapes/usertypeshape.png'
import loginimg from '@/assets/images/loginimg1.png'
import circleshape from '@/assets/shapes/circleshape.png'
import CheckBox from "@/components/common/checkbox/CheckBox";

export default function Page() {
 
    const handleSubmit = (e: React.FormEvent) => {
       console.log(e)
    }
    return (
        <div className="  relative">
            <Image src={usertypeshape} width={558} height={766} alt="imgshape1" className="absolute top-0 right-0 lg:w-[558px] w-48" />
            <Image src={usertypeshape} width={558} height={766} alt="imgshape2" className="absolute left-0 bottom-0 rotate-180 lg:w-[558px] w-48" />
            <Image src={circleshape} width={173} height={167} alt="imgshape2" className="absolute left-[700px] top-0  lg:flex hidden" />

            <div className="absolute top-0 left-0 mt-7 ml-28">
                <Logo />
            </div>

            <div className="mx-auto min-h-screen">
                <div className=" lg:flex gap-[288px]  items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
                    <div className="lg:w-[500px] w-full space-y-8 lg:mt-0 mt-[150px]">
                        <div className="text-center">
                            <h1 className="text-[40px] font-semibold text-[#1A1A1A] mb-4">
                            2 Step Verification!
                            </h1>
                            <p className="text-[#666666] text-xl">
                                Get your verification code from your <b>karim@gmail.com</b>
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                            <div className="space-y-6">
                                <div>
                                    <label htmlFor="verifycode" className="block text-lg font-medium text-[#1A1A1A] mb-2">
                                        Enter your verification code
                                    </label>
                                    <input
                                        id="verifycode"
                                        name="verifycode"
                                        type="string"
                                        required
                                        className="appearance-none relative block w-full px-4 py-4 border border-[#E5E7EB] rounded-xl placeholder-[#666666] text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Enter verification code"
                                       
                                    />
                                </div>

                             
                            </div>

                          

                            <button
                                type="submit"
                                className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-sm text-xl font-medium text-white bg-primary hover:shadow-lg hover:bg-[#5B32D9] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6C3BFF]"
                            >
                                Log in
                            </button>

                            <div className="flex items-center gap-3">
                            <CheckBox /><p>Remember this device.</p>
                        </div>


                     

                            

                          
                        </form>
                    </div>
                    <div className="relative  lg:block  hidden">
                        <Image src={loginimg} width={715} height={932} alt="titl" className="z-10" />
                    </div>
                </div>
            </div>



        </div>
    );
}