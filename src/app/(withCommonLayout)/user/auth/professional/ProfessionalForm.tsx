"use client";
import { useState } from "react";
import Image from "next/image";
import Logo from "@/utils/Logo";
import usertypeshape from "@/assets/shapes/usertypeshape.png";
import circleshape from "@/assets/shapes/circleshape.png";
import Password from "./Password";
import SuccessPage from "./Success";
import Signup from "./Signup";
import { useForm } from "react-hook-form";
import Experience from "./Experience";
import Education from "./Education";
import ShowToastify from "@/utils/ShowToastify";
import { IProfessional } from "@/utils/Interfaces";
import { useProfessionalUserMutation } from "@/redux/api/userApi";

export default function ProfessionalForm() {
  const [step, setStep] = useState(1);
  const { register, handleSubmit, setValue, getValues } = useForm();

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };
  const [createProfessional] = useProfessionalUserMutation()


  const handleSubmitProfessionalForm = async (data: any) => {
    // data.preventDefault()



    const professionalData: IProfessional = {
      name: {
        firstName: data.firstName,
        lastName: data.lastName,
      },
      dateOfBirth: new Date(data.dob),
      email: data.email,
      phoneNumber: data.phone,
      role: 'retireProfessional',
      password: data.password,

      previousPositions: data.prevPos1
        ? [
          data.prevPos1,
          data.prevPos2,
          data.prevPos3
        ]
        : [],

      references: [
        { name: data.refName1, emailOrPhone: data.refcontact1 },
        { name: data.refName2, emailOrPhone: data.refcontact2 },
      ],
      educationalBackground: data.edubackground,
      relevantQualification: data.eduqualification,
      technicalSkill: data.skills,
      linkedinProfile: data.linkedIn,
      cvOrCoverLetter: data.file,
      industry: data.industry || [],
      businessType: data.businessType,
    };

    console.log(`Professional data:`, professionalData);
    console.log(data, "from data")

    try {
     
        const res = await createProfessional(professionalData);
        if (res?.data) {
          // Adjust condition based on your API's success response format
          ShowToastify({ success: 'Professional created successfully!' });
          setStep(5); // Navigate to success page
        
      } else {
        throw new Error('Unexpected API response'); // Handle unexpected response structure
      }
    } catch (err) {
      ShowToastify({ error: "Failed to create professional user" });
      console.error('Failed to create professional:', err);
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
        <form onSubmit={handleSubmit(handleSubmitProfessionalForm)}>

          {step === 1 && (
            <Signup
              register={register}
              handleNext={handleNext}
              getValues={getValues}
              setValue={setValue}
            />
          )}
          {step === 2 && (
            <Experience
              register={register}
              handleNext={handleNext}
              getValues={getValues}
              setValue={setValue}
            />
          )}
          {step === 3 && (
            <Education
              register={register}
              handleNext={handleNext}
              getValues={getValues}
              setValue={setValue}
            />
          )}

          {step === 4 && (
            <Password
              register={register}
              handleNext={handleNext}
            />
          )}
          {step === 5 && <SuccessPage />}
        </form>
      </div>
    </div>
  );
}
