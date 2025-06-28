/* eslint-disable react-hooks/exhaustive-deps */
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
  // useGetMessageNotificationQuery,
  // useGetNotificationQuery,
  useSeenNotificationMutation,
} from "@/redux/Api/messageApi";
import { LuMessageSquareMore } from "react-icons/lu";
import { LuBellRing } from "react-icons/lu";
// import { useMessageNotification } from "../hooks/useMessageNotification";
// import { useDecodedToken } from "@/components/common/DecodeToken";

interface Notification {
  toUser: string;
  message: string;
  fromUser: string;
  notificationId: string;
  orderId: string;
  _id: string;
  type: "offer" | "delivery" | "privateMessage" | string;
  status: string;
  count?: number;
  sender?: string;
}

interface NavbarProps {
  allNotification: Notification[];
  notificationCount: number;
  setNotificationCount: React.Dispatch<React.SetStateAction<number>>;
}

const Navbar = ({
  allNotification = [],
  notificationCount,
  setNotificationCount,
}: NavbarProps) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [seenNotification] = useSeenNotificationMutation({});

  const user = useSelector((state: RootState) => state.Auth.user);
  // console.log("user id", user);
  const [count, setCount] = useState(0);
  const [, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user ID is available
    if (!user?.id) {
      console.error("User ID is missing");
      return;
    }

    const eventSource = new EventSource(`https://api.luminor-ltd.com/api/v1/notification/message-count/${user?.id}`);

    // Log the URL for debugging
    console.log("EventSource URL: ", `https://api.luminor-ltd.com/api/v1/notification/message-count/${user?.id}`);

    eventSource.onopen = () => {
      console.log("SSE connection established");
    };

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data); // Parse the incoming message
        console.log("my data: ", data); // Log the data to the console
        if (data?.messageCount) {
          setCount(data.messageCount); // Update the count
        }
      } catch (error) {
        console.error("Error parsing SSE data:", error);
      }
    };

    eventSource.onerror = (error) => {
      console.error("SSE error:", error);
      setIsLoading(false); // Stop loading on error
    };

    // Clean up on component unmount
    return () => {
      eventSource.close();
    };
  }, [user?.id]);

  const token = useSelector((state: RootState) => state.Auth.user?.id);
  console.log("token", token);

  console.log("token", token);
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
  const handleSeenButton = async (notificationId: string, sender: string) => {
    if (!notificationId) return;

    try {
      await seenNotification(notificationId).unwrap();
      // Decrement count when notification is seen
      setNotificationCount((prev) => Math.max(0, prev - 1));
      router.push(`/chat/${sender}`);
    } catch (error) {
      console.error("Failed to mark notification as seen", error);
    }
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
    if (user?.role === "client") {
      router.push(`/project/${orderId}`);
    } else {
      router.push(`/deliver-details/${orderId}`);
    }
  };
  // console.log(getAllNotification?.data?.result);

  // console.log("my count is", allNotification);

  // const mergedNotifications = [
  //   ...(Array.isArray(allNotification) ? allNotification : []),
  //   ...(getAllNotification?.data?.result || []),
  // ];

  // const uniqueNotifications = Array.from(
  //   new Map(mergedNotifications.map((item) => [item._id, item])).values()
  // );
  // console.log(allNotification,
  // getAllNotification);
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

                  {notificationCount > 0 && (
                    <span className="absolute -top-1 rounded-full p-2 bg-red-700 text-white -right-1 h-5 w-5 flex items-center justify-center text-sm bg-destructive text-destructive-foreground">
                      {notificationCount} {/* Show exact count */}
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
                        {allNotification.length > 0 ? (
                          <ul className="space-y-2">
                            {allNotification.map((item) => (
                              <li key={item._id}>
                                <button
                                  onClick={
                                    item.orderId
                                      ? () => handleOrder(item.orderId)
                                      : () =>
                                          handleSeenButton(
                                            item._id,
                                            item.sender || ""
                                          )
                                  }
                                  type="button"
                                  className={cn(
                                    "group flex items-center gap-4 rounded-lg p-4 transition-all hover:bg-gray-100 shadow-sm w-full"
                                  )}
                                >
                                  {/* Icon */}
                                  <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                                    {item.type === "offer" ? (
                                      <Bell className="h-5 w-5" />
                                    ) : item.type === "privateMessage" ? (
                                      <LuMessageSquareMore className="h-5 w-5" />
                                    ) : (
                                      <LuBellRing className="h-5 w-5" />
                                    )}
                                    {item.status === "unseen" && (
                                      <span className="absolute top-0 right-0 h-3 w-3 rounded-full bg-red-500"></span>
                                    )}
                                  </div>

                                  {/* Message */}
                                  <div className="flex-1 overflow-hidden justify-start">
                                    <p className="text-left text-sm font-medium text-foreground group-hover:text-primary">
                                      {item.message}
                                    </p>
                                  </div>
                                </button>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <div className="p-4 text-center text-gray-500">
                            No notifications available
                          </div>
                        )}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </PopoverContent>
            </Popover>
            <div className="flex gap-3 items-center relative">
              <Link
                title="Chat"
                href="/chat"
                className="cursor-pointer transition-colors group hover:fill-primary border relative rounded-full p-2 hover:border-primary mr-2"
              >
                <FaRegMessage className="group-hover:fill-primary" />
                {/* Notification badge - only show if count > 0 */}
                {count > 0 && (
                  <span className="absolute -top-1 rounded-full p-2 bg-red-700 text-white -right-1 h-5 w-5 flex items-center justify-center text-sm bg-destructive text-destructive-foreground">
                    {count > 9 ? "9+" : count}
                  </span>
                )}
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
                  className="rounded-full cursor-pointer w-full h-full hover:opacity-90 transition-all"
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
