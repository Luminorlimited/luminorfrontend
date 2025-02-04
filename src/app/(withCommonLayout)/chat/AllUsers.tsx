'use client';
import React from 'react';
import Image from 'next/image';
import demoimg from '@/assets/images/demoimg.png';
// import avatar1 from "@/assets/images/msgavatar1.png";

// import { useParams } from 'next/navigation';

interface AllUsersProps {
  handleshowMessage: (user: any) => void;
  // getUser: User | null; // Replace `any` with proper type
  getConversation: any;
  setTimeStamp: any;
  // messageNotifications: any;
}

function formatTimeAgo(timestamp: string) {
  const messageTime = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - messageTime.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));

  if (diffMinutes < 1) return 'Just now';
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}h ago`;

  // Show exact time after 24 hours
  return messageTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function AllUsers({ handleshowMessage, getConversation, setTimeStamp }: AllUsersProps) {
  // console.log('my last Message is', getConversation);
  // const [messageNotifications, setMessageNotifications] = useState()

  return (
    <div>
      <div className="w-full max-w-md mx-auto bg-white rounded-lg">
        <div className="flex gap-6 p-4">
          <h2 className="text-lg font-semibold">All</h2>
          <h2 className="text-lg font-semibold">Unread (10)</h2>
        </div>
        <div>
          <ul className="divide-y">
            {getConversation?.data.map((user: any, index: number) => {
              let firstName = user?.firstName;
              let lastName = user?.lastName;

              // If firstName and lastName are not directly available, extract them from the name
              if (!firstName && !lastName && user?.name) {
                const nameParts = user.name.split(" ");
                firstName = nameParts[0];
                lastName = nameParts.slice(1).join(" ");
              }
              const userId = user?.id
              // console.log("my user id ", getConversation);
              return (
                <li
                  onClick={() => handleshowMessage({
                    id: userId,
                    email: user?.email,
                    firstName: firstName || "Unknown",
                    lastName: lastName || "",
                    name: user?.name,
                    profileUrl: user?.profileUrl || null,
                  })}
                  className={`flex border-none items-center p-4 cursor-pointer rounded-[12px] hover:bg-[#F2FAFF] focus:bg-[#F2FAFF] $`}
                  key={index}
                >
                  <div className="relative">
                    <Image
                      src={user?.profileUrl || demoimg}
                      alt="Avatar"
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    {
                      user?.isOnline === true ? <span className="flex absolute right-3 bottom-1 border-white border-4 w-4 h-4 bg-[#111827] rounded-full"></span> : ""
                    }

                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-semibold" key={index}>
                        {user?.firstName && user?.lastName
                          ? `${user?.firstName} ${user?.lastName}`
                          : user?.name || "Unknown User"}
                      </h3>


                      <span className="text-xs text-gray-500">
                        {user.lastMessageTimestamp && (
                          <p className='text-[12px] text-gray-700'>
                            {formatTimeAgo(user.lastMessageTimestamp)}
                            {setTimeStamp(user.lastMessageTimestamp)}
                          </p>
                        )}
                        <p>{ }</p>


                        {user?.unseenMessageCount > 0 && (
                        <span className="bg-red-500 p-1 text-white text-sm rounded-full w-5 h-5 flex items-center justify-center">
                          {user?.unseenMessageCount}
                        </span>

                          )} 
                      </span>

                    </div>
                    <p className='text-[12px] text-gray-700'>{user.lastMessage}</p>
                    {/* <div className="flex justify-between items-center">
                      <h3 className="text-sm">mahi</h3>
                      <span className="text-xs text-white font-semibold bg-[#E03137] px-[10px] py-[2px] rounded-xl">
                        2
                      </span>
                    </div> */}
                  </div>
                </li>

              )
            }

            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
