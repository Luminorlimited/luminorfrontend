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
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useGetuserQuery } from "@/redux/Api/messageApi";
import { useParams } from "next/navigation";

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

const extractDeliverId = (url: string) => {
  const regex = /clientOrder\/([a-f0-9]{24})/; // Regex to match the order ID part of the URL
  const match = url.match(regex);
  return match ? match[1] : null; // Return the extracted order ID if found
};

const extractProjectId = (url: string) => {
  const regex = /project\/([a-f0-9]{24})/; // Regex to match the project ID part of the URL
  const match = url.match(regex);
  return match ? match[1] : null; // Return the extracted project ID if found
};
const MessageBubble: FC<MessageBubbleProps> = ({
  message,
  currentUser,
  colorScheme,
  profileUrl,
}) => {
  const isSender = message?.sender._id == currentUser;
  const mediaSrc = typeof message?.media === "string" ? message.media : "";
  const params = useParams();
  const getUser = useGetuserQuery(params?.id as string);
  // console.log("currentUser", currentUser);
  const senderUserName =
    getUser?.data?.data?.retireProfessional?.name?.firstName;
  // console.log("getUser", getUser?.data?.data?.retireProfessional?.name?.firstName);

  const { data: profileData } = useGetProfileQuery(undefined);
  // console.log("get profile data", profileData);
  const userData = useSelector((state: RootState) => state.Auth.user);
  // console.log("isSender", isSender);
  // console.log("currentUser", message);

  return (
    <div className={`flex ${isSender ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={`flex items-start max-w-[70%] ${
          isSender ? "flex-row-reverse" : "flex-row"
        }`}
      >
        {isSender ? (
          <Link
            href={`${
              isSender
                ? `/user/editProfile/${userData?.role}/${userData?.id}`
                : "#"
            }`}
          >
            <Avatar className="w-10 h-10 relative group overflow-hidden rounded-full">
              <div className="relative w-full h-full">
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
                {/* Black overlay on hover */}
                <div className="absolute top-0 left-0 w-full h-full bg-black opacity-0 group-hover:opacity-40 transition-opacity duration-300 rounded-full" />
              </div>
            </Avatar>
          </Link>
        ) : (
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
        )}

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
              message?.message === "Offer Accepted!"
                ? "bg-green-700 text-white"
                : message?.message ===
                  "Your offer has been declined, please speak to the retired professional"
                ? "bg-gray-100 text-black"
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
                  hideDownload={false}
                  hideZoom={false}
                />
              </div>
            )}

            {message?.message?.startsWith("Your offer has been accepted By") ? (
              // Extract the URL from the message
              (() => {
                const match = message?.message.match(/(https:\/\/[^\s]+)/);
                const userName = message?.message
                  .split("By ")[1]
                  ?.split(".")[0]; // Extract the name after "By "
                const url = match ? match[0] : ""; // Extract the URL if present

                if (userName && url) {
                  return (
                    <>
                      {isSender ? (
                        <div>
                          <p>
                            Your offer has been accepted By {senderUserName}
                          </p>
                          <Link
                            href={`/clientOrder/${extractDeliverId(url)}`}
                            // target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 cursor-pointer hover:underline"
                          >
                            View details
                          </Link>
                        </div>
                      ) : (
                        <div>
                          <p>Your offer has been accepted By {userName}</p>

                          <Link
                            href={`/deliver-details/${extractDeliverId(url)}`}
                            // target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 cursor-pointer hover:underline"
                          >
                            View details
                          </Link>
                        </div>
                      )}
                    </>
                  );
                }
                // return null;
              })()
            ) : message?.message?.startsWith(
                "You received  a delivery request."
              ) ? (
              (() => {
                const match = message?.message.match(/:?\s*(https:\/\/[^\s]+)/);
                const url = match ? match[0] : ""; // Extract the URL if present
                console.log("url", url);

                if (url) {
                  return (
                    <>
                      {isSender ? (
                        <div>
                          <p>You received a delivery request.</p>
                          <Link
                            href={`/deliver-details/${extractProjectId(url)}`}
                            // target="_blank"
                            // rel="noopener noreferrer"
                            className="text-blue-600 cursor-pointer hover:underline"
                          >
                            {`View details`}
                          </Link>
                        </div>
                      ) : (
                        <div>
                          <p>You received a delivery request.</p>

                          <Link
                            href={`/project/${extractProjectId(url)}`}
                            // target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 cursor-pointer hover:underline"
                          >
                            {`View details`}
                          </Link>
                        </div>
                      )}
                    </>
                  );
                }
                return null;
              })()
            ) : message?.message?.startsWith("https://") ? (
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
              <div>
                <p>You have a revision request </p>
                <Link
                  href={`${isSender? `/project/${extractOrderId(message?.message)}`: `/deliver-details/${extractOrderId(message?.message)}`}`}
                  className="text-blue-600 cursor-pointer hover:underline"
                >
                  {/* {message?.message} */}
                  View details
                </Link>
              </div>
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

  // console.log("Profile URL:", profileUrl);
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
        <ScrollArea className="lg:p-4 md:p-4 p-1 xl:h-[62vh] lg:h-[69vh] h-[60vh]  overflow-y-auto">
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
