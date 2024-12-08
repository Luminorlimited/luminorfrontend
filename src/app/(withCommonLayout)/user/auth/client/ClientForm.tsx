"use client";
import { useState } from "react";
import Image from "next/image";
import Logo from "@/utils/Logo";
import usertypeshape from "@/assets/shapes/usertypeshape.png";
import circleshape from "@/assets/shapes/circleshape.png";
import Business from "./Business";
import Password from "./Password";
import SuccessPage from "./Success";
import Signup from "./Signup";
import { useForm } from "react-hook-form";

export default function ClientForm() {
  const [step, setStep] = useState(1);
  const { register, handleSubmit, setValue, getValues } = useForm();

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  const onSubmit = (data: any) => {
      console.log({ ...data });
      setStep(4)
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
        <div className="absolute top-0 left-0 mt-7 ml-28">
          <Logo />
        </div>

        {step === 1 && (
          <Signup
            register={register}
            handleNext={handleNext}
            getValues={getValues}
            setValue={setValue}
          />
        )}
        {step === 2 && (
          <Business
            register={register}
            handleNext={handleNext}
            getValues={getValues}
            setValue={setValue}
          />
        )}

        {step === 3 && (
          <Password
            register={register}
            handleNext={handleNext}
            handleSubmit={handleSubmit(onSubmit)}
          />
        )}
        {step === 4 && <SuccessPage />}
      </div>
    </div>
  );
}
