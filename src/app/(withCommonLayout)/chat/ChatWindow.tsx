// src/app/components/ChatWindow.tsx
import React from "react";
import Image from "next/image";

export interface Message {
    id: number;
    sender: string;
    content: string;
    type: "text" | "image";
    image?: string;
    time: string;
}

interface ChatWindowProps {
    messages: Message[];
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages }) => {
    return (
        <div className="space-y-4">
            {messages.map((message) => (
                <div
                    key={message.id}
                    className={`flex mb-4 ${message.sender === "You" ? "justify-end" : "justify-start"}`}
                >
                    {message.type === "text" ? (
                        <div>

                            <div
                                className={`px-4 py-2 rounded-lg ${message.sender === "You"
                                        ? "bg-purple-500 text-white"
                                        : "bg-gray-200 text-gray-800"
                                    }`}
                            >
                                {message.content}
                            </div>
                                <span className={`block mt-1 text-xs text-black ${message.sender==="You"?'text-right':'text-left'}`}>
                                    {message.time}
                                </span>
                        </div>
                    ) : (
                        <div>
                            <Image
                                src={message.image!}
                                alt={message.content}
                                width={150}
                                height={150}
                                className="rounded-lg"
                            />
                            <span className="block mt-1 text-xs text-gray-500 text-right">
                                {message.time}
                            </span>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ChatWindow;
