'use client'
import { MoreVertical } from "lucide-react";
import Image from "next/image";
import img12 from '@/assets/images/offer.png'
// import { useParams } from "next/navigation";
import { useDeliverOrderMutation } from "@/redux/Api/paymentApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
// import { useRouter } from "next/navigation";

export default function OrderCard({ getSingleOrder }: { getSingleOrder: any }) {

    const initdata = getSingleOrder?.data?.result?.project
    // console.log(initdata);

    const deliveryday = initdata?.flatFee
        ? initdata.flatFee.delivery
        : initdata?.hourlyFee
            ? initdata.hourlyFee.delivery
            : initdata?.milestones
                ? initdata.milestones.reduce((total: any, milestone: any) => total + (milestone.delivery || 0), 0)
                : 0;

    const createdAt = new Date(getSingleOrder?.data?.result?.project?.createdAt);

    // Add delivery days to createdAt
    const deliveryDate = new Date(createdAt);
    deliveryDate.setDate(deliveryDate.getDate() + deliveryday);

    // Format the delivery date
    const formattedDate = `${createdAt.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    })} (Delivery in ${deliveryday} days: ${deliveryDate.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    })})`;




    // const orderId = useParams()
    const id = getSingleOrder?.data?.result?._id
    console.log('my order id', id);

    // console.log('my order id', id);
    // const { data: deliverOrder } = useDeliverOrderMutation(id)
    const [deliverOrder, { isLoading }] = useDeliverOrderMutation({})
    const router= useRouter()

    const handleDeliver = async () => {
        // if (!id) {
        //     toast.error("Order ID is missing!");
        //     return;
        // }

        try {

            if (id) {
                console.log('this is console', id);
                const res = await deliverOrder(id);
                if (res) {


                    toast.success("Order delivered successfully");
                    router.push(`/deliver-details/addreview/${getSingleOrder?.data?.client[0]._id}`)
                    console.log("Order delivered:", res);
                }
            } else {
                toast.error("Failed to deliver order");
            }
        } catch (error) {
            console.error("Error while delivering order:", error);
            toast.error("Failed to deliver order");
        }
    };




    return (
        <div>
            <div className="bg-white px-2 py-3 shadow-sm border rounded-[10px]">
                {/* Header */}
                <div className=" flex items-center justify-between pb-4">
                    <h1 className="text-2xl font-semibold text-gray-900">Orders Details</h1>
                    <button className="p-2 hover:bg-gray-100 rounded-full">
                        <MoreVertical className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                {/* Banner Image Section */}
                <div className="relative bg-[#FAFAFA] px-2">
                    <div className="absolute top-1 right-2 z-10">
                        <span className="px-4 py-2 rounded-[8px] bg-[#D3F4EF] text-[#black]  font-medium">
                            In Process
                        </span>
                    </div>
                    <Image
                        src={img12}
                        alt="Order document with passport"
                        width={1200}
                        height={400}
                        className="w-full h-[300px] object-cover"
                    />
                    {/* Description */}
                    <div className="p-6">
                        <h2 className="text-lg text-black font-medium">
                            {getSingleOrder?.data?.result?.project?.projectName}
                        </h2>
                    </div>
                </div>


                {/* Order Details Grid */}
                <div className=" space-y-6 mt-4">
                    <div className="grid grid-cols-2 gap-y-3 bg-[#FAFAFA] rounded-[10px] p-2">
                        <div>
                            <h3 className="text-lg text-gray-600">Order form</h3>
                        </div>
                        <div className="text-lg text-gray-900 font-medium text-right">
                            {getSingleOrder?.data?.retireProfessional[0]?.name?.firstName} {getSingleOrder?.data?.retireProfessional[0]?.name?.lastName}
                        </div>

                        <div>
                            <h3 className="text-lg text-gray-600">Delivery date</h3>
                        </div>
                        <div className="text-lg text-gray-900 font-medium text-right">
                            {formattedDate}
                        </div>

                        <div>
                            <h3 className="text-lg text-gray-600">Total price {getSingleOrder?.data?.result?.project?.flatFee ? "(Flat Fee)" : getSingleOrder?.data?.result?.project?.hourlyFee ? "(Hourle Fee)" : "(Milestone)"}</h3>
                        </div>
                        <div className="text-lg text-gray-900 font-medium text-right">
                            £ {getSingleOrder?.data?.result?.project?.totalPrice}
                        </div>

                        <div>
                            <h3 className="text-lg text-gray-600">Order no</h3>
                        </div>
                        <div className="text-lg text-gray-900 font-medium text-right">
                            #{getSingleOrder?.data?.result?._id}
                        </div>
                    </div>

                    {/* Action Button */}
                    <div className=''>
                        <button onClick={handleDeliver} className={`text-center  block w-full py-4 px-4 rounded-[10px] text-lg ${isLoading ? "bg-slate-500 text-black" : "bg-primary text-white "}`} disabled={isLoading}>
                            {isLoading ? 'Delivering...' : 'Deliver Order'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// href = { '/deliver-details/addreview'}