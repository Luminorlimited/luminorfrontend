'use client'
import LoaderAnimation from "@/components/loader/LoaderAnimation";
// import Chat from "@/components/reviewdetails/chat";
import ConversationHeader from "@/components/reviewdetails/conversation-header";
import Milestones from "@/components/reviewdetails/milestones";
import OrderDetails from "@/components/reviewdetails/OrderDetails";
import OrderHeader from "@/components/reviewdetails/OrderHeader";
import RevisionDetails from "@/components/reviewdetails/RevisionDetails";
import Timeline from "@/components/reviewdetails/timeline";
import { useGetSingleOrderQuery } from "@/redux/Api/paymentApi";
import { useParams } from "next/navigation";



export default function Page() {
    const orderId = useParams()
    const { data: getSingleOrder, isLoading } = useGetSingleOrderQuery(orderId.id)
    // console.log('My order details is', getSingleOrder);
    if (isLoading) {
        return <div><LoaderAnimation/></div>
    }
    return (
        <div className="container mx-auto p-6 space-y-6">
            <div className="grid lg:grid-cols-6 gap-7 w-full">
                <div className="lg:col-span-4">
                    <OrderHeader getSingleOrder={getSingleOrder} />
                    <ConversationHeader getSingleOrder={getSingleOrder} />
                    <Timeline getSingleOrder={getSingleOrder} />
                    <Milestones getSingleOrder={getSingleOrder} />
                    <RevisionDetails getSingleOrder={getSingleOrder}/>
                    {/* <Chat /> */}

                </div>
                <div className="lg:col-span-2 ">
                    <OrderDetails getSingleOrder={getSingleOrder} />
                </div>
            </div>
        </div>
    )
}
