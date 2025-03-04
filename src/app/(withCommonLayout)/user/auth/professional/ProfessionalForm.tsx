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
import { useProfessionalUserMutation } from "@/redux/Api/userApi";
import SuccessPage from "./Success";
import { toast } from "sonner";
// import { useRouter } from "next/navigation";

export default function ProfessionalForm() {
  const [step, setStep] = useState(1);
  const { register, handleSubmit, setValue, getValues, control, watch } = useForm();
  const [loading, setLoading] = useState(false);

  const [createProfessional] = useProfessionalUserMutation();

  // const router = useRouter();
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState<{ password?: string; confirmPassword?: string }>({});

  const handleSubmitProfessionalForm = async (data?: any) => {
    const formData = new FormData();

    const nameData = {
      firstName: data.firstName,
      lastName: data.lastName,
    };
    formData.append("name", JSON.stringify(nameData));
    formData.append("dateOfBirth", data.dob);
    formData.append("email", data.email);
    formData.append("phoneNumber", data.phone);
    formData.append("role", "retireProfessional");
    formData.append("password", data.password);



    const validatePassword = () => {
      const newErrors: { password?: string; confirmPassword?: string } = {};

      if (!data.password) {
        newErrors.password = "Password is required.";
      } else if (!/(?=.*[A-Z])(?=.*\d).{8,}/.test(data.password)) {
        newErrors.password =
          "Password must include at least 8 characters, one uppercase letter, and one number.";
      }

      if (!confirmPassword) {
        newErrors.confirmPassword = "Confirm Password is required.";
      } else if (data.password !== confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match.";
      }

      setErrors(newErrors);

      // Return true if no errors
      return Object.keys(newErrors).length === 0;
    };


    if (data.file && data.file[0]) {
      formData.append("cvOrCoverLetter", data.file[0]);
    }

    const previousPositions = [
      data.prevPos1,
      data.prevPos2,
      data.prevPos3,
    ].filter(Boolean);
    previousPositions.forEach((pos, index) =>
      formData.append(`previousPositions[${index}]`, pos)
    );

    const references = [
      { name: data.refName1, emailOrPhone: data.refcontact1 },
      { name: data.refName2, emailOrPhone: data.refcontact2 },
    ];
    references.forEach((ref, index) => {
      formData.append(`references[${index}][name]`, ref.name);
      formData.append(`references[${index}][emailOrPhone]`, ref.emailOrPhone);
    });

    formData.append("educationalBackground", data.edubackground);
    formData.append("relevantQualification", data.eduqualification);
    
    // console.log("data is", data);
    // Append technical skills as an array
    if (Array.isArray(data.technicalSkill)) {
      data.technicalSkill.forEach((technicalSkill: string, index: number) => {
        formData.append(`technicalSkill[${index}]`, technicalSkill);
      });
    } else if (data.technicalSkill) {
      formData.append("technicalSkill[0]", data.technicalSkill);
    }

    formData.append(`industry`, data.industry);

    formData.append("businessType", data.businessType);
    setLoading(true);

    try {
      if (validatePassword()) {
        const res: any = await createProfessional(formData);
        // console.log("my formdata", formData);
        // console.log("my response", res);
        if (res?.data) {
         

          // console.log("Form submitted successfully:", res.data);
          toast.success("Form submitted successfully!");
          setStep(5);
          // router.push("/user/auth/login");
        } else {
          // console.log("FormData content:", res?.error?.data?.message); // Log FormData content
          toast.error(res?.error?.data?.errorMessages?.[0].message);
          // console.log();
          setLoading(false);
        }

      }
    } catch (error) {
      console.error("An error occurred:", error);

      toast.error("An error occurred while submitting the form.");
    } finally {
      setLoading(false); // Stop loading after the operation
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
        <div className="absolute top-0 left-0 mt-7 ml-28 lg:block hidden z-[999]">
          <Logo />
        </div>
        <form
          onSubmit={handleSubmit(handleSubmitProfessionalForm)}
          encType="multipart/form-data"
        >
          {/* Render Stepper on all steps */}

          <div className="flex justify-center items-center min-h-screen z-10 relative">
            <div className="max-w-[870px] w-full px-4 py-8 md:px-6 flex-shrink-0">
              {step === 1 && (
                <Signup
                  register={register}
                  handleNext={() => setStep(2)}
                  getValues={getValues}
                  control={control}
                  setValue={setValue}
                  watch={watch}


                />
              )}
              {step === 2 && (
                <Experience
                  register={register}
                  handleNext={() => setStep(3)}
                  handleBack={() => setStep(1)}
                  getValues={getValues}
                  setValue={setValue}
                />
              )}
              {step === 3 && (
                <Education
                  register={register}
                  handleNext={() => setStep(4)}
                  handleBack={() => setStep(2)}
                  getValues={getValues}
                  setValue={setValue}
                />
              )}
              {step === 4 && (
                <Password
                  register={register}
                  confirmPassword={confirmPassword}
                  handleBack={() => setStep(3)}
                  loading={loading}
                  errors={errors}
                  setConfirmPassword={setConfirmPassword}
                  handleNext={() => setStep(5)}
                />
              )}
              {step === 5 && <SuccessPage />}
              <Stepper currentStep={step} setStep={setStep} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
