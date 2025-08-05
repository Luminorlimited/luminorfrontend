"use client";
import { useDecodedToken } from "@/components/common/DecodeToken";
// import { useDecodedToken } from "@/components/common/DecodeToken";
import NotFoundAnimation from "@/components/NotFoundAnimation";
import Navbar from "@/components/shared/navbar/Navbar";
import { useGetNotificationQuery } from "@/redux/Api/messageApi";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

// Define the Notification type with at least 'type' and 'status' properties
interface Notification {
  toUser: string;
  message: string;
  fromUser: string;
  notificationId: string;
  orderId: string;
  _id: string;
  type: "offer" | "delivery" | "privateMessage" | string;
  status: string;
  count: number;
  createdAt?: string;
  sender?: string;
}

const NotFound = () => {
  const pathname = usePathname();
  const isChatPage = pathname.includes("/chat");
  const token = useDecodedToken();

  const { data: getAllNotification } = useGetNotificationQuery(undefined);

  const [offerNotifications, setOfferNotifications] = useState<Notification[]>(
    []
  );
  const [offerNotificationCount, setOfferNotificationCount] = useState(0);
  const [, setIsSocketReady] = useState(false);

  const socketRef = useRef<Socket | null>(null);

  const [messageNotificationCount, setMessageNotificationCount] = useState(0);
  const [allNotification, setAllNotification] = useState<Notification[]>([]);

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
        // console.log("Socket connected");
      });

      socket.on("sendNotification", (data: Notification) => {
        // console.log("New Notification Received:", data);

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
        // console.log("Message count update received:", data);
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
  }, [token?.id]);

  return (
    <div>
      <Navbar
        offerNotifications={offerNotifications}
        offerNotificationCount={offerNotificationCount}
        setOfferNotificationCount={setOfferNotificationCount}
        messageNotificationCount={messageNotificationCount}
        setMessageNotificationCount={setMessageNotificationCount}
        allNotifications={allNotification}
      />
      <div className="flex justify-center items-center min-h-screen">
        <NotFoundAnimation />
      </div>
    </div>
  );
};

export default NotFound;
