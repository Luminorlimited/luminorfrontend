"use client";

import React, { useRef, useEffect, FC } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import OffersModal from "@/components/common/modal/OffersModal";
import { CheckCheck } from "lucide-react";


// Interfaces
interface Message {
  id: number;
  content: string;
  sender: "sender" | "receiver";
  timestamp: Date;
}

interface CommunicationProps {
  messages: string;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  senderName: string;
  senderType: "sender" | "receiver";
  receiverType: "sender" | "receiver";
  colorScheme: {
    senderBg: string;
    receiverBg: string;
  };
  handleOpenModal: () => void;
  isModalOpen: boolean;
}


interface MessageBubbleProps {
  message: Message;
  senderType: "sender" | "receiver";
  colorScheme: {
    senderBg: string;
    receiverBg: string;
  };
}





// MessageBubble Component: Responsible for rendering individual message bubbles
const MessageBubble: FC<MessageBubbleProps> = ({ message, senderType, colorScheme }) => {
  const isSender = message.sender === senderType;




  return (
    <div className={`flex ${isSender ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={`flex items-start max-w-[70%] ${isSender ? "flex-row-reverse" : "flex-row"
          }`}
      >
        {/* Avatar */}
        <Avatar className="w-10 h-10">
          <AvatarFallback>{isSender ? "S" : "R"}</AvatarFallback>
        </Avatar>

        {/* Message Content */}
        <div className={`mx-2 ${isSender ? "text-right" : "text-left"}`}>
          <div
            className={`p-3 ${isSender
              ? "rounded-l-[10px] rounded-b-[10px]"
              : "rounded-r-[10px] rounded-b-[10px]"
              } inline-block ${isSender ? colorScheme.senderBg : colorScheme.receiverBg
              }`}
          >
            msg:: {message.content}
          </div>

          {/* Timestamp */}
          <div
            className={`text-xs text-muted-foreground text-[#A0AEC0] mt-1 ${isSender && "flex items-center justify-end gap-2"
              }`}
          >
            {message.timestamp.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
            {isSender && <CheckCheck />}
          </div>
        </div>
      </div>
    </div>
  );
};

// Communication Component: Main container for rendering the chat and modal
const Communication: FC<CommunicationProps> = ({
  messages,
  senderType,
  colorScheme,
  handleOpenModal,
  isModalOpen,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom whenever messages update
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
          {/* {messages?.map((message, index) => (
            <MessageBubble
              key={index}
              message={message}
              senderType={senderType}
              colorScheme={colorScheme}
            />
          ))} */}
          {/* Invisible div to anchor scroll to the bottom */}
          <div ref={containerRef} />
        </ScrollArea>
      </div>

      {/* Modal */}
      {isModalOpen && <OffersModal onClose={handleOpenModal} />}
    </div>
  );
};

export default Communication;