import React from "react";

const Hero = () => {
  return (
    <section className="min-h-[500px] py-[96px]">
      <div className="container h-full flex flex-col justify-center">
        <div className="space-y-5 mb-20">
          <h1 className="text-center text-primary text-7xl  font-italic font-semibold leading-[100%]">
            Wisdom at Work
          </h1>
          <p className="text-center w-[67%] mx-auto text-textColor-secondary text-lg font-open-sans  leading-[160%]">
            Connecting startups or businesses with seasoned professionals, our
            platform bridges experience and innovation. Retired experts continue
            to thrive by lending their lifelong skills, while businesses gain
            high-value insights at lower or no cost. Two generations, one
            platform, limitless potential.
          </p>
        </div>
        <div className="flex gap-8">
          <div className="flex-1 rounded-[12px] shadow-md flex flex-col items-start  p-8 bg-[#74C5FF]">
            <h2 className="text-white text-4xl font-open-sans  font-bold leading-[100% mb-[21px]">
              I am a professional
            </h2>
            <p className="leading-[160%] text-base text-white">
              Start your journey as a professional and share your expertise with
              aspiring startups or businesses
            </p>
          </div>
          <div className="flex-1"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
