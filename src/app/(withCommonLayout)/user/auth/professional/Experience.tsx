"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { FaCheck } from "react-icons/fa";

export default function Experience({ register, handleNext, getValues }: any) {
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      industry: getValues("industry"),
      prevPos: [
        getValues("prevPos1"),
        getValues("prevPos2"),
        getValues("prevPos3"),
      ],
      reference1: [getValues("refName1"), getValues("refcontact1")],
      reference2: [getValues("refName2"), getValues("refcontact2")],
    };
    handleNext(data);
  };

  return (
    <div className="flex justify-center items-center min-h-screen z-10 relative">
      <div className="max-w-[870px] w-full px-4 py-8 md:px-6 flex-shrink-0">
        <div className="space-y-2 text-center lg:mt-0 mt-40">
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Join Luminor Today
          </h1>
          <h2 className="text-xl text-muted-foreground md:text-2xl">
            Sign up as a Client
          </h2>
          <p className="text-lg text-muted-foreground">Empower Your Journey</p>
        </div>
        <form className="mt-8 space-y-2" onSubmit={handleFormSubmit}>
          <div className="space-y-2">
            <Label htmlFor="industry">Industry</Label>
            <select
              id="industry"
              {...register("industry")}
              required
              className="h-12 rounded-xl border cursor-pointer w-full px-3"
            >
              <option value="" disabled selected>
                Select Previous Position
              </option>
              <option value="Software Developer">Software Developer</option>
              <option value="Frontend Developer">Frontend Developer</option>
              <option value="Backend Developer">Backend Developer</option>
              <option value="Full Stack Developer">Full Stack Developer</option>
              <option value="Project Manager">Project Manager</option>
              <option value="Designer">Designer</option>
            </select>
          </div>

          <div>
            <Label htmlFor="prevPosistion" className="pb-6">
              Previous Positions (at least last 3) *
            </Label>
            <Input
              // id="prevPosistion"
              placeholder="Previous Position 1"
              required
              {...register("prevPos1")}
              className="h-12 rounded-xl border-[#E5E7EB]"
            />
            <Input
              // id="prevPosistion"
              placeholder="Previous Position 2"
              required
              {...register("prevPos2")}
              className="h-12 rounded-xl my-2 border-[#E5E7EB]"
            />
            <Input
              // id="prevPosistion"
              placeholder="Previous Position 3"
              required
              {...register("prevPos3")}
              className="h-12 rounded-xl border-[#E5E7EB]"
            />
          </div>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="space-y-2 w-full">
                <Label htmlFor="reference-name">Reference name 1</Label>
                <Input
                  id="reference-name"
                  placeholder="Reference name 1"
                  required
                  {...register("refName1")}
                  className="h-12 rounded-xl border-[#E5E7EB]"
                />
              </div>
              <div className="space-y-2 w-full">
                <Label htmlFor="refcontact1">
                  reference email/phone number
                </Label>
                <Input
                  id="refcontact1"
                  placeholder="reference email/phone number"
                  {...register("refcontact1")}
                  className="h-12 rounded-xl border-[#E5E7EB]"
                />
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="space-y-2 w-full">
                <Label htmlFor="reference-name">Reference name 2</Label>
                <Input
                  id="reference-name"
                  placeholder="Reference name 2"
                  required
                  {...register("refName2")}
                  className="h-12 rounded-xl border-[#E5E7EB]"
                />
              </div>
              <div className="space-y-2 w-full">
                <Label htmlFor="refcontact2">
                  reference email/phone number
                </Label>
                <Input
                  id="refcontact2"
                  placeholder="reference email/phone number"
                  {...register("refcontact2")}
                  className="h-12 rounded-xl border-[#E5E7EB]"
                />
              </div>
            </div>
          </div>
          <Button
            className="h-12 w-full rounded-xl bg-[#7C3AED] text-white hover:bg-[#6D28D9]"
            type="submit"
          >
            Next
          </Button>
        </form>
        <div className="flex items-center justify-center gap-2 pt-8">
          <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 text-white bg-[#34DC48] border-[#34DC48]">
            <FaCheck />
          </div>
          <div className="h-[2px] w-12 bg-[#1877F2]" />
          <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#1877F2] text-[#1877F2]">
            2
          </div>
          <div className="h-[2px] w-12 bg-gray-200" />
          <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-200 text-gray-400">
            3
          </div>
          <div className="h-[2px] w-12 bg-gray-200" />
          <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-200 text-gray-400">
            4
          </div>
        </div>
      </div>
    </div>
  );
}
