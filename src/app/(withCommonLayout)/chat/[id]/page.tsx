/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import ChatWindow from "@/app/(withCommonLayout)/chat/ChatWindow";
import Button from "@/components/common/Button";
import { AiOutlinePaperClip } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { FaRegSmile } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
// import { Conversation, conversations } from "@/lib/fakeData/allMessage";
import { HiOutlineDotsVertical } from "react-icons/hi";
import Link from "next/link";
import ProjectModal from "@/components/common/modal/ProjectModal";
import { MdOutlineKeyboardVoice } from "react-icons/md";
import EmojiPicker from 'emoji-picker-react';

import { Video, FileText, Images } from 'lucide-react';
import io, { Socket } from "socket.io-client";
// import { useGetMessageQuery } from "@/redux/api/messageApi";
// import { useSelector } from "react-redux";
// import { RootState } from "@/redux/store";
import jwt, { JwtPayload } from "jsonwebtoken";
import { useParams } from "next/navigation";
// import { useGetProfileByIdQuery } from "@/redux/api/userApi";
import { useGetProfileByIdQuery } from "@/redux/api/userApi";
import AllUsers from "@/app/(withCommonLayout)/chat/AllUsers";
// import { useRouter } from "next/router";
import { useGetMessageQuery, useGetuserQuery } from "@/redux/api/messageApi";
import useDecodedToken from "@/components/common/DecodeToken";


