"use client";
import { useDecodedToken } from "@/components/common/DecodeToken";
import Footer from "@/components/shared/footer/Footer";
import Navbar from "@/components/shared/navbar/Navbar";
import { useGetNotificationQuery } from "@/redux/Api/messageApi";
// import { conforms } from "lodash";
// import { useGetProfileQuery } from "@/redux/Api/userApi";
// import { RootState } from "@/redux/store";
import { usePathname } from "next/navigation";
import React, { ReactNode, useEffect, useRef, useState } from "react";
// import { useSelector } from "react-redux";
import { io, Socket } from "socket.io-client";
interface Notification {
  toUser: string;
  message: string;
  fromUser: string;
  notificationId: string;
  orderId: string;
  _id: string;
  type: "offer" | "delivery" | "privateMessage" | "order" | "revision" | string;
  status: string;
  count: number;
  createdAt?: string;
  sender?: string;
}

const CommonLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();

  const socketRef = useRef<Socket | null>(null);
  const [, setIsSocketReady] = useState(false);
  const token = useDecodedToken();
  const { data: getAllNotification } = useGetNotificationQuery(undefined);

  const isChatPage = pathname.includes("/chat");
  const [allNotification, setAllNotification] = useState<Notification[]>([]);
  const [offerNotifications, setOfferNotifications] = useState<Notification[]>(
    []
  );
  const [offerNotificationCount, setOfferNotificationCount] = useState(0);
  const [messageNotificationCount, setMessageNotificationCount] = useState(0);

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
        console.log(data, "check notification");
        // console.log("New Notification Received:", data);

        // Add missing id and createdAt properties if not available
        const notificationWithDefaults = {
          ...data,
          _id: data._id || new Date().toISOString(),
          createdAt: data.createdAt || new Date().toISOString(),
        };

        // Update all notifications
        setAllNotification((prev) => {
          const filtered = prev.filter(
            (notif) => notif._id !== notificationWithDefaults._id
          );
          return [notificationWithDefaults, ...filtered];
        });

        // Handle offer notifications
        if (
          notificationWithDefaults.type === "offer" ||
          notificationWithDefaults.type === "order" ||
          notificationWithDefaults.type === "delivery" ||
          notificationWithDefaults.type === "revision"
        ) {
          setOfferNotifications((prev) => {
            const filtered = prev.filter(
              (notif) => notif._id !== notificationWithDefaults._id
            );
            return [notificationWithDefaults, ...filtered];
          });
          setOfferNotificationCount((prev) => prev + 1);
        }

        // Handle private message notifications
        if (notificationWithDefaults.type === "privateMessage") {
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
  ];

  const shouldShowNavFooter = !noNavFooterPaths.includes(pathname);

  return (
    <div className="min-h-screen flex flex-col">
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
  );
};

export default CommonLayout;
