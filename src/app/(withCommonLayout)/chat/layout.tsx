import React from 'react';
import Image from 'next/image';
import { BiSearch } from 'react-icons/bi';
import { AiOutlinePaperClip } from 'react-icons/ai';
import { FaRegSmile } from 'react-icons/fa';
import { FiSend } from 'react-icons/fi';
import Button from '@/components/common/Button';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  interface Message {
    id: string;
    name: string;
    avatar: string;
    message: string;
    time: string;
    unread: boolean;
  }
  const messages: Message[] = [
    {
      id: "1",
      name: "Kristin Watson",
      avatar: "/images/palak.jpg", // Replace with actual image URL
      message: "Sure! let me tell you about what we can offer",
      time: "2 m Ago",
      unread: true,
    },
    {
      id: "2",
      name: "Jane Cooper",
      avatar: "/images/palak.jpg", // Replace with actual image URL
      message: "Find out who is in charge of this portion...",
      time: "2 m Ago",
      unread: false,
    },
    {
      id: "3",
      name: "Theresa Webb",
      avatar: "/images/palak.jpg", // Replace with actual image URL
      message: "Sure! let me tell you about w...",
      time: "2 m Ago",
      unread: false,
    },
    {
      id: "4",
      name: "Courtney Henry",
      avatar: "/images/palak.jpg", // Replace with actual image URL
      message: "Sure! let me tell you about w...",
      time: "2 m Ago",
      unread: false,
    },
  ];
  
  return (
    <div className=" flex max-w-[1320px] h-[820px] my-6 mx-auto shadow-sm border rounded-[15px] ">
      {/* Sidebar */}
      <div className="w-1/3 border-r border-gray-300 bg-white">
        {/* Search Bar */}
        <div className="p-4 border-b border-gray-300">
          <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2">
            <BiSearch className="text-gray-500 text-lg" />
            <input
              type="text"
              placeholder="Search message..."
              className="bg-transparent w-full ml-2 text-gray-700 focus:outline-none"
            />
          </div>

          {/* User List (This could be dynamic) */}
          <div>
          <div className="w-full max-w-md mx-auto bg-white shadow-md rounded-lg">
      {/* Header */}
      <div className="flex gap-6 p-4 border-b">
        <h2 className="text-lg font-semibold">All</h2>
        <h2 className="text-lg font-semibold">Unread (10)</h2>
      </div>

      {/* Messages */}
      <ul className="divide-y">
        {messages.map((msg) => (
          <li
            key={msg.id}
            className={`flex items-center p-4 ${
              msg.unread ? "bg-gray-100" : ""
            }`}
          >
            {/* Avatar */}
            <Image
              src={msg.avatar}
              alt={msg.name}
              width={48}
              height={48}
              className="w-12 h-12 rounded-full mr-4"
            />
            {/* Message Details */}
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-semibold">{msg.name}</h3>
                <span className="text-xs text-gray-500">{msg.time}</span>
              </div>
              <p className="text-sm text-gray-600 truncate">{msg.message}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
          </div>
        </div>
        
        <div>
          {/* Add logic to render users here */}
        </div>
      </div>

      {/* Chat Window */}
      <div className="w-2/3 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-300 bg-white">
          <div className="flex items-center">
            <Image
              src="/images/palak.jpg" // Replace with dynamic image
              alt="Jane Cooper"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-gray-900">Jane Cooper</h3>
              <p className="text-xs text-gray-500">
                Last seen: 15 hours ago | Local time: 16 Oct 2024, 3:33
              </p>
            </div>
          </div>
          <div className='flex items-center gap-6'>
            <button className="rounded-[12px]  px-6 py-4 text-[16px]  font-medium text-black border  transition-colors duration-200">
              Current Offers
            </button>
            <Button>Create an Offer</Button>
          </div>
        </div>

        {/* Dynamic Chat Content */}
        <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
          {children}
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-gray-300 bg-white flex items-center">
          <AiOutlinePaperClip className="text-xl text-gray-500 cursor-pointer mr-3" />
          <input
            type="text"
            placeholder="Write message here..."
            className="flex-1 bg-gray-100 px-4 py-2 rounded-lg text-gray-700 focus:outline-none"
          />
          <FaRegSmile className="text-xl text-gray-500 cursor-pointer mx-3" />
          <FiSend className="text-xl text-purple-500 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default Layout;
