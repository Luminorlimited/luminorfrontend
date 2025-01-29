"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import ChatWindow, { Message } from "@/app/(withCommonLayout)/chat/ChatWindow";
import Button from "@/components/common/Button";
import { AiOutlinePaperClip } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { FaRegSmile } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { HiOutlineDotsVertical } from "react-icons/hi";
import Link from "next/link";
import ProjectModal from "@/components/common/modal/ProjectModal";
import { MdOutlineKeyboardVoice } from "react-icons/md";
import EmojiPicker from 'emoji-picker-react';

import { Video, FileText, Images } from 'lucide-react';
import io from "socket.io-client";
import { useGetConversationQuery, useGetuserQuery } from '@/redux/api/messageApi';
// import  { JwtPayload } from "jsonwebtoken";
import demoimg from '@/assets/images/demoimg.png';
import { useGetProfileQuery } from "@/redux/api/userApi";
import AllUsers from "@/app/(withCommonLayout)/chat/AllUsers";
import { useGetMessageQuery } from "@/redux/api/messageApi";
import useDecodedToken from "@/components/common/DecodeToken";
import OffersModal from "@/components/common/modal/OffersModal";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";



const Page: React.FC = () => {

  const router = useRouter()

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProjectModal, setProjectModal] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [fileBtn, showFileBtn] = useState(false);
  const token = useDecodedToken()
  const [inbox, setInbox] = useState<Message[]>([]);
  const [messages, setMessages] = useState<string>("");
  const [socket, setSocket] = useState<any>(null);
  const user1 = token?.email
  const [profileUrl, setProfileUrl] = useState<string>(demoimg.src);
  const id = useParams()
  const { data: getToUser } = useGetuserQuery(id.id)
  const receivermail = getToUser?.data?.client?.email || getToUser?.data?.retireProfessional?.email
  const { data: oldMessages } = useGetMessageQuery({ user1, receivermail })
  const { data: getConversation } = useGetConversationQuery(undefined);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef<HTMLDivElement>(null);
  const [users, setUsers] = useState<any[]>(getConversation?.data || []);


  // console.log('My user id', getToUser)


  const handleClick = () => {
    setTimeout(() => {
      showFileBtn((prev) => !prev)
    }, 200)
  }

  const handleFileClick = (type: string) => {
    const input = document.getElementById("fileInput") as HTMLInputElement;

    if (type === "image") {
      input.accept = "image/*"; // Accept images only
    } else if (type === "document") {
      input.accept = "application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"; // Accept documents
    }

    // Trigger the click event for the file input
    input.click();
  };



  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const target = e.target;
  //   if (target?.files) {
  //     const newFiles = Array.from(target.files);
  //     setSelectedFiles(prevFiles => [...prevFiles, ...newFiles]);

  //     // convert base64
  //     const firstImageFile = newFiles[0];
  //     if (firstImageFile) {
  //       const reader = new FileReader()
  //       reader.readAsDataURL(firstImageFile)
  //       reader.onload = () => {
  //         const base64String = reader.result
  //         console.log(`My image base64 is: `, base64String);
  //       }
  //     }
  //   }
  // };

  const handleEmojiClick = (emojiObject: any) => {
    setMessages((prevMessages) => prevMessages + emojiObject.emoji);
  };
  const toggleEmojiPicker = () => {
    setShowEmojiPicker((prev) => !prev);
  };
  const handleOpenModal = () => {
    setIsModalOpen((e) => !e);
  };

  const { data: profileData } = useGetProfileQuery(token?.id);

  console.log(profileData?.data?.retireProfessional?.stripe.isOnboardingSucess);

  const handleProjectModal = () => {
    if (isButtonDisabled) return;
    setIsButtonDisabled(true);
    setProjectModal((prevState) => !prevState);
    setTimeout(() => {
      setIsButtonDisabled(false);
    });



  };
  // 678f173ecd61d3d7199126de
  const user2 = getToUser?.data?.client?.email || getToUser?.data?.retireProfessional?.email

  console.log("My user2 email", user2);
  const handleshowMessage = (user: { id: string, email: string, firstName: string, lastName: string, profileUrl: string | null }) => {
    const { id, email, profileUrl } = user;

    console.log("select user", id)
    router.push(`/chat/${id}`)



    setProfileUrl(profileUrl || demoimg.src);

    const filteredMessages = oldMessages?.data.messages.filter(
      (message: any) => message.sender === email || message.recipient === email
    );
    console.log("Selected User ID:", filteredMessages);

    const messageList = filteredMessages?.map((msg: any, index: number) => ({
      id: index + 1,
      message: msg.message,
      sender: msg.sender === user1 ? user1 : user2,
      createdAt: msg.createdAt,
    }))
    console.log(messageList, "chekc message list")
    setInbox(
      filteredMessages?.map((msg: any, index: number) => ({
        id: index + 1,
        message: msg.message,
        sender: msg.sender === user1 ? user1 : user2,
        createdAt: msg.createdAt,
      }))
    );
  };



  // convert image to  base64 

  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [selectedBase64Images, setSelectedBase64Images] = useState<string[]>([]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validImages = files.filter((file) => file.type.startsWith("image/"));

    // Alert for invalid files
    if (validImages.length !== files.length) {
      alert("Please select only valid image files.");
      return;
    }

    // Convert files to base64 and store them
    const base64Images = await Promise.all(
      validImages.map((file) => convertFileToBase64(file))
    );

    setSelectedImages((prevImages) => [...prevImages, ...validImages]);
    setSelectedBase64Images((prevImages) => [...prevImages, ...base64Images]);
  };

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const handleFileRemove = (base64: string) => {
    const indexToRemove = selectedBase64Images.indexOf(base64);
    if (indexToRemove > -1) {
      setSelectedBase64Images((prevImages) =>
        prevImages.filter((_, index) => index !== indexToRemove)
      );
      setSelectedImages((prevFiles) =>
        prevFiles.filter((_, index) => index !== indexToRemove)
      );
    }
  };






  const onSendMessage = (e: any) => {


    e.preventDefault();
    if (!messages.trim() && selectedBase64Images.length === 0) {
      alert("Please enter a message or select an image.");
      return;
    }

    console.log("My selected files", selectedBase64Images)
    const base64Images = selectedImages.map(async (file) => await convertFileToBase64(file));
    console.log('my base64 images', base64Images);
    if (messages.trim()) {

      console.log("i am messages trip", messages)
      const message = {
        toEmail: user2,
        message: messages.trim() || null,
        fromEmail: token?.email,
        media: selectedBase64Images
      };
      // console.log('my media is', media);
      console.log(message, "check message")
      console.log(selectedImages, "check message from emit")

      socket.emit("privateMessage", JSON.stringify(message));


      setMessages("");
      setSelectedImages([])
      setSelectedBase64Images([])

    }
  };



  const handleCreateZoomMeeting = () => {
    if (socket) {
      const callInfo = {
        fromEmail: token?.email,
        toEmail: user2,
      };

      socket.emit("createZoomMeeting", JSON.stringify(callInfo));
    } else {
      toast.error("Socket connection not established.");
    }
  };




  // emoji picker
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


  const [messageNotifications, setmessageNotifications] = useState(0); // Badge count for offers

  console.log("my offer notification", messageNotifications);
  //socket connection
  useEffect(() => {
    if (!token?.email) {
      return;
    }

    const mysocket = io("ws://localhost:5001");
    setSocket(mysocket);

    mysocket.on("connect", () => {
      console.log("Connected to socket.io.");
      mysocket.emit("register", JSON.stringify({ email: token?.email }));
    });

    mysocket.on("message-notification", (data) => {
      console.log("New offer notification:", data);
      setmessageNotifications((prevCount) => prevCount + 1);
      toast.success(`${data.sender} sent you a new offer!`);
    });


    mysocket.on("privateMessage", (data) => {
      console.log("Received private message:", data.message);
      const { message } = data;
      if (message) {
        setInbox((prevInbox) => [
          ...prevInbox,
          message
        ]);
        const filteredUsers = users.filter(user => {
          return user?.email !== message.sender
        })
        const filteredUser = users.filter(user => user?.email === message.sender)
        setUsers([filteredUser[0], ...filteredUsers])
      }
    });



    mysocket.on("createZoomMeeting", (data) => {
      console.log("Zoom meeting data received from socket:", data);
      const { savedMessage } = data;
      // console.log(JSON.parse(data));

      console.log('my meeting link is', data)
      console.log("My start url is", savedMessage);
      // console.log('my data is', data.start_url);
      const { meetingLink } = savedMessage

      if (savedMessage && savedMessage.meetingLink) {
        window.open(meetingLink, "_blank");

        setInbox((prevInbox) => [...prevInbox, savedMessage]);
      } else {
        toast.error("Invalid Zoom meeting data received.");
        // console.log("invalid data", data.start_url)
      }
    });


    // Handle Zoom meeting errors
    mysocket.on("zoomMeetingError", (err) => {
      console.error("Zoom meeting error:", err);
      toast.error("Failed to create Zoom meeting. Please try again.");
    });
    return () => {
      console.log("Cleaning up socket listeners...");
      mysocket.off("connect");
      mysocket.off("privateMessage");
      mysocket.disconnect();
    };
  }, [token?.email, users]);


  // add user in conversation sidebar
  useEffect(() => {
    setUsers((prevUsers) => {
      if (getConversation?.data) {
        return [...getConversation?.data];
      }
      return prevUsers;
    });
  }, [getConversation?.data]);




  return (
    <section>
      <div className="container mx-auto pt-[20px]">
        <div className='text-[16px] flex gap-2'>
          <Link href={'/'} className='text-gray-700'>Home - </Link>
          <Link href={'/chat'} className='font-semibold'>Chat</Link>
        </div>
      </div>
      <div className="flex max-w-[1320px] overflow-hidden h-[750px]  my-4 mx-auto shadow-sm border rounded-[15px]">
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
            <AllUsers handleshowMessage={handleshowMessage} getConversation={{ data: users }} messageNotifications={messageNotifications} />
          </div>
        </div>

        <div className="w-2/3 flex flex-col relative">
          <div className="flex items-center justify-between p-4 border-b border-gray-300 bg-white mt-3 ">
            <div className="flex items-center">
              <Image
                src={getToUser?.data?.profileUrl || demoimg}
                alt="Jane Cooper"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-gray-900">
                  {getToUser?.data?.client?.name?.firstName || getToUser?.data?.retireProfessional?.name?.firstName} {getToUser?.data?.client?.name?.lastName || getToUser?.data?.retireProfessional?.name?.lastName}
                </h3>
                <p className="text-xs text-gray-500">
                  Last seen: 15 hours ago | Local time: 16 Oct 2024, 3:33
                </p>
              </div>
            </div>
            {token?.role === "retireProfessional" ? (

              <div className="flex items-center gap-6">

                <button
                  onClick={handleOpenModal}
                  className="rounded-[12px] px-6 py-4 text-[16px] font-medium text-black border transition-colors duration-200 disabled:bg-gray-300 disabled:text-gray-500"
                  disabled
                >
                  Current Offers


                </button>
                {isModalOpen && <OffersModal onClose={handleOpenModal} user1={user1} />}


                <Button onClick={handleProjectModal} disabled={isButtonDisabled} >
                  Create an Offer
                </Button>
                {isProjectModal && <ProjectModal onClose={handleProjectModal} user1={user1} user2={user2} />}
                <Link className="hover:bg-slate-100 hover:shadow-xl" href={'/'}><HiOutlineDotsVertical /></Link>
              </div>
            ) : (
              <div className="flex items-center gap-6">


                <button
                  onClick={handleOpenModal}
                  className="rounded-[12px] relative px-6 py-4 text-[16px] font-medium text-black border transition-colors duration-200"
                >
                  Current Offersss
                  {/* {messageNotifications > 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-sm rounded-full w-3 h-3 flex items-center justify-center">
                      {messageNotifications}
                    </span>
                  )} */}
                  {/* <span className="absolute top-0 right-0 bg-red-500 text-white text-sm rounded-full w-3 h-3 flex items-center justify-center"> {offerNotifications}</span> */}
                </button>
                {isModalOpen && <OffersModal onClose={handleOpenModal} user1={user1} />}

                <button onClick={handleProjectModal} disabled className="rounded-[12px]  px-6 py-4 text-[16px] disabled:bg-gray-300 disabled:text-gray-500 font-medium text-white hover:bg-[#4629af] transition-all   duration-200">
                  Create an Offer
                </button>
                {isProjectModal && <ProjectModal onClose={handleProjectModal} user1={user1} user2={user2} />}
                <Link className="hover:bg-slate-100 hover:shadow-xl" href={'/'}><HiOutlineDotsVertical /></Link>
              </div>
            )}
          </div>

          <div className="flex-1">
            <div className="mx-auto bg-white p-4 pb-0 h-full rounded-[10px]">
              <div className="flex flex-col overflow-y-auto  h-full">
                <ChatWindow
                  handleOpenModal={handleOpenModal}
                  messages={inbox}
                  currentUser={user1}
                  profileUrl={profileUrl}
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
            <div
              className={`absolute -top-[95px] left-[35px] flex flex-col gap-y-3 transition-all duration-500 ease-in-out ${fileBtn
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-5 pointer-events-none"
                }`}
            >
              <button onClick={() => handleFileClick("document")} className="bg-primary rounded-full">
                <FileText

                  className="text-lg text-white cursor-pointer flex items-center justify-center w-10 h-10 p-2"
                />
              </button>
              <button onClick={() => handleFileClick("image")} className="bg-primary rounded-full">
                <Images

                  className="text-lg text-white cursor-pointer flex items-center justify-center w-10 h-10 p-2"
                />
              </button>
            </div>


            <form onSubmit={onSendMessage} className="flex items-center gap-2 p-4 w-full" encType="multipart/form-data">
              <AiOutlinePaperClip
                onClick={handleClick}
                className="text-xl absolute left-10 hover:bg-white rounded-full text-[#25314C] transition-all cursor-pointer w-8 h-8 p-1"
              />
              {selectedBase64Images.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {selectedBase64Images.map((base64, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 bg-gray-200 px-3 py-2 rounded-lg"
                    >
                      <Image
                        width={90}
                        height={40}
                        src={base64}
                        alt="Selected"
                        className="w-[90px] h-10 object-cover rounded"
                      />
                      <button
                        type="button"
                        onClick={() => handleFileRemove(base64)}
                        className="text-red-500 font-bold"
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <input
                id="fileInput"
                type="file"
                multiple // Allow multiple files selection
                style={{ display: "none" }} // Hide the input element
                onChange={handleImageChange}
              />
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
            <button
              onClick={handleCreateZoomMeeting}
              className="text-xl hover:shadow-md bg-[#F2FAFF] rounded-full text-[#25314C] cursor-pointer w-8 h-8 p-1"
            >
              <Video />
            </button>
          </div>
        </div>
      </div>
    </section >
  );
};

export default Page;
