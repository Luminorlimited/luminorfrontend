"use client";

import BusinesSvg from '@/components/svg/BusinesSvg';
import Settings from '@/components/svg/Settings';
import TechnicalSvg from '@/components/svg/TechnicalSvg';
import HealthSvg from '@/components/svg/HealthSvg';
import Education from '@/components/svg/Education';
import Financial from '@/components/svg/Financial';

import { MdVerifiedUser } from "react-icons/md";
import chat from "@/assets/Frame.png";
import shape2 from "@/assets/serviceshape.png";
import Image from "next/image";
import { useState } from 'react';

interface Service {
  icon: JSX.Element;
  title: string;
  description: string;
}

const services: Service[] = [
  {
    icon: <BusinesSvg />,
    title: "Business consultancy and management",
    description:
      "Connect with experts in strategy, operations, and management who can offer seasoned guidance on improving processes, scaling efficiently, and building strong business foundations.",
  },
  {
    icon: <Settings />,
    title: "Engineering services",
    description:
      "Access a range of engineering expertise, from design and structural analysis to process improvement. Retired engineers bring critical problem-solving skills and experience to innovate and optimize your projects.",
  },
  {
    icon: <TechnicalSvg />,
    title: "Technical services",
    description:
      "Leverage hands-on technical support for IT, maintenance, or specialized systems. Our platform links you with professionals skilled in troubleshooting, systems integration, and technological advancement.",
  },
  {
    icon: <HealthSvg />,
    title: "Healthcare and medical consultancy",
    description:
      "Collaborate with retired healthcare professionals for insights in clinical processes, patient care, and health administration. Perfect for businesses seeking expertise in medical fields or wellness initiatives.",
  },
  {
    icon: <Education />,
    title: "Education and training",
    description:
      "Benefit from experienced educators and trainers who can develop and deliver programs, workshops, or curriculum. Ideal for companies looking to train employees or enhance their learning and development offerings.",
  },
  {
    icon: <Financial />,
    title: "Legal and financial services",
    description:
      "Get practical advice from retired legal and financial experts on compliance, contracts, budgeting, and risk management, ensuring you have reliable guidance on navigating complex regulatory landscapes.",
  },
];

export default function ExploreServices() {

  const [isAnyHovered, setIsAnyHovered] = useState<number | null>(null);
  return (
    <section className="py-[40px] md:py-[72px] lg:py-[96px]" id='about'>
      <div className="container h-full flex flex-col justify-center">
        <div className="space-y-5 mb-20">
          <h1 className="text-center text-xl md:text-xl lg:text-5xl text-textColor-primary font-bold leading-[100%]">
            Explore Our Services
          </h1>
          <div className="flex items-center justify-center gap-12 text-center w-full lg:w-[50%] mx-auto text-lg font-normal leading-[160%]">
            <p className="flex gap-2 items-center text-lg font-semibold">
              <MdVerifiedUser className="w-5 h-5" />
              Verified Professionals
            </p>
            <p className="flex gap-2 items-center text-lg font-semibold">
              <Image src={chat} alt="icon" width={20} height={20} />
              500+ Consultants
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 group md:grid-cols-3 lg:grid-cols-6 gap-2 transition-all duration-500">
          {services.map((service: any, index: number) => (
            <div
              onMouseEnter={() => setIsAnyHovered(index)}
              onMouseLeave={() => setIsAnyHovered(null)}
              key={index}
              className={` relative cursor-pointer overflow-hidden rounded-xl border bg-white transition-all duration-1000 hover:shadow-lg lg:mx-0 mx-auto max-w-[214px]`}
            >
              <div className='transition-[height] hover:bg-primary duration-300 ease-in-out h-48 group-hover:h-[400px]'>
                <div className="absolute top-0 left-0">
                  <Image
                    className="transition-opacity duration-500 group-hover:opacity-100"
                    width={136}
                    height={131}
                    src={shape2}
                    alt="exploreshape"
                  />
                </div>
                <div className="px-3 pt-3  text-black transition-all duration-500  hover:text-white z-[30]">
                  <div className={`rounded-full w-12 h-12 mb-5  ${isAnyHovered === index ? "text-white" : 'text-black'}`}>
                    {service.icon}
                  </div>
                  <h3 className={`text-lg font-semibold text-black ${isAnyHovered === index ? "text-white" : 'text-black'} `}>
                    {service.title}
                  </h3>
                  <div className="overflow-hidden  mt-2">
                    <p className={`text-sm font-normal hidden group-hover:block leading-relaxed  ${isAnyHovered === index ? "text-white" : "text-black"}`}>
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>



      </div>
    </section>
  );
}
