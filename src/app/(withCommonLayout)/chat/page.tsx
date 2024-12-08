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
import OffersModal from "@/components/common/modal/OffersModal";
import OrderDetailsModal from "@/components/common/modal/[id]/OrderDetailsModal";

const Page: React.FC = () => {
  const [messages, setMessages] = useState<Conversation | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const defaultMessages = conversations[0]; // Default conversation

  const showMessage = (id: number) => {
    const data = conversations.find((conversation) => conversation.conversationId === id);
    if (data) setMessages(data);
  };

  // const toggleModal = () => {
  //   setModalOpen(!isModalOpen);
  // };

  const [isOffersModalOpen, setOffersModalOpen] = useState(true);
  const [selectedOffer, setSelectedOffer] = useState<any>(null);

  const handleOfferClick = (offer: any) => {
    setSelectedOffer(offer); // Set the clicked offer
    setOffersModalOpen(false); // Close the offers modal
  };


  const toggleOffersModal = () => {
    setModalOpen((prevState) => !prevState);
  };

  const handleCloseOrderDetails = () => {
    setSelectedOffer(null); // Clear the selected offer
    setOffersModalOpen(true); // Reopen the offers modal
  };

  return (
    <section>
      <div className="flex max-w-[1320px] h-[732px] my-6 mx-auto shadow-sm border rounded-[15px]">
        {/* Sidebar */}
        <div className="w-1/3 border-r border-gray-300 bg-white overflow-y-scroll">
          <div className="p-4">
            <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2">
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
          <div className="flex items-center justify-between p-4 border-b border-gray-300 bg-white">
            <div className="flex items-center">
              <Image
                src="/images/palak.jpg"
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
            <div className="flex items-center gap-6 relative">
              <button
                className="rounded-[12px] px-6 py-4 text-[16px] font-medium text-black border transition-colors duration-200"
                onClick={toggleOffersModal}
              >
                Current Offers
              </button>
              <Button >Create an Offer</Button>


              {isOffersModalOpen && (
                <OffersModal
                  isOpen={isOffersModalOpen}
                  onClose={() => setOffersModalOpen(false)}
                  onOfferClick={handleOfferClick}
                />
              )}
              {selectedOffer && (
                <OrderDetailsModal
                  offer={selectedOffer}
                  onClose={handleCloseOrderDetails}
                />
              )}


              <Link href={"/"} className="hover:bg-slate-100 hover:shadow-xl">
                <HiOutlineDotsVertical />
              </Link>
            </div>
          </div>

          <div className="flex-1">
            <div className="mx-auto bg-white p-4 h-full rounded-[10px]">
              <div className="flex flex-col overflow-y-auto justify-end h-full">
                <ChatWindow
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
    </section>
  );
};

export default Page;
