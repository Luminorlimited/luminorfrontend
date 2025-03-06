'use client'
// import Chat from "@/components/reviewdetails/chat";
import ConversationHeader from "@/components/reviewdetails/conversation-header";
import Milestones from "@/components/reviewdetails/milestones";
import OrderDetails from "@/components/reviewdetails/OrderDetails";
import OrderHeader from "@/components/reviewdetails/OrderHeader";
import Timeline from "@/components/reviewdetails/timeline";
import { useGetSingleOrderQuery } from "@/redux/Api/paymentApi";
import { useParams } from "next/navigation";



export default function Page() {
    const orderId = useParams()
    const { data: getSingleOrder } = useGetSingleOrderQuery(orderId.id)
    // console.log('My order details is', getSingleOrder);
    return (
        <div className="max-w-[1300px] mx-auto p-6 space-y-6">
            <div className="lg:flex lg:flex-row flex-col gap-8 w-full">
                <div className="">
                    <OrderHeader getSingleOrder={getSingleOrder} />
                    <ConversationHeader getSingleOrder={getSingleOrder} />
                    <Timeline getSingleOrder={getSingleOrder} />
                    <Milestones getSingleOrder={getSingleOrder} />
                    {/* <Chat /> */}
                </div>
                <div>
                    <OrderDetails getSingleOrder={getSingleOrder} />
                </div>
            </div>
        </div>
    )
}
