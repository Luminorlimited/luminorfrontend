import Logo from "@/utils/Logo";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import SearchBox from "./SearchBox";
import { navbarLinks } from "@/utils/navbarData";
import { AvatarIcon, SignUpIcon } from "@/utils/Icons";
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
import demoprofile from "@/assets/placeholderimg.png"
import Cookies from "js-cookie";
import { FaRegMessage } from "react-icons/fa6";
import { RootState } from "@/redux/store";
import io, { Socket } from "socket.io-client";
import { useDecodedToken } from "@/components/common/DecodeToken";
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent,  CardHeader, CardTitle } from "@/components/ui/card"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils";
import { useSeenNotificationMutation } from "@/redux/Api/messageApi";


interface Notification {
  toUser: string;         // ID of the recipient user
  message: string;        // Notification message
  fromUser: string;       // ID of the sender user
  type: "offer" | string; // Type of notification (e.g., offer, message, etc.)
  status: "unseen" | "seen"; // Notification status
  count: number;          // Number of notifications (e.g., unread count)
}

const Navbar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [seenNotification] = useSeenNotificationMutation({})

  const user = useSelector((state: RootState) => state.Auth.user);

  const { data: profileData } = useGetProfileQuery({});


  const handleLogOut = () => {
    dispatch(logOut());
    Cookies.remove("token");
    router.push("/");
  };
  // console.log("my profile is", profileData);
  useEffect(() => {
    if (profileData?.data?.client?.isDeleted) {
      handleLogOut();
    }
  }, [profileData])

  // State for dropdown menu visibility
  const [fileBtn, showFileBtn] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement | null>(null);
  const socketRef = useRef<Socket | null>(null);
  const [isSocketReady, setIsSocketReady] = useState(false);
  const [notification, setNotification] = useState<Notification | null>(null)

  const token = useDecodedToken();

  useEffect(() => {
    if (!socketRef.current) {
      const mysocket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
        transports: ["websocket"],
      });
      socketRef.current = mysocket;

      mysocket.on("connect", () => {
        setIsSocketReady(true);
        mysocket.emit("register", JSON.stringify({ id: token?.id }));
        console.log("socket connected", isSocketReady);
      });

      mysocket.on("sendNotification", (data) => {
        console.log("my data is", data);
        setNotification(data);
      })

    }
    console.log("notification is", notification);

    return () => {
      if (socketRef.current) {
        socketRef.current.off("connect");
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [token, isSocketReady]);


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

  const menus = navbarLinks(user?.role as string);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  // const notifications = [
  //   {
  //     id: 1,
  //     title: "Your call has been confirmed",
  //     description: "5 min ago",
  //     read: false,
  //   },
  //   {
  //     id: 2,
  //     title: "You have a new message",
  //     description: "1 hour ago",
  //     read: false,
  //   },
  //   {
  //     id: 3,
  //     title: "Your subscription is expiring soon",
  //     description: "2 days ago",
  //     read: true,
  //   },
  // ]


  // const [notificationItems, ] = useState(notifications)
  const [open, setOpen] = useState(false)

  // const unreadCount = notificationItems.filter((item) => !item.read).length

  // const markAllAsRead = () => {
  //   setNotificationItems(notificationItems.map((item) => ({ ...item, read: true })))
  // }

  // const markAsRead = (id: number) => {
  //   setNotificationItems(notificationItems.map((item) => (item.id === id ? { ...item, read: true } : item)))
  // }


  // const formUser = notification?.fromUser
  // const bodyId = {
  //   ids: [notification?.fromUser, notification?.toUser]
  // }

  const handleSeenButton = (fromUser: string) => {
    if (!notification) return;

    const bodyId = {
      ids: [notification.fromUser, notification.toUser]
    };

    seenNotification({ userId: fromUser, data: bodyId })
      .unwrap()
      .then(() => {
        console.log("Notification marked as seen");
        router.push(`/chat/${fromUser}`);
      })
      .catch((error) => {
        console.error("Failed to mark notification as seen", error);
      });
  };





  return (
    <nav className="p-5 2xl:px-[115px] flex items-center justify-between bg-gradient-to-r from-[#FFC06B1A] via-[#FF78AF1A] to-[#74C5FF1A] shadow-sm border-b">
      <span className="lg:w-auto">
        <Logo />
      </span>

      {/* Search Box */}
      <div className="hidden lg:block max-[820px]:hidden">
        <SearchBox />
      </div>

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
        {user?.role === 'client' && (
          <Popover open={open} onOpenChange={setOpen}>
            {/* {notification.count > 0 &&
            <span className="bg-red-600 text-white text-sm p-1 rounded-full">{notification.count}</span>
          } */}
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {(notification?.count ?? 0) > 0 && (
                  <span className="absolute -top-1 rounded-full p-2 bg-red-700 text-white -right-1 h-5 w-5 flex items-center justify-center text-sm bg-destructive text-destructive-foreground">
                    {notification?.count}
                  </span>
                )}
                <span className="sr-only">Toggle notifications</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
              <Card className="border-0 shadow-none">
                <CardHeader className="border-b p-4 pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Notifications</CardTitle>
                    {/* {unreadCount > 0 && (
                    <Button variant="ghost" size="sm" className="h-auto p-0 text-sm font-medium" onClick={markAllAsRead}>
                      Mark all as read
                    </Button>
                  )} */}
                  </div>
                 
                </CardHeader>
                <CardContent className="p-0 max-h-[300px] overflow-auto">
                  {(notification?.count ?? 0) > 0 ? (
                    <div className="px-3">
                      <ul className="space-y-2">
                        <li>
                          {/* <Link
                            href={`/chat/${notification?.fromUser}`}
                            className="block px-4 py-2 bg-gray-100 rounded-lg transition-all duration-300 hover:bg-primary hover:text-white hover:shadow-md"
                          >
                            • {notification?.message}
                          </Link> */}
                          <button
                            // href={`/chat/${notification?.fromUser}`}
                            onClick={() => notification?.fromUser && handleSeenButton(notification.fromUser)}
                            type="button"
                            className={cn(
                              "group flex items-center gap-3 rounded-md  p-3 transition-all hover:border-primary/50 hover:bg-accent")}
                          >
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                              <Bell className="h-4 w-4" />
                            </div>
                            <div className="flex-1 overflow-hidden">
                              <p className="line-clamp-1 text-sm font-medium text-foreground group-hover:text-primary">
                                {notification?.message}
                              </p>
                              
                            </div>
                          </button>
                        </li>
                      </ul>

                    </div>
                  ) : (
                    <div className="p-8 text-center text-muted-foreground">No notifications</div>
                  )}
                </CardContent>
              </Card>
            </PopoverContent>
          </Popover>
        )}
      
        {user ? (
          <div className="flex gap-3 items-center relative" ref={dropdownRef}>

            <Link title="Chat" href={'/chat'} className="cursor-pointer transition-colors group relative hover:fill-primary border rounded-full p-2 hover:border-primary mr-2"> <FaRegMessage className="group-hover:fill-primary" /></Link>

            <div ref={notificationRef} className="w-[40px] h-[40px] cursor-pointer" >
              <Image
                src={profileData?.data?.profileUrl ?? demoprofile.src}
                width={40}
                height={40}
                alt="profile"
                className="rounded-full cursor-pointer w-full h-full  hover:opacity-90 transition-all"
                onClick={handleClick}
              />
              <ul
                className={`p-2 flex flex-col gap-y-3 rounded-[10px] bg-white w-[120px] absolute top-10 right-0 transition-all duration-300 ${fileBtn
                  ? "opacity-100 translate-y-0 z-[50]"
                  : "opacity-0 translate-y-5 pointer-events-none z-[10]"
                  }`}
              >

                <Link
                  href={`${user?.role === "admin" ? `/dashboard/profile` : `/user/editProfile/${user?.role}/${user?.id}`}`}
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
        ) : (
          <div className="flex gap-3">
            <Link
              className="btn-secondary text-nowrap p-[10px] flex items-center text-textColor-primary hover:text-textColor-primary active:text-textColor-primary"
              href="/usertype"
            >
              <SignUpIcon />
              Sign Up
            </Link>
            <Link
              className="py-[10px] px-5 btn-primary text-white font-medium text-base hover:text-white active:text-white flex items-center gap-2 rounded-full"
              href="/user/auth/login"
            >
              <AvatarIcon /> Log in
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
