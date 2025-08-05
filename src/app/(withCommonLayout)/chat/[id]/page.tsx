"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import ChatWindow, { Message } from "@/app/(withCommonLayout)/chat/ChatWindow";
import Button from "@/components/common/Button";
import { AiOutlinePaperClip } from "react-icons/ai";
import { FaRegSmile } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import Link from "next/link";
import ProjectModal from "@/components/common/modal/ProjectModal";
import EmojiPicker from "emoji-picker-react";
import { IoMdMenu } from "react-icons/io";
import { Video, FileText, Images } from "lucide-react";
import io, { Socket } from "socket.io-client";
import demoimg from "@/assets/placeholderimg.png";
import AllUsers from "@/app/(withCommonLayout)/chat/AllUsers";
import OffersModal from "@/components/common/modal/OffersModal";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import {
  useGetConversationQuery,
  useGetMessageQuery,
  useGetuserQuery,
  useImageSendMutation,
} from "@/redux/Api/messageApi";
import { useGetOfferQuery } from "@/redux/Api/offerApi";
import { useDecodedToken } from "@/components/common/DecodeToken";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
// import { useGetProfileQuery } from "@/redux/Api/userApi";
import { setLoading } from "@/redux/ReduxFunction";
import LoaderAnimation from "@/components/loader/LoaderAnimation";

