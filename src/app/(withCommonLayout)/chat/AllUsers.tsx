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
}

export default function AllUsers({ handleshowMessage, getConversation }: AllUsersProps) {
  console.log(`My all old Conversation`, getConversation);



  // const formatTimeDifference = (timestamp: Date): string => {
  //   const now = new Date();
  //   const differenceInMs = now.getTime() - timestamp.getTime();
  //   const differenceInMinutes = Math.floor(differenceInMs / (1000 * 60));

  //   if (differenceInMinutes < 60) {
  //     return `${differenceInMinutes} min ago`;
  //   } else if (differenceInMinutes < 1440) {
  //     const hours = Math.floor(differenceInMinutes / 60);
  //     return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  //   } else {
  //     const days = Math.floor(differenceInMinutes / 1440);
  //     return `${days} day${days > 1 ? 's' : ''} ago`;
  //   }
  // };







  return (
    <div>
      <div className="w-full max-w-md mx-auto bg-white rounded-lg">
        <div className="flex gap-6 p-4">
          <h2 className="text-lg font-semibold">All</h2>
          <h2 className="text-lg font-semibold">Unread (10)</h2>
        </div>
        <div>
          <ul className="divide-y">
            {getConversation?.data.map((user: any, index: number) => (
              <li
                onClick={() => handleshowMessage({
                  email: user?.email,
                  firstName: user?.firstName,
                  lastName: user?.lastName,
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
                  <span className="flex absolute right-3 bottom-1 border-white border-4 w-4 h-4 bg-[#111827] rounded-full"></span>
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-center">


                    {/* {getUser?.client?.name?.firstName ||
                      getUser?.retireProfessional?.name?.firstName ||
                      'Unknown'}{' '}
                    {getUser?.retireProfessional?.name?.lastName ||
                      getUser?.client?.name?.lastName ||
                      ''} */}
                    <h3 className="text-sm font-semibold" key={index}>
                      {user?.firstName && user?.lastName
                        ? `${user?.firstName} ${user?.lastName}`
                        : user?.name || "Unknown User"}
                    </h3>


                    <span className="text-xs text-gray-500">
                      {/* {user.messages.length > 0
                        ? formatTimeDifference(
                          user.messages[user.messages.length - 1].timestamp
                        )
                        : 'No messages'} */}
                    </span>
                  </div>
                  {/* <div className="flex justify-between items-center">
                    <h3 className="text-sm">mahi</h3>
                    <span className="text-xs text-white font-semibold bg-[#E03137] px-[10px] py-[2px] rounded-xl">
                      2
                    </span>
                  </div> */}
                </div>
              </li>

            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
