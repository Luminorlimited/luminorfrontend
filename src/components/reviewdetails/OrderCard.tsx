import { MoreVertical } from "lucide-react";
import Image from "next/image";
import img12 from '@/assets/images/offer.png'
import Link from "next/link";

export default function OrderCard() {
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
                    <div className="absolute top-0 right-0 z-10">
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
                        I will setup and manage your startup business...
                    </h2>
                </div>
                </div>


                {/* Order Details Grid */}
                <div className=" space-y-6 ">
                    <div className="grid grid-cols-2 gap-y-3 bg-[#FAFAFA] rounded-[10px] p-2">
                        <div>
                            <h3 className="text-lg text-gray-600">Order form</h3>
                        </div>
                        <div className="text-lg text-gray-900 font-medium text-right">
                            Jane Cooper
                        </div>

                        <div>
                            <h3 className="text-lg text-gray-600">Delivery date</h3>
                        </div>
                        <div className="text-lg text-gray-900 font-medium text-right">
                            26 Oct 2024, 11:59
                        </div>

                        <div>
                            <h3 className="text-lg text-gray-600">Total price (Milestone)</h3>
                        </div>
                        <div className="text-lg text-gray-900 font-medium text-right">
                            £ 200
                        </div>

                        <div>
                            <h3 className="text-lg text-gray-600">Order no</h3>
                        </div>
                        <div className="text-lg text-gray-900 font-medium text-right">
                            #12345678
                        </div>
                    </div>

                    {/* Action Button */}
                    <div className=''>
                        <Link href={'/deliver-details/addreview'} className="text-center bg-primary block w-full py-4 px-4 rounded-[10px] text-white text-lg ">
                            Deliver Nows
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}