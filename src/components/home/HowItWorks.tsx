"use client"

import Image, { type StaticImageData } from "next/image"
import Photo1 from "@/assets/images/imgp1.png"
import Photo2 from "@/assets/images/imgp2.png"
import Photo3 from "@/assets/images/imgp3.png"
import bg from "@/assets/images/howwork.png"
import rightarrow from "@/assets/shapes/arrowright.png"
import leftarrow from "@/assets/shapes/arrowleft.png"
import { motion } from "framer-motion"

interface ProcessStep {
  icon: string | StaticImageData
  title: string
  description: string
  bgColor: string
  border: string
  isLast?: boolean
}

const processSteps: ProcessStep[] = [
  {
    icon: Photo1,
    title: "Join Luminor",
    description: "Join Luminor to inspire startups, share your expertise, and connect globally  login or sign up today",
    bgColor: "#FFE4EF",
    border: "#FF78AF",
  },
  {
    icon: Photo2,
    title: "Discover And Connect",
    description:
      "Discover retired professionals, connect instantly and get years of knowledge on how to move your business forward",
    bgColor: "#FFF2E1",
    border: "#FFC06B",
  },
  {
    icon: Photo3,
    title: "Collaborate and Execute",
    description: "Collaborate with retired professionals to execute your vision effectively and confidently",
    bgColor: "#74C5FF33",
    isLast: true,
    border: "#74C5FF",
  },
]

export default function HowItWorks() {
  return (
    <div
      className="px-4 py-12"
      style={{
        background: `#F9F9FC url(${bg.src}) no-repeat center center`,
        backgroundSize: "cover",
      }}
    >
      <div className="container mx-auto">
        <motion.div
          className="heading text-center py-[50px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-bold text-[48px]">How It Works</h2>
          <p className="text-lg text-[#475467]">
            Connect with expert retirees, book consultations, and gain valuable <br /> insights to confidently grow your
            journey.
          </p>
        </motion.div>
        <div className="relative flex flex-col gap-16 md:flex-row md:gap-4 pb-[70px] md:justify-between items-center">
          {/* Dotted lines connecting the circles - visible only on desktop */}
          <div className="lg:block md:block hidden absolute top-[60px] left-[280px] right-[280px] h-[2px]">
            <div className="w-full h-full flex relative justify-between items-center">
              <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 1, delay: 0.5 }}>
                {/* Right Arrow */}
                <Image
                  className="absolute top-[-16px] left-[-39px] lg:block hidden lg:w-[340px] md:w-[50px]"
                  src={rightarrow}
                  width={340}
                  height={2}
                  alt="rightarrow"
                />
              </motion.div>
              <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 1, delay: 1 }}>
                {/* Left Arrow */}
                <Image
                  className="absolute top-[-10px] right-[-30px] lg:block hidden lg:w-[346px] md:w-[50px]"
                  src={leftarrow}
                  width={348}
                  height={2}
                  alt="leftarrow"
                />
              </motion.div>
            </div>
          </div>

          {/* Mapping through processSteps */}
          {processSteps.map((step, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center max-w-sm"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <motion.div
                className="w-24 h-24 rounded-full flex items-center justify-center mb-6"
                style={{ backgroundColor: step.bgColor, border: `2px solid ${step.border}` }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Image
                  src={step.icon || "/placeholder.svg"}
                  alt={step.title}
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </motion.div>
              <motion.h2
                className="text-2xl font-bold mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.3 }}
              >
                {step.title}
              </motion.h2>
              <motion.p
                className="text-gray-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.4 }}
              >
                {step.description}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

