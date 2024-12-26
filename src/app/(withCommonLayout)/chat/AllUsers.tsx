import Image from "next/image";
import demoimg from "@/assets/images/demoimg.png";
import {Conversation} from "@/lib/fakeData/allMessage"; // Replace with your image path
// import { Conversation } from "@/types"; // Replace with your actual Conversation type

export default function AllUsers({
                                   showMessage,
                                   conversations,
                                 }: {
  showMessage: (e: number) => void;
  conversations: Conversation[];
}) {
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
        <div className="w-full max-w-md mx-auto bg-white rounded-lg">
          <div className="flex gap-6 p-4">
            <h2 className="text-lg font-semibold">All</h2>
            <h2 className="text-lg font-semibold">Unread (10)</h2>
          </div>

          <div>
            <ul className="divide-y">
              {conversations.map((user,i) => (
                  <li
                      key={i}
                      onClick={() => showMessage(user?.conversationId)}
                      className={`flex border-none items-center p-4 cursor-pointer rounded-[12px] hover:bg-[#F2FAFF] focus:bg-[#F2FAFF] ${
                          user.participants.sender ? "bg-white" : ""
                      }`}
                  >
                    <div className="relative">
                      <Image
                          src={demoimg}
                          alt={"Avatar"}
                          width={48}
                          height={48}
                          className="w-12 h-12 rounded-full mr-4"
                      />
                      <span className="flex absolute right-3 bottom-1 border-white border-4 w-4 h-4 bg-[#111827] rounded-full"></span>
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <h3 className="text-sm font-semibold">{user.participants.receiver}</h3>
                        <span className="text-xs text-gray-500">
                      {user.messages.length > 0
                          ? formatTimeDifference(user.messages[user.messages.length - 1].timestamp)
                          : "No messages"}
                    </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <h3 className="text-sm">{user.participants.receiver}</h3>
                        <span className="text-xs text-white font-semibold bg-[#E03137] px-[10px] py-[2px] rounded-xl">
                      2
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
