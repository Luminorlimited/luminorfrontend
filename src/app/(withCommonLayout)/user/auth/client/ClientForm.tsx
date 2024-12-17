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
import { useClientUserMutation } from "@/redux/api/userApi";
import ShowToastify from "@/utils/ShowToastify";
import { useRouter } from "next/navigation";


export default function ClientForm() {
  const [step, setStep] = useState(1);
  const { register, handleSubmit, setValue, getValues } = useForm();

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  const [createClient, { isLoading }] = useClientUserMutation()

    const router = useRouter()


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
    console.log(`my client data: `, clientData)

    try {
      const res = await createClient(clientData);
      if (res?.data) {
        // Adjust condition based on your API's success response format
        ShowToastify({ success: 'Verify your otp' });
        router.push('/user/verification')
      } else {
        throw new Error('Unexpected API response'); // Handle unexpected response structure
      }
    } catch (err) {
      ShowToastify({ error: "Failed to create client user" })
      console.error('Failed to create client:', err);
    }
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
        <div className="absolute top-0 left-0 mt-7 ml-28 lg:block hidden">
          <Logo />
        </div>

        <form onSubmit={handleSubmit(handleSubmitForm)}>
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
              // handleSubmit={handleSubmit(handleSubmitForm)}
            />
          )}
          {step === 4 && <SuccessPage />}
          {isLoading && <p>Loading...</p>} 
       </form>
       
      </div>
    </div>
  );
}
