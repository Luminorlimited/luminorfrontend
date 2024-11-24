import Logo from "@/utils/Logo";
import Link from "next/link";
import React from "react";
import SearchBox from "./SearchBox";

const Navbar = () => {
  return (
    <nav className="py-6 px-[115px] flex items-center justify-between ">
      <Link href={"/"}>
        <Logo />
      </Link>
      <SearchBox />
      <div className="">fdf</div>
    </nav>
  );
};

export default Navbar;
