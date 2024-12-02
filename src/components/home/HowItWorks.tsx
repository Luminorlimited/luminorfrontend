import p1 from "@/assets/p1.png";
import p2 from "@/assets/p2.png";
import p3 from "@/assets/p3.png";
import Image, { StaticImageData } from "next/image";

interface ProcessStep {
  icon: string | StaticImageData;
  title: string;
  description: string;
  bgColor: string;
  isLast?: boolean;
}

const processSteps: ProcessStep[] = [
  {
    icon: p1,
    title: "Join Luminor",
    description:
      "Join Luminor to inspire startups, share your expertise, and connect globally.",
    bgColor: "#FF78AF",
  },
  {
    icon: p2,
    title: "Discover And Connect",
    description:
      "Discover experts, connect instantly, and empower your startup's journey forward.",
    bgColor: "#FFC06B",
  },
  {
    icon: p3,
    title: "Collaborate and Execute",
    description:
      "Collaborate with experts to execute your startup vision effectively and confidently.",
    bgColor: "#74C5FF",
    isLast: true,
  },
];

const HowItWorks = () => {
  return (
    <section className="py-[40px] md:py-[72px] lg:py-[96px]">
      <div className="container h-full flex flex-col justify-center">
        <div className="space-y-5 mb-20">
          <h1 className="text-center text-xl md:text-xl lg:text-5xl text-textColor-primary font-bold leading-[100%]">
            How It Works
          </h1>
          <p className="text-center w-full lg:w-[50%] mx-auto text-textColor-secondary text-lg font-normal leading-[160%]">
            Connect with expert retirees, book consultations, and gain valuable
            insights to confidently grow your startup journey.
          </p>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 relative">
          {processSteps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center w-full md:w-1/3 relative"
            >
              <div
                className={`relative ${
                  !step.isLast
                    ? 'after:content-[""] after:absolute after:top-1/2 after:-right-[70%] after:w-full after:h-0.5 after:border-t-2 after:border-dashed after:border-primary/30 md:after:w-[calc(100%-2rem)] after:z-0'
                    : ""
                }`}
              >
                <div
                  className="p-6 rounded-full flex items-center justify-center relative z-10"
                  style={{
                    backgroundColor: `${step.bgColor}35`,
                    borderColor: step.bgColor,
                    borderWidth: "2px",
                  }}
                >
                  <Image
                    src={step.icon}
                    alt={`Icon for ${step.title}`}
                    width={48}
                    height={48}
                  />
                </div>
              </div>
              <h3 className="mt-6 text-2xl font-bold ">{step.title}</h3>
              <p className="mt-2 text-muted-foreground max-w-[355px] text-base font-normal text-textColor-secondary">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
