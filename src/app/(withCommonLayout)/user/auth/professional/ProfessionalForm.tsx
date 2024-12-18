"use client";
import { useState } from "react";
import Stepper from "./Stepper";
import Signup from "./Signup";
import Experience from "./Experience";
import Logo from "@/utils/Logo";
import Education from "./Education";
import usertypeshape from "@/assets/shapes/usertypeshape.png";
import circleshape from "@/assets/shapes/circleshape.png";
import Password from "./Password";
import Image from "next/image";
import { useForm } from "react-hook-form";
import ShowToastify from "@/utils/ShowToastify";

export default function ProfessionalForm() {
  const [step, setStep] = useState(1);
  const { register, handleSubmit, setValue, getValues } = useForm();

  const handleSubmitProfessionalForm = async (data: any) => {
    console.log(data); 
    ShowToastify({ success: "Form submitted successfully!" });
    setStep(4); // Navigate to the Success page
  };

  return (
    <div>
      <div className="relative">
        {/* Background Shapes */}
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
        <Image
          src={circleshape}
          width={173}
          height={167}
          alt="imgshape2"
          className="absolute left-[700px] top-0 lg:flex hidden"
        />
        <div className="absolute top-0 left-0 mt-7 ml-28 lg:block hidden z-[999]">
          <Logo />
        </div>
        <form onSubmit={handleSubmit(handleSubmitProfessionalForm)}>
          {/* Render Stepper on all steps */}

          <div className="flex justify-center items-center min-h-screen z-10 relative">
            <div className="max-w-[870px] w-full px-4 py-8 md:px-6 flex-shrink-0">
          {step === 1 && (
            <Signup
              register={register}
              handleNext={() => setStep(2)} // Go to the next step
              getValues={getValues}
              setValue={setValue}
            />
          )}
          {step === 2 && (
            <Experience
              register={register}
              handleNext={() => setStep(3)}
              getValues={getValues}
              setValue={setValue}
            />
          )}
          {step === 3 && (
            <Education
              register={register}
              handleNext={() => setStep(4)}
              getValues={getValues}
              setValue={setValue}
            />
          )}
          {step === 4 && (
            <Password
              register={register}
              handleNext={() => setStep(5)}
            />
          )}
              <Stepper currentStep={step} setStep={setStep} />
              </div>
              </div>

          {/* {step === 5 && <SuccessPage />} */}
        </form>
      </div>
    </div>
  );
}
