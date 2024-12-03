"use client";

import Link from "next/link";
// import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Users } from "lucide-react";
import Logo from "@/utils/Logo";

export default function Signup() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="">
        <div className="mt-7 ml-28">
          <Logo />
        </div>

        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
          <h1 className="text-[32px] font-semibold ">
            Become a Retired Professional or Client
          </h1>
          <p className="text-textColor-secondary text-base font-normal">
            Click on one of the options below to choose your path and connect to
            the right opportunities
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto mb-8">
          <div className="h-auto p-6 bg-white text-textColor-primary hover:text-white hover:bg-primary rounded-xl border">
            <Link href="/signup/professional" className="space-y-4">
              <User className="text-4xl" />
              <p className="text-2xl font-semibold text-center">
                I&apos;m a Retired Professional, looking for a Client
              </p>
            </Link>
          </div>

          <Button
            variant="outline"
            className="h-auto p-8 hover:bg-gray-50"
            asChild
          >
            <Link href="/signup/client">
              <div className="space-y-4">
                <Users className="w-8 h-8 mx-auto text-[#6C5CE7]" />
                <div className="text-lg font-medium text-gray-900">
                  I&apos;m a Client,
                  <br />
                  looking for a Retired Professional
                </div>
              </div>
            </Link>
          </Button>
        </div>

        <div className="text-center">
          <span className="text-gray-600">Already have an account? </span>
          <Link
            href="/login"
            className="text-[#6C5CE7] hover:underline font-medium"
          >
            Log In →
          </Link>
        </div>
      </div>
    </div>
  );
}
