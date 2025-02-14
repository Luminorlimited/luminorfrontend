"use client";


import featuredbg from "@/assets/images/featuredbg.png";
import FeaturedProject from "./FeaturedProject";


export default function FeatureServices() {

  return (
    <section
      className="py-[40px] md:py-[72px] lg:py-[96px]"
      style={{
        backgroundImage: `url(${featuredbg.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container h-full flex flex-col justify-center">
        <div className="space-y-5 mb-20">
          <h1 className="text-center text-2xl md:text-2xl lg:text-5xl text-textColor-primary font-bold leading-[100%]">
            Feature Services
          </h1>
        </div>
        <div className="mb-[40px]">
         
          <FeaturedProject />
        </div>
       
      </div>
    </section>
  );
}
