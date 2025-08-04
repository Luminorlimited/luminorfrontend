"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { AvatarIcon, SignUpIcon } from "@/utils/Icons";
import { navbarLinks } from "@/utils/navbarData";
import { Bell, ChevronDown, Text } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import demoprofile from "@/assets/images/avatar.jpg";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "@/redux/ReduxFunction";
import { useRouter } from "next/navigation";
import { useGetProfileQuery } from "@/redux/Api/userApi";
import { RootState } from "@/redux/store";
import { FaRegMessage } from "react-icons/fa6";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Button } from "@/components/ui/button";
import { useGetNotificationQuery, useSeenNotificationMutation } from "@/redux/Api/messageApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LuMessageSquareMore } from "react-icons/lu";
import { cn } from "@/lib/utils";

export function MobileNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const router = useRouter();
  const notificationRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false)

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as Node;

    // Close the profile dropdown if clicking outside
    if (notificationRef.current && !notificationRef.current.contains(target)) {
      showFileBtn(false);
    }
  };


  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

   const { data: getAllNotification } = useGetNotificationQuery(undefined)
  
    const [allNotification, setAllNotification] = useState(getAllNotification)
  
  // console.log("getAllNotification", getAllNotification);
  
    useEffect(() => {
      if (getAllNotification?.data) {
        setAllNotification(getAllNotification.data);
      }
    }, [getAllNotification]);



  // // console.log('my token is', decodedToken);

  const handleLogOut = () => {
    dispatch(logOut());
    // cookies.remove("token")
    router.push("/");
  };
  const [fileBtn, showFileBtn] = useState(false);

  const handleClick = () => {
    setTimeout(() => {
      // showFileBtn(false)
      showFileBtn((prev) => !prev);
    }, 200);
  };
  const user = useSelector((state: RootState) => state.Auth.user);
  const { data: profileData } = useGetProfileQuery(user?.id || "", {
    skip: !user?.token,
  });

  const demoimg = profileData?.data?.profileUrl || demoprofile;
  const [seenNotification] = useSeenNotificationMutation({})

  const menus = navbarLinks(user?.role as string);
  const handleSeenButton = (notificationId: string, sender: string) => {
    if (!notificationId) return;
    // console.log("allnotification", notificationId);
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



  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="text-primary">
          <Text />
        </button>
      </SheetTrigger>
      <SheetContent>
        <div className="grid gap-4 py-4">
          {/* Navbar Links */}
          <ul className="flex flex-col gap-4 w-full">
            {menus?.map((item) =>
              item?.subMenus ? (
                <li key={item.id} className="w-full">
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center w-full gap-2 justify-between hover:text-primary"
                  >
                    {item.title}{" "}
                    <span>
                      <ChevronDown />
                    </span>
                  </button>
                  <div
                    style={{
                      opacity: isOpen ? 1 : 0,
                      height: isOpen ? "auto" : 0,
                      visibility: isOpen ? "visible" : "hidden",
                      transition:
                        "height 0.15s ease-in-out, opacity 0.2s ease-in-out",
                    }}
                  >
                    <ul className="p-3 bg-gray-50 flex flex-col gap-3">
                      {item.subMenus.map((subItem) => (
                        <li key={subItem.id} className="w-full">
                          <Link
                            className="hover:text-primary"
                            href={subItem.link}
                          >
                            {subItem.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ) : (
                <li key={item.id} className="w-full">
                  <Link className="hover:text-primary" href={item.link}>
                    {item.title}
                  </Link>
                </li>
              )
            )}
          </ul>

          {/* User Section */}
          <div className="flex items-center flex-wrap gap-4">
            {user && user?.id ? (
              <div className="flex gap-3 items-center relative">

                
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
                                  {/* {unreadCount > 0 && (
                                    <Button variant="ghost" size="sm" className="h-auto p-0 text-sm font-medium" onClick={markAllAsRead}>
                                      Mark all as read
                                    </Button>
                                  )} */}
                                </div>
                
                              </CardHeader>
                              <CardContent className="p-0 max-h-[300px] overflow-auto">
                                {/* {getAllNotification?.data?.count > 0 ? ( */}
                                <div className="px-3">
                                  <ul className="space-y-2">
                
                                    {getAllNotification?.data?.map((item: any, index: number) => (
                                      <li key={index}>
                                        <button
                                          onClick={() => handleSeenButton(item._id, item.sender)}
                                          type="button"
                                          className={cn(
                                            "group flex items-center gap-4 rounded-lg p-4 transition-all hover:bg-gray-100 shadow-sm w-full"
                                          )}
                                        >
                                          <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                                            {item?.type === "offer" ? <Bell className="h-5 w-5" /> : <LuMessageSquareMore className="h-5 w-5" />
                                            }
                
                                            {item?.status === "unseen" && (
                                              <span className="absolute top-0 right-0 h-3 w-3 rounded-full bg-red-500"></span>
                                            )}
                                          </div>
                
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


                <Link title="Chat" href={'/chat'} className="cursor-pointer transition-colors group hover:fill-primary border rounded-full p-2 hover:border-primary mr-2"> <FaRegMessage className="group-hover:fill-primary" /></Link>



                <div ref={notificationRef} className="w-[40px] h-[40px]" >
                  <Image
                    src={demoimg}
                    width={40}
                    height={40}
                    alt="profile"
                    className="rounded-full w-full h-full cursor-pointer hover:opacity-90 transition-all"
                    onClick={handleClick}
                  />
                  <ul
                    className={`p-2 flex flex-col gap-y-3 rounded-[10px] bg-gray-100 w-[120px] absolute top-10 right-0 transition-all duration-300 ${fileBtn
                      ? "opacity-100 translate-y-0 z-[50]"
                      : "opacity-0 translate-y-5 pointer-events-none z-[10]"
                      }`}
                  >

                    <Link
                      href={`/user/editProfile/${user.role}/${user.id}`}
                    >
                      <li className="hover:bg-slate-100 bg-gray-100 text-sm font-medium cursor-pointer">
                        Edit Profile
                      </li>
                    </Link>
                    <li
                      onClick={handleLogOut}
                      className="hover:bg-slate-100 bg-gray-100 text-sm font-medium cursor-pointer"
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
        </div>
      </SheetContent>
    </Sheet>
  );
}
