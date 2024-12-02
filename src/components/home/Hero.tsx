import React from "react";

const Hero = () => {
  return (
    <section className="min-h-[500px] py-[40px] md:py-[72px] lg:py-[96px]">
      <div className="container h-full flex flex-col justify-center">
        <div className="space-y-5 mb-20">
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
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 rounded-[12px] shadow-md flex flex-col items-start  p-8 bg-[#74C5FF] ">
            <h2 className="text-white text-4xl font-open-sans  font-bold leading-[100% mb-[21px]">
              I am a professional
            </h2>
            <p className="leading-[160%] text-base text-white">
              Start your journey as a professional and share your expertise with
              aspiring startups or businesses
            </p>
            <button className="bg-white font-medium text-base px-7 py-4  rounded-full mt-8">
              Get Started
            </button>
          </div>
          <div className="flex-1 rounded-[12px] shadow-md flex flex-col items-start  p-8 bg-[#FF78AF] ">
            <h2 className="text-white text-4xl font-open-sans  font-bold leading-[100% mb-[21px]">
              I`m a client
            </h2>
            <p className="leading-[160%] text-base text-white">
              Start your journey as a client to gain valuable insights and turn
              them into powerful action
            </p>
            <button className="bg-white font-medium text-base px-7 py-4  rounded-full mt-8">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
