"use client";

import React, { useState } from "react";
import Button from "@/components/common/Button";
import { PaymentModal } from "@/components/common/modal/PaymentModal";
import { HourlyFeeModal } from "@/components/common/modal/HourlyFeeModal";
import MilestoneModal from "@/components/common/modal/MilestoneModal";
import { MilestoneList } from "@/components/common/modal/MilestoneList";
import ProjectDescModal from "@/components/common/modal/ProjectDescModal";
import { FlatFeeModal } from "@/components/common/modal/FlatFeeModal";
import { useForm } from "react-hook-form";
import io from "socket.io-client"; // Import the socket.io-client
import { toast } from "sonner";

interface projectModalProps {
  onClose: () => void;
  user1: string;
  user2: string;
  // professionalId: string;
}
interface Milestone {
  name: string;
  revisions: string;
  delivery: string;
  price: string;
  description: string;
}
const mysocket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
});

// This function ensures the socket is connected before sending the offer
const sendOfferWithReconnection = (myOffer: any) => {
  // Check if socket is connected
  if (!mysocket.connected) {
    // Listen for 'connect' event to know when it reconnects
    mysocket.on("connect", () => {
      console.log("Reconnected to socket server");
      // Now that we are connected, emit the offer
      mysocket.emit("sendOffer", JSON.stringify(myOffer));
    });

    // Optionally, handle reconnection failure
    mysocket.on("connect_error", (error) => {
      toast.error("Reconnection failed. Please try again later.");
      console.error("Socket connection error:", error);
    });
  } else {
    // If already connected, directly emit the offer
    mysocket.emit("sendOffer", JSON.stringify(myOffer));
  }
};

