import Logo from "@/utils/Logo";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
// import SearchBox from "./SearchBox";
import { navbarLinks } from "@/utils/navbarData";
import { CiLogin } from "react-icons/ci";
import { IoLogInOutline } from "react-icons/io5";

import { MobileNavbar } from "./MobileNavbar";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "@/redux/ReduxFunction";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { useGetProfileQuery } from "@/redux/Api/userApi";
import demoprofile from "@/assets/placeholderimg.png";
import Cookies from "js-cookie";
import { FaRegMessage } from "react-icons/fa6";
import { RootState } from "@/redux/store";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  // useGetNotificationQuery,
  useSeenNotificationMutation,
} from "@/redux/Api/messageApi";
import { LuMessageSquareMore } from "react-icons/lu";
import { LuBellRing } from "react-icons/lu";
// import { useDecodedToken } from "@/components/common/DecodeToken";

interface Notification {
  toUser: string; // ID of the recipient user
  message: string; // Notification message
  fromUser: string; // ID of the sender user
  notificationId: string;
  orderId: string; // ID of the sender user
  _id: string; // ID of the notification
  type: "offer" | "delivery" | string; // Type of notification (e.g., offer, message, etc.)
  status: string; // Notification status
  count: number; // Number of notifications (e.g., unread count)
}

