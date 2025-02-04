import Logo from "@/utils/Logo";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import SearchBox from "./SearchBox";
import { navbarLinks } from "@/utils/navbarData";
// import LanguageSwitcher from "./LanguageSwitcher";
import { AvatarIcon, SignUpIcon } from "@/utils/Icons";
// import { Search } from "lucide-react";
import { MobileNavbar } from "./MobileNavbar";
import { useDispatch } from "react-redux";
import { logOut } from "@/redux/ReduxFunction";
import { useRouter } from "next/navigation";
import { BiMessage } from "react-icons/bi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GoBell } from "react-icons/go";
import Image from "next/image";
import { useGetProfileQuery } from "@/redux/Api/userApi";
import demoprofile from "@/assets/images/avatar.jpg";
import Cookies from "js-cookie";
import useDecodedToken from "@/components/common/DecodeToken";
import { io } from "socket.io-client";


interface Notification {
  id: number
  message: string
  time: string
}



const Navbar = () => {
  const dispatch = useDispatch();
  const router = useRouter();


  const decodedToken = useDecodedToken();

  const { data: profileData } = useGetProfileQuery(decodedToken?.id || "", {
    skip: !decodedToken,
  });

  const demoimg = profileData?.data?.profileUrl || demoprofile;

  const handleLogOut = () => {
    dispatch(logOut());
    router.push("/");
    Cookies.remove("token");
  };

  // State for dropdown menu visibility
  const [fileBtn, showFileBtn] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);


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

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);



  

  useEffect(() => {
    // Establish socket connection
    const mysocket = io("ws://localhost:5001");

    // Listen for notification events from the server
    mysocket.on("connect", () => {
      console.log("Connected to the server.");

      mysocket.on("privateMessage", (notification) => {
        console.log("Notification received:", notification);

        // Update state with the new notification
        setNotifications((prevNotifications) => [
          ...prevNotifications,
          {
            id: Date.now(), // Use a unique ID for each notification
            message: notification.message,
            time: new Date().toLocaleTimeString(), // Add timestamp
          },
        ]);
      });
    });

    // Cleanup on component unmount
    return () => {
      mysocket.disconnect();
    };
  }, []);


  const handleNotificationClick = (id: number) => {
    console.log(`Notification ${id} clicked`);
    // Implement additional logic if needed, like marking as read
  };

  return (
    <nav className="p-5 2xl:px-[115px] flex items-center justify-between bg-gradient-to-r from-[#FFC06B1A] via-[#FF78AF1A] to-[#74C5FF1A] shadow-sm border-b">
      {/* Logo */}
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
          {navbarLinks.map((item) =>
            item?.subMenus ? (
              <li key={item.id}>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-2 font-medium hover:text-primary">
                      {item.title}
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>

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
            )
          )}
        </ul>
        {/* <LanguageSwitcher /> */}

        {/* User Section */}
        {decodedToken ? (
          <div className="flex gap-3 items-center relative" ref={dropdownRef}>
            <div className="relative">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="focus:outline-none">
                    <GoBell className="cursor-pointer text-[24px] hover:text-primary" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-80 bg-white rounded-md shadow-lg border border-gray-200">
                  <div className="py-2">
                    <h3 className="text-lg font-semibold px-4 py-2 border-b">Notifications</h3>
                    {notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <DropdownMenuItem
                          key={notification.id}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleNotificationClick(notification.id)}
                        >
                          <p className="text-sm text-gray-800">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                        </DropdownMenuItem>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500 px-4 py-2">No new notifications</p>
                    )}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
         
            </div>
            {/* Notification */}

            {/* <Link href={`/project-list/${decodedToken.role}`}>
              <FaRegHeart className="cursor-pointer text-[24px] hover:text-primary" />
            </Link> */}
            <Link href="/chat">
              <BiMessage className="cursor-pointer text-[24px] hover:text-primary" />
            </Link>
            <div ref={notificationRef}
            >
              <Image
                src={demoimg}
                width={40}
                height={40}
                alt="profile"
                className="rounded-full cursor-pointer hover:opacity-90 transition-all"
                onClick={handleClick}
              />
              <ul
                className={`p-2 flex flex-col gap-y-3 rounded-[10px] bg-white w-[120px] absolute top-10 right-0 transition-all duration-300 ${fileBtn
                  ? "opacity-100 translate-y-0 z-[50]"
                  : "opacity-0 translate-y-5 pointer-events-none z-[10]"
                  }`}
              >

                <Link
                  href={`/user/editProfile/${decodedToken.role}/${decodedToken.id}`}
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
        <MobileNavbar decodedToken={decodedToken}  />
      </div>
    </nav>
  );
};

export default Navbar;
