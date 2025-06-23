"use client";
import { useDecodedToken } from "@/components/common/DecodeToken";
import NotFoundAnimation from "@/components/NotFoundAnimation";
import Navbar from "@/components/shared/navbar/Navbar";
import { useGetNotificationQuery } from "@/redux/Api/messageApi";
import React, { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

const NotFound = () => {
  const socketRef = useRef<Socket | null>(null);

  const [, setIsSocketReady] = useState(false);

  const token = useDecodedToken();
  const [notificationCount, setNotificationCount] = useState(0);
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
  return (
    <div>
     <Navbar 
          allNotification={allNotification} 
          notificationCount={notificationCount}
          setNotificationCount={setNotificationCount}
        />
      <div className="flex justify-center items-center min-h-screen">
        <NotFoundAnimation />
      </div>
    </div>
  );
};

export default NotFound;