const ProjectModal: React.FC<projectModalProps> = ({
  onClose,
  user1,
  user2,
}) => {
  // console.log(user1, "check user1 from offer modal ");

  // console.log(user2, "check user 2 from offer modal");

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [open, setOpen] = useState(true);
  const [step, setStep] = useState<number>(1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [socket, setSocket] = useState<any>(null);
  // const totalSteps = 6;
  // const [finalStep, setFinalStep] = useState<any>(null);
  // const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [agreementType, setagreementType] = useState<string | null>(null);
  const [milestones, setMilestones] = React.useState<Milestone[] | undefined>([
    {
      name: "",
      revisions: "",
      delivery: "",
      price: "",
      description: "",
    },
  ]);

  const { register, handleSubmit, getValues, setValue, trigger } = useForm();

  const handleNext = async () => {
    const isValid = await trigger();
    if (isValid && step < getTotalSteps()) {
      setStep(step + 1);
    }
  };
  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  //   useEffect(() => {
  //     const mysocket = io(process.env.NEXT_PUBLIC_SOCKET_URL);
  //     // console.log(mysocket);

  //     mysocket.on("connect", () => {
  //       // console.log("Connected to special socket.io.");
  //       setSocket(mysocket);
  //       mysocket.emit("register", JSON.stringify({ id: user1 }));
  //     });
  //   }, [user1]);
  const [option, setOption] = React.useState("");
  const getTotalSteps = () => {
    if (option === "Flat_Fee") return 3;
    if (option === "Hourly_Fee") return 3;
    if (option === "Milestone") return 4;
    return 3;
  };

  const onSubmit = async (data: any) => {
    try {
      const myOffer = {
        fromEmail: user1,
        toEmail: user2,
        offer: data,
        professionalEmail: user1,
        clientEmail: user2,
      };

      sendOfferWithReconnection(myOffer);

      // Listen for success response
      mysocket.on("sendOfferSuccess", () => {
        toast.success("Offer sent successfully!");
        onClose();
      });

      // Listen for error response
      mysocket.on("sendOfferError", (errorMessage: any) => {
        const errorText =
          typeof errorMessage === "string"
            ? errorMessage
            : errorMessage?.message || "Something went wrong";
        toast.error(errorText);
      });
    } catch (error) {
      console.error("Error sending offer:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={() => setOpen(false)} // Close on backdrop click
    >
      <div
        className="relative shadow-lg w-full max-w-[670px] rounded-[20px] overflow-hidden bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center bg-[#f1f1f1] justify-between border-b p-4">
          <h2 className="text-xl font-semibold">
            {step === 1
              ? "Project Name"
              : step === 2
              ? "Agreed Payment Method"
              : step === 3
              ? "Flat Fee"
              : step === 4
              ? "Hourly Fee"
              : step === 5
              ? "Milestone Fee"
              : step === 6
              ? "Milestone List"
              : ""}
          </h2>
          <button
            className="p-2 text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            ✖
          </button>
        </div>

        <div className="space-y-6 py-4 px-4 max-h-[550px] overflow-y-scroll">
          <form onSubmit={handleSubmit(onSubmit)}>
            {step === 1 ? (
              <ProjectDescModal register={register} />
            ) : step === 2 ? (
              <PaymentModal
                register={register}
                getValues={getValues}
                setStep={setStep}
                setOption={setOption}
                setagreementType={setagreementType}
                setValue={setValue}
                handleNextStep={(nextStep: number) => setStep(nextStep)} // Pass the setter directly
              />
            ) : step === 3 ? (
              <FlatFeeModal
                register={register}
                getValues={getValues}
                // setValue={setValue}
              />
            ) : step === 4 ? (
              <HourlyFeeModal register={register} getValues={getValues} />
            ) : step === 5 ? (
              <MilestoneModal
                handleBack={handleBack}
                register={register}
                handleNext={handleNext}
                milestones={milestones}
                setMileStones={setMilestones}
              />
            ) : step === 6 ? (
              <MilestoneList setStep={setStep} milestones={milestones} />
            ) : (
              <div>Thank You</div>
            )}
            {/* Add other steps' components here */}

            <div className="flex justify-end">
              {step === 1 ? (
                <Button
                  type="button"
                  className="w-[100px] bg-[#6938EF] text-white py-2 rounded-[10px] hover:bg-[#6938EF]/90"
                  onClick={handleNext}
                >
                  Next
                </Button>
              ) : step === 6 ? (
                <div className="flex gap-4 justify-between w-full">
                  <button
                    className="bg-[#eeeeee] text-black px-6 py-4 font-medium rounded-[12px]"
                    onClick={() => setStep(2)}
                  >
                    Back
                  </button>
                  <Button
                    type="submit"
                    className="w-[100px] rounded-[15px] bg-[#6938EF] text-white py-2 hover:bg-[#6938EF]/90"
                  >
                    Submit
                  </Button>
                </div>
              ) : step === 2 ? (
                ""
              ) : step === 5 ? (
                <div className="flex gap-4 justify-between w-full">
                  <button
                    className="bg-[#eeeeee] text-black px-6 py-4 font-medium rounded-[12px]"
                    onClick={() => setStep(2)}
                  >
                    Back
                  </button>
                  <button
                    className="w-[100px] rounded-[15px] bg-[#6938EF] text-white py-2 hover:bg-[#6938EF]/90"
                    onClick={() => setStep(6)}
                  >
                    Next
                  </button>
                </div>
              ) : (
                <div className="flex gap-4 justify-between w-full">
                  <button
                    className="bg-[#eeeeee] text-black px-6 py-4 font-medium rounded-[12px]"
                    onClick={() => setStep(2)}
                  >
                    Back
                  </button>
                  <Button
                    type="submit"
                    className="w-[100px] rounded-[15px] bg-[#6938EF] text-white py-2 hover:bg-[#6938EF]/90"
                  >
                    Submit
                  </Button>
                </div>
              )}
            </div>

            {/* Step Indicator */}
            <div className="flex items-center justify-center gap-2 pt-4">
              {Array.from({ length: getTotalSteps() }, (_, i) => i + 1).map(
                (stepNumber) => (
                  <div key={stepNumber} className="flex items-center">
                    <div
                      className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        stepNumber < step
                          ? "bg-[#34DC48] text-white"
                          : stepNumber === step
                          ? "border-2 border-[#34DC48] text-[#34DC48]"
                          : "border-2 border-gray-200 text-gray-400"
                      }`}
                    >
                      {stepNumber < step ? "✓" : stepNumber}
                    </div>
                    {stepNumber < getTotalSteps() && (
                      <div
                        className={`w-12 h-0.5 ${
                          stepNumber < step ? "bg-[#6938EF]" : "bg-gray-200"
                        }`}
                      />
                    )}
                  </div>
                )
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
