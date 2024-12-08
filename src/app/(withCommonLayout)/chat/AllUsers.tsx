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
  return (
    <div>
      <div className="w-full max-w-md mx-auto bg-white  rounded-lg">
        {/* Header */}
        <div className="flex gap-6 p-4 border-b">
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
                className={`flex items-center p-4 cursor-pointer hover:bg-[#F2FAFF] focus:bg-[#F2FAFF] ${user.participants.sender ? "bg-white" : ""
                  }`}
              >
                {/* Avatar */}
                <Image
                  src={demoimg}
                  alt={"plsc"}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full mr-4"
                />
                {/* Message Details */}
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-semibold">
                      {user.participants.receiver}
                    </h3>
                    <span className="text-xs text-gray-500">
                      {user.participants.receiver}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">dfndf</p>
                </div>
              </li>
            ))}
          </ul>

        </div>
      </div>
    </div>
  );
}
