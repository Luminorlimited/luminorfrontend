"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { AvatarIcon, SignUpIcon } from "@/utils/Icons";
import { navbarLinks } from "@/utils/navbarData";
import { ChevronDown, Text } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function MobileNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="text-primary">
          <Text />
        </button>
      </SheetTrigger>
      <SheetContent>
        <div className="grid gap-4 py-4">
          <ul className="flex flex-col gap-4 w-full">
            {navbarLinks?.map((item, index) => {
              return item?.subMenus ? (
                <li key={index} className="w-full ">
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    key={index}
                    className="flex items-center w-full gap-2 justify-between hover:text-primary "
                  >
                    {item.title}{" "}
                    <span>
                      <ChevronDown />
                    </span>
                  </button>
                  <div
                    style={{
                      opacity: isOpen ? 1 : 0,
                      height: isOpen ? "auto" : 0,
                      visibility: isOpen ? "visible" : "hidden",
                      transition:
                        "height 0.10s ease-in-out, opacity 0.20s ease-in-out",
                    }}
                  >
                    <ul className="p-3 bg-gray-50 flex flex-col gap-3">
                      {item.subMenus.map((subItem, subIndex) => (
                        <li key={subIndex} className="w-full">
                          <Link
                            className="hover:text-primary"
                            href={subItem.link}
                          >
                            {subItem.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ) : (
                <li key={index} className="w-full">
                  <Link className="hover:text-primary" href={item.link}>
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="flex items-center flex-wrap gap-4">
            <Link
              className="btn-secondary text-nowrap p-[10px] flex items-center text-textColor-primary hover:text-textColor-primary active:text-textColor-primary"
              href={"/sign-up"}
            >
              <SignUpIcon />
              Sign Up
            </Link>
            <Link
              className="py-[10px] px-5 btn-primary text-white font-medium text-base hover:text-white active:text-white flex items-center gap-2 rounded-full"
              href={"/login"}
            >
              <AvatarIcon /> Login
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