interface DecodedToken extends JwtPayload {
  id: string;
}
const Page: React.FC = () => {
  // const url  = window.location.href;
  // const userId = url.split('/chat/')[1]
  // console.log(`My User Id: ${userId}`)

  // const defaultMessages = conversations[0];

  // const showMessage = (conversationId: string) => {
  //   const { data } = useGetMessageQuery({ user1: "currentUserId", user2: conversationId });
  //   setMessages(data?.messages || []);
  // };

  const id = useParams()


  const { data: getUser } = useGetuserQuery(id?.id);

  // console.log(`my user is `, getUser);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProjectModal, setProjectModal] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [fileBtn, showFileBtn] = useState(false)

  const handleClick = () => {
    setTimeout(() => {
      showFileBtn((prev) => !prev)
    }, 200)
  }
  const handleEmojiClick = (emojiObject: any) => {
    setInputMessage((prevInput) => prevInput + emojiObject.emoji);
  };
  const toggleEmojiPicker = () => {
    setShowEmojiPicker((prev) => !prev);
  };
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target as Node)) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const handleOpenModal = () => {
    setIsModalOpen((e) => !e);
  };
  const handleProjectModal = () => {
    if (isButtonDisabled) return;
    setIsButtonDisabled(true);

    setProjectModal((prevState) => !prevState);

    setTimeout(() => {
      setIsButtonDisabled(false);
    }, 200);
  };
  const [inputMessage, setInputMessage] = useState<string>('');

  const userId = useParams()

  // const userIdValue = userId.id;
  // console.log(`my user id value is:`, userIdValue);

  const token = useDecodedToken()
  const [inbox, setInbox] = useState<any[]>([]); // Store past messages
  const [messages, setMessages] = useState<string>("");
  const [socket, setSocket] = useState<any>(null);
  const user1 = token?.email
  const user2 = getUser?.data?.retireProfessional?.email || getUser?.data?.client?.email
  const { data: oldMessages, error } = useGetMessageQuery({ user1, user2 })
  // console.log('My user email is ',);
  // console.log(`My image message is :`, oldMessages);

  useEffect(() => {
    if (error) {
      console.error("Error fetching old messages:", error);
    }
    console.log(`my old message is`, oldMessages?.data);

    if (Array.isArray(oldMessages?.data)) {
      // console.log("Fetched old messages:", oldMessages);
      setInbox(
        oldMessages?.data?.map((msg: any) => ({
          message: msg.message,
          sender: msg.sender === user1 ? "sender" : "recipient",
          createdAt: msg.createdAt
        }))
      );
    }
  }, [oldMessages, error, user1]);

  console.log(`My date is`, inbox);

  const { data: getprofile } = useGetProfileByIdQuery(userId)
  // console.log('My token is ', token);
  // console.log(getprofile);

  const handleshowMessage = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    // console.log('my name is Mahi');

    if (!socket) return;

    socket.on("privateMessage", (data: any) => {
      // console.log("Message received:", data);

      const { message, fromEmail, createdAt } = data;

      if (!message || !fromEmail) {
        console.error("Invalid message structure:", data);
        return;
      }

      setInbox((prevInbox) => [
        ...prevInbox,
        {
          content: message,
          sender: "recipient", // Mark as received
          createdAt: createdAt
        },
      ]);
    });
  };

  const mysocket = io("ws://localhost:5001");


  const onSendMessage = (e: any) => {
    e.preventDefault();
    if (messages.trim()) {
      const message = {
        toEmail: user2,
        message: messages,
        fromEmail: token?.email, 
      }
      mysocket.emit("privateMessage", JSON.stringify(message));

      // Update local inbox state
      setInbox((prevInbox) => [
        ...prevInbox,
        { content: messages, sender: "sender" },
      ]);

      setMessages(""); // Clear input
    }
  };

  useEffect(() => {
    if (!token?.email) {
      console.log("Token not ready or email missing.");
      return; // Wait for the token to be available.
    }

    setSocket(mysocket);

    // Log connection
    mysocket.on("connect", () => {
      console.log("Connected to socket.io.");
      mysocket.emit("register", JSON.stringify({ email: token?.email }));
    });

    // Listen for private messages
    mysocket.on("privateMessage", (data: any) => {
      console.log("Received privateMessage:", data);

      // Add received message to inbox
      const { message, fromEmail } = data;

      if (message && fromEmail) {
        setInbox((prevInbox) => [
          ...prevInbox,
          {
            content: message,
            sender: "recipient",
            createdAt: message.createdAt
            // timestamp: new Date(timestamp || Date.now()),
          },
        ]);
      }
    });

    // Cleanup on component unmount
    // return () => {
    //   console.log("Disconnecting socket...");
    //   mysocket.disconnect();
    // };
  }, [token?.email]);




  return (
    <section>
      <div className="container mx-auto pt-[20px]">
        <div className='text-[16px] flex gap-2'>
          <Link href={'/'} className='text-gray-700'>Home - </Link>
          <Link href={'/chat'} className='font-semibold'>Chat</Link>
        </div>
      </div>
      <div className="flex max-w-[1320px] overflow-hidden h-[820px]  my-4 mx-auto shadow-sm border rounded-[15px]">
        <div className="w-1/3 border-r border-gray-300 bg-white overflow-y-scroll ">
          <div className="p-4">
            <div className="flex items-center border  rounded-[12px] px-3 py-4">
              <BiSearch className="text-gray-500 text-lg" />
              <input
                type="text"
                placeholder="Search message..."
                className="bg-transparent w-full ml-2 text-gray-700 focus:outline-none"
              />
            </div>
            <AllUsers getUser={getUser?.data} handleshowMessage={handleshowMessage} />
          </div>
        </div>

        <div className="w-2/3 flex flex-col relative">
          <div className="flex items-center justify-between p-4 border-b border-gray-300 bg-white mt-3 ">
            <div className="flex items-center">
              <Image
                src="/images/palak.jpg"
                alt="Jane Cooper"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-gray-900">{getUser?.data?.client?.name?.firstName || getUser?.data?.retireProfessional?.name?.firstName} {getUser?.data?.retireProfessional?.name?.lastName || getUser?.data?.client?.name?.lastName}</h3>
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

          <div className="flex-1">
            <div className="mx-auto bg-white p-4 pb-0 h-full rounded-[10px]">
              <div className="flex flex-col overflow-y-auto  h-full">
                <ChatWindow
                  isModalOpen={isModalOpen}
                  handleOpenModal={handleOpenModal}
                  messages={inbox} // Pass inbox state
                  setMessages={setInbox} // Update inbox state
                  senderType="sender"
                  receiverType="recipient"
                  colorScheme={{
                    senderBg: "bg-[#F2FAFF] text-[#4A4C56]",
                    receiverBg: "bg-[#F8F8F8] text-[#4A4C56]",
                  }}
                  senderName={""}
                />

              </div>
            </div>
          </div>

          <div
            className="px-4 absolute bottom-0 left-0 w-full border-t border-gray-300 bg-white flex items-center gap-2">
            <AiOutlinePaperClip
              onClick={handleClick}
              className="text-xl absolute left-10 hover:bg-white rounded-full text-[#25314C] transition-all cursor-pointer w-8 h-8 p-1"
            />

            <div
              className={`absolute -top-[95px] left-[25px] flex flex-col gap-y-3 transition-all duration-500 ease-in-out ${fileBtn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5 pointer-events-none"
                }`}
            >
              <span className="bg-primary rounded-full ">

                <FileText
                  className="text-lg text-white cursor-pointer flex items-center justify-center w-10 h-10 p-2 " />
              </span>

              <span className="bg-primary rounded-full ">
                <Images className="text-lg text-white cursor-pointer flex items-center justify-center w-10 h-10 p-2 " />
              </span>
            </div>
            <form onClick={onSendMessage} className="flex items-center gap-2 p-4 w-full">
              <input
                placeholder="Write message here..."
                value={messages} // Use 'messages' state here
                onChange={(e) => setMessages(e.target.value)} // Update state correctly on change
                className="flex-1 w-full bg-gray-100 pl-12 py-2 rounded-[20px] text-gray-700 focus:outline-none max-h-[50px] resize-none"
              />
              <button type="submit" className="bg-primary rounded-full">
                <FiSend className="text-lg text-white cursor-pointer w-8 h-8 p-2" />
              </button>
            </form>

            <FaRegSmile onClick={toggleEmojiPicker}
              className="text-xl hover:shadow-md bg-[#F2FAFF] rounded-full text-[#25314C] cursor-pointer w-8 h-8 p-1" />
            {showEmojiPicker && (
              <div ref={emojiPickerRef} className="absolute bottom-16 right-0">
                <EmojiPicker onEmojiClick={handleEmojiClick} />
              </div>
            )}
            <MdOutlineKeyboardVoice
              className="text-xl hover:shadow-md  bg-[#F2FAFF] rounded-full text-[#25314C] cursor-pointer w-8 h-8 p-1" />
            <Video
              className="text-xl hover:shadow-md bg-[#F2FAFF] rounded-full text-[#25314C] cursor-pointer w-8 h-8 p-1" />
          </div>
        </div>
      </div>
    </section >
  );
};

export default Page;

function setIsTyping(arg0: boolean) {
  throw new Error("Function not implemented.");
}
