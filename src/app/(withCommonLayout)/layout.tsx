"use client";
import Footer from "@/components/shared/footer/Footer";
import Navbar from "@/components/shared/navbar/Navbar";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";


const CommonLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();

  return (
    <div>
      {pathname !== "/usertype" &&
      pathname !== "/user/auth/login" &&
      pathname !== "/user/auth/client" &&
      pathname !== "/user/auth/professional" &&
      pathname !== "/user/verification" ? (
        <Navbar />
      ) : (
        ""
      )}

      <div className="text-textColor-primary">{children}</div>
      {pathname !== "/usertype" &&
      pathname !== "/user/auth/login" &&
      pathname !== "/user/auth/client" &&
      pathname !== "/user/auth/professional" &&
      pathname !== "/user/verification" ? (
        <Footer />
      ) : (
        ""
      )}
    </div>
  );
};

export default CommonLayout;
