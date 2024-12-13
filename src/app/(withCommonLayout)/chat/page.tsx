"use client";
import React, { useState } from "react";
import Image from "next/image";
import ChatWindow from "./ChatWindow";
import Button from "@/components/common/Button";
import { AiOutlinePaperClip } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { FaRegSmile } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import AllUsers from "./AllUsers";
import { Conversation, conversations } from "@/lib/fakeData/allMessage";
import { HiOutlineDotsVertical } from "react-icons/hi";
import Link from "next/link";
import ProjectModal from "@/components/common/modal/ProjectModal";
import { MdOutlineKeyboardVoice } from "react-icons/md";
import { Video, FileText, Images } from 'lucide-react';




const Page: React.FC = () => {
  const [messages, setMessages] = useState<Conversation | null>(null);

  // Set default message template for one user
  const defaultMessages = conversations[0]; // Set initial conversation to the first one

  const showMessage = (e: number) => {
    console.log(e);
    const data = conversations.find((data) => data.conversationId === e);
    if (data) {
      setMessages(data);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProjectModal, setProjectModal] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [fileBtn, showFileBtn] = useState(false)

  const handleClick = () => {
    setTimeout(() => {
      // showFileBtn(false)
      showFileBtn((prev) => !prev)
    }, 200)
  }

  // Toggle for project modal
  const handleProjectModal = () => {
    if (isButtonDisabled) return; // Prevent multiple clicks
    setIsButtonDisabled(true); // Disable button temporarily

    setProjectModal((prevState) => !prevState); // Toggle modal

    setTimeout(() => {
      setIsButtonDisabled(false); // Re-enable button after a short delay
    }, 300); // 300ms delay to prevent multiple clicks
  };

  const handleOpenModal = () => {
    setIsModalOpen((e) => !e);
  };

  return (
    <section>
      <div className="container mx-auto pt-[20px]">
        <div className='text-[16px] flex gap-2'>
          <Link href={'/'} className='text-gray-700'>Home - </Link>
          <Link href={'/chat'} className='font-semibold'>Chat</Link>
        </div>
      </div>
      <div className="flex max-w-[1320px] overflow-hidden h-[720px]  my-4 mx-auto shadow-sm border rounded-[15px]">
        {/* Sidebar */}
        <div className="w-1/3 border-r border-gray-300 bg-white overflow-y-scroll ">
          {/* Search Bar */}
          <div className="p-4">
            <div className="flex items-center border  rounded-[12px] px-3 py-4">
              <BiSearch className="text-gray-500 text-lg" />
              <input
                type="text"
                placeholder="Search message..."
                className="bg-transparent w-full ml-2 text-gray-700 focus:outline-none"
              />
            </div>

            <AllUsers conversations={conversations} showMessage={showMessage} />
          </div>
        </div>

        {/* Chat Window */}
        <div className="w-2/3 flex flex-col relative">
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
                <h3 className="text-sm font-medium text-gray-900">{messages?.participants.receiver}</h3>
                <p className="text-xs text-gray-500">
                  Last seen: 15 hours ago | Local time: 16 Oct 2024, 3:33
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <button
                onClick={handleOpenModal}
                className="rounded-[12px] px-6 py-4 text-[16px] font-medium text-black border transition-colors duration-200"
              >
                Current Offers
              </button>

              <Button onClick={handleProjectModal} disabled={isButtonDisabled}>
                Create an Offer
              </Button>
              {isProjectModal && <ProjectModal onClose={handleProjectModal} />}
              <Link className="hover:bg-slate-100 hover:shadow-xl" href={'/'}><HiOutlineDotsVertical /></Link>
            </div>
          </div>

          {/* Dynamic Chat Content */}
          <div className="flex-1">
            <div className="mx-auto bg-white p-4 pb-0 h-full rounded-[10px]">
              <div className="flex flex-col overflow-y-auto  h-full">
                <ChatWindow
                  isModalOpen={isModalOpen}
                  handleOpenModal={handleOpenModal}
                  messages={messages || defaultMessages}
                  setMessages={() => { }}
                  senderType="sender"
                  receiverType="receiver"
                  colorScheme={{
                    senderBg: "bg-[#F2FAFF] text-[#4A4C56]",
                    receiverBg: "bg-[#F8F8F8] text-[#4A4C56]",
                  }}
                  senderName={""}
                />
              </div>
            </div>
          </div>

          {/* Message Input */}
          <div className="p-4 absolute bottom-0 left-0 w-full border-t border-gray-300 bg-white flex items-center gap-2">
            <AiOutlinePaperClip
              onClick={handleClick}
              className="text-xl absolute left-7 hover:bg-white rounded-full text-[#25314C] transition-all cursor-pointer w-8 h-8 p-1"
            />

            {/* File and Image Buttons */}
            <div
              className={`absolute -top-[95px] left-[25px] flex flex-col gap-y-3 transition-all duration-500 ease-in-out ${fileBtn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5 pointer-events-none"
                }`}
            >
              <span className="bg-primary rounded-full ">
                <FileText className="text-lg text-white cursor-pointer flex items-center justify-center w-10 h-10 p-2 " />
              </span>
              <span className="bg-primary rounded-full ">
                <Images className="text-lg text-white cursor-pointer flex items-center justify-center w-10 h-10 p-2 " />
              </span>
            </div>
            <input
              type="text"
              placeholder="Write message here..."
              className="flex-1 bg-gray-100 pl-12 py-2 rounded-[20px] text-gray-700 focus:outline-none"
            />
            <span className="bg-primary rounded-full">
              <FiSend className="text-lg text-white cursor-pointer flex items-center justify-center w-8 h-8 p-2" />
            </span>

            <FaRegSmile className="text-xl  bg-[#F2FAFF] rounded-full text-[#25314C] cursor-pointer w-8 h-8 p-1" />
            <MdOutlineKeyboardVoice className="text-xl  bg-[#F2FAFF] rounded-full text-[#25314C] cursor-pointer w-8 h-8 p-1" />
            <Video className="text-xl  bg-[#F2FAFF] rounded-full text-[#25314C] cursor-pointer w-8 h-8 p-1" />


          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
