import Logo from "@/utils/Logo";
import Link from "next/link";
import React, { Fragment, useState } from "react";
import SearchBox from "./SearchBox";
import { navbarLinks } from "@/utils/navbarData";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LanguageSwitcher from "./LanguageSwitcher";
import { AvatarIcon, SignUpIcon } from "@/utils/Icons";
import { Search } from "lucide-react";
import { MobileNavbar } from "./MobileNavbar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { logOut } from "@/redux/ReduxFunction";
import { useRouter } from "next/navigation";
import { BiMessage } from "react-icons/bi";

import { FaRegHeart } from "react-icons/fa";
import { GoBell } from "react-icons/go";
import Image from "next/image";
// import demoimg from '@/assets/images/demoimg.png'
import jwt, { JwtPayload } from "jsonwebtoken";
import { useGetProfileQuery } from "@/redux/api/userApi";
// import { cookies } from "next/headers";



const Navbar = () => {
  const dispatch = useDispatch()
  const router = useRouter();

  interface DecodedToken extends JwtPayload {
    id: string;
   }


  const token = useSelector((state: RootState) => state.Auth.token);

  const decodedToken = token ? (jwt.decode(token) as DecodedToken) : null;
  console.log(decodedToken);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: profileData } = decodedToken ? useGetProfileQuery(decodedToken.id) : { data: null };
  
 const demoimg= profileData?.data?.profileUrl
  


  // const client = useSelector((state: RootState) => state.Auth.client);

  // console.log("my client is", client)

  const handleLogOut = () => {
    dispatch(logOut())
    // cookies().delete("token")
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
    <nav
      className=" p-5 2xl:px-[115px] flex items-center justify-between bg-gradient-to-r from-[#FFC06B1A] via-[#FF78AF1A] to-[#74C5FF1A] shadow-sm border-b"
    >
      {/* <Link href={"/"}> */}
      <span className="lg:w-auto ">
        <Logo />
      </span>
      {/* </Link> */}
      <div className="hidden  lg:block max-[820px]:hidden">
        <SearchBox />
      </div>

      <div className="lg:flex md:flex hidden items-center gap-6">
        <button className="btn-primary text-white rounded-full p-1 hidden ">
          <Search />
        </button>
        <ul className="flex items-center gap-6">
          {navbarLinks?.map((item) => {
            return item?.subMenus ? (
              <li key={item.id}>
                <DropdownMenu>
                  <DropdownMenuTrigger className="" asChild>
                    <button className="flex items-center gap-2 font-medium hover:text-primary">
                      {item?.title} <span>{item.icon && ""}</span>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {item?.subMenus.map((item) => {
                      return (
                        <Fragment key={item.id}>
                          <DropdownMenuGroup>
                            <DropdownMenuItem>
                              <Link href={item.link} className="text-base">
                                {item.title}
                              </Link>
                            </DropdownMenuItem>
                          </DropdownMenuGroup>
                          <DropdownMenuSeparator />
                        </Fragment>
                      );
                    })}
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
            ) : (
              <li key={item.id}>
                <Link
                  className="font-medium hover:text-primary"
                  href={item.link}
                >
                  {item.title}
                </Link>
              </li>
            );
          })}
        </ul>
        <LanguageSwitcher />
        {decodedToken && decodedToken.id ? (

            <div className="flex gap-3 items-center relative">
            <Link href={'/user/editProfile/client'}>
              <GoBell className="cursor-pointer text-[24px] hover:text-primary" />
            </Link>
            <Link href={`/project-list/${decodedToken.role}`}>
              <FaRegHeart className="cursor-pointer text-[24px] hover:text-primary" />
            </Link>
            <Link href={'/chat'}>
              <BiMessage className="cursor-pointer text-[24px] hover:text-primary" />
            </Link>
            <Image 
              src={demoimg} 
              width={40} 
              height={40} 
              alt="profile" 
              className="rounded-full cursor-pointer hover:opacity-90 transition-all" 
              onClick={handleClick} 
            />
            <ul
              className={`p-2 flex flex-col gap-y-3 rounded-[10px] bg-white w-[120px] absolute top-14 right-0 transition-all duration-300 ${
              fileBtn ? "opacity-100 translate-y-0 z-[50]" : "opacity-0 translate-y-5 pointer-events-none z-[10]"
              }`}
            >
              <Link href={'/project-details'}>
              <li className="hover:bg-slate-100 bg-white text-sm font-medium cursor-pointer">Project Details</li>
              </Link>
              <Link href={decodedToken && decodedToken.id ? `/user/editProfile/${decodedToken.role}/${decodedToken.id}` : '#'}>
                
              <li className="hover:bg-slate-100 bg-white text-sm font-medium cursor-pointer">Edit Profile</li>
              </Link>
              <li onClick={handleLogOut} className="hover:bg-slate-100 bg-white text-sm font-medium cursor-pointer">Logout</li>
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
      <div className="lg:hidden block">
        <MobileNavbar decodedToken={decodedToken} />
      </div>
    </nav>
  );
};

export default Navbar;
