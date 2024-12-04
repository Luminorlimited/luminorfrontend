'use client'
import React, { useState, useEffect } from "react";
// import { Message } from "../components/ChatWindow";
import ChatWindow, { Message } from "./ChatWindow";
// import Layout from "./layout";

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    // Example data
    const fetchMessages = async () => {
      const fetchedMessages: Message[] = [
        {
          id: 1,
          sender: "You",
          content: "Hello!",
          type: "text",
          time: "12:00 PM",
        },
        {
          id: 2,
          sender: "Jane",
          content: "Hi there!",
          type: "text",
          time: "12:01 PM",
        },
        {
          id: 3,
          sender: "You",
          content: "How are you doing?",
          type: "text",
          time: "12:02 PM",
        },
        {
          id: 4,
          sender: "Jane",
          content: "I'm doing great, thanks for asking!",
          type: "text",
          time: "12:03 PM",
        },
      ];
      setMessages(fetchedMessages);
    };

    fetchMessages();
  }, []);

  return (
      <div className="mx-auto bg-white p-4 rounded-[10px]">
        <h2 className="text-xl font-semibold text-center mb-4">Chat</h2>
        <ChatWindow messages={messages} />
      </div>
  );
};

export default ChatPage;
