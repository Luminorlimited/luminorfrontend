"use client";

import Link from "next/link";
import { User } from "lucide-react";
import Logo from "@/utils/Logo";
import shape from "@/assets/shapes/shape-2.png";
import Image from "next/image";
import usertypeshape from '@/assets/shapes/usertypeshape.png'
export default function Signup() {
  return (
    <div className="min-h-screen  flex flex-col items-center justify-center relative">
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
      <div className="">
        <div className="absolute top-0 left-0 mt-7 ml-28 lg:block hidden">
          <Logo />
        </div>
        <div className="lg:py-0 lg:px-0 px-3 py-6">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
            <h1 className="text-[32px] font-semibold ">
              Become a Retired Professional or Client
            </h1>
            <p className="text-textColor-secondary text-base font-normal">
              Click on one of the options below to choose your path and connect
              to the right opportunities
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto mb-8">
            <div className="relative h-auto p-6 bg-white text-textColor-secondary hover:text-white hover:bg-primary transition-all rounded-xl border shadow-md cursor-pointer group">
              {/* Decorative Background Shape */}
              <Image
                src={shape}
                alt=""
                height={200}
                width={200}
                className="absolute top-0 left-0 pointer-events-none"
              />

              {/* Link Content */}
              <Link
                href="/user/auth/professional"
                className="relative flex flex-col items-center space-y-4 z-10"
              >
                <User className="text-4xl group-hover:text-white transition-colors" />
                <p className="text-2xl font-semibold text-center">
                  I&apos;m a Retired <br /> Professional, looking <br />
                  for a Client
                </p>
              </Link>
            </div>




            <div className="h-auto p-6 bg-white text-textColor-secondary hover:text-white hover:bg-primary transition-all rounded-xl border relative cursor-pointer">
              <Image
                src={shape}
                alt="shape"
                height={200}
                width={200}
                className="absolute top-0 left-0"
              />
              <Link href="/user/auth/client" className="relative space-y-4 z-[1000]">
                <User className="text-4xl mx-auto" />
                <p className="text-2xl font-semibold text-center">
                  I&apos;m a Client, <br /> looking for a Retired <br />
                  Professional
                </p>
              </Link>
            </div>

          </div>

          <div className="text-center text-base font-semibold">
            <span className="text-textColor-secondary">
              Already have an account?{" "}
            </span>
            <Link
              href="/user/auth/login"
              className="text-[#1877F2] hover:underline font-bold"
            >
              Log In →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
