/* eslint-disable @typescript-eslint/no-explicit-any */
import { Conversation } from "@/lib/fakeData/allMessage";
import Image from "next/image";
import demoimg from "@/assets/images/demoimg.png";

export default function AllUsers({
  showMessage,
  conversations,
}: {
  showMessage: (e: number) => void;
  conversations: Conversation[];
}) {
  console.log(conversations);


  const formatTimeDifference = (timestamp: Date): string => {
    const now = new Date();
    const differenceInMs = now.getTime() - timestamp.getTime();
    const differenceInMinutes = Math.floor(differenceInMs / (1000 * 60));

    if (differenceInMinutes < 60) {
      return `${differenceInMinutes} min ago`;
    } else if (differenceInMinutes < 1440) {
      const hours = Math.floor(differenceInMinutes / 60);
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else {
      const days = Math.floor(differenceInMinutes / 1440);
      return `${days} day${days > 1 ? "s" : ""} ago`;
    }
  };

  return (
    <div>
      <div className="w-full max-w-md mx-auto bg-white  rounded-lg">
        {/* Header */}
        <div className="flex gap-6 p-4">
          <h2 className="text-lg font-semibold">All</h2>
          <h2 className="text-lg font-semibold">Unread (10)</h2>
        </div>

        {/* Messages */}
        <div>
          <ul className="divide-y ">
            {conversations.map((user: Conversation, idx) => (
              <li
                key={idx}
                onClick={() => showMessage(user?.conversationId)}
                className={`flex border-none items-center p-4 cursor-pointer rounded-[12px] hover:bg-[#F2FAFF] focus:bg-[#F2FAFF] ${user.participants.sender ? "bg-white" : ""
                  }`}
              >
                {/* Avatar */}
                <div className="relative">

                  <Image
                    src={demoimg}
                    alt={"plsc"}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <span className="flex absolute right-3 bottom-1 border-white border-4 w-4 h-4 bg-[#111827] rounded-full"></span>
                </div>


                {/* Message Details */}
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-semibold">{user.participants.receiver}</h3>
                    <span className="text-xs text-gray-500">
                      {/* Display the last message */}
                      {user.messages.length > 0
                        ? formatTimeDifference(user.messages[user.messages.length - 1].timestamp)
                        : "No messages"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm ">{user.participants.receiver}</h3>
                    <span className="text-xs text-white font-semibold bg-[#E03137] px-[10px] py-[2px] rounded-xl">
                        <p>2</p>
                    </span>
                  </div>

                  
                </div>
              </li>
            ))}
          </ul>

        </div>
      </div>
    </div>
  );
}
