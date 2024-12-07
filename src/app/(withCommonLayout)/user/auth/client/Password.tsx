import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Circle, CheckCircle2 } from "lucide-react";

type PasswordProps = {
  handleNext: () => void;
  handleSubmit: (e: React.FormEvent) => void;
};

export default function Password({ handleNext, handleSubmit }: PasswordProps) {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="max-w-[870px] w-full px-4 py-8 md:px-6 flex-shrink-0">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">
            Join Luminor Today
          </h1>
          <p className="text-gray-500">Sign up as a Client</p>
          <p className="text-gray-500">Empower Your Journey</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-700">
              Password *
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="********"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-password" className="text-gray-700">
              Confirm password
            </Label>
            <Input
              id="confirm-password"
              type="password"
              placeholder="********"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                className="border-[#6C3CE1] data-[state=checked]:bg-[#6C3CE1] data-[state=checked]:text-white"
              />
              <label
                htmlFor="terms"
                className="text-sm text-gray-600 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I agree to terms and condition
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="marketing"
                className="border-[#6C3CE1] data-[state=checked]:bg-[#6C3CE1] data-[state=checked]:text-white"
              />
              <label
                htmlFor="marketing"
                className="text-sm text-gray-600 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I agree to email marketing
              </label>
            </div>
          </div>

          <Button
            type="submit"
            className="w-28 bg-[#6C3CE1] hover:bg-[#5B32C2] text-white"
          >
            Done
          </Button>

          <div className="flex items-center justify-center space-x-2 pt-8">
            <CheckCircle2 className="w-5 h-5 text-[#6C3CE1] fill-[#6C3CE1]" />
            <div className="w-8 h-0.5 bg-[#6C3CE1]" />
            <CheckCircle2 className="w-5 h-5 text-[#6C3CE1] fill-[#6C3CE1]" />
            <div className="w-8 h-0.5 bg-[#6C3CE1]" />
            <div className="w-5 h-5 rounded-full border-2 border-[#6C3CE1] flex items-center justify-center text-[#6C3CE1] text-sm">
              3
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