const Navbar = ({
  allNotification,
  getAllNotification,
}: {
  allNotification: Notification;
  getAllNotification: any;
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [seenNotification] = useSeenNotificationMutation({});

  const user = useSelector((state: RootState) => state.Auth.user);

  const { data: profileData } = useGetProfileQuery({});

  const handleLogOut = () => {
    dispatch(logOut());
    Cookies.remove("token");
    window.location.href = "/"; // This does a full page reload to the homepage
  };
  
  // console.log("my profile is", profileData);
  useEffect(() => {
    if (profileData?.data?.client?.isDeleted) {
      handleLogOut();
    }
  }, [profileData]);

  // State for dropdown menu visibility
  const [fileBtn, showFileBtn] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement | null>(null);

  // console.log("notification", getAllNotification);

  // console.log("allnotification", getAllNotification);
  // const user = useSelector((state: RootState) => state.Auth.user?.role || ''); // Get the user's role

  const handleSeenButton = (notificationId: string, sender: string) => {
    console.log("notification", notificationId);
    if (!notificationId) return;
    seenNotification(notificationId)
      .unwrap()
      .then(() => {
        // console.log("Notification marked as seen");
        router.push(`/chat/${sender}`);
      })
      .catch((error) => {
        console.error("Failed to mark notification as seen", error);
      });
  };

  const handleClick = () => {
    showFileBtn((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as Node;

    // Close the profile dropdown if clicking outside
    if (dropdownRef.current && !dropdownRef.current.contains(target)) {
      showFileBtn(false);
    }
  };

  const menus = navbarLinks(user as any);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [open, setOpen] = useState(false);

  const handleOrder = (orderId: any) => {
    if(user?.role === "client"){

      router.push(`/project/${orderId}`);
    }else{
      
      router.push(`/deliver-details/${orderId}`);
    }
  };
  // console.log(getAllNotification?.data?.result);

  // console.log("my count is", allNotification);

  const mergedNotifications = [
    ...(Array.isArray(allNotification) ? allNotification : []),
    ...(getAllNotification?.data?.result || []),
  ];

  
  // Remove duplicates based on _id (optional but ideal)
  const uniqueNotifications = Array.from(
    new Map(mergedNotifications.map((item) => [item._id, item])).values()
  );
  console.log(allNotification,
    getAllNotification);
  return (
    <nav className="p-5 2xl:px-[115px] flex items-center justify-between bg-gradient-to-r from-[#FFC06B1A] via-[#FF78AF1A] to-[#74C5FF1A] shadow-sm border-b">
      <span className="lg:w-auto">
        <Logo />
      </span>

      {/* Search Box */}
      {/* <div className="hidden lg:block max-[820px]:hidden">
        <SearchBox />
      </div> */}

      {/* Navbar Links */}
      <div className="lg:flex md:flex hidden items-center gap-6">
        <ul className="flex items-center gap-6">
          {menus.map((item) =>
            item?.subMenus ? (
              <li key={item.id}>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-2 font-medium hover:text-primary">
                      {item.title}
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent></DropdownMenuContent>
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
            )
          )}
        </ul>
        {/* <LanguageSwitcher /> */}

        {/* User Section */}

        {user ? (
          <div className="flex gap-3 items-center">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <div className="cursor-pointer transition-colors group relative hover:fill-primary border  rounded-full p-2 hover:border-primary mr-2">
                    <Bell className="group-hover:fill-primary" />
                  </div>

                  {allNotification?.count > 0 && (
                    <span className="absolute -top-1 rounded-full p-2 bg-red-700 text-white -right-1 h-5 w-5 flex items-center justify-center text-sm bg-destructive text-destructive-foreground">
                      {allNotification?.count}
                    </span>
                  )}
                  <span className="sr-only">Toggle notifications</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[450px] p-0" align="end">
                <Card className="border-0 shadow-none">
                  <CardHeader className="border-b p-4 pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Notifications</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0 max-h-[300px] overflow-auto">
                    {/* {getAllNotification?.data?.count > 0 ? ( */}
                    <div className="px-3">
                      <ul className="space-y-2">
                        {uniqueNotifications.map((item: any, index: number) => (
                          <li key={item?._id || index}>
                            <button
                              onClick={
                                item?.orderId
                                  ? () => handleOrder(item.orderId)
                                  : () =>
                                      handleSeenButton(item._id, item.sender)
                              }
                              type="button"
                              className={cn(
                                "group flex items-center gap-4 rounded-lg p-4 transition-all hover:bg-gray-100 shadow-sm w-full"
                              )}
                            >
                              {/* Icon */}
                              <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                                {item?.type === "offer" ? (
                                  <Bell className="h-5 w-5" />
                                ) : item?.type === "privateMessage" ? (
                                  <LuMessageSquareMore className="h-5 w-5" />
                                ) : (
                                  <LuBellRing className="h-5 w-5" />
                                )}
                                {item?.status === "unseen" && (
                                  <span className="absolute top-0 right-0 h-3 w-3 rounded-full bg-red-500"></span>
                                )}
                              </div>

                              {/* Message */}
                              <div className="flex-1 overflow-hidden justify-start">
                                <p className="text-left text-sm font-medium text-foreground group-hover:text-primary">
                                  {item?.message}
                                </p>
                              </div>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                    {/* // ) : ( */}
                    {/* <div className="p-8 text-center text-muted-foreground">No notifications</div> */}
                    {/* // )} */}
                  </CardContent>
                </Card>
              </PopoverContent>
            </Popover>
            <div className="flex gap-3 items-center relative" ref={dropdownRef}>
              <Link
                title="Chat"
                href={"/chat"}
                className="cursor-pointer transition-colors group relative hover:fill-primary border rounded-full p-2 hover:border-primary mr-2"
              >
                {" "}
                <FaRegMessage className="group-hover:fill-primary" />
              </Link>

              <div
                ref={notificationRef}
                className="w-[40px] h-[40px] cursor-pointer"
              >
                <Image
                  src={profileData?.data?.profileUrl ?? demoprofile.src}
                  width={40}
                  height={40}
                  alt="profile"
                  className="rounded-full cursor-pointer w-full h-full  hover:opacity-90 transition-all"
                  onClick={handleClick}
                />
                <ul
                  className={`p-2 flex flex-col gap-y-3 rounded-[10px] bg-white w-[120px] absolute top-10 right-0 transition-all duration-300 ${
                    fileBtn
                      ? "opacity-100 translate-y-0 z-[50]"
                      : "opacity-0 translate-y-5 pointer-events-none z-[10]"
                  }`}
                >
                  <Link
                    href={`${
                      user?.role === "admin"
                        ? `/dashboard/profile`
                        : `/user/editProfile/${user?.role}/${user?.id}`
                    }`}
                  >
                    <li className="hover:bg-slate-100 bg-white text-sm font-medium cursor-pointer">
                      Edit Profile
                    </li>
                  </Link>
                  <li
                    onClick={handleLogOut}
                    className="hover:bg-slate-100 bg-white text-sm font-medium cursor-pointer"
                  >
                    Logout
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex gap-3">
            <Link
              className="bg-sky font-medium gap-2 hover:bg-blue text-black rounded-full  p-[10px] flex items-center  "
              href="/usertype"
            >
              <CiLogin />
              Sign Up
            </Link>
            <Link
              className="bg-sky font-medium gap-2 hover:bg-blue text-black rounded-full  p-[10px] flex items-center  "
              href="/user/auth/login"
            >
              <IoLogInOutline />
              Log in
            </Link>
          </div>
        )}
      </div>

      {/* Mobile Navbar */}
      <div className="lg:hidden block">
        <MobileNavbar />
      </div>
    </nav>
  );
};

export default Navbar;
