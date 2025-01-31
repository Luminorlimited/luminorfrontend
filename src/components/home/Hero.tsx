"use client"
import Image from "next/image";
import Link from "next/link";
import React from "react";
import professionalhero from '@/assets/images/professionalhero.png'
import clientherobg from '@/assets/images/clientherobg.png'
import useDecodedToken from "../common/DecodeToken";

const Hero = () => {
  const decodedToken = useDecodedToken();
  return (
    <section
      style={{
        background: 'linear-gradient(to right, #FFC06B1A, #FF78AF1A, #74C5FF1A), url("/images/herobg.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      className="min-h-[500px] py-[40px] md:py-[72px] lg:py-[96px]">
      <div className="container h-full flex flex-col justify-center">
        <div className={`space-y-5 mb-20 ${decodedToken?"pt-14": ""}`}>
          <h1 className="text-center text-primary text-3xl md:text-5xl lg:text-7xl italic font-semibold leading-[100%]">
            Wisdom at Work
          </h1>
          <p className="text-center w-full lg:w-[70%] mx-auto text-textColor-secondary text-lg font-medium leading-[160%]">
            Connecting startups or businesses with seasoned professionals, our
            platform bridges experience and innovation. Retired experts continue
            to thrive by lending their lifelong skills, while businesses gain
            high-value insights at lower or no cost. Two generations, one
            platform, limitless potential.
          </p>
        </div>
        {!decodedToken ? (

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 rounded-[12px] shadow-md flex flex-col items-start  p-8 bg-bg_primary relative overflow-hidden">
              <div className="z-20">
                <h2 className="text-white text-4xl font-open-sans  font-bold leading-[100% mb-[21px]">
                  I&apos;m  a Retired Professional
                </h2>
                <p className="leading-[160%] pb-10 text-base text-white">
                  Start your journey as a professional and share your expertise with aspiring startups or businesses today
                </p>
                <Link href={'/user/auth/professional'} className="bg-white font-medium text-base hover:shadow-lg  px-7 py-4 cursor-pointer hover:bg-slate-100 rounded-full mt-8 shadow">
                  Get Started
                </Link>
              </div>
              <Image src={professionalhero} width={208} height={338} className="absolute bottom-0 left-0" alt="profimg" />
            </div>
            <div className="flex-1 rounded-[12px] shadow-md flex flex-col items-start  p-8 bg-[#E6AD60] relative overflow-hidden">
              <div className="z-30">
                <h2 className="text-white text-4xl font-open-sans  font-bold leading-[100% mb-[21px]">
                  I&apos;m a Client
                </h2>
                <p className="leading-[160%] text-base pb-10 text-white">
                  Start your journey as a client to gain valuable insights and turn
                  them into powerful action
                </p>
                <Link href={'/user/auth/client'} className="bg-white font-medium text-base hover:shadow-lg  px-7 py-4 cursor-pointer hover:bg-slate-100 rounded-full mt-8 shadow">
                  Get Started
                </Link>
              </div>
              <Image src={clientherobg} width={208} height={338} className="absolute top-0 left-0" alt="profimg" />
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </section>
  );
};

export default Hero;
