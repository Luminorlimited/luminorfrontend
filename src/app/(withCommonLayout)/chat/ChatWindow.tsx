"use client";

import React, { useRef, useEffect, FC } from "react";
import { Avatar } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckCheck } from "lucide-react";
import avatar1 from "@/assets/images/msgavatar1.png";
import avatar2 from "@/assets/images/msgavatar2.png";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useGetProfileQuery } from "@/redux/Api/userApi";
import ModalImage from "react-modal-image";
// import ModalImage from "react-modal-image";

export interface userInfo {
  _id: string;
  name: string;
  profileUrl?: string;
}

// Interfaces
export interface Message {
  id?: number;
  message?: string;
  meetingLink?: string;
  media?: string | StaticImageData;
  sender: userInfo; // Determines if the message is sent or received
  createdAt?: string;
  toEmail?: string;
}

interface CommunicationProps {
  messages: Message[]; // All messages for the chat
  senderName: string; // Sender's display name,
  currentUser: string;
  profileUrl: string;
  colorScheme: {
    senderBg: string; // Styling for sender's message background
    receiverBg: string; // Styling for receiver's message background
  };
  handleOpenModal: () => void;
}

interface MessageBubbleProps {
  message: Message;
  currentUser: string;
  profileUrl: string;
  colorScheme: {
    senderBg: string;
    receiverBg: string;
  };
}
function extractOrderId(message: string): string {
  const urlMatch = message.match(/deliver-details\/([a-f0-9]+)/);
  return urlMatch ? urlMatch[1] : "";
}
function extractdeliverId(message: string): string {
  const urlMatch = message.match(/project\/([a-f0-9]+)/);
  return urlMatch ? urlMatch[1] : "";
}


const MessageBubble: FC<MessageBubbleProps> = ({
  message,
  currentUser,
  colorScheme,
  profileUrl,
}) => {
  const isSender = message?.sender._id == currentUser;
  const mediaSrc = typeof message?.media === "string" ? message.media : "";

  const { data: profileData } = useGetProfileQuery(undefined);

  return (
    <div className={`flex ${isSender ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={`flex items-start max-w-[70%] ${
          isSender ? "flex-row-reverse" : "flex-row"
        }`}
    >
        <Avatar className="w-10 h-10">
          <Image
            src={
              isSender
                ? profileData?.data?.profileUrl &&
                  profileData?.data?.profileUrl !== "null"
                  ? profileData.data.profileUrl
                  : avatar1
                : profileUrl && profileUrl !== "null"
                ? profileUrl
                : avatar2
            }
            alt={isSender ? "Sender Avatar" : "Recipient Avatar"}
            width={50}
            height={50}
            className="w-full h-full object-cover rounded-full"
          />
        </Avatar>

        {/* Message Content */}
        <div className={`mx-2 ${isSender ? "text-right" : "text-left"}`}>
          <div
            className={`p-3 ${
              isSender
                ? "rounded-l-[10px] rounded-b-[10px]"
                : "rounded-r-[10px] rounded-b-[10px]"
            } inline-block ${
              isSender ? colorScheme.senderBg : colorScheme.receiverBg
            } ${
              message?.message === "Offer Acccepted!"
                ? "bg-green-700 text-white"
                : message?.message ===
                  "Your offer has been declined, please speak to the retired professional"
                ? "bg-red-700 text-white"
                : ""
            } `}
          >
            {mediaSrc && (
              <div
                className={`mt-2 max-w-full h-auto rounded-lg border border-gray-300 cursor-pointer ${
                  isSender
                    ? `bg-${colorScheme.senderBg} p-3 rounded-[9px]`
                    : `bg-${colorScheme.receiverBg} p-3 rounded-[9px]`
                }`}
              >
                <ModalImage
                  small={mediaSrc}
                  large={mediaSrc}
                  alt="Media"
                  hideDownload={false} // Enables download button
                  hideZoom={false} // Enables zoom on image
                />
              </div>
            )}
            {message?.message?.startsWith("https://") ? (
              <Link
                href={message?.message}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 cursor-pointer hover:underline"
              >
                {message?.message.length > 25
                  ? `${message?.message.substring(0, 25)}...`
                  : message?.message}
              </Link>
            ) : message?.message?.startsWith(
                "You have a revision request from"
              ) ? (
              <Link
                href={`/deliver-details/${extractOrderId(message?.message)}`}
                className="text-blue-600 cursor-pointer hover:underline"
              >
                {message?.message}
              </Link>
            ): message?.message?.startsWith("You received a delivery request.") ? (
              <Link
              href={`/project/${extractdeliverId(message?.message)}`}
              className="text-blue-600 cursor-pointer hover:underline"
            >
              {message?.message}
              </Link>
            ) : (
              <span>{message?.message}</span>
            )}
          </div>

          <div
            className={`text-xs text-muted-foreground text-[#A0AEC0] mt-1 ${
              isSender && "flex items-center justify-end gap-2"
            }`}
          >
            {message?.createdAt
              ? new Date(message.createdAt).toLocaleTimeString()
              : "N/A"}{" "}
            {isSender && <CheckCheck />}
          </div>
        </div>
      </div>
    </div>
  );
};

// Communication Component: The main chat container
const Communication: FC<CommunicationProps> = ({
  messages,
  profileUrl,
  currentUser,
  colorScheme,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    containerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 h-full">
      {/* Chat Area */}

      <div className="h-full">
        <ScrollArea className="p-4 h-[67vh] lg:h-[60vh] overflow-y-auto">
          {/* Render each message */}
          {messages?.map((message, index: number) => (
            <MessageBubble
              key={index}
              message={message}
              profileUrl={profileUrl}
              currentUser={currentUser}
              colorScheme={colorScheme}
            />
          ))}
          {/* Invisible div used for scrolling to bottom */}
          <div ref={containerRef} />
        </ScrollArea>
      </div>

      {/* Modal for actions (if open) */}
    </div>
  );
};

export default Communication;
