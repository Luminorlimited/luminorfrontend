"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { AvatarIcon, SignUpIcon } from "@/utils/Icons";
import { navbarLinks } from "@/utils/navbarData";
import { ChevronDown, Text } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
// import { BiMessage } from "react-icons/bi";

// import { FaRegHeart } from "react-icons/fa";
// import { GoBell } from "react-icons/go";
import { useState } from "react";
import demoimg from '@/assets/images/demoimg.png'
// import jwt, { JwtPayload } from "jsonwebtoken";
import { useDispatch } from "react-redux";
import { logOut } from "@/redux/ReduxFunction";
import { useRouter } from "next/navigation";

interface DecodedToken { 
  decodedToken: any
}

export function MobileNavbar({ decodedToken }: DecodedToken) {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch()
  const router = useRouter();

  // console.log('my token is', decodedToken);

  const handleLogOut = () => {
    dispatch(logOut())
    // cookies.remove("token")
    router.push('/')
  }
  const [fileBtn, showFileBtn] = useState(false)

  const handleClick = () => {
    setTimeout(() => {
      // showFileBtn(false)
      showFileBtn((prev) => !prev)
    }, 200)
  }

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
            {decodedToken && decodedToken.id ? (

              <div className="flex gap-3 items-center relative">
                {/* <Link href={'/user/editProfile/client'}>
                  <GoBell className="cursor-pointer text-[24px] hover:text-primary" />
                </Link>
                <Link href={'/project-list/professional'}>
                  <FaRegHeart className="cursor-pointer text-[24px] hover:text-primary" />
                </Link>
                <Link href={'/chat'}>
                  <BiMessage className="cursor-pointer text-[24px] hover:text-primary" />
                </Link> */}
                <Image
                  src={demoimg}
                  width={40}
                  height={40}
                  alt="profile"
                  className="rounded-full cursor-pointer hover:opacity-90 transition-all"
                  onClick={handleClick}
                />
                <ul
                  className={`p-2 flex flex-col gap-y-3 rounded-[10px] bg-slate-100 w-[330px] absolute top-10 left-0 transition-all duration-300 ${fileBtn ? "opacity-100 translate-y-0 z-[50]" : "opacity-0 translate-y-5 pointer-events-none z-[10]"
                    }`}
                >
                  <Link href={'/project-details'}>
                    <li className="hover:bg-slate-200 bg-slate-100 text-sm font-medium cursor-pointer py-2 px-2 rounded-[8px]">Project Details</li>
                  </Link>
                  <Link href={decodedToken && decodedToken.id ? `/user/editProfile/${decodedToken.role}/${decodedToken.id}` : '#'}>

                    <li className="hover:bg-slate-200 bg-slate-100 text-sm font-medium cursor-pointer py-2 px-2 rounded-[8px]">Edit Profile</li>
                  </Link>
                  <li onClick={handleLogOut} className="hover:bg-slate-200 bg-slate-100 text-sm font-medium cursor-pointer py-2 px-2 rounded-[8px]">Logout</li>
                </ul>
              </div>
            ) : (
              <div className="flex gap-3">
                <Link
                  className="btn-secondary text-nowrap p-[10px] flex items-center text-textColor-primary hover:text-textColor-primary active:text-textColor-primary"
                  href={"/usertype"}
                >
                  <SignUpIcon />
                  Sign Up
                </Link>

                <Link
                  className="py-[10px] px-5 btn-primary text-white font-medium text-base hover:text-white active:text-white flex items-center gap-2 rounded-full"
                  href={"/user/auth/login"}
                >
                  <AvatarIcon /> Log in
                </Link>

              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
