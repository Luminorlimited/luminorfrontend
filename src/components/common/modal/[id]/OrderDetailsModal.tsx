import React from "react";
import Image from "next/image";

interface OrderDetailsModalProps {
    offer: any;
    onClose: () => void;
}

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({ offer, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white rounded-[15px] shadow-lg w-[400px] p-6 relative">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-black"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>

                {/* Modal Content */}
                <h3 className="text-lg font-semibold mb-4">Orders Details</h3>

                <div className="w-full h-[150px] rounded-md overflow-hidden mb-4">
                    <Image
                        src={offer.image}
                        alt="Offer Image"
                        width={400}
                        height={150}
                        className="object-cover w-full h-full"
                    />
                </div>

                <h4 className="font-medium text-[16px] mb-3">{offer.title}</h4>

                <div className="text-sm text-[#4A4C56]">
                    <p className="mb-2">
                        <span className="font-medium">Order from: </span>
                        {offer.client}
                    </p>
                    <p className="mb-2">
                        <span className="font-medium">Delivery date: </span>
                        {offer.date}
                    </p>
                    <p className="mb-2">
                        <span className="font-medium">Total price: </span>
                        {offer.price}
                    </p>
                    <p className="mb-2">
                        <span className="font-medium">Order no: </span>
                        {offer.orderNo}
                    </p>
                    <p>
                        <span className="font-medium">Order agreement: </span>
                        {offer.agreement}
                    </p>
                </div>

                {/* Buttons */}
                <div className="flex justify-between mt-6">
                    <button className="w-[48%] bg-gray-200 text-gray-600 px-4 py-2 rounded-md hover:bg-gray-300">
                        Decline
                    </button>
                    <button className="w-[48%] bg-[#6B46C1] text-white px-4 py-2 rounded-md hover:bg-[#5C3AAF]">
                        Accept Order
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderDetailsModal;