const Page: React.FC = () => {
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProjectModal, setProjectModal] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const [fileBtn, showFileBtn] = useState(false);
  const token = useDecodedToken();
  const [inbox, setInbox] = useState<Message[]>([]);
  const [messages, setMessages] = useState<string>("");
  const user1 = useSelector((state: RootState) => state.Auth.user?.id);

  const [, setProfileUrl] = useState<string>(demoimg.src);
  const id = useParams();
  const { data: getToUser } = useGetuserQuery(id.id);
  // console.log(getToUser, "check id");

  const user2 = useMemo(() => {
    return (
      getToUser?.data?.client?.email ||
      getToUser?.data?.retireProfessional?.email
    );
  }, [getToUser]);

  const {
    data: oldMessages,
    refetch,
    isFetching,
  } = useGetMessageQuery({ user1, user2: id.id }, { skip: !id.id });

  const { data: getConversation } = useGetConversationQuery(undefined, {
    skip: !id.id,
  });
  const [fileUpload] = useImageSendMutation({});
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef<HTMLDivElement>(null);
  const [users, setUsers] = useState<any[]>(getConversation?.data || []);
  const [offerNotification, setOfferNotification] = useState(0);
  const [latestOffer, setLatestOffer] = useState();
  const socketRef = useRef<Socket | null>(null);
  const [isSocketReady, setIsSocketReady] = useState(false);
  const { data: getoffer, refetch: offerRefetch } = useGetOfferQuery(token?.id);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const [selectedBase64Images, setSelectedBase64Images] = useState<string[]>(
    []
  );
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    if (id) {
      setOfferNotification(getoffer?.data?.data?.offersWithUserInfo?.count);
      refetch();
    }
  }, [getoffer?.data?.data?.offersWithUserInfo?.count, id, refetch]);

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
        const { message, fromUserId } = data;
        // console.log("all privat message  data", data);
        // console.log("all message" , message);
        // console.log("all fromUserId" , fromUserId);
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
      mysocket.on("image-pass", (data) => {
        const { message, fromUserId } = data;
        // console.log(message, "from listinging image-pass");

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
        socketRef.current.off("image-pass");
        socketRef.current.off("userInChat");
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
    // console.log(users, "check updatedusers");
    setUsers(updatedUsers);
    router.push(`/chat/${id}`);
    // refetch();

    if (socketRef.current) {
      socketRef.current.emit(
        "userInChat",
        JSON.stringify({ userEmail: token?.email, chattingWith: email })
      );
    } else {
      console.error("Socket is not initialized.");
    }

    setProfileUrl(profileUrl ?? demoimg.src);
    setInbox(oldMessages?.data?.messages);
  };

  // console.log("profile professional", getToUser);
  // console.log("profile client", getToUser);

  const onSendMessage = async (e: any) => {
    e.preventDefault();
    if (!messages.trim() && !selectedImages.length) {
      toast.error("Please enter a message or select an image.");
      return;
    }

    if (!socketRef.current) {
      toast.error("Socket connection not established.");
      return;
    }
    // console.log(object);

    try {
      let uploadedFileLink = "";
      let tempImageMessage: any = null;
      if (selectedImages.length > 0) {
        setLoading(true);
        const formData = new FormData();
        selectedImages.forEach((file) => formData.append("file", file));

        const res = await fileUpload(formData);
        if (res && res.data?.data) {
          uploadedFileLink = res.data.data;

          // Emit the uploaded image via socket
          const imageData = {
            toUserId: id.id,
            media: uploadedFileLink,

            fromUserId: token?.id,
          };

          socketRef.current.emit("image-pass", JSON.stringify(imageData));
        }
        tempImageMessage = {
          id: Date.now(),
          media: uploadedFileLink,
          sender: { _id: token?.id },
          recipient: { _id: id.id },
          createdAt: new Date().toISOString(),
        };

        setInbox((prevInbox) => [...prevInbox, tempImageMessage]);

        let currentUser = users.find((user) => user.email === user2);
        if (!currentUser) {
          currentUser = {
            id: getToUser?.data?.retireProfessional
              ? getToUser?.data?.retireProfessional?._id
              : getToUser?.data?.client?._id,
            name: `${getToUser?.data?.retireProfessional
              ? getToUser.data.retireProfessional.name.firstName
              : getToUser?.data?.client?.name.firstName
              } ${getToUser?.data?.retireProfessional
                ? getToUser.data.retireProfessional.name.lastName
                : getToUser?.data?.client?.name.lastName
              }`,
            profileUrl: getToUser?.data?.retireProfessional
              ? getToUser?.data?.retireProfessional?.profileUrl
              : getToUser?.data?.client?.profileUrl,
          };
        }

        currentUser.lastMessage = messages.trim() || "📷 Image"; // Update last message display
        currentUser.lastMessageTimestamp = new Date().toISOString();
        setUsers([
          currentUser,
          ...users.filter((user) => user.email !== user2),
        ]);

        // Reset input fields

        setSelectedImages([]);
        return;
      } else if (messages.trim()) {
        const message: any = {
          toUserId: id.id,
          message: messages.trim(),
          fromUserId: token?.id,
        };


        socketRef.current.emit("privateMessage", JSON.stringify(message)); // Ensure message includes media

        // Create temporary message
        const temporaryMessage: any = {
          id: Date.now(),
          message: messages.trim() || null,
          meetingLink: "",
          sender: { _id: token?.id },
          recipient: { _id: id.id },
          createdAt: new Date().toISOString(),
        };

        setInbox((prevInbox) => [...prevInbox, temporaryMessage]);

        let currentUser = users.find((user) => user.email === user2);
        // console.log("current user", currentUser);
        if (!currentUser) {
          currentUser = {
            id: getToUser?.data?.retireProfessional
              ? getToUser?.data?.retireProfessional?._id
              : getToUser?.data?.client?._id,
            email: getToUser?.data?.retireProfessional
              ? getToUser?.data?.retireProfessional?.email
              : getToUser?.data?.client?.email,
            name: `${getToUser?.data?.retireProfessional
              ? getToUser.data.retireProfessional.name.firstName
              : getToUser?.data?.client?.name.firstName
              } ${getToUser?.data?.retireProfessional
                ? getToUser.data.retireProfessional.name.lastName
                : getToUser?.data?.client?.name.lastName
              }`,
            profileUrl: getToUser?.data?.retireProfessional
              ? getToUser?.data?.profileUrl
              : getToUser?.data?.profileUrl,
          };
        }

        currentUser.lastMessage = messages.trim() || "📷 Image"; // Update last message display
        currentUser.lastMessageTimestamp = new Date().toISOString();

        setUsers([
          currentUser,
          ...users.filter((user) => user.email !== user2),
        ]);

        // Reset input fields
        setMessages("");

        setSelectedImages([])
        setSelectedBase64Images([])

      }
    } catch (e) {
      console.log(e, "error");
    }
  };

  const handleCreateZoomMeeting = () => {
    if (!socketRef.current) {
      toast.error("Socket connection not established.");
      return;
    }

    const callInfo = {
      fromUserId: token?.id,
      toUserId: id.id,
    };

    socketRef.current.emit("createZoomMeeting", JSON.stringify(callInfo));
    // console.log(callInfo, "check zoom link");
  };
  const handleFileClick = (type: string) => {
    const input = document.getElementById("fileInput") as HTMLInputElement;

    if (type === "image") {
      input.accept = "image/*"; // Accept images only
    } else if (type === "document") {
      input.accept =
        "application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"; // Accept documents
    }

    // Trigger the click event for the file input
    input.click();
  };

  // console.log("my message is ", messages);

  const handleClick = () => {
    setTimeout(() => {
      showFileBtn((prev) => !prev);
    }, 200);
  };

  const handleEmojiClick = (emojiObject: any) => {
    setMessages((prevMessages) => prevMessages + emojiObject.emoji);
  };
  const toggleEmojiPicker = () => {
    setShowEmojiPicker((prev) => !prev);
  };
  const handleOpenModal = () => {
    offerRefetch();
    setIsModalOpen((e) => !e);
  };

  const handleProjectModal = async () => {
    if (isButtonDisabled) return;
    setIsButtonDisabled(true);
    setProjectModal((prevState) => !prevState);
    setTimeout(() => {
      setIsButtonDisabled(false);
    });

  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    const validImages = files.filter((file) => file.type.startsWith("image/"));

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

  const handleSidebar = () => {
    setShowSidebar(!showSidebar);
  };


  return (
    <section>
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
      <div className="flex lg:max-w-[1320px] md:w-full  w-full inset-0 overflow-hidden h-[750px] px-4 my-4 mx-auto shadow-sm border rounded-[15px]">
        <div
          className={`w-1/3 border-r border-gray-300 bg-white overflow-y-scroll lg:block hidden ${showSidebar ? "hidden" : "block"
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
          <div className="flex lg:flex-row md:flex-row flex-col gap-2 items-center justify-between p-4 border-b border-gray-300 bg-white mt-3 ">
            {getToUser?.data && (
              <div className="flex items-center">
                <div className="w-[40px] h-[40px]">
                  <Image
                    src={getToUser?.data?.profileUrl ?? demoimg}
                    alt="Jane Cooper"
                    width={40}
                    height={40}
                    className="rounded-full w-full h-full"
                  />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-900">
                    {getToUser?.data.client?.name?.firstName ||
                      getToUser?.data?.retireProfessional?.name?.firstName}{" "}
                    {getToUser?.data.client?.name?.lastName ||
                      getToUser?.data?.retireProfessional?.name?.lastName}
                  </h3>
                 
                </div>
              </div>
            )}

            {token?.role === "retireProfessional" ? (
              <div className="flex items-center gap-6">
                <Button
                  onClick={handleOpenModal}
                  className="rounded-[12px] px-6 py-4 text-[16px] font-medium text-black border transition-colors duration-200 disabled:bg-gray-300 disabled:text-gray-500"
                  disabled
                >
                  Current Offers
                </Button>
                {isModalOpen && (
                  <OffersModal
                    onClose={handleOpenModal}
                    user1={token.id}
                    offerNotification={offerNotification}
                    setOfferNotification={setOfferNotification}
                    latestOffer={latestOffer}
                  />
                )}

                <Button
                // className="lg:text-[20px] md:text-[20px] text-[14px]"
                  onClick={handleProjectModal}
                  disabled={isButtonDisabled}
                >
                  Create an Offer
                </Button>
                {isProjectModal && (
                  <ProjectModal
                    onClose={handleProjectModal}
                    user1={token.id}
                    user2={id.id as string}
                  />
                )}
                {/* <Link className="hover:bg-slate-100 hover:shadow-xl" href={"/"}>
                  <HiOutlineDotsVertical />
                </Link> */}
              </div>
            ) : (
              <div className="flex items-center gap-6">
                <button
                  onClick={handleOpenModal}
                  className="rounded-[12px] relative px-6 py-4 text-[16px] font-medium text-black border transition-colors duration-200"
                >
                  Current Offers
                  {offerNotification > 0 && (
                    <span className="absolute p-2 top-0 right-0 bg-red-500 text-white text-sm rounded-full w-3 h-3 flex items-center justify-center">
                      {offerNotification}
                    </span>
                  )}
                  {/* <span className="absolute top-0 right-0 bg-red-500 text-white text-sm rounded-full w-3 h-3 flex items-center justify-center"> {offerNotifications}</span> */}
                </button>
                {isModalOpen && (
                  <OffersModal
                    onClose={handleOpenModal}
                    user1={user1 as string}
                    offerNotification={offerNotification}
                    setOfferNotification={setOfferNotification}
                    latestOffer={latestOffer}
                  />
                )}

                <button
                  onClick={handleProjectModal}
                  disabled
                  className="rounded-[12px]  px-6 py-4 text-[16px] disabled:bg-gray-300 disabled:text-gray-500 font-medium text-white hover:bg-[#4629af] transition-all   duration-200"
                >
                  Create an Offer
                </button>
                {isProjectModal && (
                  <ProjectModal
                    onClose={handleProjectModal}
                    user1={user1 ?? ""}
                    user2={typeof id.id === "string" ? id.id : ""}
                  />
                )}
                {/* <Link className="hover:bg-slate-100 hover:shadow-xl" href={"/"}>
                  <HiOutlineDotsVertical />
                </Link> */}
              </div>
            )}
          </div>

          <div className="flex-1">
            <div className="mx-auto bg-white p-4 pb-0 rounded-[10px]">
              <div className="flex flex-col overflow-y-auto ">
                {isFetching ? (
                  <div className="h-20 w-20 absolute top-[15px] left-[350px] transform -translate-x-1/2 -translate-y-1/2">
                    <LoaderAnimation />
                  </div>

                ) : (
                  <ChatWindow
                    handleOpenModal={handleOpenModal}
                    messages={inbox}
                    currentUser={user1 ?? ""}
                    profileUrl={getToUser?.data?.profileUrl}
                    colorScheme={{
                      senderBg: `bg-[#F2FAFF] text-[#4A4C56]`,
                      receiverBg: `bg-[#F8F8F8] text-[#4A4C56]`,
                    }}
                    senderName={""}
                  />
                )}

              </div>
            </div>
          </div>


          <div className="px-4 absolute bottom-0 left-0 w-full border-t border-gray-300 bg-white flex items-center gap-2">
            <div
              className={`absolute -top-[95px] left-[35px] flex flex-col gap-y-3 transition-all duration-500 ease-in-out ${fileBtn
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-5 pointer-events-none"
                }`}
            >
              <button
                onClick={() => handleFileClick("document")}
                className="bg-primary rounded-full"
              >
                <FileText className="text-lg text-white cursor-pointer flex items-center justify-center w-10 h-10 p-2" />
              </button>
              <button
                onClick={() => handleFileClick("image")}
                className="bg-primary rounded-full"
              >
                <Images className="text-lg text-white cursor-pointer flex items-center justify-center w-10 h-10 p-2" />
              </button>
            </div>


            <form
              onSubmit={onSendMessage}
              className="flex items-center gap-2 p-4 w-full relative"
              encType="multipart/form-data"
            >
              <AiOutlinePaperClip
                onClick={handleClick}
                className="text-xl absolute left-6 hover:bg-white rounded-full text-[#25314C] transition-all cursor-pointer w-8 h-8 p-1"
              />


              {selectedBase64Images.length > 0 && (
                <div className="bg-gray-400 p-4 rounded-[9px] absolute bottom-[75px] left-[-15px] w-full">
                  <div className=" flex gap-2">
                    {selectedBase64Images.map((base64, index) => (
                      <div
                        key={index}
                        className=" bg-gray-200 px-3 py-2 rounded-lg w-[200px] h-[150px] relative"
                      >
                        <Image
                          width={200}
                          height={150}
                          src={base64}
                          alt="Selected"
                          className="w-full h-full object-cover rounded"
                        />
                        <button
                          type="button"
                          onClick={() => handleFileRemove(base64)}
                          className="text-red-500 font-bold absolute top-3 left-3 "
                        >
                          X
                        </button>
                      </div>
                    ))}
                  </div>
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
                onChange={(e) => setMessages(e.target.value)}
                className="flex-1 w-full bg-gray-100 pl-12 px py-2 rounded-[20px] text-gray-700 focus:outline-none max-h-[50px] resize-none"
              />
              <button type="submit" className="bg-primary rounded-full">
                <FiSend className="text-lg text-white cursor-pointer w-8 h-8 p-2" />
              </button>
            </form>

            <FaRegSmile
              onClick={toggleEmojiPicker}
              className="text-xl hover:shadow-md bg-[#F2FAFF] rounded-full text-[#25314C] cursor-pointer w-8 h-8 p-1"
            />
            {showEmojiPicker && (
              <div ref={emojiPickerRef} className="absolute bottom-16 right-0">
                <EmojiPicker onEmojiClick={handleEmojiClick} />
              </div>
            )}

            {/* <MdOutlineKeyboardVoice className="text-xl hover:shadow-md  bg-[#F2FAFF] rounded-full text-[#25314C] cursor-pointer w-8 h-8 p-1" /> */}
            <button
              onClick={handleCreateZoomMeeting}
              className="text-xl hover:shadow-md bg-[#F2FAFF] rounded-full text-[#25314C] cursor-pointer w-8 h-8 p-1"
            >
              <Video />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
