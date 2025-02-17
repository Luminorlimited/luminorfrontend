"use client";
import Footer from "@/components/shared/footer/Footer";
import Navbar from "@/components/shared/navbar/Navbar";
import { useGetProfileQuery } from "@/redux/Api/userApi";
import { RootState } from "@/redux/store";
import { usePathname } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";
import { useSelector } from "react-redux";


const CommonLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const { data: getprofile } = useGetProfileQuery(undefined)
  // console.log(getprofile, " my data ");
  const [showAlert, setShowAlert] = useState(false);

  const handleClose = () => {
    setShowAlert((prev) => !prev);
  };

  // console.log(
  // "GEtprofile acitvation",
  //   getprofile?.data?.client?.isActivated
  // );

// console.log(
// "retire acitvation",
//   getprofile?.data?.retireProfessional?.isActivated
//   );





useEffect(() => {
  if (getprofile?.data?.client?.isActivated || getprofile?.data?.retireProfessional?.isActivated) {
    setShowAlert(false)
  }
  else {
    setShowAlert(true)
  }

}, [getprofile?.data?.client?.isActivated, getprofile?.data?.retireProfessional?.isActivated])
const user = useSelector((state: RootState) => state.Auth.user?.role)
  console.log("my role is", getprofile);

return (
  <div>
    {(user === "client" || user === "retireProfessional") && showAlert ? (
      <div
        className="bg-yellow-100 border border-yellow-400 text-bg_primary px-4 py-3 rounded relative"
        role="alert"
      >
        <strong className="font-bold">
          Hi {getprofile?.data?.client?.name?.firstName || getprofile?.data?.retireProfessional?.name?.firstName}!!!
        </strong>
        <span className="block sm:inline">
          Your account is currently under review and your status will be updated soon. Please wait 3-5 days.
        </span>
        <span onClick={handleClose} className="absolute top-0 bottom-0 right-0 px-4 py-3 cursor-pointer">
          <svg
            className="fill-current h-6 w-6 text-yellow-800"
            role="button"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <title>Close</title>
            <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
          </svg>
        </span>
      </div>
    ) : null}

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
