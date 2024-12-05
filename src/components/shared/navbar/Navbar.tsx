import Logo from "@/utils/Logo";
import Link from "next/link";
import React, { Fragment } from "react";
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

const Navbar = () => {
  return (
    <nav
      className="py-6 p-5 2xl:px-[115px] flex items-center justify-between bg-gradient-to-r from-[#FFC06B1A] via-[#FF78AF1A] to-[#74C5FF1A] shadow-sm border-b"
    >
      <Link href={"/"}>
        <span className="lg:w-auto w-10">
          <Logo />
        </span>
      </Link>
      <div className="2xl:block hidden">
        <SearchBox />
      </div>
      <div className="lg:flex hidden items-center gap-6">
        <button className="btn-primary text-white rounded-full p-1 2xl:hidden block">
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
      <div className="lg:hidden block">
        <MobileNavbar />
      </div>
    </nav>
  );
};

export default Navbar;
