import Image, { StaticImageData } from "next/image";
import Photo1 from "@/assets/images/imgp1.png";
import Photo2 from "@/assets/images/imgp2.png";
import Photo3 from "@/assets/images/imgp3.png";
import bg from '@/assets/images/howwork.png'
import rightarrow from "@/assets/shapes/arrowright.png"
import leftarrow from "@/assets/shapes/arrowleft.png"

interface ProcessStep {
  icon: string | StaticImageData;
  title: string;
  description: string;
  bgColor: string;
  border: string;
  isLast?: boolean;
}

const processSteps: ProcessStep[] = [
  {
    icon: Photo1,
    title: "Join Luminor",
    description:
      "Join Luminor to inspire startups, share your expertise, and connect globally  login or sign up today",
    bgColor: "#FFE4EF",
    border: '#FF78AF'
  },
  {
    icon: Photo2,
    title: "Discover And Connect",
    description:
      "Discover retired professionals, connect instantly and get years of knowledge on how to move your business forward",
    bgColor: "#FFF2E1",
    border: '#FFC06B'

  },
  {
    icon: Photo3,
    title: "Collaborate and Execute",
    description:
      "Collaborate with retired professionals to execute your vision effectively and confidently",
    bgColor: "#74C5FF33",
    isLast: true,
    border: '#74C5FF'

  },
];

export default function HowItWorks() {
  return (
    <div
      className=" px-4 py-12"
      style={{
        background: `#F9F9FC url(${bg.src}) no-repeat center center`,
        backgroundSize: 'cover',
      }}
    >
      <div className="container mx-auto">
        <div className="heading text-center py-[50px]">
          <h2 className="font-bold  text-[48px]">How It Works</h2>
          <p className="text-lg text-[#475467]">Connect with expert retirees, book consultations, and gain valuable <br/> insights to confidently grow your journey.</p>
        </div>
        <div className="relative flex flex-col gap-16 md:flex-row md:gap-4 pb-[70px] md:justify-between items-center">
          {/* Dotted lines connecting  the circles - visible only on desktop */}
          <div className="lg:block md:block hidden absolute top-[60px] left-[280px] right-[280px] h-[2px]">
            <div className="w-full h-full flex relative justify-between items-center">
              <div>
                {/* Right Arrow */}
                <Image
                  className="absolute top-[-16px] left-[-39px] lg:block hidden lg:w-[340px] md:w-[50px]"
                  src={rightarrow}
                  width={340}
                  height={2}
                  alt="righarrow"
                />
              </div>
              <div>
                {/* Left Arrow */}
                <Image
                  className="absolute top-[-10px] right-[-30px] lg:block hidden lg:w-[346px] md:w-[50px]"
                  src={leftarrow}
                  width={348}
                  height={2}
                  alt="leftarrow"
                />
              </div>

            </div>
          </div>

          {/* Mapping through processSteps */}
          {processSteps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center max-w-sm"
            >
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center mb-6"
                style={{ backgroundColor: step.bgColor, border: `2px solid ${step.border}` }}
              >
                <Image
                  src={step.icon}
                  alt={step.title}
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
              <h2 className="text-2xl font-bold mb-4">{step.title}</h2>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
