"use client";
import React, { useState } from "react";
import OrderDetailsModal from "./OrderDetailsModal";
import { useGetOfferQuery } from "@/redux/api/offerApi";

interface OffersModalProps {

    onClose: () => void;
    user2: string;
}

export interface Offer {
    _id: string | number,
    description: string,
    totalPrice: string,
    date: string,
    image: string,
    client: string,
    orderNo: string,
    agreement: boolean,
}

const OffersModal: React.FC<OffersModalProps> = ({ onClose, user2 }) => {


    const { data: getoffer } = useGetOfferQuery(user2)
    console.log("My email", user2);
    console.log("My offer", getoffer);

    const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null)


    const onOfferClick = (offer: Offer) => {
        setSelectedOffer(offer)

    }



    return (
        <div className="absolute z-[999999] top-[-135px] inset-0  flex justify-center items-center">

            <div className=" mt-4 relative bg-white shadow-lg rounded-[20px] w-[462px] h-[505px] z-50  p-4 overflow-hidden overflow-y-scroll">
                <button
                    onClick={onClose}
                    className="text-gray-500 absolute right-5  hover:text-black focus:outline-none"
                >
                    X
                </button>
                {selectedOffer !== null ?
                    <div>
                        <OrderDetailsModal data={selectedOffer} />
                    </div>
                    : <div>
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex gap-3 items-center">
                                <h3 className="text-lg font-semibold">Orders with you</h3>
                                <p className="text-[#4A4C56] text-sm">(Total-{getoffer?.data.length})</p>
                            </div>

                        </div>
                        <div>
                            {getoffer?.data.map((offer: any) => {
                                // Convert createdAt date to "11 January 2025" format
                                const formattedDate = new Date(offer.createdAt).toLocaleDateString('en-GB', {
                                    day: '2-digit',
                                    month: 'long',
                                    year: 'numeric',
                                });

                                return (
                                    <button
                                        key={offer._id}
                                        onClick={() => onOfferClick(offer)} // Pass the clicked offer
                                        className="px-4 py-3 items-start gap-4 cursor-pointer hover:bg-[#F8FAFB] border-[#F8FAFB] hover:rounded-[12px] rounded-lg hover:shadow-md transition-all border hover:border-primary mb-1 w-full"
                                    >
                                        <div className="text-left">
                                            <h1 className="text-[16px] font-medium">{offer.description}</h1>
                                            <h1 className="text-sm pt-2">{offer.totalPrice}</h1>
                                            <h1 className="text-sm pt-2">{formattedDate}</h1>
                                        </div>
                                    </button>
                                );
                            })}

                        </div>
                    </div>}
            </div>
        </div>
    );
};

export default OffersModal;
