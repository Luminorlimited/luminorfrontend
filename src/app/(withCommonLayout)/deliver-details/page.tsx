
import Chat from "@/components/reviewdetails/chat";
import ConversationHeader from "@/components/reviewdetails/conversation-header";
import Milestones from "@/components/reviewdetails/milestones";
import OrderDetails from "@/components/reviewdetails/OrderDetails";
import OrderHeader from "@/components/reviewdetails/OrderHeader";
import Timeline from "@/components/reviewdetails/timeline";



export default function Page() {
    return (
        <div className="max-w-[1300px] mx-auto p-6 space-y-6">
            <div className="lg:flex lg:flex-row flex-col gap-8 w-full">
                <div className="">
                    <OrderHeader />
                    <ConversationHeader />
                    <Timeline />
                    <Milestones />
                    <Chat />
                </div>
                <div>
                    <OrderDetails />
                </div>
            </div>
        </div>
    )
}
