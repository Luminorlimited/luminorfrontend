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
// import { RootState } from "@/redux/store";
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
  createdAt?: string;
}

interface NavbarProps {
  offerNotifications: Notification[];
  offerNotificationCount: number;
  setOfferNotificationCount: (
    count: number | ((prev: number) => number)
  ) => void;
  messageNotificationCount: number;
  setMessageNotificationCount: (
    count: number | ((prev: number) => number)
  ) => void;
  allNotifications?: Notification[];
}

const Navbar = ({
  offerNotifications = [],
  offerNotificationCount,
  setOfferNotificationCount,
  messageNotificationCount,
  setMessageNotificationCount,
  allNotifications = [],
}: NavbarProps) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [seenNotification] = useSeenNotificationMutation({});
  const user = useSelector((state: any) => state.Auth.user);
  const [sseMessageCount, setSseMessageCount] = useState(0);
  // const [, setIsLoading] = useState(true);

  // State for dropdown menus
  const [fileBtn, showFileBtn] = useState<boolean>(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [messageOpen, setMessageOpen] = useState(false);

  // Refs
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement | null>(null);

  // Get profile data
  const { data: profileData } = useGetProfileQuery({});

  // Filter message notifications
  const messageNotifications = allNotifications.filter(
    (notif) => notif.type === "privateMessage"
  );
  // console.log("message all notification", messageNotifications);

  // SSE for message count (backup/additional source)
  // useEffect(() => {
  //   if (!user?.id) {
  //     console.error("User ID is missing");
  //     return;
  //   }

  //   const eventSource = new EventSource(
  //     `https://api.luminor-ltd.com/api/v1/notification/message-count/${user?.id}`
  //   );


  //   eventSource.onopen = () => {
  //     console.log("SSE connection established");
  //   };

  //   eventSource.onmessage = (event) => {
  //     try {
  //       const data = JSON.parse(event.data);
  //       console.log(data, "check data");

  //       if (data?.messageCount !== undefined) {
  //         setSseMessageCount(data.messageCount);
  //         setMessageNotificationCount(data.messageCount);
  //       }
  //     } catch (error) {
  //       console.error("Error parsing SSE data:", error);
  //     }
  //   };

  //   eventSource.onerror = (error) => {
  //     console.error("SSE error:", error);
  //     setIsLoading(false);
  //   };

  //   return () => {
  //     eventSource.close();
  //   };
  // }, [user?.id, setMessageNotificationCount]);

  console.log("offer notification", offerNotifications);
  // Handle logout
  const handleLogOut = () => {
    dispatch(logOut());
    Cookies.remove("token");
    window.location.href = "/";
  };

  // Check if user is deleted
  useEffect(() => {
    if (profileData?.data?.client?.isDeleted) {
      handleLogOut();
    }
  }, [profileData]);

  // Handle seen notification for offers
  const handleSeenButton = async (
    notificationId: string,
    sender: string,
    type: string,
    message: string
  ) => {
    if (!notificationId) return;
    console.log("notificationId", notificationId);
    console.log("sender", message);

    try {
      if (type === "offer") {
        await seenNotification(sender).unwrap();
        // await seenNotification(sender).unwrap();
        // if(message.startsWith("Your offer has been accepted By")){
        //   await seenNotification(sender).unwrap();

        // }
        router.push(`/chat/${sender}`);

        // setOfferNotificationCount((prev) => Math.max(0, prev - 1));
      } else if (type === "delivery") {
        await seenNotification(notificationId).unwrap();
        router.push(`/chat/${sender}`);
      } else if (type === "revision") {
        await seenNotification(notificationId).unwrap();
        router.push(`/chat/${sender}`);
      } else {
        await seenNotification(notificationId).unwrap();
        router.push(`/chat/${sender}`);
      }
      setOfferNotificationCount((prev) => Math.max(0, prev - 1));
    } catch (error) {
      console.error("Failed to mark notification as seen", error);
    }
  };

  // Handle seen notification for messages
  const handleMessageSeenButton = async (
    notificationId: string,
    sender: string
  ) => {
    if (!notificationId) return;
    // console.log("Notification ID:", notificationId);
    // console.log("sender ID:", sender);

    try {
      await seenNotification(notificationId).unwrap();
      setMessageNotificationCount((prev) => Math.max(0, prev - 1));
      setMessageOpen(false);
      router.push(`/chat/${sender}`);
    } catch (error) {
      console.error("Failed to mark message notification as seen", error);
    }
  };

  // Handle profile dropdown
  const handleClick = () => {
    showFileBtn((prev) => !prev);
  };

  // Handle click outside
  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as Node;

    if (dropdownRef.current && !dropdownRef.current.contains(target)) {
      showFileBtn(false);
    }
  };

  // Handle order navigation
  const handleOrder = (orderId: string) => {
    router.push(`/deliver-details/${orderId}`);
    setOfferNotificationCount((prev) => Math.max(0, prev - 1));
    setNotificationOpen(false);
  };

  // Handle chat click (legacy function for direct chat link)
  const handleChatClick = () => {
    setMessageNotificationCount(0);
    setSseMessageCount(0);
  };

  // Get menu items
  const menus = navbarLinks(user as any);

  // Use the higher of socket count or SSE count for display
  const displayMessageCount = Math.max(
    messageNotificationCount,
    sseMessageCount
  );

  // Setup click outside listener
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  console.log("messageNotifications", messageNotifications);

  return (
    <nav className="p-5 2xl:px-[115px] flex items-center justify-between bg-gradient-to-r from-[#FFC06B1A] via-[#FF78AF1A] to-[#74C5FF1A] shadow-sm border-b">
      <span className="lg:w-auto">
        <Logo />
      </span>

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

        {/* User Section */}
        {user ? (
          <div className="flex gap-3 items-center">
            {/* Bell Icon - Shows only OFFER notifications */}
            <Popover open={notificationOpen} onOpenChange={setNotificationOpen}>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <div className="cursor-pointer transition-colors group relative hover:fill-primary border rounded-full p-2 hover:border-primary mr-2">
                    <Bell className="group-hover:fill-primary" />
                  </div>
                  {offerNotificationCount > 0 && (
                    <span className="absolute -top-1 rounded-full p-2 bg-red-700 text-white -right-1 h-5 w-5 flex items-center justify-center text-sm bg-destructive text-destructive-foreground">
                      {offerNotificationCount}
                    </span>
                  )}
                  <span className="sr-only">Toggle notifications</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[450px] p-0" align="end">
                <Card className="border-0 shadow-none">
                  <CardHeader className="border-b p-4 pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">
                        Offer Notifications
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0 max-h-[300px] overflow-auto">
                    <div className="px-3">
                      <ul className="space-y-2">
                        {offerNotifications.length > 0 ? (
                          <ul className="space-y-2">
                            {offerNotifications.map((item) => (
                              <li key={item.notificationId}>
                                <button
                                  onClick={
                                    item.type === "order"
                                      ? () => handleOrder(item.orderId)
                                      : item.type === "offer"
                                      ? () =>
                                          handleSeenButton(
                                            item.notificationId,
                                            item.fromUser ?? "",
                                            item.type,
                                            item.message
                                          )
                                      : () =>
                                          handleSeenButton(
                                            item.notificationId,
                                            item.sender ?? "",
                                            item.type,
                                            item.message
                                          )
                                  }
                                  type="button"
                                  className={cn(
                                    "group flex items-center gap-4 rounded-lg p-4 transition-all hover:bg-gray-100 shadow-sm w-full"
                                  )}
                                >
                                  <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                                    <Bell className="h-5 w-5" />
                                    {item.status === "unseen" && (
                                      <span className="absolute top-0 right-0 h-3 w-3 rounded-full bg-red-500"></span>
                                    )}
                                  </div>
                                  <div className="flex-1 overflow-hidden justify-start">
                                    <p className="text-left text-sm font-medium text-foreground group-hover:text-primary">
                                      {item.message.startsWith(
                                        "Your offer has been accepted"
                                      )
                                        ? item.message.split("\n")[0]
                                        : item.message}
                                    </p>
                                    <p className="text-sm text-left text-gray-700">
                                      {new Date(
                                        item.createdAt || item._id
                                      ).toLocaleString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                        hour: "numeric",
                                        minute: "2-digit",
                                        hour12: true,
                                      })}
                                    </p>
                                  </div>
                                </button>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <div className="p-4 text-center text-gray-500">
                            No offer notifications available
                          </div>
                        )}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </PopoverContent>
            </Popover>

            <div className="flex gap-3 items-center relative">
              {/* Message Icon - Shows private message notifications in modal */}
              <Popover open={messageOpen} onOpenChange={setMessageOpen}>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <div className="cursor-pointer transition-colors group hover:fill-primary border relative rounded-full p-2 hover:border-primary mr-2">
                      <FaRegMessage className="group-hover:fill-primary" />
                    </div>
                    {displayMessageCount > 0 && (
                      <span className="absolute -top-1 rounded-full p-2 bg-red-700 text-white -right-1 h-5 w-5 flex items-center justify-center text-sm bg-destructive text-destructive-foreground">
                        {displayMessageCount}
                      </span>
                    )}
                    <span className="sr-only">Toggle messages</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[450px] p-0" align="end">
                  <Card className="border-0 shadow-none">
                    <CardHeader className="border-b p-4 pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">Messages</CardTitle>
                        <Link
                          href="/chat"
                          onClick={handleChatClick}
                          className="text-sm text-primary hover:underline"
                        >
                          View All
                        </Link>
                      </div>
                    </CardHeader>
                    <CardContent className="p-0 max-h-[300px] overflow-auto">
                      <div className="px-3">
                        <ul className="space-y-2">
                          {messageNotifications.length > 0 ? (
                            <ul className="space-y-2">
                              {messageNotifications.map((item) => (
                                <li key={item.notificationId}>
                                  <button
                                    onClick={() =>
                                      handleMessageSeenButton(
                                        item.notificationId,
                                        item.fromUser
                                      )
                                    }
                                    type="button"
                                    className={cn(
                                      "group flex items-center gap-4 rounded-lg p-4 transition-all hover:bg-gray-100 shadow-sm w-full"
                                    )}
                                  >
                                    <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                                      <FaRegMessage className="h-5 w-5" />
                                      {item.status === "unseen" && (
                                        <span className="absolute top-0 right-0 h-3 w-3 rounded-full bg-red-500"></span>
                                      )}
                                    </div>
                                    <div className="flex-1 overflow-hidden justify-start">
                                      <p className="text-left text-sm font-medium text-foreground group-hover:text-primary">
                                        {item.message}
                                      </p>
                                      {item._id && (
                                        <p className="text-left text-xs text-gray-500 mt-1">
                                          {new Date(
                                            item.createdAt || item._id
                                          ).toLocaleString([], {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                          })}
                                        </p>
                                      )}
                                    </div>
                                  </button>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <div className="p-4 text-center text-gray-500">
                              No messages available
                            </div>
                          )}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </PopoverContent>
              </Popover>

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
              className="bg-sky font-medium gap-2 hover:bg-blue text-black rounded-full p-[10px] flex items-center"
              href="/usertype"
            >
              <CiLogin />
              Sign Up
            </Link>
            <Link
              className="bg-sky font-medium gap-2 hover:bg-blue text-black rounded-full p-[10px] flex items-center"
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
