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
  toUser: string
  message: string
  fromUser: string
  notificationId: string
  orderId: string
  _id: string
  type: "offer" | "delivery" | "privateMessage" | string
  status: string
  count: number
  createdAt?: string
  sender?: string
}

const CommonLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();

  const { data: getprofile } = useGetProfileQuery(undefined);
  const [showAlert, setShowAlert] = useState(false);
  const user = useSelector((state: RootState) => state.Auth.user?.role);
  const socketRef = useRef<Socket | null>(null);
  const [, setIsSocketReady] = useState(false);
  const token = useDecodedToken();
  const { data: getAllNotification } = useGetNotificationQuery(undefined);

  const isChatPage = pathname.includes("/chat");
  console.log(isChatPage, "check chatpage");
  // Notification states
  const [allNotification, setAllNotification] = useState<Notification[]>([]);
  const [offerNotifications, setOfferNotifications] = useState<Notification[]>(
    []
  );
  const [offerNotificationCount, setOfferNotificationCount] = useState(0);
  const [messageNotificationCount, setMessageNotificationCount] = useState(0);

  // Check activation status
  useEffect(() => {
    const isActivated =
      getprofile?.data?.client?.isActivated ||
      getprofile?.data?.retireProfessional?.isActivated;
    setShowAlert(!isActivated);
  }, [getprofile]);

  // Initialize notifications from API
  useEffect(() => {
    if (getAllNotification?.data?.result) {
      const allNotifs = getAllNotification.data.result;
      setAllNotification(allNotifs);

      // Filter and set offer notifications
      const offers = allNotifs.filter(
        (notif: Notification) => notif.type === "offer"
      );
      setOfferNotifications(offers);

      // Count unseen notifications
      const unseenOfferCount = offers.filter(
        (notif: Notification) => notif.status === "unseen"
      ).length;
      setOfferNotificationCount(unseenOfferCount);

      const unseenMessageCount = allNotifs.filter(
        (notif: Notification) =>
          notif.type === "privateMessage" && notif.status === "unseen"
      ).length;
      setMessageNotificationCount(unseenMessageCount);
    }
  }, [getAllNotification]);

  // Socket connection and event handlers
  useEffect(() => {
    if (!socketRef.current && token?.id && !isChatPage) {
      const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL!);
      socketRef.current = socket;

      socket.on("connect", () => {
        setIsSocketReady(true);
        socket.emit("register", JSON.stringify({ id: token?.id }));
        console.log("Socket connected");
      });

      socket.on("sendNotification", (data: Notification) => {
        console.log("New Notification Received:", data);

        // Update all notifications
        setAllNotification((prev) => {
          const filtered = prev.filter((notif) => notif._id !== data._id);
          return [data, ...filtered];
        });

        // Handle offer notifications
        if (data.type === "offer") {
          setOfferNotifications((prev) => {
            const filtered = prev.filter((notif) => notif._id !== data._id);
            return [data, ...filtered];
          });
          setOfferNotificationCount((prev) => prev + 1);
        }

        // Handle private message notifications
        if (data.type === "privateMessage") {
          setMessageNotificationCount((prev) => prev + 1);
        }
      });

      socket.on("notificationSeen", (seenId: string) => {
        // Update all notifications
        setAllNotification((prev) =>
          prev.map((notif) =>
            notif._id === seenId ? { ...notif, status: "seen" } : notif
          )
        );

        // Update offer notifications
        setOfferNotifications((prev) =>
          prev.map((notif) =>
            notif._id === seenId ? { ...notif, status: "seen" } : notif
          )
        );

        // Update message count when message notification is seen
        setMessageNotificationCount((prev) => Math.max(0, prev - 1));
      });

      // Listen for real-time message count updates
      socket.on("messageCountUpdate", (data: { messageCount: number }) => {
        console.log("Message count update received:", data);
        setMessageNotificationCount(data.messageCount);
      });

      socket.on("disconnect", () => {
        console.log("Socket disconnected");
      });
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [token?.id, isChatPage]);

  // Paths where navbar/footer shouldn't appear
  const noNavFooterPaths = [
    "/usertype",
    "/user/auth/login",
    "/user/auth/client",
    "/user/auth/professional",
    "/user/auth/forgetPass",
    "/user/auth/forgetPass/otpVerify",
    "/user/auth/forgetPass/otpVerify/resetPassword",
    "/user/verification",
  ]

  const shouldShowNavFooter = !noNavFooterPaths.includes(pathname)

  return (
    <div className="min-h-screen flex flex-col">
      {/* Activation Alert */}
      {(user === "client" || user === "retireProfessional") && showAlert && (
        <div className="bg-yellow-100 border border-yellow-400 text-bg_primary px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">
            Hi {getprofile?.data?.client?.name?.firstName || getprofile?.data?.retireProfessional?.name?.firstName}
            !!!
          </strong>
          <span className="block sm:inline">
            Your account is currently under review and your status will be updated soon. Please wait 3-5 days.
          </span>
          <span
            onClick={() => setShowAlert(false)}
            className="absolute top-0 bottom-0 right-0 px-4 py-3 cursor-pointer"
          >
            <svg className="fill-current h-6 w-6 text-yellow-800" role="button" viewBox="0 0 20 20">
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
            </svg>
          </span>
        </div>
      )}

      {/* Navbar */}
      {shouldShowNavFooter && (
        <Navbar
          offerNotifications={offerNotifications}
          offerNotificationCount={offerNotificationCount}
          setOfferNotificationCount={setOfferNotificationCount}
          messageNotificationCount={messageNotificationCount}
          setMessageNotificationCount={setMessageNotificationCount}
          allNotifications={allNotification}
        />
      )}

      {/* Main Content */}
      <main className="flex-grow text-textColor-primary">{children}</main>

      {/* Footer */}
      {shouldShowNavFooter && <Footer />}
    </div>
  )
}

export default CommonLayout
