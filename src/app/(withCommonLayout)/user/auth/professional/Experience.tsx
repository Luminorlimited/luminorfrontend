"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


export default function Experience({ register, handleNext }: any) {



  // const handleFormSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   const data = {
  //     industry: getValues("industry"),
  //     prevPos: [
  //       getValues("prevPos1"),
  //       getValues("prevPos2"),
  //       getValues("prevPos3")
  //     ],
  //     references: [
  //       {
  //         name: getValues("refName1"),
  //         emailOrPhone: getValues("refcontact1")
  //       },
  //       {
  //         name: getValues("refName2"),
  //         emailOrPhone: getValues("refcontact2")
  //       }
  //     ]
  //   };
  //   handleNext(data);
  // };

  return (
      <div >
        <div className="space-y-2 text-center lg:mt-0 mt-6">
          <h1 className="text-[32px] font-semibold tracking-tight md:text-4xl text-[#1D1F2C]">
            Join Luminor Today
          </h1>
          <h2 className="mb-1 font-medium text-[16px] text-gray-600">Sign up as a professional</h2>

          <p className="text-sm text-muted-foreground text-[#777980]">Empower Your Journey</p>
        </div>
        <div className="flex flex-col space-y-3">

          <div className="space-y-2">
            <Label htmlFor="industry">Industry</Label>
            <select
              id="industry"
              {...register("industry")}
              // multiple
              className="h-12 rounded-xl border cursor-pointer w-full px-3"
            >
              <option value="" disabled selected>
                Select Previous Position
              </option>
              <option value="tech">Tech</option>
              <option value="marketing">marketing</option>
              <option value="financer">finance</option>

            </select>
          </div>

          <div className="flex flex-col gap-y-[12px]">
            <Label htmlFor="prevPosistion">
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
            <div className="flex lg:flex-row md:flex-row flex-col gap-4">
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
                  Reference Email/Phone Number
                </Label>
                <Input
                  id="refcontact1"
                  placeholder="Reference Email/Phone Number"
                  {...register("refcontact1")}
                  className="h-12 rounded-xl border-[#E5E7EB]"
                />
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex lg:flex-row md:flex-row flex-col gap-4">
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
                  Reference Email/Phone Number
                </Label>
                <Input
                  id="refcontact2"
                  placeholder="Reference Email/Phone Number"
                  {...register("refcontact2")}
                  className="h-12 rounded-xl border-[#E5E7EB]"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="py-2">
          <Button
            onClick={handleNext}
            className="h-12 rounded-xl bg-primary text-white hover:bg-[#6D28D9] px-[50px]"
            type="button"
          >
            Next
          </Button>
        </div>
        {/* </form> */}
        {/* <div className="flex items-center justify-center gap-2 pt-8">
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
        </div> */}
      </div>
  );
}
