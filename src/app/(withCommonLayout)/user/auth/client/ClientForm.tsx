"use client";
import { useState } from "react";
import Image from "next/image";
import Logo from "@/utils/Logo";
import usertypeshape from "@/assets/shapes/usertypeshape.png";
import circleshape from "@/assets/shapes/circleshape.png";
import Business from "./Business";
import Password from "./Password";
import Signup from "./Signup";
import { useForm } from "react-hook-form";
import { useClientUserMutation } from "@/redux/Api/userApi";
import Stepper from "./Stepper";
import SuccessPage from "./Success";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/ReduxFunction";
import { toast } from "sonner";


export default function ClientForm() {
  const [step, setStep] = useState(1);
  const { register, handleSubmit, setValue, getValues } = useForm();
  const [createClient, { isLoading }] = useClientUserMutation();

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);
  const dispatch = useDispatch();

  const handleSubmitForm = async (data: any) => {
    const clientData = {
      name: {
        firstName: data.firstName,
        lastName: data.lastName,
      },
      email: data.email,
      password: data.password,
      dateOfBirth: data.dob,
      phoneNumber: data.phone,
      businessType: data.businessType,
      jobTitle: data.jobTitle,
      role: 'client',
      linkedinProfile: data.linkedIn,
    };

    try {
      const res: any = await createClient(clientData);
      if (res?.data) {
        toast.success("Successfully Created your Account")

        dispatch(
          setUser({
            user: {
              id: data.id || "",
              name: data.name || "",
              email: data.email || "",
              role: data.role || "",
              photoUrl: data.photoUrl || "",
            },
            token: data.accessToken || null,
          })
        );


        setStep(4)
      } else {

        toast.error(res?.error?.data?.message)
      }
    } catch (err) {
      console.error("An error occurred:", err);
    }
  };

  return (
    <div className="relative">
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

      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <div className="flex justify-center items-center min-h-screen z-10 relative">
          <div className="max-w-[870px] w-full px-4 py-8 md:px-6 flex-shrink-0">
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
                handleBack={handleBack}
                getValues={getValues}
                setValue={setValue}
              />
            )}
            {step === 3 && (
              <Password
                register={register}
                handleBack={handleBack}

                handleNext={handleNext}
              />
            )}
            {step === 4 && (
              <SuccessPage />
            )}
            <Stepper currentStep={step} setStep={setStep} />
            {isLoading && <p>Loading...</p>}
          </div>
        </div>
      </form>
    </div>
  );
}