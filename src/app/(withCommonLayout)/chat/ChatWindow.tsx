"use client";

import React, { useRef, useEffect, FC } from "react";
import { Avatar } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckCheck } from "lucide-react";
import avatar1 from "@/assets/images/msgavatar1.png";
import avatar2 from "@/assets/images/msgavatar2.png";
import Image from "next/image";


// Interfaces
export interface Message {
  id: number;
  message: string;
  sender: "sender" | "recipient"; // Determines if the message is sent or received
  createdAt: string; // ISO timestamp
}

interface CommunicationProps {
  messages: Message[]; // All messages for the chat
  senderName: string; // Sender's display name,
  currentUser: string;
  colorScheme: {
    senderBg: string; // Styling for sender's message background
    receiverBg: string; // Styling for receiver's message background
  };
  handleOpenModal: () => void;
}

interface MessageBubbleProps {
  messages: Message;
  currentUser: string;
  colorScheme: {
    senderBg: string;
    receiverBg: string;
  };
}

const MessageBubble: FC<MessageBubbleProps> = ({ messages, currentUser, colorScheme }) => {
  const isSender = messages.sender === currentUser;




  return (
    <div className={`flex ${isSender ? "justify-end" : "justify-start"} mb-4`}>
      <div className={`flex items-start max-w-[70%] ${isSender ? "flex-row-reverse" : "flex-row"}`}>
        <Avatar className="w-10 h-10">
          <Image
            src={isSender ? avatar1 : avatar2}
            alt={isSender ? "Sender Avatar" : "Recipient Avatar"}
            width={50}
            height={50}
            className="w-full h-full object-cover rounded-full"
          />
        </Avatar>
        {/* Message Content */}
        <div className={`mx-2 ${isSender ? "text-right" : "text-left"}`}>
          <div
            className={`p-3 ${isSender ? "rounded-l-[10px] rounded-b-[10px]" : "rounded-r-[10px] rounded-b-[10px]"
              } inline-block ${isSender ? colorScheme.senderBg : colorScheme.receiverBg}`}
          >
            {messages.message}
          </div>

          <div
            className={`text-xs text-muted-foreground text-[#A0AEC0] mt-1 ${isSender && "flex items-center justify-end gap-2"
              }`}
          >
            {new Date(messages.createdAt).toLocaleTimeString()}
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
  // setMessages,
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
          {messages.map((message, index: number) => (
            <MessageBubble
              key={message.id || index}
              messages={message}
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