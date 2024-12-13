import React from "react";
import Image from "next/image";
import { Offer } from "./OffersModal";
import Button from "@/components/common/Button";

interface OrderDetailsModalProps {
    data: Offer

}

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({ data }) => {
    return (
        <div className="flex  items-center justify-center z-50">
            <div className="">
                {/* Close Button */}

                {/* Modal Content */}
                <h3 className="text-lg font-semibold mb-4">Orders Details</h3>

                <div className="w-full h-[150px] bg-[#F8FAFB] mb-4 rounded-md overflow-hidden ">
                    <Image
                        src={data.image}
                        alt="Offer Image"
                        width={400}
                        height={150}
                        className="object-cover w-full h-full"
                    />
                <h4 className="font-medium text-[16px] mb-3">{data.title}</h4>
                </div>


                <div className="text-sm  bg-[#F8FAFB]">
                    <p className="mb-2 flex justify-between">
                        <span className="font-medium text-[#4A4C56]">Order from: </span>
                        <span className="text-black">{data.date}</span>
                    </p>
                    <p className="mb-2 flex justify-between">
                        <span className="font-medium text-[#4A4C56]">Delivery date: </span>
                        <span className="text-black">{data.date}</span>
                    </p>
                    <p className="mb-2 flex justify-between">
                        <span className="font-medium text-[#4A4C56]">Total price: </span>
                        <span className="text-black">{data.price}</span>
                    </p>
                    <p className="mb-2 flex justify-between">
                        <span className="font-medium text-[#4A4C56]">Order no: </span>
                        <span className="text-black">{data.orderNo}</span>
                    </p>
                    <p className="mb-2 flex justify-between">
                        <span className="font-medium text-[#4A4C56]">Order agreement: </span>
                        <span className="text-black">{data.agreement}</span>
                    </p>
                </div>

                {/* Buttons */}
                <div className="flex justify-between mt-6 gap-2">
                    <button className="rounded-[12px]  w-full text-[16px] bg-slate-200 font-medium text-black  transition-colors duration-200">
                        Decline
                    </button>
                    <Button className="w-full">Accept Order</Button>

                </div>
            </div>
        </div>
    );
};

export default OrderDetailsModal;
