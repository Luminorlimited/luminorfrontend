import { Check } from "lucide-react";
import Link from "next/link";


export default function SuccessPage() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="max-w-[870px] w-full px-4 py-8 md:px-6 flex-shrink-0">
        <div className="bg-green-500 rounded-full p-4 w-24 h-24 mx-auto">
          <Check className="w-full h-full text-white" strokeWidth={3} />
        </div>

        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-semibold pt-6 tracking-tight">
            Congratulations!
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed py-8">
            You&apos;ve successfully signed in! Explore Luminor&apos;s network
            of Retired Professionals and start connecting to fuel your business
            growth
          </p>

          <Link href="/user/auth/login" className="text-center font-semibold">
            Go to Login page
          </Link>
        </div>
      </div>
    </div>
  );
}
