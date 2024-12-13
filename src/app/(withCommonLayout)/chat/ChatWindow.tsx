"use client";

import React, { useRef, useEffect } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Conversation } from "@/lib/fakeData/allMessage";
import OffersModal from "@/components/common/modal/OffersModal";
import { CheckCheck } from 'lucide-react';


interface Message {
  id: number;
  content: string;
  sender: "sender" | "receiver";
  timestamp: Date;
}

interface CommunicationProps {
  messages: Conversation;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  senderName: string;
  senderType: "sender" | "receiver"; // This should match the message sender
  receiverType: "sender" | "receiver";
  colorScheme: {
    senderBg: string;
    receiverBg: string;
  };
  handleOpenModal: () => void;
  isModalOpen: boolean
}

const Communication: React.FC<CommunicationProps> = ({
  messages,
  senderType,
  colorScheme,
  handleOpenModal,
  isModalOpen
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    containerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // const handleSendMessage = () => {
  //   if (newMessage.trim()) {
  //     const newMsg: Message = {
  //       id: messages.messages.length + 1,
  //       content: `${senderType}: ${newMessage}`,
  //       sender: senderType,
  //       timestamp: new Date(),
  //     };
  //     setMessages([...messages.messages, newMsg]);
  //     setNewMessage("");
  //   }
  // };

  console.log(messages.messages);
  return (
    <div className=" flex-1 h-full">
      {/* <header className="p-4 flex justify-between items-center rounded-tr-md">
        <h1 className="text-xl font-bold">{senderName}</h1>
      </header> */}

      <div className="h-full">
        <ScrollArea className="p-4 h-[67vh] lg:h-[60vh] overflow-y-auto">
          {messages.messages?.map((message, idx) => (
            <MessageBubble
              key={idx}
              message={message}
              senderType={senderType}
              colorScheme={colorScheme}
            />
          ))}
          <div ref={containerRef} />
        </ScrollArea>


      </div>
      {isModalOpen && <OffersModal
        onClose={handleOpenModal}

      />}
    </div>
  );
};

interface MessageBubbleProps {
  message: Message;
  senderType: "sender" | "receiver"; // This should match the message sender
  colorScheme: {
    senderBg: string;
    receiverBg: string;

  };

}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  senderType,
  colorScheme,


}) => {
  const isSender = message.sender === senderType;
  return (
    <div className={`flex ${isSender ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={`flex items-start max-w-[70%] ${isSender ? "flex-row-reverse" : "flex-row"
          }`}
      >
        <Avatar className="w-10 h-10">
          <AvatarFallback>{isSender ? "S" : "R"}</AvatarFallback>
        </Avatar>
        <div className={`mx-2 ${isSender ? "text-right" : "text-left"}`}>
          <div
            className={`p-3 ${isSender ? "rounded-l-[10px] rounded-b-[10px]" : 'rounded-r-[10px] rounded-b-[10px]'} inline-block  ${isSender ? colorScheme.senderBg : colorScheme.receiverBg
              }`}
          >
            {message.content.substring(message.content.indexOf(":") + 1).trim()}
          </div>
          <div className={`text-xs text-muted-foreground text-[#A0AEC0] mt-1 ${isSender && "flex items-center justify-end gap-2"}`}>
            {message.timestamp.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
            {isSender && (
              <CheckCheck className="" />
              )}
          </div>
        </div>
      </div>

    </div>
  );
};

export default Communication;
