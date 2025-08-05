"use client";
import React, { useEffect,  useRef, useState } from "react";
import  { Message } from "@/app/(withCommonLayout)/chat/ChatWindow";
import { AiOutlineMessage } from "react-icons/ai";
import Link from "next/link";
// import { MdOutlineKeyboardVoice } from "react-icons/md";
import { IoMdMenu } from "react-icons/io";
import io, { Socket } from "socket.io-client";
import demoimg from "@/assets/images/demoimg.png";
import AllUsers from "@/app/(withCommonLayout)/chat/AllUsers";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import {
    useGetConversationQuery,
    useGetMessageQuery,
    useGetuserQuery,
    
} from "@/redux/Api/messageApi";
import { useGetOfferQuery } from "@/redux/Api/offerApi";
import { useDecodedToken } from "@/components/common/DecodeToken";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const Page: React.FC = () => {
    const router = useRouter();


    const token = useDecodedToken();
    const [, setInbox] = useState<Message[]>([]);
    const user1 = useSelector((state: RootState) => state.Auth.user?.id);

    const [, setProfileUrl] = useState<string>(demoimg.src);
    const id = useParams();
    const { data: getToUser } = useGetuserQuery(id.id);
    console.log(id.id, "check chat component");

    const { data: oldMessages } = useGetMessageQuery(
      { user1, user2: id.id },
      { skip: !id.id }
    );

    const { data: getConversation } = useGetConversationQuery(undefined, {
      skip: !id.id,
    });
    const [, setShowEmojiPicker] = useState(false);
    const emojiPickerRef = useRef<HTMLDivElement>(null);
    const [users, setUsers] = useState<any[]>(getConversation?.data || []);
    const [, setOfferNotification] = useState(0);
    const [, setLatestOffer] = useState();
    const socketRef = useRef<Socket | null>(null);
    const [isSocketReady, setIsSocketReady] = useState(false);
    const { data: getoffer } = useGetOfferQuery(token?.id);

    const [showSidebar, setShowSidebar] = useState(false);

    useEffect(() => {
      if (id) {
        setOfferNotification(getoffer?.data?.data?.offersWithUserInfo?.count);
      }
    }, [getoffer?.data?.data?.offersWithUserInfo?.count, id]);

    useEffect(() => {
      if (token?.id) {
        setOfferNotification(getoffer?.data?.data?.count);
      }
    }, [token?.id, getoffer]);

    useEffect(() => {
      if (!token?.email) return;

      if (!socketRef.current) {
        const mysocket = io(process.env.NEXT_PUBLIC_SOCKET_URL);
        socketRef.current = mysocket;

        mysocket.on("connect", () => {
          // console.log("Connected to socket.io.");
          setIsSocketReady(true);
          mysocket.emit("register", JSON.stringify({ id: token?.id }));
          mysocket.emit(
            "userInChat",
            JSON.stringify({ userId: token?.id, chattingWith: id.id })
          );
        });

        mysocket.on("conversation-list", (data) => {
          setUsers(data);
        });
        mysocket.on("sendOffer", (data) => {
          setOfferNotification(data?.offer?.count);
          setLatestOffer(data?.offer);
        });
        mysocket.on("privateMessage", (data) => {
          // console.log("Received private message:", data);
          const { message, fromUserId } = data;

          if (
            message &&
            getToUser?.data?.[
              getToUser?.data?.retireProfessional
                ? "retireProfessional"
                : "client"
            ]?._id === fromUserId
          ) {
            setInbox((prevInbox) => [...prevInbox, message]);
          }
        });

        mysocket.on("createZoomMeeting", (data) => {
          const { from, populateMessage } = data;
          if (populateMessage?.meetingLink) {
            window.open(populateMessage?.meetingLink, "_blank");
            const loggedInUserId =
              getToUser?.data?.[
                getToUser?.data?.retireProfessional
                  ? "retireProfessional"
                  : "client"
              ]?._id;

            if (
              loggedInUserId === from ||
              loggedInUserId === populateMessage?.sender?._id ||
              loggedInUserId === populateMessage?.recipient?._id
            ) {
              setInbox((prevInbox) => [...prevInbox, populateMessage]);
            }
          } else {
            toast.error("Invalid Zoom meeting data received.");
          }
        });

        mysocket.on("zoomMeetingError", (err) => {
          // console.log("Zoom meeting error:", err);
          if (err)
            toast.error("Failed to create Zoom meeting. Please try again.");
        });
      }

      return () => {
        if (socketRef.current) {
          socketRef.current.off("connect");
          socketRef.current.off("conversation-list");
          socketRef.current.off("privateMessage");
          socketRef.current.off("createZoomMeeting");
          socketRef.current.off("zoomMeetingError");
          socketRef.current.disconnect();
          socketRef.current = null;
        }
      };
    }, [token?.email, getToUser, token?.id, id.id]);

    useEffect(() => {
        if (oldMessages?.data?.messages) {
            setInbox(oldMessages?.data?.messages);
        }
    }, [oldMessages, id.id]);


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                emojiPickerRef.current &&
                !emojiPickerRef.current.contains(event.target as Node)
            ) {
                setShowEmojiPicker(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);



    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (showSidebar && !event.target.closest(".sidebar")) {
                setShowSidebar(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showSidebar]);

    const handleshowMessage = (user: {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        profileUrl: string | null;
    }) => {
        if (!isSocketReady) {
            // console.warn("Socket is still connecting...");
            return;
        }
        const { id, profileUrl, email } = user;
        const updatedUsers = users.map((u: any) =>
            u.id === id ? { ...u, unseenMessageCount: 0 } : u
        );
        setUsers(updatedUsers);
        router.push(`/chat/${id}`);

        if (socketRef.current) {
            

            socketRef.current.emit(
                "userInChat",
                JSON.stringify({ userEmail: token?.email, chattingWith: email })
            );
        } else {
            console.error("Socket is not initialized.");
        }

        setProfileUrl(profileUrl || demoimg.src);
        setInbox(oldMessages?.data?.messages);
    };

    const handleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    return (
        <div className="container ">
            <div className="container mx-auto pt-[20px]">
                <div className="text-[16px] flex gap-2">
                    <Link href={"/"} className="text-gray-700">
                        Home -{" "}
                    </Link>
                    <Link href={"/chat"} className="font-semibold">
                        Chat
                    </Link>
                </div>
                <button
                    onClick={handleSidebar}
                    className="bg-bg_primary rounded-[10px] p-4 flex items-center justify-center lg:hidden"
                >
                    <IoMdMenu className="text-white text-[24px]" />
                </button>

                {/* Sidebar with Overlay */}
                <div
                    className={`fixed inset-0 z-50 transition-transform duration-300 lg:hidden ${showSidebar ? "translate-x-0" : "-translate-x-full"
                        }`}
                >
                    <div className="w-2/3 h-full bg-white shadow-md sidebar relative">
                        <div className="p-4">

                            <AllUsers
                                handleshowMessage={handleshowMessage}
                                getConversation={{ data: users }}
                            />
                        </div>
                    </div>
                </div>

                {/* Backdrop Overlay */}
                {showSidebar && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-30 z-40"
                        onClick={handleSidebar}
                    ></div>
                )}
            </div>
            <div className="flex lg:max-w-[1320px]  md:w-full  w-full inset-0 overflow-hidden h-[750px]  my-4 mx-auto shadow-sm border rounded-[15px]">
                <div
                    className={`w-1/3 border-r  border-gray-300 bg-white overflow-y-scroll lg:block hidden ${showSidebar ? "hidden" : "block"
                        }`}
                >
                    <div className="p-4">

                        <AllUsers
                            handleshowMessage={handleshowMessage}
                            getConversation={{ data: users }}
                        // messageNotifications={messageNotifications}
                        />
                    </div>
                </div>

                <div className="lg:w-2/3 w-full  flex flex-col relative ">
                    <div className="flex items-center justify-between p-4 border-gray-300 bg-white mt-3 ">
                    

                    
                          
                    </div>

                    <div className="flex-1">
                        <div className="mx-auto bg-white p-4 pb-0 h-full rounded-[10px]">
                            <div className="flex flex-col overflow-y-auto  h-full">
                                <div className="flex-1">
                                    <div className="mx-auto bg-white p-4 pb-0 h-full rounded-[10px]">
                                        <div className="flex flex-col overflow-y-auto  h-full items-center justify-center gap-2">
                                            <AiOutlineMessage className="text-primary text-7xl" />

                                            <p className=" text-3xl">Please select a chat...</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                  
                </div>
            </div>
        </div>
    );
};

export default Page;