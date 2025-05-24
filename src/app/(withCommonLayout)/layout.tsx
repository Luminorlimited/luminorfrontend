"use client";
import { useDecodedToken } from "@/components/common/DecodeToken";
import Footer from "@/components/shared/footer/Footer";
import Navbar from "@/components/shared/navbar/Navbar";
import { useGetNotificationQuery } from "@/redux/Api/messageApi";
import { useGetProfileQuery } from "@/redux/Api/userApi";
import { RootState } from "@/redux/store";
import { usePathname } from "next/navigation";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { io, Socket } from "socket.io-client";
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
const CommonLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const { data: getprofile } = useGetProfileQuery(undefined)
  // console.log(getprofile, " my data ");
  const [showAlert, setShowAlert] = useState(false);

  const handleClose = () => {
    setShowAlert((prev) => !prev);
  };





  useEffect(() => {
    if (getprofile?.data?.client?.isActivated || getprofile?.data?.retireProfessional?.isActivated) {
      setShowAlert(false)
    }
    else {
      setShowAlert(true)
    }

  }, [getprofile?.data?.client?.isActivated, getprofile?.data?.retireProfessional?.isActivated])
  const user = useSelector((state: RootState) => state.Auth.user?.role)








  const socketRef = useRef<Socket | null>(null);

  const [, setIsSocketReady] = useState(false);

  const token = useDecodedToken();

  const { data: getAllNotification } = useGetNotificationQuery(undefined);

  const [allNotification, setAllNotification] = useState(getAllNotification);



    useEffect(() => {
      if (getAllNotification?.data) {
        setAllNotification(getAllNotification.data);
      }
    }, [getAllNotification]);
  
    useEffect(() => {
      if (!socketRef.current && token?.id) {
        const mysocket = io(process.env.NEXT_PUBLIC_SOCKET_URL!);
        socketRef.current = mysocket;
  
        mysocket.on("connect", () => {
          setIsSocketReady(true);
          mysocket.emit("register", JSON.stringify({ id: token?.id }));
          console.log("Socket connected");
        });
  
        mysocket.on("sendNotification", (data: Notification) => {
          console.log("New Notification Received:", data);
          
          setAllNotification((prev: any) => {
            if (!Array.isArray(prev)) return [data];
            return [data, ...prev];
          });
        });
  
        mysocket.on("disconnect", () => {
          console.log("Socket disconnected");
        });
      }
  
      return () => {
        if (socketRef.current) {
          socketRef.current.off("connect");
          socketRef.current.off("sendNotification");
          socketRef.current.disconnect();
          socketRef.current = null;
        }
      };
    }, [token?.id]);
  // console.log("my role is", getprofile);

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
        <Navbar allNotification={allNotification} getAllNotification={getAllNotification} />
      ) : (
        ""
      )}

      <div className="text-textColor-primary ">{children}</div>
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
