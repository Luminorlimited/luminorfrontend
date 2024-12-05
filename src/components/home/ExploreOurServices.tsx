"use client";

import {
  Briefcase,
  Settings,
  WrenchIcon,
  Heart,
  GraduationCap,
  Scale,
} from "lucide-react";
import { MdVerifiedUser } from "react-icons/md";
import chat from "@/assets/Frame.png";
import Image from "next/image";
import serviceShape from '@/assets/serviceshape.png'

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const services: Service[] = [
  {
    icon: <Briefcase className="w-12 h-12" />,
    title: "Business consultancy and management",
    description:
      "Connect with experts in strategy, operations, and management who can offer seasoned guidance on improving processes, scaling efficiently, and building strong business foundations.",
  },
  {
    icon: <Settings className="w-12 h-12" />,
    title: "Engineering services",
    description:
      "Access a range of engineering expertise, from design and structural analysis to process improvement. Retired engineers bring critical problem-solving skills and experience to innovate and optimize your projects.",
  },
  {
    icon: <WrenchIcon className="w-12 h-12" />,
    title: "Technical services",
    description:
      "Leverage hands-on technical support for IT, maintenance, or specialized systems. Our platform links you with professionals skilled in troubleshooting, systems integration, and technological advancement.",
  },
  {
    icon: <Heart className="w-12 h-12" />,
    title: "Healthcare and medical consultancy",
    description:
      "Collaborate with retired healthcare professionals for insights in clinical processes, patient care, and health administration. Perfect for businesses seeking expertise in medical fields or wellness initiatives.",
  },
  {
    icon: <GraduationCap className="w-12 h-12" />,
    title: "Education and training",
    description:
      "Benefit from experienced educators and trainers who can develop and deliver programs, workshops, or curriculum. Ideal for companies looking to train employees or enhance their learning and development offerings.",
  },
  {
    icon: <Scale className="w-12 h-12" />,
    title: "Legal and financial services",
    description:
      "Get practical advice from retired legal and financial experts on compliance, contracts, budgeting, and risk management, ensuring you have reliable guidance on navigating complex regulatory landscapes.",
  },
];

export default function ExploreServices() {
  return (
    <section className="py-[40px] md:py-[72px] lg:py-[96px]">
      <div className="container h-full flex flex-col justify-center">
        <div className="space-y-5 mb-20">
          <h1 className="text-center text-xl md:text-xl lg:text-5xl text-textColor-primary font-bold leading-[100%]">
            Explore Our Services
          </h1>
          <div className="flex lg:flex-row flex-col items-center justify-center lg:gap-12 gap-4 text-center w-full lg:w-[50%] mx-auto text-lg font-normal leading-[160%]">
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

        <div className="grid grid-cols-1 justify-center md:grid-cols-3 lg:grid-cols-6 gap-5">
          {services.map((service, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-xl bg-white hover:bg-primary transition-all duration-300 shadow-md lg:w-[214px] mx-auto group"
            >
              <div className="relative px-3 py-5  text-black group-hover:text-white">
                <Image
                  src={serviceShape}
                  width={136}
                  height={131}
                  className="absolute top-0 left-0"
                  alt="serviceShape"
                />
                <div className=" z-20">
                  <div className="rounded-full text-2xl w-16 h-16">{service.icon}</div>
                  <h3 className="text-lg font-semibold">{service.title}</h3>

                 
                    <p className="text-sm font-normal leading-relaxed">
                      {service.description}
                    </p>
              
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
